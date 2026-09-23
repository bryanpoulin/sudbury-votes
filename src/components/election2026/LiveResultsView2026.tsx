import React, { useState } from 'react';
import { CANDIDATES_2026, WARD_LOOKUP_ENTRIES } from '../../data/electionData2026';
import { 
  BarChart2, 
  Crown, 
  Radio, 
  CheckCircle2, 
  Flame, 
  RotateCcw, 
  TrendingUp, 
  Clock, 
  Award,
  Layers,
  Sparkles
} from 'lucide-react';

export const LiveResultsView2026: React.FC = () => {
  const [reportingPercent, setReportingPercent] = useState<number>(85); // 85% reporting simulation

  const mayoralCandidates = CANDIDATES_2026.filter((c) => c.race === 'Mayoral')
    .sort((a, b) => (b.liveVotes || 0) - (a.liveVotes || 0));

  const totalMayoralVotes = mayoralCandidates.reduce((acc, c) => acc + (c.liveVotes || 0), 0);

  return (
    <div className="space-y-6">
      {/* Live Status Header & Ticker */}
      <div className="bg-white dark:bg-slate-900/80 border border-slate-200 dark:border-emerald-500/30 rounded-3xl p-6 shadow-xl dark:shadow-2xl space-y-4">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="p-3 bg-red-500/15 text-red-500 dark:text-red-400 rounded-2xl border border-red-500/30 flex items-center justify-center">
              <Radio className="w-6 h-6 animate-pulse text-red-500 dark:text-red-400" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="px-2 py-0.5 bg-red-500/20 text-red-700 dark:text-red-300 text-[10px] font-mono uppercase font-bold rounded-full border border-red-500/40">
                  Live Election Returns
                </span>
                <span className="text-xs font-mono text-slate-500 dark:text-slate-400">Oct 26, 2026</span>
              </div>
              <h3 className="text-xl font-bold text-slate-900 dark:text-white mt-1">
                Greater Sudbury 2026 Municipal Results Desk
              </h3>
            </div>
          </div>

          {/* Simulation Progress Selector */}
          <div className="flex items-center gap-2 bg-slate-100 dark:bg-slate-950 p-1.5 rounded-2xl border border-slate-200 dark:border-slate-800">
            <span className="text-[10px] font-mono uppercase tracking-wider text-slate-500 dark:text-slate-400 pl-2">
              Returns Simulator:
            </span>
            {[
              { label: 'Early (25%)', val: 25 },
              { label: 'Mid (60%)', val: 60 },
              { label: 'Projected (85%)', val: 85 },
              { label: 'Final (100%)', val: 100 }
            ].map((mode) => (
              <button
                key={mode.val}
                onClick={() => setReportingPercent(mode.val)}
                className={`px-2.5 py-1 rounded-xl text-[11px] font-semibold transition-all cursor-pointer ${
                  reportingPercent === mode.val
                    ? 'bg-emerald-500 text-slate-950 font-bold shadow-sm'
                    : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                }`}
              >
                {mode.label}
              </button>
            ))}
          </div>
        </div>

        {/* Live Metrics Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-2 border-t border-slate-200 dark:border-slate-800">
          <div className="p-3.5 bg-slate-50 dark:bg-slate-950/60 rounded-2xl border border-slate-200 dark:border-slate-800">
            <div className="text-[10px] font-mono text-slate-500 dark:text-slate-400 uppercase tracking-wider">Polls Reporting</div>
            <div className="text-xl font-black text-emerald-600 dark:text-emerald-400 font-mono mt-0.5">
              {Math.round((reportingPercent / 100) * 110)} / 110
            </div>
            <div className="text-[11px] text-slate-500 dark:text-slate-400 font-mono">{reportingPercent}% Complete</div>
          </div>

          <div className="p-3.5 bg-slate-50 dark:bg-slate-950/60 rounded-2xl border border-slate-200 dark:border-slate-800">
            <div className="text-[10px] font-mono text-slate-500 dark:text-slate-400 uppercase tracking-wider">Total Ballots Counted</div>
            <div className="text-xl font-black text-slate-900 dark:text-white font-mono mt-0.5">
              {Math.round((totalMayoralVotes * (reportingPercent / 85))).toLocaleString()}
            </div>
            <div className="text-[11px] text-slate-500 dark:text-slate-400 font-mono">City-Wide</div>
          </div>

          <div className="p-3.5 bg-slate-50 dark:bg-slate-950/60 rounded-2xl border border-slate-200 dark:border-slate-800">
            <div className="text-[10px] font-mono text-slate-500 dark:text-slate-400 uppercase tracking-wider">Estimated Turnout</div>
            <div className="text-xl font-black text-emerald-600 dark:text-emerald-400 font-mono mt-0.5">
              {((totalMayoralVotes / 115000) * 100).toFixed(1)}%
            </div>
            <div className="text-[11px] text-slate-500 dark:text-slate-400 font-mono">Registered Electors</div>
          </div>

          <div className="p-3.5 bg-slate-50 dark:bg-slate-950/60 rounded-2xl border border-slate-200 dark:border-slate-800">
            <div className="text-[10px] font-mono text-slate-500 dark:text-slate-400 uppercase tracking-wider">Races Called</div>
            <div className="text-xl font-black text-blue-600 dark:text-blue-400 font-mono mt-0.5">
              {reportingPercent >= 85 ? '13 / 13' : reportingPercent >= 60 ? '8 / 13' : '3 / 13'}
            </div>
            <div className="text-[11px] text-slate-500 dark:text-slate-400 font-mono">Projected Winners</div>
          </div>
        </div>
      </div>

      {/* Mayoral Contest Live Returns Leaderboard */}
      <div className="bg-white dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 shadow-md dark:shadow-xl space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <span className="p-2 bg-emerald-500/15 text-emerald-600 dark:text-emerald-400 rounded-xl border border-emerald-500/30">
              <Crown className="w-5 h-5" />
            </span>
            <div>
              <h3 className="text-base font-bold text-slate-900 dark:text-white">Mayoral Contest Live Leaderboard</h3>
              <p className="text-xs text-slate-500 dark:text-slate-400">Head of Council • City-Wide Tabulation</p>
            </div>
          </div>
          {reportingPercent >= 85 && (
            <span className="px-3 py-1 bg-emerald-500/20 text-emerald-700 dark:text-emerald-300 text-xs font-mono font-bold rounded-full border border-emerald-500/40 flex items-center gap-1.5">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
              Projected Winner Called
            </span>
          )}
        </div>

        <div className="space-y-3 pt-2">
          {mayoralCandidates.map((cand, idx) => {
            const votes = Math.round((cand.liveVotes || 0) * (reportingPercent / 85));
            const pct = cand.liveVotePct || 0;
            const isLeader = idx === 0;

            return (
              <div
                key={cand.id}
                className={`p-4 rounded-2xl border transition-all ${
                  isLeader
                    ? 'bg-emerald-50/50 dark:bg-emerald-500/10 border-emerald-500/30 shadow-md shadow-emerald-500/5'
                    : 'bg-slate-50 dark:bg-slate-950/60 border-slate-200 dark:border-slate-800'
                }`}
              >
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2.5">
                    <span className="font-mono text-xs font-bold text-slate-400 w-4">#{idx + 1}</span>
                    <div>
                      <div className="font-bold text-slate-900 dark:text-white text-sm flex items-center gap-2">
                        {cand.name}
                        {isLeader && reportingPercent >= 85 && (
                          <span className="px-2 py-0.5 bg-emerald-500 text-slate-950 text-[10px] font-black rounded-full uppercase font-mono">
                            Winner
                          </span>
                        )}
                      </div>
                      <div className="text-[11px] text-slate-500 dark:text-slate-400">{cand.occupation}</div>
                    </div>
                  </div>

                  <div className="text-right">
                    <div className="text-lg font-black text-emerald-600 dark:text-emerald-400 font-mono">{pct.toFixed(1)}%</div>
                    <div className="text-xs text-slate-500 dark:text-slate-400 font-mono">{votes.toLocaleString()} votes</div>
                  </div>
                </div>

                {/* Progress bar */}
                <div className="w-full h-2.5 bg-slate-200 dark:bg-slate-800 rounded-full overflow-hidden">
                  <div
                    className={`h-full rounded-full transition-all duration-500 ${
                      isLeader ? 'bg-emerald-500' : idx === 1 ? 'bg-blue-500' : 'bg-slate-400 dark:bg-slate-600'
                    }`}
                    style={{ width: `${pct}%` }}
                  ></div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* 12 Ward Races Live Leader Grid */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <span className="p-2 bg-blue-500/15 text-blue-600 dark:text-blue-400 rounded-xl border border-blue-500/30">
              <Layers className="w-5 h-5" />
            </span>
            <div>
              <h3 className="text-base font-bold text-slate-900 dark:text-white">12 Ward Council Contests (Live Projections)</h3>
              <p className="text-xs text-slate-500 dark:text-slate-400">Current leading candidates across all Greater Sudbury municipal wards</p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {Array.from({ length: 12 }, (_, i) => i + 1).map((wardNum) => {
            const wardCandidates = CANDIDATES_2026.filter((c) => c.race === wardNum)
              .sort((a, b) => (b.liveVotes || 0) - (a.liveVotes || 0));
            const leader = wardCandidates[0];
            const runnerUp = wardCandidates[1];
            const wardInfo = WARD_LOOKUP_ENTRIES.find((w) => w.wardNumber === wardNum);

            return (
              <div
                key={wardNum}
                className="bg-white dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800 rounded-3xl p-5 space-y-3 shadow-sm dark:shadow-xl flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="w-7 h-7 bg-emerald-500/15 text-emerald-600 dark:text-emerald-400 rounded-lg flex items-center justify-center font-bold text-xs font-mono border border-emerald-500/30">
                      W{wardNum}
                    </span>
                    <span className="text-[10px] font-mono text-emerald-700 dark:text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded-full border border-emerald-500/20 font-semibold">
                      Projected Win
                    </span>
                  </div>

                  <h4 className="text-sm font-bold text-slate-900 dark:text-white truncate">{wardInfo?.wardName}</h4>
                  
                  {/* Leader Box */}
                  {leader && (
                    <div className="mt-3 p-3 bg-emerald-50/60 dark:bg-emerald-500/10 border border-emerald-500/30 rounded-2xl space-y-1">
                      <div className="text-[10px] font-mono uppercase tracking-wider text-emerald-700 dark:text-emerald-400 font-bold">
                        Leading Candidate
                      </div>
                      <div className="font-bold text-slate-900 dark:text-white text-sm">{leader.name}</div>
                      <div className="flex items-center justify-between text-xs font-mono pt-0.5">
                        <span className="text-emerald-600 dark:text-emerald-400 font-bold">{leader.liveVotePct}%</span>
                        <span className="text-slate-500 dark:text-slate-400">{Math.round((leader.liveVotes || 0) * (reportingPercent / 85)).toLocaleString()} votes</span>
                      </div>
                    </div>
                  )}

                  {/* Runner up */}
                  {runnerUp && (
                    <div className="mt-2 p-2.5 bg-slate-50 dark:bg-slate-950/60 rounded-xl border border-slate-200 dark:border-slate-800 text-xs flex items-center justify-between">
                      <span className="text-slate-700 dark:text-slate-300 font-medium truncate pr-2">#2 {runnerUp.name}</span>
                      <span className="font-mono text-slate-500 dark:text-slate-400 shrink-0">{runnerUp.liveVotePct}%</span>
                    </div>
                  )}
                </div>

                <div className="pt-2 border-t border-slate-200 dark:border-slate-800/80 text-[11px] font-mono text-slate-500 dark:text-slate-400 flex items-center justify-between">
                  <span>Margin: +{((leader?.liveVotePct || 0) - (runnerUp?.liveVotePct || 0)).toFixed(1)}%</span>
                  <span className="text-emerald-600 dark:text-emerald-400">100% Contested</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
