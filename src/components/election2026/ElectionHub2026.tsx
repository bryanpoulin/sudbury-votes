import React, { useState, useEffect } from 'react';
import { Election2026HubTab } from '../../types/election2026';
import { CandidateRegistry2026 } from './CandidateRegistry2026';
import { WardLocatorView2026 } from './WardLocatorView2026';
import { CandidateDebatesView2026 } from './CandidateDebatesView2026';
import { LiveResultsView2026 } from './LiveResultsView2026';
import { ExternalVoterGuideModal } from './ExternalVoterGuideModal';
import { 
  Users, 
  MapPin, 
  Tv,
  Radio, 
  Clock, 
  ExternalLink,
  Building2
} from 'lucide-react';

export const ElectionHub2026: React.FC = () => {
  const [hubTab, setHubTab] = useState<Election2026HubTab>('candidates');
  const [isVoterGuideModalOpen, setIsVoterGuideModalOpen] = useState<boolean>(false);
  const [selectedWardForCandidateView, setSelectedWardForCandidateView] = useState<number | null>(null);

  // Election Day check: October 26, 2026 00:00:00 EDT
  // Live results button & tab are hidden until election day arrives
  const [isElectionDayOrLater, setIsElectionDayOrLater] = useState<boolean>(() => {
    const electionDay = new Date('2026-10-26T00:00:00-04:00').getTime();
    const hasPreviewParam = typeof window !== 'undefined' && window.location.search.includes('preview_results=true');
    return Date.now() >= electionDay || hasPreviewParam;
  });

  // Countdown timer calculations towards Oct 26, 2026
  const [timeLeft, setTimeLeft] = useState<{
    days: number;
    hours: number;
    minutes: number;
    seconds: number;
  }>({ days: 65, hours: 14, minutes: 22, seconds: 40 });

  useEffect(() => {
    // Dynamic countdown timer & election day status update
    const targetDate = new Date('2026-10-26T10:00:00-04:00').getTime();
    const electionDayStart = new Date('2026-10-26T00:00:00-04:00').getTime();

    const updateTimer = () => {
      const now = new Date().getTime();
      const difference = targetDate - now;

      if (now >= electionDayStart) {
        setIsElectionDayOrLater(true);
      }

      if (difference > 0) {
        const days = Math.floor(difference / (1000 * 60 * 60 * 24));
        const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((difference % (1000 * 60)) / 1000);
        setTimeLeft({ days, hours, minutes, seconds });
      }
    };

    updateTimer();
    const interval = setInterval(updateTimer, 1000);
    return () => clearInterval(interval);
  }, []);

  const handleSelectWardFromLocator = (wardNum: number) => {
    setSelectedWardForCandidateView(wardNum);
    setHubTab('candidates');
  };

  return (
    <div className="space-y-6">
      {/* 2026 Hub Hero Banner & Countdown */}
      <div className="bg-gradient-to-br from-slate-900 via-slate-900/90 to-emerald-950/40 border border-emerald-500/30 rounded-3xl p-6 sm:p-8 shadow-2xl relative overflow-hidden">
        {/* Background glow accent */}
        <div className="absolute -right-12 -top-12 w-64 h-64 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none"></div>

        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 relative z-10">
          <div className="space-y-2 max-w-2xl">
            <div className="flex items-center gap-2">
              <span className="px-3 py-1 bg-emerald-500/20 border border-emerald-500/40 text-emerald-300 text-xs font-mono font-bold rounded-full flex items-center gap-1.5 uppercase tracking-wider">
                <Radio className="w-3.5 h-3.5 animate-pulse text-emerald-400 shrink-0" />
                Active Campaign Hub • 2026
              </span>
              <span className="text-xs text-slate-400 font-mono hidden sm:inline">
                Greater Sudbury Municipal Election
              </span>
            </div>

            <h2 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
              2026 Municipal Election Portal
            </h2>

            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              Your civic guide for the upcoming Greater Sudbury municipal election. Track certified candidates for Mayor and City Council (Wards 1–12), follow local campaign debates, locate your ward district, and access official City of Greater Sudbury voting instructions.
            </p>
          </div>

          {/* Countdown Clock Display */}
          <div className="bg-slate-950/80 border border-slate-700/80 rounded-2xl p-4 sm:p-5 flex flex-col items-center justify-center shrink-0 shadow-inner">
            <div className="flex items-center gap-1.5 text-[11px] font-mono uppercase tracking-widest text-emerald-400 font-bold mb-2">
              <Clock className="w-3.5 h-3.5" /> Countdown to Voting Day
            </div>
            <div className="grid grid-cols-4 gap-2 text-center font-mono">
              <div className="p-2 bg-slate-900 rounded-xl border border-slate-800 min-w-[52px]">
                <div className="text-lg sm:text-xl font-black text-white">{timeLeft.days}</div>
                <div className="text-[9px] uppercase tracking-wider text-slate-400">Days</div>
              </div>
              <div className="p-2 bg-slate-900 rounded-xl border border-slate-800 min-w-[52px]">
                <div className="text-lg sm:text-xl font-black text-white">{timeLeft.hours}</div>
                <div className="text-[9px] uppercase tracking-wider text-slate-400">Hours</div>
              </div>
              <div className="p-2 bg-slate-900 rounded-xl border border-slate-800 min-w-[52px]">
                <div className="text-lg sm:text-xl font-black text-white">{timeLeft.minutes}</div>
                <div className="text-[9px] uppercase tracking-wider text-slate-400">Mins</div>
              </div>
              <div className="p-2 bg-slate-900 rounded-xl border border-slate-800 min-w-[52px]">
                <div className="text-lg sm:text-xl font-black text-emerald-400">{timeLeft.seconds}</div>
                <div className="text-[9px] uppercase tracking-wider text-slate-400">Secs</div>
              </div>
            </div>
            <div className="text-[10px] text-slate-400 font-mono mt-2 text-center">
              Advance Online Polls Open: <span className="text-emerald-300 font-semibold">Oct 14, 2026</span>
            </div>
          </div>
        </div>

        {/* Quick Facts Strip */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-6 mt-6 border-t border-slate-800/80">
          <div className="p-3 bg-slate-950/50 rounded-2xl border border-slate-800/60">
            <div className="text-[10px] font-mono uppercase tracking-wider text-slate-400">Council Contests</div>
            <div className="text-base sm:text-lg font-bold text-white mt-0.5">13 Total Races</div>
            <div className="text-[11px] text-emerald-400 font-mono">1 Mayor + 12 Wards</div>
          </div>

          <div className="p-3 bg-slate-950/50 rounded-2xl border border-slate-800/60">
            <div className="text-[10px] font-mono uppercase tracking-wider text-slate-400">Certified Candidates</div>
            <div className="text-base sm:text-lg font-bold text-white mt-0.5">27+ Nominees</div>
            <div className="text-[11px] text-emerald-400 font-mono">100% Wards Contested</div>
          </div>

          <div className="p-3 bg-slate-950/50 rounded-2xl border border-slate-800/60">
            <div className="text-[10px] font-mono uppercase tracking-wider text-slate-400">Voting Window</div>
            <div className="text-base sm:text-lg font-bold text-white mt-0.5">Oct 14 – 26</div>
            <div className="text-[11px] text-emerald-400 font-mono">Online, Phone & In-Person</div>
          </div>

          <div className="p-3 bg-slate-950/50 rounded-2xl border border-slate-800/60">
            <div className="text-[10px] font-mono uppercase tracking-wider text-slate-400">Registered Electors</div>
            <div className="text-base sm:text-lg font-bold text-white mt-0.5">~115,000</div>
            <div className="text-[11px] text-emerald-400 font-mono">City-Wide Electorate</div>
          </div>
        </div>
      </div>

      {/* 2026 Hub Navigation Sub-Tabs + External Voter Guide Trigger */}
      <div className="bg-slate-900/60 p-1.5 rounded-2xl border border-slate-800 flex flex-wrap items-center gap-1.5 shadow-xl">
        <button
          onClick={() => {
            setSelectedWardForCandidateView(null);
            setHubTab('candidates');
          }}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-semibold transition-all ${
            hubTab === 'candidates'
              ? 'bg-emerald-500 text-slate-950 shadow-md shadow-emerald-500/25 font-bold'
              : 'text-slate-400 hover:text-white hover:bg-slate-800/60'
          }`}
        >
          <Users className="w-4 h-4" />
          <span>Candidate Lookup</span>
        </button>

        <button
          onClick={() => setHubTab('ward-locator')}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-semibold transition-all ${
            hubTab === 'ward-locator'
              ? 'bg-emerald-500 text-slate-950 shadow-md shadow-emerald-500/25 font-bold'
              : 'text-slate-400 hover:text-white hover:bg-slate-800/60'
          }`}
        >
          <MapPin className="w-4 h-4" />
          <span>Ward Locator</span>
        </button>

        <button
          onClick={() => setHubTab('debates')}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-semibold transition-all ${
            hubTab === 'debates'
              ? 'bg-emerald-500 text-slate-950 shadow-md shadow-emerald-500/25 font-bold'
              : 'text-slate-400 hover:text-white hover:bg-slate-800/60'
          }`}
        >
          <Tv className="w-4 h-4" />
          <span>Debate Calendar</span>
        </button>

        {/* External City Official Voter Information Trigger */}
        <button
          onClick={() => setIsVoterGuideModalOpen(true)}
          className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-semibold text-emerald-400 hover:text-emerald-300 hover:bg-emerald-500/10 border border-emerald-500/30 transition-all ml-auto sm:ml-0"
          title="Opens official City of Greater Sudbury Voter Information Page"
        >
          <Building2 className="w-4 h-4 text-emerald-400" />
          <span>Voter Guide</span>
          <ExternalLink className="w-3.5 h-3.5 opacity-80" />
        </button>

        {/* Live Results button: only displayed starting on Election Day (October 26, 2026) or via preview mode */}
        {isElectionDayOrLater && (
          <button
            onClick={() => setHubTab('live-results')}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-semibold transition-all sm:ml-auto ${
              hubTab === 'live-results'
                ? 'bg-red-500 text-white shadow-md shadow-red-500/25 font-bold'
                : 'text-red-400 hover:text-red-300 hover:bg-red-500/10 border border-red-500/30'
            }`}
          >
            <Radio className="w-3.5 h-3.5 animate-pulse" />
            <span>Live Results</span>
          </button>
        )}
      </div>

      {/* Active Sub-Tab View */}
      {hubTab === 'candidates' && (
        <CandidateRegistry2026 
          initialWardFilter={selectedWardForCandidateView}
        />
      )}
      {hubTab === 'ward-locator' && (
        <WardLocatorView2026 
          onSelectCandidateWard={handleSelectWardFromLocator}
          onOpenOfficialVoterGuide={() => setIsVoterGuideModalOpen(true)}
        />
      )}
      {hubTab === 'debates' && (
        <CandidateDebatesView2026 
          onOpenOfficialVoterGuide={() => setIsVoterGuideModalOpen(true)}
        />
      )}
      {hubTab === 'live-results' && isElectionDayOrLater && <LiveResultsView2026 />}

      {/* External City of Greater Sudbury Official Voter Guide Modal */}
      <ExternalVoterGuideModal
        isOpen={isVoterGuideModalOpen}
        onClose={() => setIsVoterGuideModalOpen(false)}
      />
    </div>
  );
};

