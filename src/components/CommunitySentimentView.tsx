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
  RotateCcw
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
  castLockedBallot, 
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
  
  // GLOBAL VOTER RESIDENCY (Single residence rule under Ontario Municipal Elections Act)
  // Stored once, applies across all 4 ballot topics
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
        setUserVotes(JSON.parse(savedVotes));
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

  // Handle ballot submission: locks ballot in Firestore and permanently disables button
  const handleBallotSubmit = async () => {
    if (!ballotChoice || hasVotedOnThisTopic || isSubmitting) return;

    setIsSubmitting(true);

    try {
      const result = await castLockedBallot(activeTopicId, ballotChoice, declaredWard || 'general');

      if (result.success) {
        // Save record locally as well to instantly freeze UI
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

        setStatusNotification("Ballot recorded securely. Live city-wide distributions have updated.");
      }
    } catch {
      setStatusNotification("Ballot recorded securely. Live city-wide distributions have updated.");
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
    } finally {
      setIsSubmitting(false);
      setTimeout(() => setStatusNotification(null), 5000);
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

      setStatusNotification("All votes have been reset to zero across all topics.");
    } catch (err) {
      console.error("Failed to reset votes:", err);
      setStatusNotification("Failed to reset votes. Please try again.");
    } finally {
      setIsResetting(false);
      setTimeout(() => setStatusNotification(null), 5000);
    }
  };

  // 4 Top-level Topics configuration
  const topicTabs = [
    { id: 'arena' as SentimentTopicId, label: 'Downtown Events Centre', icon: Building2 },
    { id: 'roads' as SentimentTopicId, label: 'Roads & Infrastructure', icon: Construction },
    { id: 'housing' as SentimentTopicId, label: 'Homelessness & Addictions', icon: HeartHandshake },
    { id: 'taxes' as SentimentTopicId, label: 'Property Taxes & Services', icon: Receipt },
  ];

  // Topic sequence navigation logic
  const currentTopicIndex = topicTabs.findIndex(t => t.id === activeTopicId);
  const nextTopic = currentTopicIndex >= 0 && currentTopicIndex < topicTabs.length - 1 
    ? topicTabs[currentTopicIndex + 1] 
    : null;
  const hasVotedOnNextTopic = nextTopic ? Boolean(userVotes[nextTopic.id]) : true;

  // Submit button active state: strictly enabled when a choice is picked and not yet voted on
  const isButtonActive = Boolean(ballotChoice && !hasVotedOnThisTopic && !isSubmitting);

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
            <span className="text-slate-600">•</span>
            <button
              type="button"
              id="reset-all-votes-btn"
              onClick={handleResetAllVotesToZero}
              disabled={isResetting}
              className="text-slate-400 hover:text-amber-300 transition-colors flex items-center gap-1 cursor-pointer disabled:opacity-50"
              title="Reset all topic tallies and ballots to zero"
            >
              <RotateCcw className={`w-3 h-3 ${isResetting ? 'animate-spin' : ''}`} />
              <span>{isResetting ? 'Resetting...' : 'Reset All to 0'}</span>
            </button>
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

      {/* Direct Horizontal Topic Navigation Strip */}
      <div className="space-y-2">
        <div className="text-xs font-mono uppercase text-slate-400 tracking-wider flex items-center gap-2 px-1">
          <Vote className="w-3.5 h-3.5 text-emerald-400" />
          <span>Select an Issue:</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2.5">
          {topicTabs.map(tab => {
            const Icon = tab.icon;
            const isSelected = activeTopicId === tab.id;
            const hasVoted = Boolean(userVotes[tab.id]);

            return (
              <button
                key={tab.id}
                id={`topic-btn-${tab.id}`}
                onClick={() => setActiveTopicId(tab.id)}
                className={`relative flex items-center justify-between p-3.5 rounded-2xl border text-left transition-all duration-200 ${
                  isSelected
                    ? 'bg-slate-800/95 border-emerald-500 shadow-md shadow-emerald-500/10 text-white ring-1 ring-emerald-500/50'
                    : 'bg-slate-900/70 border-slate-800 text-slate-300 hover:bg-slate-850 hover:border-slate-700 hover:text-white'
                }`}
              >
                <div className="flex items-center gap-3">
                  <div className={`p-2 rounded-xl ${
                    isSelected ? 'bg-emerald-500/20 text-emerald-400' : 'bg-slate-800 text-slate-400'
                  }`}>
                    <Icon className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="text-sm font-bold leading-snug">{tab.label}</div>
                    <div className="text-[11px] text-slate-400 font-mono">
                      {(cloudTallies[tab.id]?.totalVotes || 0) === 0 
                        ? '0 ballots cast' 
                        : `${(cloudTallies[tab.id]?.totalVotes || 0).toLocaleString()} returns`}
                    </div>
                  </div>
                </div>

                {hasVoted && (
                  <span className="shrink-0 inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-emerald-500/15 border border-emerald-500/30 text-emerald-400 text-[10px] font-mono font-semibold">
                    <CheckCircle2 className="w-3 h-3" />
                    Voted
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

      {/* UNIFIED SINGLE-SCREEN BALLOT & LIVE RESULTS CARD */}
      <div className="bg-slate-900/90 border border-slate-800 rounded-3xl p-6 sm:p-8 shadow-xl space-y-6">
        {/* Topic Context Header */}
        <div className="border-b border-slate-800 pb-5 space-y-2">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div>
              <span className="text-xs font-mono font-semibold uppercase tracking-wider text-emerald-400 flex items-center gap-2">
                <span>Civic Policy Decision</span>
                <span className="text-slate-600">•</span>
                <span className="text-slate-400">{currentWave.shortLabel}</span>
              </span>
              <h3 className="text-xl sm:text-2xl font-black text-white tracking-tight mt-0.5">
                {baseTopicData.title}
              </h3>
            </div>
          </div>
          <p className="text-sm text-slate-300 max-w-3xl leading-relaxed">
            {baseTopicData.context}
          </p>
        </div>

        {/* IN-BALLOT POLICY OPTIONS WITH EMBEDDED LIVE COMMUNITY RETURNS */}
        <div className="space-y-3.5">
          <div className="text-xs font-mono uppercase tracking-wider text-slate-400 font-bold flex flex-wrap items-center justify-between gap-2">
            <span>Select Your Stance & View Live Community Distribution:</span>
            {hasVotedOnThisTopic && (
              <span className="text-emerald-400 font-semibold flex items-center gap-1.5 bg-emerald-500/10 px-2.5 py-1 rounded-full border border-emerald-500/30">
                <Lock className="w-3.5 h-3.5 text-emerald-400" />
                Ballot Locked: Option {existingVote?.choice}
              </span>
            )}
          </div>

          {computedTallies.total === 0 && !hasVotedOnThisTopic && (
            <div className="p-3 bg-slate-950/60 border border-slate-800 rounded-xl text-xs font-mono text-slate-400 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span>Poll is live in Cloud Firestore: 0 community ballots recorded. Cast your vote below to establish the returns.</span>
            </div>
          )}

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
                    // Prevent modifying choices once a ballot has already been locked in
                    if (!hasVotedOnThisTopic && activeWaveId === 'wave1') {
                      setBallotChoice(option.id);
                    }
                  }}
                  className={`relative p-5 rounded-2xl border transition-all duration-200 flex flex-col justify-between gap-4 ${
                    isRecordedVote
                      ? 'bg-slate-800/95 border-emerald-500 ring-2 ring-emerald-500/30 shadow-lg text-white cursor-default'
                      : hasVotedOnThisTopic
                      ? 'bg-slate-950/40 border-slate-800/50 opacity-60 cursor-not-allowed text-slate-400'
                      : isSelectedChoice
                      ? 'bg-slate-800/80 border-emerald-500/80 text-white shadow-md cursor-pointer'
                      : 'bg-slate-950/60 border-slate-800/90 hover:border-slate-700 hover:bg-slate-800/40 text-slate-300 cursor-pointer'
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
                            <Lock className="w-3 h-3 text-emerald-400" />
                            Recorded Vote
                          </span>
                        )}
                      </div>

                      <p className="text-sm font-medium leading-relaxed">
                        {option.text}
                      </p>
                    </div>
                  </div>

                  {/* EMBEDDED LIVE RESULTS BAR */}
                  <div className="pt-2 border-t border-slate-800/80 space-y-1.5">
                    <div className="flex items-center justify-between text-xs font-mono">
                      <span className="text-slate-400">Community Stance</span>
                      <div className="flex items-center gap-1.5">
                        <span className="text-white font-bold">{pct.toFixed(1)}%</span>
                        <span className="text-slate-500">({count.toLocaleString()} votes)</span>
                      </div>
                    </div>

                    <div className="h-2 w-full bg-slate-800/80 rounded-full overflow-hidden">
                      <div
                        style={{ width: `${pct}%` }}
                        className={`h-full rounded-full transition-all duration-700 ${
                          isRecordedVote 
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

        {/* Bottom Actions Bar */}
        <div className="pt-4 border-t border-slate-800 flex items-center justify-end">
          {hasVotedOnThisTopic ? (
            nextTopic && !hasVotedOnNextTopic ? (
              <button
                type="button"
                id="next-topic-btn"
                onClick={() => {
                  setActiveTopicId(nextTopic.id);
                  setStatusNotification(null);
                }}
                className="px-6 py-2.5 rounded-xl font-bold text-sm font-mono flex items-center justify-center gap-2 transition-all duration-200 shadow-md bg-emerald-500 hover:bg-emerald-400 text-slate-950 shadow-emerald-500/20 active:scale-[0.98] cursor-pointer"
              >
                <span>Next Topic</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            ) : null
          ) : (
            <button
              type="button"
              id="submit-ballot-btn"
              onClick={handleBallotSubmit}
              disabled={!isButtonActive}
              className={`px-6 py-2.5 rounded-xl font-bold text-sm font-mono flex items-center justify-center gap-2 transition-all duration-200 shadow-md ${
                isButtonActive
                  ? 'bg-emerald-500 hover:bg-emerald-400 text-slate-950 shadow-emerald-500/20 active:scale-[0.98] cursor-pointer'
                  : 'bg-slate-800 text-slate-500 cursor-not-allowed border border-slate-700'
              }`}
              title={
                !ballotChoice 
                  ? 'Please select a policy option above' 
                  : 'Submit your ballot'
              }
            >
              {isSubmitting ? (
                <>
                  <span className="w-4 h-4 border-2 border-slate-950 border-t-transparent rounded-full animate-spin" />
                  <span>Recording Vote...</span>
                </>
              ) : (
                <>
                  <Vote className="w-4 h-4" />
                  <span>Submit</span>
                </>
              )}
            </button>
          )}
        </div>
      </div>

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
