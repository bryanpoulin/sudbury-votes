import React, { useState, useMemo } from 'react';
import { Candidate2026 } from '../../types/election2026';
import { ExternalLinkModal } from './ExternalLinkModal';
import { 
  CANDIDATES_2026, 
  WARD_LOOKUP_ENTRIES 
} from '../../data/electionData2026';
import { 
  UserCheck, 
  ExternalLink, 
  Briefcase, 
  CheckCircle2, 
  Award, 
  Sparkles, 
  Globe, 
  Search, 
  X,
  ChevronRight
} from 'lucide-react';

interface CandidateRegistry2026Props {
  initialWardFilter?: number | null;
}

export const CandidateRegistry2026: React.FC<CandidateRegistry2026Props> = ({
  initialWardFilter
}) => {
  const [selectedRaceFilter, setSelectedRaceFilter] = useState<string>(
    initialWardFilter ? `ward-${initialWardFilter}` : 'all'
  );
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedCandidateForModal, setSelectedCandidateForModal] = useState<Candidate2026 | null>(null);
  const [pendingExternal, setPendingExternal] = useState<{ url: string; title: string; category?: string; description?: string } | null>(null);

  // Filter Council candidates by race and search
  const filteredCandidates = useMemo(() => {
    return CANDIDATES_2026.filter((c) => {
      // Race filter
      if (selectedRaceFilter === 'mayoral' && c.race !== 'Mayoral') return false;
      if (selectedRaceFilter.startsWith('ward-')) {
        const wardNum = parseInt(selectedRaceFilter.replace('ward-', ''), 10);
        if (c.race !== wardNum) return false;
      }

      // Search filter
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const matchName = c.name.toLowerCase().includes(q);
        const matchOcc = c.occupation.toLowerCase().includes(q);
        const matchBio = c.bio.toLowerCase().includes(q);
        const matchPillars = c.keyPillars.some((p) => p.toLowerCase().includes(q));
        const matchRace = c.race === 'Mayoral' 
          ? 'mayor mayoral'.includes(q) 
          : `ward ${c.race} w${c.race}`.includes(q);

        if (!matchName && !matchOcc && !matchBio && !matchPillars && !matchRace) {
          return false;
        }
      }

      return true;
    });
  }, [selectedRaceFilter, searchQuery]);

  // Group Council candidates
  const mayoralCandidates = filteredCandidates.filter((c) => c.race === 'Mayoral');
  const wardCandidatesByNumber: Record<number, Candidate2026[]> = {};

  for (let i = 1; i <= 12; i++) {
    const list = filteredCandidates.filter((c) => c.race === i);
    if (list.length > 0) {
      wardCandidatesByNumber[i] = list;
    }
  }

  const totalCouncilCount = CANDIDATES_2026.length;

  return (
    <div className="space-y-6 animate-in fade-in duration-200">
      {/* Statutory City Clerk Certification Banner */}
      <div className="p-4 bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-500/30 rounded-3xl flex items-center gap-2.5 text-xs text-emerald-900 dark:text-emerald-200/90 shadow-sm dark:shadow-xl">
        <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0" />
        <div>
          <span className="font-bold text-slate-900 dark:text-white">Clerk Certified:</span> Official candidates for Mayor and City Council (Wards 1–12) certified pursuant to the <em>Municipal Elections Act, 1996</em> by City Solicitor & Clerk Eric Labelle on August 24, 2026.
        </div>
      </div>

      {/* Main Filter & Search Control Center */}
      <div className="bg-white dark:bg-slate-900/70 border border-slate-200 dark:border-slate-800 rounded-3xl p-4 sm:p-6 shadow-sm dark:shadow-xl space-y-4">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="space-y-1">
            <h3 className="text-lg sm:text-xl font-black text-slate-900 dark:text-white tracking-tight flex items-center gap-2">
              <UserCheck className="w-5 h-5 text-emerald-500 dark:text-emerald-400" />
              <span>Certified Candidate Registry</span>
            </h3>
            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400">
              Official certified candidates for Mayor and City Council (Wards 1–12)
            </p>
          </div>

          <div className="flex items-center gap-2 shrink-0">
            <span className="px-3.5 py-1.5 bg-slate-100 dark:bg-slate-950/80 border border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300 rounded-2xl text-xs font-mono flex items-center gap-2">
              <Award className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
              <span>{totalCouncilCount} Certified Candidates</span>
            </span>
          </div>
        </div>

        {/* Universal Search Bar */}
        <div className="relative">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search candidates by name, ward, occupation, or platform priority..."
            className="w-full bg-slate-50 dark:bg-slate-950/70 border border-slate-200 dark:border-slate-800 rounded-2xl pl-10 pr-9 py-2.5 text-xs sm:text-sm text-slate-900 dark:text-white placeholder:text-slate-400 dark:placeholder:text-slate-500 focus:outline-none focus:border-emerald-500/60 focus:ring-1 focus:ring-emerald-500/50 transition-all font-sans"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-900 dark:hover:text-white p-1 cursor-pointer"
              title="Clear search"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          )}
        </div>

        {/* Contest Filter Bar */}
        <div className="pt-2 border-t border-slate-200 dark:border-slate-800/80 space-y-2">
          <div className="flex flex-wrap items-center gap-1.5">
            <span className="text-[11px] font-mono text-slate-500 dark:text-slate-400 mr-1 hidden sm:inline">Select Contest:</span>

            <button
              onClick={() => setSelectedRaceFilter('all')}
              className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
                selectedRaceFilter === 'all'
                  ? 'bg-emerald-500 text-slate-950 shadow-md shadow-emerald-500/20 font-bold'
                  : 'bg-slate-100 dark:bg-slate-800/60 text-slate-600 dark:text-slate-400 hover:text-slate-950 dark:hover:text-white hover:bg-slate-200 dark:hover:bg-slate-800'
              }`}
            >
              All Council ({totalCouncilCount})
            </button>

            <button
              onClick={() => setSelectedRaceFilter('mayoral')}
              className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
                selectedRaceFilter === 'mayoral'
                  ? 'bg-emerald-500 text-slate-950 shadow-md shadow-emerald-500/20 font-bold'
                  : 'bg-slate-100 dark:bg-slate-800/60 text-slate-600 dark:text-slate-400 hover:text-slate-950 dark:hover:text-white hover:bg-slate-200 dark:hover:bg-slate-800'
              }`}
            >
              Mayor (5)
            </button>

            <div className="h-4 w-px bg-slate-200 dark:bg-slate-800 mx-1 hidden sm:block"></div>

            {/* Ward Pills */}
            <div className="flex flex-wrap gap-1">
              {Array.from({ length: 12 }, (_, i) => i + 1).map((ward) => (
                <button
                  key={ward}
                  onClick={() => setSelectedRaceFilter(`ward-${ward}`)}
                  className={`px-2.5 py-1.5 rounded-xl text-xs font-medium transition-all cursor-pointer ${
                    selectedRaceFilter === `ward-${ward}`
                      ? 'bg-emerald-500 text-slate-950 font-bold shadow-xs'
                      : 'bg-slate-100 dark:bg-slate-800/40 text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200 hover:bg-slate-200 dark:hover:bg-slate-800'
                  }`}
                >
                  Ward {ward}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* ========================================================= */}
      {/* CANDIDATES LISTING (MAYOR & CITY COUNCIL)                 */}
      {/* ========================================================= */}
      <div className="space-y-6">
        {/* Mayoral Contest Spotlight */}
        {(selectedRaceFilter === 'all' || selectedRaceFilter === 'mayoral') && mayoralCandidates.length > 0 && (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <span className="p-1.5 bg-emerald-500/20 text-emerald-600 dark:text-emerald-400 rounded-lg">
                  <Award className="w-4 h-4" />
                </span>
                <div>
                  <h3 className="text-base font-bold text-slate-900 dark:text-white">Mayoral Race</h3>
                  <p className="text-xs text-slate-500 dark:text-slate-400">Head of Council • 1 Seat to be Elected (City-Wide)</p>
                </div>
              </div>
              <span className="px-3 py-1 bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 text-xs font-mono rounded-full border border-slate-200 dark:border-slate-700">
                {mayoralCandidates.length} Certified Candidates
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {mayoralCandidates.map((cand) => (
                <CandidateCard
                  key={cand.id}
                  candidate={cand}
                  onViewProfile={() => setSelectedCandidateForModal(cand)}
                  onOpenExternal={(info) => setPendingExternal(info)}
                />
              ))}
            </div>
          </div>
        )}

        {/* 12 Ward Contests */}
        {Array.from({ length: 12 }, (_, i) => i + 1).map((wardNum) => {
          if (selectedRaceFilter !== 'all' && selectedRaceFilter !== `ward-${wardNum}`) {
            return null;
          }

          const candidates = wardCandidatesByNumber[wardNum] || [];
          if (candidates.length === 0 && searchQuery.trim()) {
            return null;
          }

          const wardInfo = WARD_LOOKUP_ENTRIES.find((w) => w.wardNumber === wardNum);

          return (
            <div key={wardNum} className="space-y-4 pt-4 border-t border-slate-200 dark:border-slate-800/80">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                <div className="flex items-center gap-2.5">
                  <span className="w-7 h-7 rounded-xl bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white font-mono font-bold text-xs flex items-center justify-center">
                    {wardNum}
                  </span>
                  <div>
                    <h3 className="text-base font-bold text-slate-900 dark:text-white flex items-center gap-2">
                      <span>{wardInfo ? wardInfo.wardName : `Ward ${wardNum}`}</span>
                      <span className="text-xs font-normal text-slate-500 dark:text-slate-400">
                        ({wardInfo?.incumbentName ? `Incumbent: ${wardInfo.incumbentName}` : 'Open Race'})
                      </span>
                    </h3>
                    <div className="text-xs text-slate-500 dark:text-slate-400 line-clamp-1">
                      Areas: {wardInfo?.neighborhoods.slice(0, 3).join(', ')}
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-3 text-xs">
                  <span className="px-2.5 py-0.5 bg-slate-100 dark:bg-slate-800/80 text-slate-700 dark:text-slate-300 rounded-full text-[11px] border border-slate-200 dark:border-slate-700 font-mono">
                    {candidates.length} Certified Candidates
                  </span>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {candidates.map((cand) => (
                  <CandidateCard
                    key={cand.id}
                    candidate={cand}
                    onViewProfile={() => setSelectedCandidateForModal(cand)}
                    onOpenExternal={(info) => setPendingExternal(info)}
                  />
                ))}
              </div>
            </div>
          );
        })}

        {filteredCandidates.length === 0 && (
          <div className="p-8 text-center text-xs text-slate-500 dark:text-slate-400 font-mono bg-white dark:bg-slate-900/40 border border-slate-200 dark:border-slate-800 rounded-3xl">
            No council candidates match your current search & filter criteria.
          </div>
        )}
      </div>

      {/* External Link Confirmation Modal */}
      {pendingExternal && (
        <ExternalLinkModal
          isOpen={!!pendingExternal}
          onClose={() => setPendingExternal(null)}
          url={pendingExternal.url}
          title={pendingExternal.title}
          category={pendingExternal.category}
          description={pendingExternal.description}
        />
      )}

      {/* Council Candidate Detailed Modal */}
      {selectedCandidateForModal && (
        <div className="fixed inset-0 z-50 bg-black/60 dark:bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-4">
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700/80 rounded-3xl max-w-lg w-full p-6 space-y-5 shadow-2xl animate-in fade-in zoom-in-95 duration-200">
            <div className="flex items-start justify-between">
              <div>
                <div className="flex items-center gap-2">
                  <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider font-mono ${
                    selectedCandidateForModal.status === 'Incumbent'
                      ? 'bg-blue-500/20 text-blue-700 dark:text-blue-300 border border-blue-500/40'
                      : 'bg-emerald-500/20 text-emerald-700 dark:text-emerald-300 border border-emerald-500/40'
                  }`}>
                    {selectedCandidateForModal.status}
                  </span>
                  <span className="px-2.5 py-0.5 bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 text-[10px] font-mono rounded-full border border-slate-200 dark:border-slate-700">
                    {selectedCandidateForModal.race === 'Mayoral' ? 'Mayoral Race' : `Ward ${selectedCandidateForModal.race}`}
                  </span>
                </div>
                <h3 className="text-xl font-bold text-slate-900 dark:text-white mt-1.5">{selectedCandidateForModal.name}</h3>
                <p className="text-xs text-slate-500 dark:text-slate-400 flex items-center gap-1.5 mt-0.5">
                  <Briefcase className="w-3.5 h-3.5 text-slate-400" />
                  {selectedCandidateForModal.occupation}
                </p>
              </div>

              <button
                onClick={() => setSelectedCandidateForModal(null)}
                className="text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white p-2 rounded-xl bg-slate-100 hover:bg-slate-200 dark:bg-slate-800/60 dark:hover:bg-slate-800 cursor-pointer"
              >
                ✕
              </button>
            </div>

            <div className="space-y-3">
              <div>
                <h5 className="text-[11px] font-mono uppercase tracking-wider text-slate-500 dark:text-slate-400 font-bold mb-1">
                  Candidate Bio & Background
                </h5>
                <p className="text-xs text-slate-700 dark:text-slate-300 leading-relaxed bg-slate-50 dark:bg-slate-950/60 p-3.5 rounded-2xl border border-slate-200 dark:border-slate-800">
                  {selectedCandidateForModal.bio}
                </p>
              </div>

              <div>
                <h5 className="text-[11px] font-mono uppercase tracking-wider text-slate-500 dark:text-slate-400 font-bold mb-2">
                  Key Platform Priorities
                </h5>
                <div className="space-y-1.5">
                  {selectedCandidateForModal.keyPillars.map((pillar, i) => (
                    <div key={i} className="flex items-start gap-2 text-xs text-slate-800 dark:text-slate-200 bg-slate-50 dark:bg-slate-800/40 p-2.5 rounded-xl border border-slate-200 dark:border-slate-700/50">
                      <Sparkles className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400 shrink-0 mt-0.5" />
                      <span>{pillar}</span>
                    </div>
                  ))}
                </div>
              </div>

              {selectedCandidateForModal.websiteUrl && (
                <div className="pt-2">
                  <button
                    type="button"
                    onClick={() => setPendingExternal({
                      url: selectedCandidateForModal.websiteUrl!,
                      title: `${selectedCandidateForModal.name} - Campaign Website`,
                      category: 'Candidate Campaign Website',
                      description: `You are navigating to the external campaign website for ${selectedCandidateForModal.name}.`
                    })}
                    className="w-full flex items-center justify-center gap-2 py-2.5 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold rounded-2xl text-xs transition-colors shadow-lg shadow-emerald-500/20 cursor-pointer"
                  >
                    <span>Visit Official Campaign Website</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

// Reusable Candidate Card for Council Candidates
const CandidateCard: React.FC<{
  candidate: Candidate2026;
  onViewProfile: () => void;
  onOpenExternal: (info: { url: string; title: string; category?: string; description?: string }) => void;
}> = ({ candidate, onViewProfile, onOpenExternal }) => {
  const isIncumbent = candidate.status === 'Incumbent';

  return (
    <div className="bg-white dark:bg-slate-900/60 hover:bg-slate-50 dark:hover:bg-slate-900/90 border border-slate-200 dark:border-slate-800/80 hover:border-slate-300 dark:hover:border-slate-700 rounded-3xl p-5 space-y-3.5 transition-all duration-200 shadow-sm dark:shadow-xl flex flex-col justify-between group">
      <div className="space-y-2.5">
        {/* Header Badges */}
        <div className="flex items-center justify-between">
          <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider font-mono ${
            isIncumbent
              ? 'bg-blue-500/15 text-blue-700 dark:text-blue-300 border border-blue-500/30'
              : 'bg-emerald-500/15 text-emerald-700 dark:text-emerald-300 border border-emerald-500/30'
          }`}>
            {candidate.status}
          </span>
          <span className="flex items-center gap-1 text-[10px] font-mono text-slate-600 dark:text-slate-400 bg-slate-100 dark:bg-slate-800/80 px-2 py-0.5 rounded-full border border-slate-200 dark:border-slate-700/60">
            <CheckCircle2 className="w-3 h-3 text-emerald-600 dark:text-emerald-400" />
            Certified
          </span>
        </div>

        {/* Candidate Identity */}
        <div>
          <h4 className="text-base font-bold text-slate-900 dark:text-white group-hover:text-emerald-600 dark:group-hover:text-emerald-300 transition-colors">
            {candidate.name}
          </h4>
          <p className="text-xs text-slate-500 dark:text-slate-400 line-clamp-1 mt-0.5">
            {candidate.occupation}
          </p>
        </div>

        {/* Platform Pillars */}
        <div className="space-y-1 pt-1">
          <div className="text-[10px] text-slate-500 dark:text-slate-400 font-mono uppercase tracking-wider font-semibold">
            Core Priorities
          </div>
          {candidate.keyPillars.slice(0, 2).map((pillar, idx) => (
            <div key={idx} className="flex items-center gap-1.5 text-xs text-slate-700 dark:text-slate-300 truncate">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 dark:bg-emerald-400 shrink-0"></span>
              <span className="truncate">{pillar}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Action Footer */}
      <div className="pt-2 border-t border-slate-100 dark:border-slate-800/80 flex items-center justify-between">
        <button
          onClick={onViewProfile}
          className="text-xs text-emerald-600 dark:text-emerald-400 hover:text-emerald-700 dark:hover:text-emerald-300 font-semibold flex items-center gap-1 group/btn cursor-pointer"
        >
          <span>View Platform & Bio</span>
          <span className="group-hover/btn:translate-x-0.5 transition-transform">→</span>
        </button>

        {candidate.websiteUrl && (
          <button
            type="button"
            onClick={() => onOpenExternal({
              url: candidate.websiteUrl!,
              title: `${candidate.name} - Campaign Website`,
              category: 'Candidate Campaign Website',
              description: `You are navigating to the external campaign website for ${candidate.name}.`
            })}
            className="p-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 dark:bg-slate-800/60 dark:hover:bg-slate-800 text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200 transition-colors cursor-pointer"
            title="Official Campaign Website"
          >
            <Globe className="w-3.5 h-3.5" />
          </button>
        )}
      </div>
    </div>
  );
};
