import React from 'react';
import { ElectionYearData } from '../types/election';
import { ALL_ELECTIONS } from '../data/electionData';
import { 
  Award, 
  Crown, 
  TrendingUp, 
  Users, 
  ShieldCheck, 
  BarChart3,
  Calendar,
  CheckCircle,
  Clock,
  ChevronRight
} from 'lucide-react';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  Tooltip, 
  ResponsiveContainer, 
  Cell 
} from 'recharts';

interface MayoralRaceViewProps {
  election: ElectionYearData;
  onSelectYear: (year: number) => void;
}

export const MayoralRaceView: React.FC<MayoralRaceViewProps> = ({
  election,
  onSelectYear
}) => {
  const mayor = election.mayoralRace;

  const chartData = mayor.candidates.map((cand) => ({
    name: cand.name,
    votes: cand.votes,
    percentage: cand.votePercentage,
    isWinner: cand.isWinner,
    color: cand.isWinner ? '#10b981' : '#475569'
  }));

  // Historical mayors comparison
  const historicalMayors = ALL_ELECTIONS.map((e) => ({
    year: e.year,
    mayor: e.mayoralRace.winner.name,
    votes: e.mayoralRace.winner.votes,
    pct: e.mayoralRace.winner.votePercentage,
    runnerUp: e.mayoralRace.runnerUp.name,
    runnerUpPct: e.mayoralRace.runnerUp.votePercentage,
    marginPct: e.mayoralRace.marginOfVictoryPct,
    totalTurnout: e.overallTurnout
  }));

  const winnerInitials = mayor.winner.name
    .split(' ')
    .map((n) => n[0])
    .join('')
    .substring(0, 2);

  return (
    <div className="space-y-6">
      {/* Top Victor Banner with Sleek styling */}
      <div className="bg-slate-900/60 backdrop-blur-md border border-slate-800 rounded-3xl p-6 sm:p-7 shadow-xl relative overflow-hidden">
        {/* Radial glow background */}
        <div className="absolute inset-0 opacity-15 pointer-events-none bg-[radial-gradient(circle_at_top_right,_var(--tw-gradient-stops))] from-emerald-500 via-transparent to-transparent" />

        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 relative z-10">
          <div className="flex items-center gap-5">
            <div className="w-16 h-16 bg-slate-800/90 rounded-2xl flex items-center justify-center border-2 border-emerald-500 shrink-0 shadow-lg shadow-emerald-500/20">
              <span className="text-2xl font-black text-emerald-400 font-mono">{winnerInitials}</span>
            </div>

            <div className="space-y-1">
              <div className="inline-flex items-center gap-2 px-2.5 py-0.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-bold font-mono uppercase tracking-wider">
                <Crown className="w-3.5 h-3.5" />
                Mayor Elect ({election.year})
              </div>
              <h2 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
                {mayor.winner.name}
              </h2>
              <p className="text-xs sm:text-sm text-slate-300 max-w-2xl leading-relaxed">
                Secured office with <strong className="text-emerald-400 font-bold">{mayor.winner.votes.toLocaleString()} votes ({mayor.winner.votePercentage.toFixed(1)}%)</strong>, leading by <strong className="text-emerald-400 font-bold">+{mayor.marginOfVictoryPct.toFixed(1)}% ({mayor.marginOfVictoryVotes.toLocaleString()} votes)</strong> over runner-up {mayor.runnerUp.name}.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3 shrink-0">
            <div className="bg-slate-800/60 border border-slate-700/60 p-3.5 rounded-2xl">
              <div className="text-[10px] text-slate-400 font-bold uppercase font-mono tracking-wider">Popular Vote Share</div>
              <div className="text-2xl font-black text-emerald-400 mt-0.5">
                {mayor.winner.votePercentage.toFixed(1)}%
              </div>
              <div className="text-[10px] text-slate-400 font-mono">Total: {mayor.totalVotes.toLocaleString()} cast</div>
            </div>

            <div className="bg-slate-800/60 border border-slate-700/60 p-3.5 rounded-2xl">
              <div className="text-[10px] text-slate-400 font-bold uppercase font-mono tracking-wider">Victory Margin</div>
              <div className="text-2xl font-black text-white mt-0.5">
                +{mayor.marginOfVictoryPct.toFixed(1)}%
              </div>
              <div className="text-[10px] text-slate-400 font-mono">+{mayor.marginOfVictoryVotes.toLocaleString()} votes</div>
            </div>
          </div>
        </div>
      </div>

      {/* Candidate Standings & Vote Share Chart */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Visual Chart (7 cols) */}
        <div className="lg:col-span-7 bg-slate-900/60 backdrop-blur-md border border-slate-800 rounded-3xl p-5 sm:p-6 space-y-4 shadow-lg">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <BarChart3 className="w-5 h-5 text-emerald-400" />
              <h3 className="text-base font-bold text-white">
                {election.year} Mayoral Popular Vote Breakdown
              </h3>
            </div>
            <span className="text-xs font-mono text-slate-400">
              {mayor.candidates.length} Candidates
            </span>
          </div>

          <div className="h-72 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={chartData}
                layout="vertical"
                margin={{ top: 5, right: 30, left: 80, bottom: 5 }}
              >
                <XAxis 
                  type="number" 
                  domain={[0, Math.ceil(mayor.winner.votePercentage + 5)]} 
                  unit="%" 
                  stroke="#64748b" 
                  fontSize={11} 
                />
                <YAxis 
                  dataKey="name" 
                  type="category" 
                  stroke="#94a3b8" 
                  fontSize={11} 
                  tickLine={false}
                  width={90}
                />
                <Tooltip
                  content={({ active, payload }) => {
                    if (active && payload && payload.length) {
                      const data = payload[0].payload;
                      return (
                        <div className="bg-slate-900 border border-slate-700 p-3 rounded-xl shadow-xl text-xs space-y-1">
                          <div className="font-bold text-white">{data.name}</div>
                          <div className="text-emerald-400 font-bold">
                            {data.votes.toLocaleString()} votes ({data.percentage.toFixed(2)}%)
                          </div>
                          {data.isWinner && (
                            <div className="text-emerald-400 text-[10px] font-bold flex items-center gap-1 font-mono uppercase">
                              <CheckCircle className="w-3 h-3" /> Elected Mayor
                            </div>
                          )}
                        </div>
                      );
                    }
                    return null;
                  }}
                />
                <Bar dataKey="percentage" radius={[0, 6, 6, 0]}>
                  {chartData.map((entry, index) => (
                    <Cell 
                      key={`cell-${index}`} 
                      fill={entry.isWinner ? '#10b981' : '#475569'} 
                    />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Candidate List Detailed (5 cols) */}
        <div className="lg:col-span-5 bg-slate-900/60 backdrop-blur-md border border-slate-800 rounded-3xl p-5 sm:p-6 space-y-3 shadow-lg flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-base font-bold text-white flex items-center gap-2">
                <Users className="w-4 h-4 text-emerald-400" />
                All Mayoral Candidates ({election.year})
              </h3>
              <span className="text-xs font-mono text-slate-400">Ranked by votes</span>
            </div>

            <div className="space-y-2 max-h-[320px] overflow-y-auto pr-1">
              {mayor.candidates.map((cand, idx) => {
                const diffFromWinnerPct = (mayor.winner.votePercentage - cand.votePercentage).toFixed(1);
                return (
                  <div
                    key={cand.id}
                    className={`p-3.5 rounded-2xl border transition-all ${
                      cand.isWinner
                        ? 'bg-emerald-500/10 border-emerald-500/30 text-white'
                        : 'bg-slate-800/40 border-slate-700/40 text-slate-200 hover:border-slate-600'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2.5 truncate">
                        <span className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-bold font-mono ${
                          cand.isWinner ? 'bg-emerald-500 text-slate-950' : 'bg-slate-700 text-slate-300'
                        }`}>
                          {idx + 1}
                        </span>
                        <span className="font-bold text-sm truncate">{cand.name}</span>
                        {cand.isWinner && (
                          <span className="text-[10px] px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-400 font-bold border border-emerald-500/30 font-mono uppercase">
                            Mayor
                          </span>
                        )}
                      </div>

                      <div className="text-right shrink-0">
                        <div className="text-sm font-bold text-white">
                          {cand.votePercentage.toFixed(1)}%
                        </div>
                        <div className="text-[10px] text-slate-400 font-mono">
                          {cand.votes.toLocaleString()} votes
                        </div>
                      </div>
                    </div>

                    {!cand.isWinner && (
                      <div className="mt-1.5 text-[11px] text-slate-400 flex items-center justify-between border-t border-slate-800/80 pt-1">
                        <span>Trailing behind winner:</span>
                        <span className="text-amber-400 font-mono font-medium">-{diffFromWinnerPct}% ({ (mayor.winner.votes - cand.votes).toLocaleString() } votes)</span>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>

      {/* Historical Mayoral Victors (2003-2022) */}
      <div className="bg-slate-900/60 backdrop-blur-md border border-slate-800 rounded-3xl p-5 sm:p-6 space-y-4 shadow-lg">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-base sm:text-lg font-bold text-white flex items-center gap-2">
              <Clock className="w-5 h-5 text-emerald-400" />
              Sudbury Mayoral Election History (2003 – 2022)
            </h3>
            <p className="text-xs text-slate-400 mt-0.5">
              Historical progression of Greater Sudbury mayors across all 6 modern election cycles
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {historicalMayors.map((item) => {
            const isCurrent = item.year === election.year;
            return (
              <div
                key={item.year}
                onClick={() => onSelectYear(item.year)}
                className={`p-4 rounded-2xl border transition-all cursor-pointer ${
                  isCurrent
                    ? 'bg-emerald-500/10 border-emerald-500 shadow-md ring-1 ring-emerald-500/40'
                    : 'bg-slate-800/40 border-slate-700/60 hover:border-slate-500 hover:bg-slate-800/70'
                }`}
              >
                <div className="flex items-center justify-between text-xs text-slate-400 mb-2">
                  <span className="font-bold text-white font-mono px-2 py-0.5 rounded-lg bg-slate-800">
                    {item.year} Election
                  </span>
                  <span className="text-slate-400 text-[11px] font-mono">
                    Turnout: {item.totalTurnout.toFixed(1)}%
                  </span>
                </div>

                <div className="text-base font-bold text-white">
                  {item.mayor}
                </div>
                
                <div className="text-xs text-emerald-400 font-bold mt-0.5">
                  {item.votes.toLocaleString()} votes ({item.pct.toFixed(1)}%)
                </div>

                <div className="mt-3 pt-2.5 border-t border-slate-700/60 text-xs text-slate-300 space-y-1">
                  <div className="flex items-center justify-between text-[11px]">
                    <span className="text-slate-400">Runner-up:</span>
                    <span className="text-slate-200 font-medium">{item.runnerUp} ({item.runnerUpPct.toFixed(1)}%)</span>
                  </div>
                  <div className="flex items-center justify-between text-[11px]">
                    <span className="text-slate-400">Victory Margin:</span>
                    <span className="text-emerald-400 font-bold">+{item.marginPct.toFixed(1)}%</span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
