import React, { useState } from 'react';
import { Candidate2026 } from '../../types/election2026';
import { CANDIDATES_2026, WARD_LOOKUP_ENTRIES } from '../../data/electionData2026';
import { 
  UserCheck, 
  Search, 
  ExternalLink, 
  ShieldCheck, 
  Briefcase, 
  CheckCircle2, 
  Award, 
  MapPin, 
  Sparkles,
  Layers,
  Globe,
  Filter
} from 'lucide-react';

interface CandidateRegistry2026Props {
  onSelectWardForDetail?: (wardNumber: number) => void;
  initialWardFilter?: number | null;
}

export const CandidateRegistry2026: React.FC<CandidateRegistry2026Props> = ({
  onSelectWardForDetail,
  initialWardFilter
}) => {
  const [selectedRaceFilter, setSelectedRaceFilter] = useState<string>(
    initialWardFilter ? `ward-${initialWardFilter}` : 'all'
  );
  const [selectedStatusFilter, setSelectedStatusFilter] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedCandidateForModal, setSelectedCandidateForModal] = useState<Candidate2026 | null>(null);

  // Filter candidates
  const filteredCandidates = CANDIDATES_2026.filter((c) => {
    // Race filter
    if (selectedRaceFilter === 'mayoral' && c.race !== 'Mayoral') return false;
    if (selectedRaceFilter.startsWith('ward-')) {
      const wardNum = parseInt(selectedRaceFilter.replace('ward-', ''), 10);
      if (c.race !== wardNum) return false;
    }

    // Status filter
    if (selectedStatusFilter === 'incumbent' && c.status !== 'Incumbent') return false;
    if (selectedStatusFilter === 'challenger' && c.status !== 'Challenger' && c.status !== 'New Candidate') return false;

    // Search query
    if (searchQuery.trim() !== '') {
      const query = searchQuery.toLowerCase();
      const matchName = c.name.toLowerCase().includes(query);
      const matchBio = c.bio.toLowerCase().includes(query);
      const matchPillars = c.keyPillars.some((p) => p.toLowerCase().includes(query));
      const matchOccupation = c.occupation.toLowerCase().includes(query);
      const matchRace = (c.race === 'Mayoral' ? 'mayor mayoral' : `ward ${c.race}`).includes(query);
      if (!matchName && !matchBio && !matchPillars && !matchOccupation && !matchRace) return false;
    }

    return true;
  });

  // Group by race for structured view
  const mayoralCandidates = filteredCandidates.filter((c) => c.race === 'Mayoral');
  const wardCandidatesByNumber: Record<number, Candidate2026[]> = {};

  for (let i = 1; i <= 12; i++) {
    const list = filteredCandidates.filter((c) => c.race === i);
    if (list.length > 0) {
      wardCandidatesByNumber[i] = list;
    }
  }

  return (
    <div className="space-y-6">
      {/* Filter & Search Bar */}
      <div className="bg-slate-900/70 border border-slate-800 rounded-3xl p-5 shadow-xl space-y-4">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h3 className="text-base font-bold text-white flex items-center gap-2">
              <UserCheck className="w-5 h-5 text-emerald-400" />
              Candidate Lookup
            </h3>
            <p className="text-xs text-slate-400 mt-0.5">
              Browse candidates running for Mayor and Wards 1–12
            </p>
          </div>

          {/* Quick Search */}
          <div className="relative w-full md:w-72">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search candidate, ward, or issue..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-slate-950/80 border border-slate-700/80 rounded-2xl pl-10 pr-4 py-2 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-emerald-500 transition-colors"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-white text-xs"
              >
                ✕
              </button>
            )}
          </div>
        </div>

        {/* Filter Badges Row */}
        <div className="flex flex-wrap items-center gap-2 pt-1 border-t border-slate-800/80">
          <span className="text-[11px] font-mono uppercase tracking-wider text-slate-500 flex items-center gap-1 mr-1">
            <Filter className="w-3 h-3" /> Race:
          </span>

          <button
            onClick={() => setSelectedRaceFilter('all')}
            className={`px-3 py-1 rounded-xl text-xs font-semibold transition-all ${
              selectedRaceFilter === 'all'
                ? 'bg-emerald-500 text-slate-950 shadow-md shadow-emerald-500/20'
                : 'bg-slate-800/60 text-slate-400 hover:text-white hover:bg-slate-800'
            }`}
          >
            All Races ({CANDIDATES_2026.length})
          </button>

          <button
            onClick={() => setSelectedRaceFilter('mayoral')}
            className={`px-3 py-1 rounded-xl text-xs font-semibold transition-all ${
              selectedRaceFilter === 'mayoral'
                ? 'bg-emerald-500 text-slate-950 shadow-md shadow-emerald-500/20'
                : 'bg-slate-800/60 text-slate-400 hover:text-white hover:bg-slate-800'
            }`}
          >
            Mayor ({CANDIDATES_2026.filter((c) => c.race === 'Mayoral').length})
          </button>

          <div className="h-4 w-px bg-slate-800 mx-1 hidden sm:block"></div>

          {/* Ward pills */}
          <div className="flex flex-wrap gap-1">
            {Array.from({ length: 12 }, (_, i) => i + 1).map((ward) => (
              <button
                key={ward}
                onClick={() => setSelectedRaceFilter(`ward-${ward}`)}
                className={`px-2.5 py-1 rounded-xl text-[11px] font-medium transition-all ${
                  selectedRaceFilter === `ward-${ward}`
                    ? 'bg-emerald-500 text-slate-950 font-bold shadow-sm'
                    : 'bg-slate-800/40 text-slate-400 hover:text-slate-200 hover:bg-slate-800'
                }`}
              >
                W{ward}
              </button>
            ))}
          </div>

          <div className="h-4 w-px bg-slate-800 mx-1 hidden md:block"></div>

          {/* Status filters */}
          <div className="flex items-center gap-1 ml-auto">
            <button
              onClick={() => setSelectedStatusFilter(selectedStatusFilter === 'incumbent' ? 'all' : 'incumbent')}
              className={`px-2.5 py-1 rounded-xl text-[11px] font-medium transition-all ${
                selectedStatusFilter === 'incumbent'
                  ? 'bg-blue-500/20 text-blue-300 border border-blue-500/40 font-semibold'
                  : 'text-slate-400 hover:text-slate-200 bg-slate-800/30'
              }`}
            >
              Incumbents Only
            </button>
            <button
              onClick={() => setSelectedStatusFilter(selectedStatusFilter === 'challenger' ? 'all' : 'challenger')}
              className={`px-2.5 py-1 rounded-xl text-[11px] font-medium transition-all ${
                selectedStatusFilter === 'challenger'
                  ? 'bg-amber-500/20 text-amber-300 border border-amber-500/40 font-semibold'
                  : 'text-slate-400 hover:text-slate-200 bg-slate-800/30'
              }`}
            >
              Challengers Only
            </button>
          </div>
        </div>
      </div>

      {/* Mayoral Contest Spotlight (if selected or 'all') */}
      {(selectedRaceFilter === 'all' || selectedRaceFilter === 'mayoral') && mayoralCandidates.length > 0 && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <span className="p-1.5 bg-emerald-500/20 text-emerald-400 rounded-lg">
                <Award className="w-4 h-4" />
              </span>
              <div>
                <h3 className="text-base font-bold text-white">Mayoral Race</h3>
                <p className="text-xs text-slate-400">Head of Council • 1 Seat to be Elected</p>
              </div>
            </div>
            <span className="px-3 py-1 bg-slate-800 text-slate-300 text-xs font-mono rounded-full border border-slate-700">
              {mayoralCandidates.length} Certified Candidates
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {mayoralCandidates.map((cand) => (
              <CandidateCard
                key={cand.id}
                candidate={cand}
                onViewProfile={() => setSelectedCandidateForModal(cand)}
              />
            ))}
          </div>
        </div>
      )}

      {/* Ward Races Grid */}
      {Object.keys(wardCandidatesByNumber).map((wardKey) => {
        const wardNum = parseInt(wardKey, 10);
        const candidates = wardCandidatesByNumber[wardNum] || [];
        const wardInfo = WARD_LOOKUP_ENTRIES.find((w) => w.wardNumber === wardNum);

        return (
          <div key={wardNum} className="space-y-3 pt-2">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 p-3 bg-slate-900/40 border border-slate-800/80 rounded-2xl">
              <div className="flex items-center gap-2.5">
                <span className="w-7 h-7 bg-emerald-500/15 text-emerald-400 rounded-lg flex items-center justify-center font-bold text-xs font-mono border border-emerald-500/30">
                  W{wardNum}
                </span>
                <div>
                  <h4 className="text-sm font-bold text-white">Ward {wardNum}: {wardInfo?.wardName}</h4>
                  <div className="text-[11px] text-slate-400">
                    Key Areas: {wardInfo?.neighborhoods.slice(0, 3).join(', ')}
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-3 text-xs">
                <div className="text-slate-400 font-mono text-[11px] hidden sm:block">
                  Avg Turnout: <span className="text-emerald-400 font-bold">{wardInfo?.historicalTurnoutAvg}%</span>
                </div>
                <span className="px-2.5 py-0.5 bg-slate-800/80 text-slate-300 rounded-full text-[11px] border border-slate-700">
                  {candidates.length} Registered
                </span>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {candidates.map((cand) => (
                <CandidateCard
                  key={cand.id}
                  candidate={cand}
                  onViewProfile={() => setSelectedCandidateForModal(cand)}
                />
              ))}
            </div>
          </div>
        );
      })}

      {/* Candidate Detailed Modal */}
      {selectedCandidateForModal && (
        <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-slate-700/80 rounded-3xl max-w-lg w-full p-6 space-y-5 shadow-2xl animate-in fade-in zoom-in-95 duration-200">
            <div className="flex items-start justify-between">
              <div>
                <div className="flex items-center gap-2">
                  <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider font-mono ${
                    selectedCandidateForModal.status === 'Incumbent'
                      ? 'bg-blue-500/20 text-blue-300 border border-blue-500/40'
                      : 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40'
                  }`}>
                    {selectedCandidateForModal.status}
                  </span>
                  <span className="px-2.5 py-0.5 bg-slate-800 text-slate-300 text-[10px] font-mono rounded-full border border-slate-700">
                    {selectedCandidateForModal.race === 'Mayoral' ? 'Mayoral Race' : `Ward ${selectedCandidateForModal.race}`}
                  </span>
                </div>
                <h3 className="text-xl font-bold text-white mt-1.5">{selectedCandidateForModal.name}</h3>
                <p className="text-xs text-slate-400 flex items-center gap-1.5 mt-0.5">
                  <Briefcase className="w-3.5 h-3.5 text-slate-400" />
                  {selectedCandidateForModal.occupation}
                </p>
              </div>

              <button
                onClick={() => setSelectedCandidateForModal(null)}
                className="text-slate-400 hover:text-white p-2 rounded-xl bg-slate-800/60 hover:bg-slate-800"
              >
                ✕
              </button>
            </div>

            <div className="space-y-3">
              <div>
                <h5 className="text-[11px] font-mono uppercase tracking-wider text-slate-400 font-bold mb-1">
                  Candidate Bio & Background
                </h5>
                <p className="text-xs text-slate-300 leading-relaxed bg-slate-950/60 p-3.5 rounded-2xl border border-slate-800">
                  {selectedCandidateForModal.bio}
                </p>
              </div>

              <div>
                <h5 className="text-[11px] font-mono uppercase tracking-wider text-slate-400 font-bold mb-2">
                  Key Platform Priorities
                </h5>
                <div className="space-y-1.5">
                  {selectedCandidateForModal.keyPillars.map((pillar, i) => (
                    <div key={i} className="flex items-start gap-2 text-xs text-slate-200 bg-slate-800/40 p-2.5 rounded-xl border border-slate-700/50">
                      <Sparkles className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
                      <span>{pillar}</span>
                    </div>
                  ))}
                </div>
              </div>

              {selectedCandidateForModal.websiteUrl && (
                <div className="pt-2">
                  <a
                    href={selectedCandidateForModal.websiteUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="w-full flex items-center justify-center gap-2 py-2.5 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold rounded-2xl text-xs transition-colors shadow-lg shadow-emerald-500/20"
                  >
                    <span>Visit Official Campaign Website</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

// Reusable Candidate Card
const CandidateCard: React.FC<{
  candidate: Candidate2026;
  onViewProfile: () => void;
}> = ({ candidate, onViewProfile }) => {
  const isIncumbent = candidate.status === 'Incumbent';

  return (
    <div className="bg-slate-900/60 hover:bg-slate-900/90 border border-slate-800/80 hover:border-slate-700 rounded-3xl p-5 space-y-3.5 transition-all duration-200 shadow-xl flex flex-col justify-between group">
      <div className="space-y-2.5">
        {/* Header Badges */}
        <div className="flex items-center justify-between">
          <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider font-mono ${
            isIncumbent
              ? 'bg-blue-500/15 text-blue-300 border border-blue-500/30'
              : 'bg-emerald-500/15 text-emerald-300 border border-emerald-500/30'
          }`}>
            {candidate.status}
          </span>
          <span className="flex items-center gap-1 text-[10px] font-mono text-slate-400 bg-slate-800/80 px-2 py-0.5 rounded-full border border-slate-700/60">
            <CheckCircle2 className="w-3 h-3 text-emerald-400" />
            Nomination Certified
          </span>
        </div>

        {/* Candidate Identity */}
        <div>
          <h4 className="text-base font-bold text-white group-hover:text-emerald-300 transition-colors">
            {candidate.name}
          </h4>
          <p className="text-xs text-slate-400 line-clamp-1 mt-0.5">
            {candidate.occupation}
          </p>
        </div>

        {/* Platform Pillars */}
        <div className="space-y-1 pt-1">
          <div className="text-[10px] text-slate-400 font-mono uppercase tracking-wider font-semibold">
            Core Priorities
          </div>
          {candidate.keyPillars.slice(0, 2).map((pillar, idx) => (
            <div key={idx} className="flex items-center gap-1.5 text-xs text-slate-300 truncate">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 shrink-0"></span>
              <span className="truncate">{pillar}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Action Footer */}
      <div className="pt-2 border-t border-slate-800/80 flex items-center justify-between">
        <button
          onClick={onViewProfile}
          className="text-xs text-emerald-400 hover:text-emerald-300 font-semibold flex items-center gap-1 group/btn"
        >
          <span>View Platform & Bio</span>
          <span className="group-hover/btn:translate-x-0.5 transition-transform">→</span>
        </button>

        {candidate.websiteUrl && (
          <a
            href={candidate.websiteUrl}
            target="_blank"
            rel="noreferrer"
            className="p-1.5 rounded-lg bg-slate-800/60 hover:bg-slate-800 text-slate-400 hover:text-slate-200 transition-colors"
            title="Official Campaign Website"
          >
            <Globe className="w-3.5 h-3.5" />
          </a>
        )}
      </div>
    </div>
  );
};
