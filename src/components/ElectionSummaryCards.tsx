import React from 'react';
import { ElectionYearData } from '../types/election';
import { 
  Users, 
  CheckCircle2, 
  TrendingUp, 
  Award, 
  RotateCcw, 
  Flame, 
  Info,
  Calendar,
  Vote
} from 'lucide-react';

interface ElectionSummaryCardsProps {
  election: ElectionYearData;
  onSelectWard: (wardNumber: number) => void;
}

export const ElectionSummaryCards: React.FC<ElectionSummaryCardsProps> = ({
  election,
  onSelectWard
}) => {
  // Find closest race
  const sortedByMargin = [...election.wards].sort((a, b) => a.marginOfVictoryPct - b.marginOfVictoryPct);
  const closestWard = sortedByMargin[0];

  // Incumbents retained vs turned over
  const incumbentsRetainedCount = election.wards.filter((w) => w.isIncumbentRetained).length;
  const turnoverPct = Math.round((election.councilTurnoverCount / election.totalCouncilSeats) * 100);

  // Compact balloting mode label mapping
  const getShortVotingMethod = (method: string) => {
    const lower = method.toLowerCase();
    if (lower.includes('electronic') || lower.includes('online') || lower.includes('web')) return 'Online';
    if (lower.includes('advance polls') || lower.includes('paper')) return 'Paper Ballots';
    return 'Online';
  };

  return (
    <div className="space-y-4">
      {/* Historical Context Notice in sleek container */}
      <div className="bg-slate-900/60 backdrop-blur-sm border border-slate-800 rounded-2xl p-4 sm:p-5 flex flex-col md:flex-row md:items-center justify-between gap-4 text-slate-200 shadow-lg">
        <div className="flex items-start gap-3.5">
          <div className="p-2 rounded-xl bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 shrink-0 mt-0.5 shadow-sm">
            <Info className="w-4 h-4" />
          </div>
          <div>
            <div className="flex items-center gap-2 font-bold text-slate-100 text-sm">
              <span>{election.year} Municipal Election Context</span>
              <span className="text-[11px] font-mono px-2 py-0.5 rounded-md bg-slate-800/80 text-emerald-400 border border-slate-700">
                {election.electionDate}
              </span>
            </div>
            <p className="text-xs text-slate-400 mt-1 leading-relaxed max-w-4xl">
              {election.notes}
            </p>
          </div>
        </div>
        <div className="shrink-0 flex items-center gap-2 text-xs bg-slate-800/60 px-3.5 py-1.5 rounded-xl border border-slate-700/60 text-slate-300">
          <span className="text-slate-500 font-medium">Balloting Mode:</span>
          <span className="font-semibold text-emerald-300 font-mono">
            {getShortVotingMethod(election.votingMethod)}
          </span>
        </div>
      </div>

      {/* Grid of Key Metrics */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3.5">
        {/* Mayor Elected */}
        <div className="bg-slate-900/60 backdrop-blur-sm border border-slate-800 rounded-2xl p-4 flex flex-col justify-between hover:border-slate-700 transition-all shadow-md group">
          <div className="flex items-center justify-between text-slate-500">
            <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Mayor Elected</span>
            <Award className="w-4 h-4 text-emerald-400" />
          </div>
          <div className="mt-3">
            <div className="text-base font-bold text-white truncate" title={election.mayoralRace.winner.name}>
              {election.mayoralRace.winner.name}
            </div>
            <div className="text-xs text-emerald-400 font-semibold flex items-center gap-1 mt-1">
              <span>{election.mayoralRace.winner.votePercentage.toFixed(1)}%</span>
              <span className="text-slate-500 font-normal">({election.mayoralRace.winner.votes.toLocaleString()} votes)</span>
            </div>
          </div>
        </div>

        {/* Voter Turnout with Progress Bar */}
        <div className="bg-slate-900/60 backdrop-blur-sm border border-slate-800 rounded-2xl p-4 flex flex-col justify-between hover:border-slate-700 transition-all shadow-md">
          <div className="flex items-center justify-between text-slate-500">
            <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Voter Turnout</span>
            <TrendingUp className="w-4 h-4 text-emerald-400" />
          </div>
          <div className="mt-3">
            <div className="flex items-baseline justify-between">
              <div className="text-2xl font-black text-white">
                {election.overallTurnout.toFixed(1)}%
              </div>
              <span className="text-[10px] text-slate-400 font-mono">
                {election.ballotsCast.toLocaleString()} votes
              </span>
            </div>
            <div className="w-full bg-slate-800/80 h-1.5 rounded-full overflow-hidden mt-2">
              <div 
                className="bg-emerald-500 h-full rounded-full shadow-[0_0_8px_rgba(16,185,129,0.4)]"
                style={{ width: `${Math.min(election.overallTurnout, 100)}%` }}
              />
            </div>
          </div>
        </div>

        {/* Victory Margin */}
        <div className="bg-slate-900/60 backdrop-blur-sm border border-slate-800 rounded-2xl p-4 flex flex-col justify-between hover:border-slate-700 transition-all shadow-md">
          <div className="flex items-center justify-between text-slate-500">
            <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Mayoral Margin</span>
            <CheckCircle2 className="w-4 h-4 text-emerald-400" />
          </div>
          <div className="mt-3">
            <div className="text-2xl font-black text-emerald-400">
              +{election.mayoralRace.marginOfVictoryPct.toFixed(1)}%
            </div>
            <div className="text-[11px] text-slate-400 mt-0.5">
              +{election.mayoralRace.marginOfVictoryVotes.toLocaleString()} margin
            </div>
          </div>
        </div>

        {/* Council Turnover */}
        <div className="bg-slate-900/60 backdrop-blur-sm border border-slate-800 rounded-2xl p-4 flex flex-col justify-between hover:border-slate-700 transition-all shadow-md">
          <div className="flex items-center justify-between text-slate-500">
            <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Council Turnover</span>
            <RotateCcw className="w-4 h-4 text-emerald-400" />
          </div>
          <div className="mt-3">
            <div className="text-2xl font-black text-white">
              {election.councilTurnoverCount} <span className="text-xs font-normal text-slate-400">of 12 seats</span>
            </div>
            <div className="text-[11px] text-slate-400 mt-0.5">
              {incumbentsRetainedCount} incumbents retained
            </div>
          </div>
        </div>

        {/* Registered Electorate */}
        <div className="bg-slate-900/60 backdrop-blur-sm border border-slate-800 rounded-2xl p-4 flex flex-col justify-between hover:border-slate-700 transition-all shadow-md">
          <div className="flex items-center justify-between text-slate-500">
            <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Registered Electors</span>
            <Users className="w-4 h-4 text-emerald-400" />
          </div>
          <div className="mt-3">
            <div className="text-2xl font-black text-white">
              {election.registeredVoters.toLocaleString()}
            </div>
            <div className="text-[11px] text-slate-400 mt-0.5">
              City-wide eligible voters
            </div>
          </div>
        </div>

        {/* Closest Ward Race */}
        <div 
          onClick={() => closestWard && onSelectWard(closestWard.wardNumber)}
          className="bg-slate-900/60 backdrop-blur-sm border border-slate-800 hover:border-emerald-500/50 rounded-2xl p-4 flex flex-col justify-between cursor-pointer transition-all shadow-md group"
        >
          <div className="flex items-center justify-between text-slate-500">
            <span className="text-[10px] font-bold uppercase tracking-wider text-amber-400 flex items-center gap-1">
              <Flame className="w-3.5 h-3.5 text-amber-400" />
              Closest Race
            </span>
            <span className="text-[10px] font-mono text-emerald-400 group-hover:underline">W{closestWard?.wardNumber} →</span>
          </div>
          <div className="mt-3">
            <div className="text-sm font-bold text-white truncate">
              Ward {closestWard?.wardNumber} ({closestWard?.winner.name.split(' ').pop()})
            </div>
            <div className="text-[11px] text-amber-300 font-medium mt-0.5">
              Margin: +{closestWard?.marginOfVictoryPct.toFixed(1)}% ({closestWard?.marginOfVictoryVotes} votes)
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
