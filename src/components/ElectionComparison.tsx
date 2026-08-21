import React, { useState } from 'react';
import { ALL_ELECTIONS, AVAILABLE_YEARS, getElectionByYear } from '../data/electionData';
import { WARD_GEOMETRIES } from '../data/wardGeometries';
import { 
  GitCompare, 
  TrendingUp, 
  Award, 
  Users, 
  ArrowRight, 
  RotateCcw,
  ArrowUpRight,
  ArrowDownRight
} from 'lucide-react';

interface ElectionComparisonProps {
  onSelectWard: (wardNumber: number) => void;
}

export const ElectionComparison: React.FC<ElectionComparisonProps> = ({ onSelectWard }) => {
  const [yearA, setYearA] = useState<number>(2022);
  const [yearB, setYearB] = useState<number>(2018);

  const electionA = getElectionByYear(yearA);
  const electionB = getElectionByYear(yearB);

  const turnoutDiff = (electionA.overallTurnout - electionB.overallTurnout).toFixed(1);
  const ballotsDiff = electionA.ballotsCast - electionB.ballotsCast;

  return (
    <div className="space-y-6">
      {/* Compare Header with Selectors */}
      <div className="bg-slate-900/60 backdrop-blur-md border border-slate-800 rounded-3xl p-6 shadow-xl space-y-4 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10 pointer-events-none bg-[radial-gradient(circle_at_top_right,_var(--tw-gradient-stops))] from-emerald-500 via-transparent to-transparent" />
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 relative z-10">
          <div>
            <div className="flex items-center gap-2">
              <GitCompare className="w-6 h-6 text-emerald-400" />
              <h2 className="text-xl sm:text-2xl font-black text-white tracking-tight">
                Side-by-Side Election Comparison
              </h2>
            </div>
            <p className="text-xs sm:text-sm text-slate-300 mt-0.5">
              Compare any two historical Greater Sudbury municipal election cycles to analyze shifts in turnout, mayoral mandates, and ward representation
            </p>
          </div>

          {/* Selectors */}
          <div className="flex items-center gap-3 bg-slate-800/40 p-2 rounded-full border border-slate-700/70">
            <div className="flex items-center gap-2">
              <span className="text-xs font-semibold text-slate-400 pl-2">A:</span>
              <select
                value={yearA}
                onChange={(e) => setYearA(Number(e.target.value))}
                className="bg-slate-900 border border-slate-700 text-white text-xs font-bold rounded-full px-3 py-1.5 focus:outline-none focus:border-emerald-500 font-mono"
              >
                {AVAILABLE_YEARS.map((y) => (
                  <option key={`a-${y}`} value={y}>{y} Election</option>
                ))}
              </select>
            </div>

            <span className="text-emerald-500 font-mono font-bold text-xs">VS</span>

            <div className="flex items-center gap-2">
              <span className="text-xs font-semibold text-slate-400">B:</span>
              <select
                value={yearB}
                onChange={(e) => setYearB(Number(e.target.value))}
                className="bg-slate-900 border border-slate-700 text-white text-xs font-bold rounded-full px-3 py-1.5 focus:outline-none focus:border-emerald-500 font-mono"
              >
                {AVAILABLE_YEARS.map((y) => (
                  <option key={`b-${y}`} value={y}>{y} Election</option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* High-Level Comparison KPI Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 pt-2 relative z-10">
          {/* Turnout Shift */}
          <div className="bg-slate-800/40 border border-slate-700/60 p-4 rounded-2xl space-y-1">
            <div className="text-[10px] text-slate-400 font-bold uppercase font-mono">Turnout Shift (A vs B)</div>
            <div className="flex items-center gap-2">
              <span className="text-xl font-black text-white font-mono">{electionA.overallTurnout.toFixed(1)}% vs {electionB.overallTurnout.toFixed(1)}%</span>
            </div>
            <div className={`text-xs font-bold font-mono flex items-center gap-1 ${
              Number(turnoutDiff) >= 0 ? 'text-emerald-400' : 'text-amber-400'
            }`}>
              {Number(turnoutDiff) >= 0 ? <ArrowUpRight className="w-3.5 h-3.5" /> : <ArrowDownRight className="w-3.5 h-3.5" />}
              {Number(turnoutDiff) >= 0 ? `+${turnoutDiff}% in ${yearA}` : `${turnoutDiff}% in ${yearA}`}
            </div>
          </div>

          {/* Mayor Elected Comparison */}
          <div className="bg-slate-800/40 border border-slate-700/60 p-4 rounded-2xl space-y-1">
            <div className="text-[10px] text-slate-400 font-bold uppercase font-mono">Mayoral Winners</div>
            <div className="text-sm font-bold text-white truncate">
              {electionA.mayoralRace.winner.name} ({electionA.mayoralRace.winner.votePercentage.toFixed(1)}%)
            </div>
            <div className="text-xs text-slate-400 truncate">
              vs {electionB.mayoralRace.winner.name} ({electionB.mayoralRace.winner.votePercentage.toFixed(1)}%)
            </div>
          </div>

          {/* Ballots Difference */}
          <div className="bg-slate-800/40 border border-slate-700/60 p-4 rounded-2xl space-y-1">
            <div className="text-[10px] text-slate-400 font-bold uppercase font-mono">Total Ballots Cast</div>
            <div className="text-xl font-black text-white font-mono">
              {electionA.ballotsCast.toLocaleString()}
            </div>
            <div className="text-xs text-slate-400 font-mono">
              Diff: {ballotsDiff >= 0 ? `+${ballotsDiff.toLocaleString()}` : ballotsDiff.toLocaleString()} votes
            </div>
          </div>

          {/* Council Turnover */}
          <div className="bg-slate-800/40 border border-slate-700/60 p-4 rounded-2xl space-y-1">
            <div className="text-[10px] text-slate-400 font-bold uppercase font-mono">Council Turnover</div>
            <div className="text-xl font-black text-emerald-400 font-mono">
              {electionA.councilTurnoverCount} seats vs {electionB.councilTurnoverCount} seats
            </div>
            <div className="text-xs text-slate-400">
              Out of 12 ward council seats
            </div>
          </div>
        </div>
      </div>

      {/* Ward-by-Ward Comparison Table */}
      <div className="bg-slate-900/60 backdrop-blur-md border border-slate-800 rounded-3xl p-6 space-y-4 shadow-xl overflow-hidden">
        <h3 className="text-base font-bold text-white flex items-center gap-2">
          <Award className="w-5 h-5 text-emerald-400" />
          Ward-by-Ward Electoral Shifts ({yearA} vs {yearB})
        </h3>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="border-b border-slate-700/60 bg-slate-800/40 text-slate-400 font-mono">
                <th className="py-3 px-3 font-bold">Ward</th>
                <th className="py-3 px-3 font-bold">{yearA} Winner & Votes</th>
                <th className="py-3 px-3 font-bold text-center">{yearA} Turnout</th>
                <th className="py-3 px-3 font-bold">{yearB} Winner & Votes</th>
                <th className="py-3 px-3 font-bold text-center">{yearB} Turnout</th>
                <th className="py-3 px-3 font-bold text-center">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60">
              {WARD_GEOMETRIES.map((geo) => {
                const wardA = electionA.wards.find((w) => w.wardNumber === geo.wardNumber);
                const wardB = electionB.wards.find((w) => w.wardNumber === geo.wardNumber);

                const sameWinner = wardA?.winner.name === wardB?.winner.name;

                return (
                  <tr key={geo.wardNumber} className="hover:bg-slate-800/30 transition-colors">
                    <td className="py-3 px-3 font-semibold text-white">
                      <button
                        onClick={() => onSelectWard(geo.wardNumber)}
                        className="hover:text-emerald-400 hover:underline flex items-center gap-1.5"
                      >
                        <span className="w-5 h-5 rounded-full bg-emerald-500/10 text-emerald-400 flex items-center justify-center text-[10px] font-bold font-mono">
                          {geo.wardNumber}
                        </span>
                        <span>{geo.shortLabel}</span>
                      </button>
                    </td>

                    {/* Year A */}
                    <td className="py-3 px-3">
                      <div className="font-bold text-slate-100">{wardA?.winner.name}</div>
                      <div className="text-[10px] text-emerald-400 font-mono">
                        {wardA?.winner.votePercentage.toFixed(1)}% ({wardA?.winner.votes.toLocaleString()} votes)
                      </div>
                    </td>
                    <td className="py-3 px-3 text-center font-bold text-emerald-400 font-mono">
                      {wardA?.turnoutPercentage.toFixed(1)}%
                    </td>

                    {/* Year B */}
                    <td className="py-3 px-3">
                      <div className="font-bold text-slate-100">{wardB?.winner.name}</div>
                      <div className="text-[10px] text-slate-400 font-mono">
                        {wardB?.winner.votePercentage.toFixed(1)}% ({wardB?.winner.votes.toLocaleString()} votes)
                      </div>
                    </td>
                    <td className="py-3 px-3 text-center font-bold text-slate-400 font-mono">
                      {wardB?.turnoutPercentage.toFixed(1)}%
                    </td>

                    {/* Status */}
                    <td className="py-3 px-3 text-center">
                      {sameWinner ? (
                        <span className="px-2.5 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 text-[10px] font-bold border border-emerald-500/20 font-mono">
                          Retained Rep
                        </span>
                      ) : (
                        <span className="px-2.5 py-0.5 rounded-full bg-purple-500/20 text-purple-300 text-[10px] font-bold border border-purple-500/30 font-mono">
                          Flipped Rep
                        </span>
                      )}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
