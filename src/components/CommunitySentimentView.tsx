import React, { useState, useEffect, useMemo } from 'react';
import { 
  Building2, 
  Construction, 
  HeartHandshake, 
  Receipt, 
  CheckCircle2, 
  Vote, 
  Users, 
  Info, 
  Calendar,
  Lock,
  ShieldCheck,
  ArrowRight,
  ArrowLeft,
  RotateCcw,
  Sparkles,
  BarChart3,
  Edit3
} from 'lucide-react';
import { 
  SentimentTopicId, 
  PolicyOptionId, 
  PollingWaveId 
} from '../types/sentiment';
import { 
  INITIAL_SENTIMENT_TOPICS, 
  POLLING_WAVES 
} from '../data/sentimentPollsData';
import { 
  subscribeToTopicVotes, 
  castOrUpdateBallot, 
  checkHasVotedInCloud, 
  getVoterToken,
  clearVoterToken,
  resetAllTopicsToZero,
  LiveTopicVotes, 
  testFirestoreConnection 
} from '../lib/firebase';

const STORAGE_VOTES_KEY = 'sudbury_user_votes_v6';
const STORAGE_WARD_KEY = 'sudbury_voter_ward_v6';

interface StoredVote {
  choice: PolicyOptionId;
  ward?: string;
  timestamp: number;
}

export const CommunitySentimentView: React.FC = () => {
  // Campaign wave selection (Default: Wave 1 - Active Window)
  const [activeWaveId, setActiveWaveId] = useState<PollingWaveId>('wave1');
  
  // Topic selection
  const [activeTopicId, setActiveTopicId] = useState<SentimentTopicId>('arena');
  
  // View mode: 'poll' (ballot view) or 'summary' (ballot completed review)
  const [viewMode, setViewMode] = useState<'poll' | 'summary'>('poll');

  // GLOBAL VOTER RESIDENCY (Single residence rule under Ontario Municipal Elections Act)
  const [declaredWard, setDeclaredWard] = useState<string>(''); // '' = undeclared, '1'-'12', or 'at-large'
  
  // User votes per topic: Record<SentimentTopicId, StoredVote>
  const [userVotes, setUserVotes] = useState<Partial<Record<SentimentTopicId, StoredVote>>>({});
  
  // Current active ballot choice on this topic
  const [ballotChoice, setBallotChoice] = useState<PolicyOptionId | null>(null);

  // Cloud Firestore live tallies synchronized across all visitors
  const [cloudTallies, setCloudTallies] = useState<Record<SentimentTopicId, LiveTopicVotes | null>>({
    arena: null,
    roads: null,
    housing: null,
    taxes: null
  });

  // UI status feedback
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [statusNotification, setStatusNotification] = useState<string | null>(null);

  // Administrative / Dev Mode Check:
  // Shows "Reset All to 0" if running in local development OR if accessed with an admin query parameter (e.g. ?admin=true or ?admin=sudbury2026)
  const isAdminMode = useMemo(() => {
    try {
      if (import.meta.env.DEV) return true;
      if (typeof window !== 'undefined') {
        const params = new URLSearchParams(window.location.search);
        return params.get('admin') === 'true' || params.get('admin') === 'sudbury2026';
      }
    } catch {
      return false;
    }
    return false;
  }, []);

  // 4 Top-level Topics configuration in order
  const topicTabs = useMemo(() => [
    { id: 'arena' as SentimentTopicId, label: 'Downtown Event Centre', shortTitle: 'Event Centre', icon: Building2 },
    { id: 'roads' as SentimentTopicId, label: 'Roads & Infrastructure', shortTitle: 'Roads & Infrastructure', icon: Construction },
    { id: 'housing' as SentimentTopicId, label: 'Homelessness & Addictions', shortTitle: 'Homelessness & Addictions', icon: HeartHandshake },
    { id: 'taxes' as SentimentTopicId, label: 'Property Taxes & Services', shortTitle: 'Taxes & Services', icon: Receipt },
  ], []);

  // Initialize Firestore listeners and load local storage
  useEffect(() => {
    testFirestoreConnection();

    // Subscribe to live cloud tallies for all 4 topics
    const topics: SentimentTopicId[] = ['arena', 'roads', 'housing', 'taxes'];
    const unsubs = topics.map(topicId => {
      return subscribeToTopicVotes(topicId, (liveVotes) => {
        setCloudTallies(prev => ({
          ...prev,
          [topicId]: liveVotes
        }));
      });
    });

    // Load global declared ward and votes from localStorage
    try {
      const savedWard = localStorage.getItem(STORAGE_WARD_KEY);
      if (savedWard) {
        setDeclaredWard(savedWard);
      }

      const savedVotes = localStorage.getItem(STORAGE_VOTES_KEY);
      if (savedVotes) {
        const parsed = JSON.parse(savedVotes);
        setUserVotes(parsed);
        // If user has already voted on all 4 topics, allow starting or reviewing summary
      }
    } catch {
      // Fallback gracefully
    }

    return () => {
      unsubs.forEach(unsub => unsub());
    };
  }, []);

  // Sync with Cloud Firestore voter ballot registry to verify locked votes
  useEffect(() => {
    const voterToken = getVoterToken();
    const topics: SentimentTopicId[] = ['arena', 'roads', 'housing', 'taxes'];

    topics.forEach(async (topicId) => {
      const result = await checkHasVotedInCloud(topicId, voterToken);
      if (result.hasVoted && result.choice) {
        setUserVotes(prev => {
          if (prev[topicId]) return prev;
          const updated = {
            ...prev,
            [topicId]: {
              choice: result.choice as PolicyOptionId,
              ward: declaredWard || 'general',
              timestamp: Date.now()
            }
          };
          try {
            localStorage.setItem(STORAGE_VOTES_KEY, JSON.stringify(updated));
          } catch {}
          return updated;
        });
      }
    });
  }, [declaredWard]);

  // When active topic changes or userVotes updates, sync the candidate selection
  useEffect(() => {
    const existing = userVotes[activeTopicId];
    if (existing) {
      setBallotChoice(existing.choice);
    } else {
      setBallotChoice(null);
    }
  }, [activeTopicId, userVotes]);

  // Current active wave object
  const currentWave = useMemo(() => {
    return POLLING_WAVES.find(w => w.id === activeWaveId) || POLLING_WAVES[0];
  }, [activeWaveId]);

  // Base topic data
  const baseTopicData = useMemo(() => {
    return INITIAL_SENTIMENT_TOPICS[activeTopicId];
  }, [activeTopicId]);

  // Check if voter has recorded a vote on this specific topic
  const existingVote = userVotes[activeTopicId];
  const hasVotedOnThisTopic = Boolean(existingVote);
  const isChoiceChanged = Boolean(existingVote && ballotChoice && ballotChoice !== existingVote.choice);

  // Computed tallies combining cloud Firestore tally or fallback base
  const computedTallies = useMemo(() => {
    const live = cloudTallies[activeTopicId];
    if (live) {
      return {
        A: live.votesA,
        B: live.votesB,
        C: live.votesC,
        D: live.votesD,
        total: live.totalVotes
      };
    }
    const cw = baseTopicData.cityWide;
    return { A: cw.A, B: cw.B, C: cw.C, D: cw.D, total: cw.total };
  }, [baseTopicData, activeTopicId, cloudTallies]);

  // Topic sequence navigation logic
  const currentTopicIndex = topicTabs.findIndex(t => t.id === activeTopicId);
  const isLastTopic = currentTopicIndex === topicTabs.length - 1;
  const isFirstTopic = currentTopicIndex === 0;
  const nextTopic = !isLastTopic ? topicTabs[currentTopicIndex + 1] : null;
  const prevTopic = !isFirstTopic ? topicTabs[currentTopicIndex - 1] : null;

  // Total topics completed
  const completedTopicsCount = topicTabs.filter(t => Boolean(userVotes[t.id])).length;
  const allTopicsCompleted = completedTopicsCount === topicTabs.length;

  // Aggregate total ballots recorded across all topics
  const totalBallotsAcrossAllTopics = useMemo(() => {
    return topicTabs.reduce((acc, tab) => {
      const live = cloudTallies[tab.id];
      return acc + (live?.totalVotes || 0);
    }, 0);
  }, [topicTabs, cloudTallies]);

  // Handle ballot submission or update: records in Firestore and advances seamlessly
  const handleBallotSubmit = async () => {
    if (!ballotChoice || isSubmitting) return;

    // If already voted and choice hasn't changed, simply advance
    if (hasVotedOnThisTopic && !isChoiceChanged) {
      if (nextTopic) {
        setActiveTopicId(nextTopic.id);
      } else {
        setViewMode('summary');
      }
      return;
    }

    setIsSubmitting(true);

    try {
      const priorChoice = existingVote?.choice;
      const result = await castOrUpdateBallot(
        activeTopicId, 
        ballotChoice, 
        declaredWard || 'general',
        priorChoice
      );

      // Save record locally as well to instantly update UI
      const updatedRecord: StoredVote = {
        choice: ballotChoice,
        ward: declaredWard || 'general',
        timestamp: Date.now()
      };

      const updatedVotes = {
        ...userVotes,
        [activeTopicId]: updatedRecord
      };

      setUserVotes(updatedVotes);
      try {
        localStorage.setItem(STORAGE_VOTES_KEY, JSON.stringify(updatedVotes));
      } catch {}

      if (result.isUpdate) {
        setStatusNotification("Your vote was updated successfully.");
      } else {
        setStatusNotification("Vote registered!");
      }

      // Seamlessly advance to the next topic or summary view
      setTimeout(() => {
        if (nextTopic) {
          setActiveTopicId(nextTopic.id);
        } else {
          // Final topic completed: show ballot completion summary
          setViewMode('summary');
        }
      }, 350);

    } catch (err) {
      console.error("Ballot error:", err);
      // Fallback locally
      const updatedRecord: StoredVote = {
        choice: ballotChoice,
        ward: declaredWard || 'general',
        timestamp: Date.now()
      };
      const updatedVotes = { ...userVotes, [activeTopicId]: updatedRecord };
      setUserVotes(updatedVotes);
      try {
        localStorage.setItem(STORAGE_VOTES_KEY, JSON.stringify(updatedVotes));
      } catch {}

      setTimeout(() => {
        if (nextTopic) {
          setActiveTopicId(nextTopic.id);
        } else {
          setViewMode('summary');
        }
      }, 350);
    } finally {
      setIsSubmitting(false);
      setTimeout(() => setStatusNotification(null), 4000);
    }
  };

  // Reset all votes to zero across both Cloud Firestore and local storage
  const [isResetting, setIsResetting] = useState(false);
  const handleResetAllVotesToZero = async () => {
    setIsResetting(true);
    try {
      // 1. Reset Cloud Firestore topic tallies to 0
      await resetAllTopicsToZero();
      
      // 2. Clear local browser voting state & voter identification
      clearVoterToken();
      setUserVotes({});
      setBallotChoice(null);
      setActiveTopicId('arena');
      setViewMode('poll');
      try {
        localStorage.removeItem(STORAGE_VOTES_KEY);
      } catch {}

      // 3. Reset local cloud tallies state immediately
      setCloudTallies({
        arena: { totalVotes: 0, votesA: 0, votesB: 0, votesC: 0, votesD: 0 },
        roads: { totalVotes: 0, votesA: 0, votesB: 0, votesC: 0, votesD: 0 },
        housing: { totalVotes: 0, votesA: 0, votesB: 0, votesC: 0, votesD: 0 },
        taxes: { totalVotes: 0, votesA: 0, votesB: 0, votesC: 0, votesD: 0 }
      });

      setStatusNotification("All votes have been reset to zero. Ready for fresh test.");
    } catch (err) {
      console.error("Failed to reset votes:", err);
      setStatusNotification("Failed to reset votes. Please try again.");
    } finally {
      setIsResetting(false);
      setTimeout(() => setStatusNotification(null), 5000);
    }
  };

  // Button state & dynamic label
  const canSubmit = Boolean(ballotChoice && !isSubmitting);
  const buttonLabel = useMemo(() => {
    if (isSubmitting) return 'Recording Vote...';
    if (!ballotChoice) return 'Select an Option Above';
    if (isChoiceChanged) {
      return nextTopic ? 'Update Vote & Continue →' : 'Update Vote & View Summary ✓';
    }
    if (hasVotedOnThisTopic) {
      return nextTopic ? 'Continue to Next Topic →' : 'View Ballot Summary ✓';
    }
    return nextTopic ? 'Cast Vote & Continue to Next Topic →' : 'Cast Final Vote & Review Summary ✓';
  }, [isSubmitting, ballotChoice, isChoiceChanged, hasVotedOnThisTopic, nextTopic]);

  return (
    <div id="community-sentiment-stage" className="space-y-6">
      {/* Wave / Campaign Period Navigation Strip */}
      <div className="bg-slate-900/90 border border-slate-800 rounded-3xl p-4 sm:p-5 shadow-xl space-y-3">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 border-b border-slate-800 pb-3">
          <div className="flex items-center gap-2.5">
            <Calendar className="w-4 h-4 text-emerald-400" />
            <span className="text-xs font-mono uppercase tracking-widest text-slate-400 font-bold">
              Campaign Polling Waves:
            </span>
          </div>

          <div className="flex flex-wrap items-center gap-3 text-xs font-mono text-slate-400">
            <span>Today: <strong className="text-white font-semibold">Sept 10, 2026</strong></span>
            <span className="text-slate-600">•</span>
            <span className="text-emerald-400 flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              Active Window: Wave 1
            </span>
            {isAdminMode && (
              <>
                <span className="text-slate-600">•</span>
                <button
                  type="button"
                  id="reset-all-votes-btn"
                  onClick={handleResetAllVotesToZero}
                  disabled={isResetting}
                  className="text-amber-400/80 hover:text-amber-300 transition-colors flex items-center gap-1 cursor-pointer disabled:opacity-50 font-mono text-[11px] bg-amber-500/10 px-2 py-0.5 rounded border border-amber-500/30"
                  title="Admin/Dev Tool: Reset all topic tallies and ballots to zero"
                >
                  <RotateCcw className={`w-3 h-3 ${isResetting ? 'animate-spin' : ''}`} />
                  <span>{isResetting ? 'Resetting...' : 'Admin: Reset All to 0'}</span>
                </button>
              </>
            )}
          </div>
        </div>

        {/* 3 Campaign Waves Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-2.5">
          {POLLING_WAVES.map(wave => {
            const isSelected = activeWaveId === wave.id;
            const isActive = wave.status === 'active';

            return (
              <button
                key={wave.id}
                onClick={() => setActiveWaveId(wave.id)}
                className={`p-3.5 rounded-2xl border text-left transition-all relative ${
                  isSelected
                    ? 'bg-slate-800 border-emerald-500 shadow-md ring-1 ring-emerald-500/40 text-white'
                    : 'bg-slate-950/60 border-slate-800/80 hover:bg-slate-800/40 text-slate-400 hover:text-slate-200'
                }`}
              >
                <div className="flex items-center justify-between gap-2 mb-1.5">
                  <span className="text-xs font-bold text-slate-200">{wave.shortLabel}</span>
                  <span className={`text-[10px] font-mono px-2 py-0.5 rounded-full font-semibold border ${
                    isActive
                      ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40 animate-pulse'
                      : 'bg-amber-500/10 text-amber-400 border-amber-500/30'
                  }`}>
                    {wave.badge}
                  </span>
                </div>
                <div className="text-[11px] font-mono text-slate-400">{wave.dateRange}</div>
                <div className="text-[11px] text-slate-400 mt-1.5 line-clamp-2 leading-relaxed">{wave.description}</div>
              </button>
            );
          })}
        </div>

        {/* Upcoming Wave Notice */}
        {activeWaveId !== 'wave1' && (
          <div className="p-3.5 rounded-xl bg-amber-500/10 border border-amber-500/30 text-xs text-amber-200 flex items-center gap-2.5 font-mono">
            <Calendar className="w-4 h-4 text-amber-400 shrink-0" />
            <span>
              <strong>{currentWave.title}:</strong> Opens on {currentWave.dateRange.split('–')[0]?.trim()} to record community stances during this phase of the municipal campaign.
            </span>
          </div>
        )}
      </div>

      {/* GUIDED VOTING PROGRESS STEPPER */}
      <div className="bg-slate-900/90 border border-slate-800 rounded-3xl p-5 shadow-xl space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <Vote className="w-4 h-4 text-emerald-400" />
            <span className="text-xs font-mono font-bold uppercase tracking-wider text-slate-300">
              Civic Ballot Progress:
            </span>
            <span className="text-xs font-mono font-semibold text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded-full border border-emerald-500/20">
              {completedTopicsCount} of {topicTabs.length} Topics Voted
            </span>
          </div>

          <div className="flex items-center gap-2 text-xs font-mono">
            {allTopicsCompleted && (
              <button
                type="button"
                onClick={() => setViewMode(viewMode === 'summary' ? 'poll' : 'summary')}
                className="px-3 py-1 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white border border-slate-700 flex items-center gap-1.5 cursor-pointer transition-colors"
              >
                {viewMode === 'summary' ? (
                  <>
                    <Vote className="w-3.5 h-3.5 text-emerald-400" />
                    <span>Back to Ballot</span>
                  </>
                ) : (
                  <>
                    <BarChart3 className="w-3.5 h-3.5 text-emerald-400" />
                    <span>View Ballot Summary</span>
                  </>
                )}
              </button>
            )}
          </div>
        </div>

        {/* 4-Step Visual Stepper */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
          {topicTabs.map((tab, idx) => {
            const Icon = tab.icon;
            const isCurrent = activeTopicId === tab.id && viewMode === 'poll';
            const hasVoted = Boolean(userVotes[tab.id]);
            const voteRecord = userVotes[tab.id];

            return (
              <button
                key={tab.id}
                id={`stepper-step-${tab.id}`}
                onClick={() => {
                  setActiveTopicId(tab.id);
                  setViewMode('poll');
                }}
                className={`relative flex items-center justify-between p-3.5 rounded-2xl border text-left transition-all duration-200 cursor-pointer ${
                  isCurrent
                    ? 'bg-slate-800/95 border-emerald-500 shadow-md shadow-emerald-500/10 text-white ring-2 ring-emerald-500/40'
                    : hasVoted
                    ? 'bg-slate-950/70 border-emerald-900/50 hover:border-emerald-700/60 text-slate-300'
                    : 'bg-slate-950/50 border-slate-800/80 hover:border-slate-700 hover:bg-slate-850 text-slate-400 hover:text-slate-200'
                }`}
              >
                <div className="flex items-center gap-3">
                  <div className={`w-8 h-8 rounded-xl flex items-center justify-center font-mono text-xs font-bold shrink-0 transition-colors ${
                    isCurrent
                      ? 'bg-emerald-500 text-slate-950 shadow-sm'
                      : hasVoted
                      ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
                      : 'bg-slate-800 text-slate-400 border border-slate-700'
                  }`}>
                    {hasVoted ? <CheckCircle2 className="w-4 h-4 text-emerald-400" /> : idx + 1}
                  </div>
                  <div>
                    <div className="text-xs font-mono text-slate-400">Step {idx + 1} of 4</div>
                    <div className={`text-sm font-bold leading-snug ${isCurrent ? 'text-white' : 'text-slate-200'}`}>
                      {tab.shortTitle}
                    </div>
                  </div>
                </div>

                {hasVoted && (
                  <span className="shrink-0 px-2 py-0.5 rounded-full bg-emerald-500/15 border border-emerald-500/30 text-emerald-400 text-[10px] font-mono font-bold">
                    Opt {voteRecord?.choice}
                  </span>
                )}
              </button>
            );
          })}
        </div>
      </div>

      {/* Global Status Notification */}
      {statusNotification && (
        <div className="p-4 rounded-2xl bg-emerald-500/15 border border-emerald-500/40 text-emerald-300 text-sm flex items-center justify-between shadow-lg animate-in fade-in duration-300">
          <div className="flex items-center gap-2.5">
            <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
            <span>{statusNotification}</span>
          </div>
          <button 
            onClick={() => setStatusNotification(null)}
            className="text-xs text-emerald-400 hover:text-white underline font-mono ml-4"
          >
            Dismiss
          </button>
        </div>
      )}

      {/* VIEW MODE A: BALLOT SUMMARY (When all topics are completed or user clicks review) */}
      {viewMode === 'summary' ? (
        <div className="bg-slate-900/90 border border-slate-800 rounded-3xl p-6 sm:p-8 shadow-xl space-y-6 animate-in fade-in duration-300">
          <div className="border-b border-slate-800 pb-5">
            <div>
              <span className="text-xs font-mono font-semibold uppercase tracking-wider text-emerald-400 flex items-center gap-2">
                <Sparkles className="w-3.5 h-3.5" />
                <span>Civic Stance Summary</span>
                <span className="text-slate-600">•</span>
                <span className="text-slate-400">{currentWave.shortLabel}</span>
              </span>
              <h3 className="text-2xl font-black text-white tracking-tight mt-1">
                Your 2026 Greater Sudbury Community Ballot
              </h3>
              <p className="text-sm text-slate-400 mt-1">
                You have recorded choices on all {topicTabs.length} civic policy priorities. You can review your stances or update any choice at any time during this polling wave.
              </p>
            </div>
          </div>

          {/* LIVE BALLOT COUNT & COMMUNITY STATUS (SUMMARY VIEW) */}
          <div className="p-3.5 bg-slate-950/60 border border-slate-800 rounded-xl text-xs font-mono text-slate-400 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
            <div className="flex items-center gap-2">
              <span className={`w-2 h-2 rounded-full shrink-0 ${totalBallotsAcrossAllTopics > 0 ? 'bg-emerald-400 animate-pulse' : 'bg-amber-400'}`} />
              <span>
                {totalBallotsAcrossAllTopics > 0
                  ? 'Live Community Returns Active • Verified resident sentiment across all priorities'
                  : 'Community Poll Is Open • Initial ballots are recording in real time'}
              </span>
            </div>
            <div className="flex items-center gap-1.5 self-start sm:self-auto shrink-0">
              <span className="text-slate-500 font-normal">Total Recorded Ballots:</span>
              <span className={`font-bold font-mono ${totalBallotsAcrossAllTopics > 0 ? 'text-emerald-400' : 'text-slate-400'}`}>
                {totalBallotsAcrossAllTopics.toLocaleString()} {totalBallotsAcrossAllTopics === 1 ? 'ballot' : 'ballots'}
              </span>
            </div>
          </div>

          {/* Grid of 4 Topics and the voter's recorded choice */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {topicTabs.map((tab, idx) => {
              const topicData = INITIAL_SENTIMENT_TOPICS[tab.id];
              const vote = userVotes[tab.id];
              const chosenOption = topicData.options.find(o => o.id === vote?.choice);
              const live = cloudTallies[tab.id];
              const totalVotes = live?.totalVotes || 0;
              const optionVotes = vote ? (live ? (live as any)[`votes${vote.choice}`] || 0 : 0) : 0;
              const optionPct = totalVotes > 0 ? (optionVotes / totalVotes) * 100 : 0;

              return (
                <div 
                  key={tab.id}
                  className="p-5 rounded-2xl bg-slate-950/60 border border-slate-800 space-y-4 flex flex-col justify-between"
                >
                  <div className="space-y-2">
                    <div className="flex items-center justify-between gap-2">
                      <span className="text-xs font-mono text-slate-400 font-semibold uppercase">
                        Question {idx + 1}: {tab.label}
                      </span>
                      <button
                        type="button"
                        onClick={() => {
                          setActiveTopicId(tab.id);
                          setViewMode('poll');
                        }}
                        className="text-xs text-emerald-400 hover:text-emerald-300 font-mono flex items-center gap-1 cursor-pointer transition-colors"
                      >
                        <Edit3 className="w-3 h-3" />
                        <span>Change Answer</span>
                      </button>
                    </div>

                    <h4 className="text-sm font-bold text-white leading-snug">
                      {topicData.title}
                    </h4>

                    {chosenOption ? (
                      <div className="p-3.5 rounded-xl bg-slate-900 border border-emerald-500/40 text-slate-200 text-xs space-y-1.5">
                        <div className="flex items-center justify-between text-emerald-400 font-mono font-bold">
                          <span>Your Stance: {chosenOption.label}</span>
                          <span className="text-[10px] px-2 py-0.5 rounded-full bg-emerald-500/20 border border-emerald-500/30">
                            Recorded
                          </span>
                        </div>
                        <p className="leading-relaxed text-slate-300">
                          {chosenOption.text}
                        </p>
                      </div>
                    ) : (
                      <div className="p-3.5 rounded-xl bg-slate-900/60 border border-amber-500/30 text-amber-300 text-xs">
                        No vote recorded yet. Click Change Answer to cast your ballot.
                      </div>
                    )}
                  </div>

                  {/* Live community distribution progress bar matching the ballot */}
                  <div className="pt-3.5 border-t border-slate-800/80 space-y-2">
                    <div className="flex items-center justify-between text-xs font-mono">
                      <span className="text-slate-400">Community Alignment</span>
                      <div className="flex items-center gap-1.5">
                        <span className="text-emerald-400 font-bold">{optionPct.toFixed(1)}%</span>
                        <span className="text-slate-500 font-normal">
                          ({optionVotes.toLocaleString()} of {totalVotes.toLocaleString()} {totalVotes === 1 ? 'vote' : 'votes'})
                        </span>
                      </div>
                    </div>

                    <div className="h-2 w-full bg-slate-800/80 rounded-full overflow-hidden">
                      <div
                        style={{ width: `${optionPct}%` }}
                        className="h-full rounded-full bg-emerald-400 shadow-sm shadow-emerald-400/50 transition-all duration-700 ease-out"
                      />
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      ) : (
        /* VIEW MODE B: ACTIVE BALLOT QUESTION */
        <div className="bg-slate-900/90 border border-slate-800 rounded-3xl p-6 sm:p-8 shadow-xl space-y-6 animate-in fade-in duration-300">
          {/* Topic Context Header with calibrated min-h to ensure Topics 1, 2, 3, and 4 are identical in height */}
          <div className="border-b border-slate-800 pb-5 space-y-2 min-h-[148px] sm:min-h-[132px] flex flex-col justify-start">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
              <div>
                <span className="text-xs font-mono font-semibold uppercase tracking-wider text-emerald-400 flex items-center gap-2">
                  <span>Question {currentTopicIndex + 1} of {topicTabs.length}</span>
                  <span className="text-slate-600">•</span>
                  <span className="text-slate-400">{currentWave.shortLabel}</span>
                  {hasVotedOnThisTopic && (
                    <>
                      <span className="text-slate-600">•</span>
                      <span className="text-emerald-300 flex items-center gap-1">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                        Ballot Recorded (Click another option to update)
                      </span>
                    </>
                  )}
                </span>
                <h3 className="text-xl sm:text-2xl font-black text-white tracking-tight mt-1 min-h-[32px] sm:min-h-[36px] flex items-center">
                  {baseTopicData.title}
                </h3>
              </div>
            </div>
            <p className="text-sm text-slate-300 max-w-3xl leading-relaxed min-h-[44px] sm:min-h-[40px] flex items-start">
              {baseTopicData.context}
            </p>
          </div>

          {/* IN-BALLOT POLICY OPTIONS WITH EMBEDDED LIVE COMMUNITY RETURNS */}
          <div className="space-y-3.5">
            <div className="text-xs font-mono uppercase tracking-wider text-slate-400 font-bold flex flex-wrap items-center justify-between gap-2 min-h-[28px]">
              <span>Choose Your Policy Stance:</span>
              {hasVotedOnThisTopic && (
                <span className="text-emerald-400 font-semibold flex items-center gap-1.5 bg-emerald-500/10 px-2.5 py-1 rounded-full border border-emerald-500/30">
                  <Vote className="w-3.5 h-3.5 text-emerald-400" />
                  Current Stance: Option {existingVote?.choice}
                </span>
              )}
            </div>

            {/* LIVE BALLOT COUNT & COMMUNITY STATUS */}
            <div className="p-3 bg-slate-950/60 border border-slate-800 rounded-xl text-xs font-mono text-slate-400 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
              <div className="flex items-center gap-2">
                <span className={`w-2 h-2 rounded-full shrink-0 ${computedTallies.total > 0 ? 'bg-emerald-400 animate-pulse' : 'bg-amber-400'}`} />
                <span>
                  {computedTallies.total > 0
                    ? 'Live Community Returns Active • Verified resident sentiment updated in real time'
                    : 'Community Poll Is Open • Cast your vote below to establish the first returns'}
                </span>
              </div>
              <div className="flex items-center gap-1.5 self-start sm:self-auto shrink-0">
                <span className="text-slate-500 font-normal">Recorded:</span>
                <span className={`font-bold font-mono ${computedTallies.total > 0 ? 'text-emerald-400' : 'text-slate-400'}`}>
                  {computedTallies.total.toLocaleString()} {computedTallies.total === 1 ? 'ballot' : 'ballots'}
                </span>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
              {baseTopicData.options.map(option => {
                const isSelectedChoice = ballotChoice === option.id;
                const isRecordedVote = existingVote?.choice === option.id;
                const count = computedTallies[option.id];
                const pct = computedTallies.total > 0 ? (count / computedTallies.total) * 100 : 0;

                return (
                  <div
                    key={option.id}
                    onClick={() => {
                      if (activeWaveId === 'wave1') {
                        setBallotChoice(option.id);
                      }
                    }}
                    className={`relative p-5 rounded-2xl border transition-all duration-200 flex flex-col justify-between gap-4 cursor-pointer min-h-[164px] sm:min-h-[156px] ${
                      isSelectedChoice
                        ? 'bg-slate-800/95 border-emerald-500 ring-2 ring-emerald-500/40 shadow-lg text-white'
                        : isRecordedVote
                        ? 'bg-slate-850 border-emerald-800/60 text-slate-200'
                        : 'bg-slate-950/60 border-slate-800/90 hover:border-slate-700 hover:bg-slate-800/40 text-slate-300'
                    }`}
                  >
                    {/* Option Choice Row */}
                    <div className="flex items-start gap-3.5">
                      {/* Radio Indicator */}
                      <div className={`w-5 h-5 rounded-full border flex items-center justify-center shrink-0 mt-0.5 transition-colors ${
                        isSelectedChoice 
                          ? 'border-emerald-500 bg-emerald-500 text-slate-950' 
                          : 'border-slate-600 bg-slate-800'
                      }`}>
                        {isSelectedChoice && <div className="w-2 h-2 rounded-full bg-slate-950" />}
                      </div>

                      <div className="space-y-1.5 flex-1">
                        <div className="flex items-center justify-between gap-2">
                          <span className="text-xs font-mono font-bold uppercase tracking-wider text-emerald-400">
                            {option.label}
                          </span>

                          {isRecordedVote && (
                            <span className="px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 text-[10px] font-mono font-semibold border border-emerald-500/30 flex items-center gap-1">
                              <CheckCircle2 className="w-3 h-3 text-emerald-400" />
                              Your Recorded Stance
                            </span>
                          )}
                        </div>

                        <p className="text-sm font-medium leading-relaxed min-h-[52px] sm:min-h-[48px] flex items-start">
                          {option.text}
                        </p>
                      </div>
                    </div>

                    {/* EMBEDDED LIVE RESULTS BAR */}
                    <div className="pt-2 border-t border-slate-800/80 space-y-1.5">
                      <div className="flex items-center justify-between text-xs font-mono">
                        <span className="text-slate-400">Community Consensus</span>
                        <div className="flex items-center gap-1.5">
                          <span className="text-white font-bold">{pct.toFixed(1)}%</span>
                          <span className="text-slate-500">({count.toLocaleString()} votes)</span>
                        </div>
                      </div>

                      <div className="h-2 w-full bg-slate-800/80 rounded-full overflow-hidden">
                        <div
                          style={{ width: `${pct}%` }}
                          className={`h-full rounded-full transition-all duration-700 ${
                            isSelectedChoice || isRecordedVote 
                              ? 'bg-emerald-400 shadow-sm shadow-emerald-400/50' 
                              : 'bg-slate-400'
                          }`}
                        />
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Bottom Actions Bar with Guided Forward Momentum */}
          <div className="pt-4 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-3">
            <div className="flex items-center gap-2 text-xs font-mono text-slate-400 order-2 sm:order-1">
              {prevTopic && (
                <button
                  type="button"
                  id="prev-topic-btn"
                  onClick={() => {
                    setActiveTopicId(prevTopic.id);
                    setStatusNotification(null);
                  }}
                  className="px-3.5 py-2 rounded-xl bg-slate-950/60 hover:bg-slate-800 text-slate-400 hover:text-white border border-slate-800 flex items-center gap-1.5 transition-colors cursor-pointer"
                >
                  <ArrowLeft className="w-3.5 h-3.5" />
                  <span>Previous Question</span>
                </button>
              )}
              <span>Question {currentTopicIndex + 1} of 4</span>
            </div>

            <div className="flex items-center gap-3 w-full sm:w-auto order-1 sm:order-2">
              <button
                type="button"
                id="submit-ballot-btn"
                onClick={handleBallotSubmit}
                disabled={!canSubmit}
                className={`w-full sm:w-auto px-6 py-3 rounded-xl font-bold text-sm font-mono flex items-center justify-center gap-2 transition-all duration-200 shadow-md ${
                  canSubmit
                    ? 'bg-emerald-500 hover:bg-emerald-400 text-slate-950 shadow-emerald-500/20 active:scale-[0.98] cursor-pointer'
                    : 'bg-slate-800 text-slate-500 cursor-not-allowed border border-slate-700'
                }`}
              >
                {isSubmitting ? (
                  <>
                    <span className="w-4 h-4 border-2 border-slate-950 border-t-transparent rounded-full animate-spin" />
                    <span>{buttonLabel}</span>
                  </>
                ) : (
                  <>
                    <Vote className="w-4 h-4" />
                    <span>{buttonLabel}</span>
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Notice & Ethics Footer */}
      <div className="p-4 rounded-2xl bg-slate-950/60 border border-slate-800/80 text-xs text-slate-400 flex items-start gap-2.5 font-mono">
        <Info className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
        <p>
          <strong className="text-slate-300">Civic Notice:</strong> Sudbury Votes Community Sentiment Polls reflect voluntary participation by local community visitors. They provide non-scientific insights into public priorities, tracking community alignment across candidate platform releases, debates, and voting milestones throughout the 2026 Greater Sudbury Municipal Election.
        </p>
      </div>
    </div>
  );
};

export default CommunitySentimentView;

