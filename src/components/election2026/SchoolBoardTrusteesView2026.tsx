import React, { useState } from 'react';
import { 
  GraduationCap, 
  CheckCircle2, 
  ExternalLink, 
  FileText, 
  Vote, 
  Building2, 
  Info,
  Layers,
  Award
} from 'lucide-react';
import { SCHOOL_BOARD_TRUSTEES_2026 } from '../../data/electionData2026';
import { ExternalLinkModal } from './ExternalLinkModal';

const BOARD_PROFILES = [
  {
    name: 'Rainbow District School Board',
    shortName: 'Rainbow DSB',
    system: 'English Public',
    color: 'border-amber-500/40 bg-amber-950/20 text-amber-300',
    badgeColor: 'bg-amber-500/20 text-amber-300 border-amber-500/30',
    description: 'Administers public elementary and secondary education across Greater Sudbury, Espanola, Manitoulin Island, and surrounding districts.',
    website: 'https://www.rainbowschools.ca',
    totalSeats: 7
  },
  {
    name: 'Sudbury Catholic District School Board',
    shortName: 'Sudbury Catholic',
    system: 'English Catholic',
    color: 'border-blue-500/40 bg-blue-950/20 text-blue-300',
    badgeColor: 'bg-blue-500/20 text-blue-300 border-blue-500/30',
    description: 'Faith-based inclusive education serving Roman Catholic separate school supporters across Greater Sudbury and surrounding communities.',
    website: 'https://www.sudburycatholicschools.ca',
    totalSeats: 8
  },
  {
    name: "Conseil scolaire public du Grand Nord de l'Ontario",
    shortName: 'Grand Nord',
    system: 'French Public',
    color: 'border-emerald-500/40 bg-emerald-950/20 text-emerald-300',
    badgeColor: 'bg-emerald-500/20 text-emerald-300 border-emerald-500/30',
    description: 'Éducation publique de langue française serving Francophone public school supporters throughout Northern Ontario.',
    website: 'https://grandnord.ca',
    totalSeats: 6
  },
  {
    name: 'Conseil scolaire catholique du Nouvel-Ontario',
    shortName: 'Nouvel-Ontario',
    system: 'French Catholic',
    color: 'border-purple-500/40 bg-purple-950/20 text-purple-300',
    badgeColor: 'bg-purple-500/20 text-purple-300 border-purple-500/30',
    description: 'Éducation catholique de langue française delivering Catholic separate school education across the Greater Sudbury region.',
    website: 'https://nouvelon.ca',
    totalSeats: 9
  }
];

export const SchoolBoardTrusteesView2026: React.FC = () => {
  const [selectedBoardFilter, setSelectedBoardFilter] = useState<string>('all');
  const [statusFilter, setStatusFilter] = useState<'all' | 'Acclaimed' | 'Certified'>('all');
  const [pendingExternal, setPendingExternal] = useState<{ url: string; title: string; category?: string; description?: string } | null>(null);

  const CLERK_PDF_URL = 'https://www.greatersudbury.ca/sites/sudburyen/assets/List-of-Certified-Candidates.pdf';

  // Group trustees by board
  const trusteesByBoard = SCHOOL_BOARD_TRUSTEES_2026.reduce((acc, trustee) => {
    if (!acc[trustee.boardName]) {
      acc[trustee.boardName] = [];
    }
    acc[trustee.boardName].push(trustee);
    return acc;
  }, {} as Record<string, typeof SCHOOL_BOARD_TRUSTEES_2026>);

  const totalTrustees = SCHOOL_BOARD_TRUSTEES_2026.length;
  const acclaimedCount = SCHOOL_BOARD_TRUSTEES_2026.filter((t) => t.status === 'Acclaimed').length;
  const contestedCount = SCHOOL_BOARD_TRUSTEES_2026.filter((t) => t.status === 'Certified').length;

  const filteredBoards = Object.entries(trusteesByBoard).filter(([boardName]) => {
    if (selectedBoardFilter === 'all') return true;
    return boardName === selectedBoardFilter;
  });

  return (
    <div className="space-y-6 animate-in fade-in duration-200">
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
            url: CLERK_PDF_URL,
            title: "City of Greater Sudbury - List of Certified Candidates",
            category: "Official Municipal Document",
            description: "You are viewing the official statutory PDF certified by the City Solicitor and Clerk under the Municipal Elections Act, 1996."
          })}
          className="px-3 py-1.5 bg-emerald-500/20 hover:bg-emerald-500/30 text-emerald-300 border border-emerald-500/30 rounded-xl transition-colors flex items-center gap-1.5 font-mono text-[11px] shrink-0 font-medium self-start sm:self-auto cursor-pointer"
        >
          <FileText className="w-3.5 h-3.5 text-emerald-400" />
          <span>Certified List ↗</span>
        </button>
      </div>

      {/* Hero Overview Card */}
      <div className="bg-gradient-to-br from-slate-900 via-slate-900/90 to-blue-950/30 border border-slate-800 rounded-3xl p-5 sm:p-6 shadow-xl space-y-4">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          <div className="space-y-1.5 max-w-2xl">
            <div className="flex items-center gap-2">
              <span className="px-2.5 py-0.5 bg-blue-500/20 text-blue-300 border border-blue-500/30 text-[10px] font-mono font-bold rounded-full uppercase tracking-wider flex items-center gap-1">
                <GraduationCap className="w-3.5 h-3.5 text-blue-400" />
                Civic Education Governance
              </span>
            </div>
            <h3 className="text-xl sm:text-2xl font-black text-white tracking-tight">
              School Board Trustee Elections & Acclamations
            </h3>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              Greater Sudbury electors vote for school board trustees concurrently with the municipal election. Eligible electors vote in <strong>one</strong> school board system based on language rights and school support declaration.
            </p>
          </div>

          {/* Quick Stats Grid */}
          <div className="grid grid-cols-3 gap-2.5 shrink-0 font-mono text-center">
            <div className="p-3 bg-slate-950/80 border border-slate-800 rounded-2xl min-w-[90px]">
              <div className="text-xl sm:text-2xl font-black text-white">{totalTrustees}</div>
              <div className="text-[10px] text-slate-400 uppercase tracking-wider mt-0.5">Trustees</div>
            </div>
            <div className="p-3 bg-slate-950/80 border border-emerald-500/30 rounded-2xl min-w-[90px]">
              <div className="text-xl sm:text-2xl font-black text-emerald-400">{acclaimedCount}</div>
              <div className="text-[10px] text-emerald-300/80 uppercase tracking-wider mt-0.5">Acclaimed</div>
            </div>
            <div className="p-3 bg-slate-950/80 border border-blue-500/30 rounded-2xl min-w-[90px]">
              <div className="text-xl sm:text-2xl font-black text-blue-400">{contestedCount}</div>
              <div className="text-[10px] text-blue-300/80 uppercase tracking-wider mt-0.5">Election</div>
            </div>
          </div>
        </div>

        {/* Informational Guidance Note */}
        <div className="p-3.5 bg-slate-950/60 border border-slate-800 rounded-2xl flex items-start gap-2.5 text-xs text-slate-300">
          <Info className="w-4 h-4 text-blue-400 shrink-0 mt-0.5" />
          <div className="space-y-1">
            <p>
              <strong className="text-white">Understanding Acclamations:</strong> Under Section 37 of Ontario’s <em>Municipal Elections Act</em>, when the number of certified candidates does not exceed the number of trustee seats to be elected in a designated zone, candidates are officially <strong>Acclaimed</strong> to office without requiring a ballot on Voting Day.
            </p>
          </div>
        </div>
      </div>

      {/* Board & Status Filter Bar */}
      <div className="bg-slate-900/70 border border-slate-800 rounded-2xl p-3 sm:p-4 flex flex-wrap items-center justify-between gap-3 shadow-lg">
        {/* Board Selection */}
        <div className="flex flex-wrap items-center gap-1.5">
          <button
            onClick={() => setSelectedBoardFilter('all')}
            className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all ${
              selectedBoardFilter === 'all'
                ? 'bg-blue-500 text-white shadow-md shadow-blue-500/20 font-bold'
                : 'bg-slate-800/60 text-slate-400 hover:text-white hover:bg-slate-800'
            }`}
          >
            All 4 Boards ({totalTrustees})
          </button>

          {BOARD_PROFILES.map((board) => (
            <button
              key={board.name}
              onClick={() => setSelectedBoardFilter(board.name)}
              className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all ${
                selectedBoardFilter === board.name
                  ? 'bg-blue-500 text-white shadow-md shadow-blue-500/20 font-bold'
                  : 'bg-slate-800/60 text-slate-400 hover:text-white hover:bg-slate-800'
              }`}
            >
              {board.shortName}
            </button>
          ))}
        </div>

        {/* Status Filter */}
        <div className="flex items-center gap-1 text-xs font-mono">
          <button
            onClick={() => setStatusFilter('all')}
            className={`px-2.5 py-1 rounded-lg transition-all ${
              statusFilter === 'all'
                ? 'bg-slate-700 text-white font-bold'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            All Statuses
          </button>
          <button
            onClick={() => setStatusFilter('Acclaimed')}
            className={`px-2.5 py-1 rounded-lg transition-all ${
              statusFilter === 'Acclaimed'
                ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 font-bold'
                : 'text-slate-400 hover:text-emerald-300'
            }`}
          >
            Acclaimed ({acclaimedCount})
          </button>
          <button
            onClick={() => setStatusFilter('Certified')}
            className={`px-2.5 py-1 rounded-lg transition-all ${
              statusFilter === 'Certified'
                ? 'bg-blue-500/20 text-blue-300 border border-blue-500/40 font-bold'
                : 'text-slate-400 hover:text-blue-300'
            }`}
          >
            Election ({contestedCount})
          </button>
        </div>
      </div>

      {/* Boards Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {filteredBoards.map(([boardName, trustees]) => {
          const profile = BOARD_PROFILES.find((b) => b.name === boardName);
          const visibleTrustees = trustees.filter((t) => {
            if (statusFilter === 'all') return true;
            return t.status === statusFilter;
          });

          return (
            <div 
              key={boardName} 
              className="bg-slate-900/70 border border-slate-800 rounded-3xl p-5 sm:p-6 space-y-4 shadow-xl flex flex-col justify-between"
            >
              <div className="space-y-3">
                <div className="flex items-start justify-between gap-3 border-b border-slate-800/80 pb-3">
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className={`px-2 py-0.5 text-[10px] font-mono font-bold rounded-md border ${profile?.badgeColor || 'bg-slate-800 text-slate-300'}`}>
                        {profile?.system || 'School Board'}
                      </span>
                    </div>
                    <h4 className="text-base font-bold text-white">{boardName}</h4>
                    <p className="text-xs text-slate-400 leading-relaxed">
                      {profile?.description}
                    </p>
                  </div>

                  {profile?.website && (
                    <button
                      type="button"
                      onClick={() => setPendingExternal({
                        url: profile.website,
                        title: profile.name + " (" + profile.shortName + ")",
                        category: "Official School Board Website",
                        description: "You are navigating to the official website for " + profile.name + "."
                      })}
                      className="p-2 bg-slate-800/80 hover:bg-slate-700 text-slate-400 hover:text-white rounded-xl transition-colors shrink-0 cursor-pointer"
                      title="Visit official school board portal"
                    >
                      <ExternalLink className="w-4 h-4" />
                    </button>
                  )}
                </div>

                {/* Candidate / Trustee Entries */}
                <div className="space-y-2">
                  {visibleTrustees.length === 0 ? (
                    <div className="p-4 text-center text-xs text-slate-500 font-mono">
                      No trustees matching selected status filter.
                    </div>
                  ) : (
                    visibleTrustees.map((t) => (
                      <div
                        key={t.id}
                        className="p-3.5 bg-slate-950/60 border border-slate-800/80 rounded-2xl flex items-center justify-between gap-3 text-xs hover:border-slate-700/80 transition-all"
                      >
                        <div className="space-y-0.5 min-w-0">
                          <span className="text-[10px] font-mono text-blue-400 font-bold uppercase tracking-wider block truncate">
                            {t.zoneOrArea}
                          </span>
                          <span className="font-semibold text-white text-sm block truncate">
                            {t.candidateName}
                          </span>
                          {t.comments && (
                            <span className="text-[11px] text-slate-400 block">
                              {t.comments}
                            </span>
                          )}
                        </div>

                        <div className="shrink-0">
                          {t.status === 'Acclaimed' ? (
                            <span className="px-2.5 py-1 bg-emerald-500/15 text-emerald-300 border border-emerald-500/30 rounded-full font-mono text-[10px] font-bold flex items-center gap-1">
                              <CheckCircle2 className="w-3 h-3 text-emerald-400" />
                              ACCLAIMED
                            </span>
                          ) : (
                            <span className="px-2.5 py-1 bg-blue-500/15 text-blue-300 border border-blue-500/30 rounded-full font-mono text-[10px] font-bold flex items-center gap-1">
                              <Vote className="w-3 h-3 text-blue-400" />
                              ELECTION
                            </span>
                          )}
                        </div>
                      </div>
                    ))
                  )}
                </div>
              </div>

              {/* Bottom Card Summary */}
              <div className="pt-3 border-t border-slate-800/80 flex items-center justify-between text-[11px] font-mono text-slate-400">
                <span>Total Trustees: {trustees.length}</span>
                <span className="text-emerald-400 font-medium">
                  {trustees.filter(t => t.status === 'Acclaimed').length} Acclaimed • {trustees.filter(t => t.status === 'Certified').length} Election
                </span>
              </div>
            </div>
          );
        })}
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
    </div>
  );
};
