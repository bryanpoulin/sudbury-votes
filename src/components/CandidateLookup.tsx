import React, { useState } from 'react';
import { getAllCandidatesCareer, CandidateCareerRecord } from '../data/electionData';
import { 
  Users, 
  Search, 
  Award, 
  CheckCircle2, 
  XCircle, 
  TrendingUp, 
  Calendar, 
  Vote,
  Filter,
  ChevronRight
} from 'lucide-react';

interface CandidateLookupProps {
  onSelectYear: (year: number) => void;
}

export const CandidateLookup: React.FC<CandidateLookupProps> = ({ onSelectYear }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterMode, setFilterMode] = useState<'all' | 'mayoral' | 'multi_race' | 'winners'>('all');
  const [selectedCandidate, setSelectedCandidate] = useState<CandidateCareerRecord | null>(null);

  const allCareers = getAllCandidatesCareer();

  const filteredCandidates = allCareers.filter((cand) => {
    const matchesSearch = cand.candidateName.toLowerCase().includes(searchTerm.toLowerCase());
    if (!matchesSearch) return false;

    if (filterMode === 'mayoral') {
      return cand.races.some((r) => r.raceType === 'Mayoral');
    }
    if (filterMode === 'multi_race') {
      return cand.totalRaces > 1;
    }
    if (filterMode === 'winners') {
      return cand.victories > 0;
    }
    return true;
  });

  const activeCandidate = selectedCandidate || filteredCandidates[0] || null;

  return (
    <div className="space-y-6">
      {/* Top Banner */}
      <div className="bg-slate-900/60 backdrop-blur-md border border-slate-800 rounded-3xl p-6 sm:p-7 shadow-xl space-y-2 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10 pointer-events-none bg-[radial-gradient(circle_at_top_right,_var(--tw-gradient-stops))] from-emerald-500 via-transparent to-transparent" />
        <div className="flex items-center gap-2 relative z-10">
          <Users className="w-6 h-6 text-emerald-400" />
          <h2 className="text-xl sm:text-2xl font-black text-white tracking-tight">
            Sudbury Municipal Candidate Career Tracker
          </h2>
        </div>
        <p className="text-xs sm:text-sm text-slate-300 max-w-3xl leading-relaxed relative z-10">
          Search and track the complete electoral performance, accumulated votes, victories, and race trajectories of candidates who have contested mayoral and council seats since 2003.
        </p>
      </div>

      {/* Main 2-Column Explorer */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left Column: Search & Candidate List (5 cols) */}
        <div className="lg:col-span-5 bg-slate-900/60 backdrop-blur-md border border-slate-800 rounded-3xl p-5 space-y-4 shadow-xl">
          {/* Search Input */}
          <div className="relative">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search candidate name..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-9 pr-3.5 py-2 bg-slate-800/50 border border-slate-700/70 rounded-full text-xs text-white placeholder-slate-400 focus:outline-none focus:border-emerald-500 transition-colors"
            />
          </div>

          {/* Filter Pills */}
          <div className="flex flex-wrap items-center gap-1 bg-slate-800/40 p-1 rounded-full border border-slate-700/70">
            <button
              onClick={() => setFilterMode('all')}
              className={`px-3 py-1 text-xs font-semibold rounded-full transition-all ${
                filterMode === 'all' ? 'bg-emerald-500 text-slate-950 font-bold shadow-md shadow-emerald-500/20' : 'text-slate-400 hover:text-white'
              }`}
            >
              All ({allCareers.length})
            </button>
            <button
              onClick={() => setFilterMode('mayoral')}
              className={`px-3 py-1 text-xs font-semibold rounded-full transition-all ${
                filterMode === 'mayoral' ? 'bg-emerald-500 text-slate-950 font-bold shadow-md shadow-emerald-500/20' : 'text-slate-400 hover:text-white'
              }`}
            >
              Mayoral
            </button>
            <button
              onClick={() => setFilterMode('multi_race')}
              className={`px-3 py-1 text-xs font-semibold rounded-full transition-all ${
                filterMode === 'multi_race' ? 'bg-emerald-500 text-slate-950 font-bold shadow-md shadow-emerald-500/20' : 'text-slate-400 hover:text-white'
              }`}
            >
              Multi-Race
            </button>
            <button
              onClick={() => setFilterMode('winners')}
              className={`px-3 py-1 text-xs font-semibold rounded-full transition-all ${
                filterMode === 'winners' ? 'bg-emerald-500 text-slate-950 font-bold shadow-md shadow-emerald-500/20' : 'text-slate-400 hover:text-white'
              }`}
            >
              Elected
            </button>
          </div>

          {/* Candidate Roster List */}
          <div className="space-y-1.5 max-h-[520px] overflow-y-auto pr-1">
            {filteredCandidates.map((cand) => {
              const isSelected = activeCandidate?.candidateName === cand.candidateName;
              return (
                <div
                  key={cand.candidateName}
                  onClick={() => setSelectedCandidate(cand)}
                  className={`p-3.5 rounded-2xl border cursor-pointer transition-all flex items-center justify-between ${
                    isSelected
                      ? 'bg-emerald-500/10 border-emerald-500 shadow-md ring-1 ring-emerald-500/40'
                      : 'bg-slate-800/40 border-slate-700/60 hover:border-slate-500 hover:bg-slate-800/70'
                  }`}
                >
                  <div className="truncate">
                    <div className="font-bold text-sm text-white truncate">
                      {cand.candidateName}
                    </div>
                    <div className="text-[11px] text-slate-400 flex items-center gap-2 mt-0.5">
                      <span className="font-mono">{cand.totalRaces} race{cand.totalRaces > 1 ? 's' : ''}</span>
                      <span>•</span>
                      <span className="text-emerald-400 font-bold font-mono">{cand.victories} win{cand.victories > 1 ? 's' : ''}</span>
                    </div>
                  </div>

                  <div className="text-right shrink-0">
                    <div className="text-xs font-bold text-white font-mono">
                      {cand.totalVotesAccumulated.toLocaleString()}
                    </div>
                    <div className="text-[10px] text-slate-500 font-mono">Total Votes</div>
                  </div>
                </div>
              );
            })}

            {filteredCandidates.length === 0 && (
              <div className="py-8 text-center text-slate-500 text-xs">
                No candidate found matching &quot;{searchTerm}&quot;
              </div>
            )}
          </div>
        </div>

        {/* Right Column: Selected Candidate Profile (7 cols) */}
        <div className="lg:col-span-7 bg-slate-900/60 backdrop-blur-md border border-slate-800 rounded-3xl p-6 space-y-5 shadow-xl">
          {activeCandidate ? (
            <div className="space-y-5">
              {/* Profile Header */}
              <div className="border-b border-slate-800 pb-4">
                <div className="flex items-center justify-between">
                  <span className="text-xs px-2.5 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 font-bold border border-emerald-500/20 font-mono">
                    Candidate Profile
                  </span>
                  <div className="text-xs text-slate-400 font-mono">
                    Career Win Rate: <strong className="text-emerald-400 font-bold">{activeCandidate.winRate}%</strong>
                  </div>
                </div>

                <h3 className="text-xl sm:text-2xl font-black text-white mt-2">
                  {activeCandidate.candidateName}
                </h3>
              </div>

              {/* Career KPIs */}
              <div className="grid grid-cols-3 gap-3.5">
                <div className="bg-slate-800/40 border border-slate-700/60 p-3.5 rounded-2xl text-center">
                  <div className="text-[10px] uppercase font-bold text-slate-400 font-mono">Total Contests</div>
                  <div className="text-2xl font-black text-white mt-0.5 font-mono">
                    {activeCandidate.totalRaces}
                  </div>
                  <div className="text-[10px] text-slate-500">Elections run</div>
                </div>

                <div className="bg-slate-800/40 border border-slate-700/60 p-3.5 rounded-2xl text-center">
                  <div className="text-[10px] uppercase font-bold text-slate-400 font-mono">Victories</div>
                  <div className="text-2xl font-black text-emerald-400 mt-0.5 font-mono">
                    {activeCandidate.victories}
                  </div>
                  <div className="text-[10px] text-slate-500">Seats won</div>
                </div>

                <div className="bg-slate-800/40 border border-slate-700/60 p-3.5 rounded-2xl text-center">
                  <div className="text-[10px] uppercase font-bold text-slate-400 font-mono">Votes Accumulated</div>
                  <div className="text-2xl font-black text-white mt-0.5 font-mono">
                    {activeCandidate.totalVotesAccumulated.toLocaleString()}
                  </div>
                  <div className="text-[10px] text-slate-500">Total ballots</div>
                </div>
              </div>

              {/* Race History Timeline */}
              <div className="space-y-3">
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-300 flex items-center gap-1.5 font-mono">
                  <Calendar className="w-4 h-4 text-emerald-400" />
                  Electoral Timeline & Results
                </h4>

                <div className="space-y-2.5">
                  {activeCandidate.races.map((race) => (
                    <div
                      key={`${race.year}-${race.raceType}`}
                      className={`p-4 rounded-2xl border transition-all ${
                        race.isWinner
                          ? 'bg-emerald-500/10 border-emerald-500/30 text-white'
                          : 'bg-slate-800/40 border-slate-700/60 text-slate-200'
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => onSelectYear(race.year)}
                            className="font-bold text-sm text-emerald-400 hover:underline flex items-center gap-1 font-mono"
                          >
                            {race.year} Election
                          </button>
                          <span className="text-xs px-2 py-0.5 rounded-full bg-slate-800 text-slate-300 font-semibold font-mono">
                            {race.raceType}
                          </span>
                        </div>

                        {race.isWinner ? (
                          <span className="text-xs font-bold text-emerald-400 flex items-center gap-1 font-mono">
                            <CheckCircle2 className="w-3.5 h-3.5" /> Won Seat
                          </span>
                        ) : (
                          <span className="text-xs text-slate-400 flex items-center gap-1 font-mono">
                            <XCircle className="w-3.5 h-3.5 text-slate-500" /> Not Elected
                          </span>
                        )}
                      </div>

                      <div className="flex items-center justify-between mt-2 text-xs font-mono">
                        <div className="text-slate-300 font-medium">
                          {race.votes.toLocaleString()} votes ({race.percentage.toFixed(1)}% of race)
                        </div>
                        <div className="text-[11px] text-slate-400">
                          {race.isIncumbent ? 'Ran as Incumbent' : 'Ran as Challenger'}
                        </div>
                      </div>

                      {/* Vote share bar */}
                      <div className="w-full bg-slate-900 rounded-full h-1.5 overflow-hidden mt-2">
                        <div
                          className={`h-full rounded-full ${race.isWinner ? 'bg-emerald-500 shadow-[0_0_6px_rgba(16,185,129,0.4)]' : 'bg-slate-600'}`}
                          style={{ width: `${Math.min(race.percentage, 100)}%` }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ) : (
            <div className="py-12 text-center text-slate-500 text-sm">
              Select a candidate from the roster to view their career profile.
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
