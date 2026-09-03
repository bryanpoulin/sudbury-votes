import React, { useState } from 'react';
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
  FileText
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
  const [selectedCandidateForModal, setSelectedCandidateForModal] = useState<Candidate2026 | null>(null);
  const [pendingExternal, setPendingExternal] = useState<{ url: string; title: string; category?: string; description?: string } | null>(null);

  // Filter candidates purely by race filter
  const filteredCandidates = CANDIDATES_2026.filter((c) => {
    if (selectedRaceFilter === 'mayoral' && c.race !== 'Mayoral') return false;
    if (selectedRaceFilter.startsWith('ward-')) {
      const wardNum = parseInt(selectedRaceFilter.replace('ward-', ''), 10);
      if (c.race !== wardNum) return false;
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
      {/* Official City Clerk Certification Banner with Clerk PDF Link */}
      <div className="p-4 bg-emerald-950/40 border border-emerald-500/30 rounded-3xl flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs text-emerald-200/90 shadow-xl">
        <div className="flex items-center gap-2.5">
          <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
          <div>
            <span className="font-bold text-white">Clerk Certified:</span> Certified pursuant to the <em>Municipal Elections Act, 1996</em> by City Solicitor and Clerk Eric Labelle on August 24, 2026.
          </div>
        </div>

        <button
          type="button"
          onClick={() => setPendingExternal({
            url: 'https://www.greatersudbury.ca/sites/sudburyen/assets/List-of-Certified-Candidates.pdf',
            title: 'City of Greater Sudbury - List of Certified Candidates',
            category: 'Official Municipal Document',
            description: 'You are viewing the official statutory PDF certified by the City Solicitor and Clerk under the Municipal Elections Act, 1996.'
          })}
          className="px-3 py-1.5 bg-emerald-500/20 hover:bg-emerald-500/30 text-emerald-300 border border-emerald-500/30 rounded-xl transition-colors flex items-center gap-1.5 font-mono text-[11px] shrink-0 font-medium self-start sm:self-auto cursor-pointer"
        >
          <FileText className="w-3.5 h-3.5 text-emerald-400" />
          <span>Certified List ↗</span>
        </button>
      </div>

      {/* Streamlined Race Filter Bar */}
      <div className="bg-slate-900/70 border border-slate-800 rounded-3xl p-4 sm:p-5 shadow-xl space-y-3">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <h3 className="text-base font-bold text-white flex items-center gap-2">
              <UserCheck className="w-5 h-5 text-emerald-400" />
              Certified Candidates
            </h3>
            <p className="text-xs text-slate-400 mt-0.5">
              Select a contest to view certified candidates and platform priorities
            </p>
          </div>

          <div className="px-3 py-1 bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 rounded-full text-xs font-mono font-bold self-start sm:self-auto">
            {CANDIDATES_2026.length} Certified Candidates
          </div>
        </div>

        {/* Race Selector Row */}
        <div className="flex flex-wrap items-center gap-1.5 pt-2 border-t border-slate-800/80">
          <button
            onClick={() => setSelectedRaceFilter('all')}
            className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all ${
              selectedRaceFilter === 'all'
                ? 'bg-emerald-500 text-slate-950 shadow-md shadow-emerald-500/20 font-bold'
                : 'bg-slate-800/60 text-slate-400 hover:text-white hover:bg-slate-800'
            }`}
          >
            All Races
          </button>

          <button
            onClick={() => setSelectedRaceFilter('mayoral')}
            className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all ${
              selectedRaceFilter === 'mayoral'
                ? 'bg-emerald-500 text-slate-950 shadow-md shadow-emerald-500/20 font-bold'
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
                className={`px-2.5 py-1.5 rounded-xl text-xs font-medium transition-all ${
                  selectedRaceFilter === `ward-${ward}`
                    ? 'bg-emerald-500 text-slate-950 font-bold shadow-sm'
                    : 'bg-slate-800/40 text-slate-400 hover:text-slate-200 hover:bg-slate-800'
                }`}
              >
                Ward {ward}
              </button>
            ))}
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
                <p className="text-xs text-slate-400">Head of Council • 1 Seat to be Elected (City-Wide)</p>
              </div>
            </div>
            <span className="px-3 py-1 bg-slate-800 text-slate-300 text-xs font-mono rounded-full border border-slate-700">
              {mayoralCandidates.length} Certified Candidates
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
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
                    Areas: {wardInfo?.neighborhoods.slice(0, 3).join(', ')}
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-3 text-xs">
                <span className="px-2.5 py-0.5 bg-slate-800/80 text-slate-300 rounded-full text-[11px] border border-slate-700 font-mono">
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

// Reusable Candidate Card
const CandidateCard: React.FC<{
  candidate: Candidate2026;
  onViewProfile: () => void;
  onOpenExternal: (info: { url: string; title: string; category?: string; description?: string }) => void;
}> = ({ candidate, onViewProfile, onOpenExternal }) => {
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
            Certified
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
          <button
            type="button"
            onClick={() => onOpenExternal({
              url: candidate.websiteUrl!,
              title: `${candidate.name} - Campaign Website`,
              category: 'Candidate Campaign Website',
              description: `You are navigating to the external campaign website for ${candidate.name}.`
            })}
            className="p-1.5 rounded-lg bg-slate-800/60 hover:bg-slate-800 text-slate-400 hover:text-slate-200 transition-colors cursor-pointer"
            title="Official Campaign Website"
          >
            <Globe className="w-3.5 h-3.5" />
          </button>
        )}
      </div>
    </div>
  );
};

