import React, { useState } from 'react';
import { ALL_ELECTIONS, getWardHistoricalProgression } from '../data/electionData';
import { WARD_GEOMETRIES } from '../data/wardGeometries';
import { 
  TrendingUp, 
  BarChart3, 
  Users, 
  RotateCcw, 
  Award, 
  Flame, 
  CheckCircle2,
  Calendar,
  Layers,
  ChevronRight
} from 'lucide-react';
import { 
  LineChart, 
  Line, 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  Legend, 
  ResponsiveContainer, 
  AreaChart, 
  Area,
  Cell
} from 'recharts';

interface HistoricalTrendsViewProps {
  onSelectYear: (year: number) => void;
  onSelectWard: (wardNumber: number) => void;
}

export const HistoricalTrendsView: React.FC<HistoricalTrendsViewProps> = ({
  onSelectYear,
  onSelectWard
}) => {
  const [selectedMatrixMetric, setSelectedMatrixMetric] = useState<'winner' | 'turnout' | 'margin'>('winner');

  // Turnout Trend Data (sorted chronological)
  const turnoutTrendData = [...ALL_ELECTIONS].reverse().map((e) => ({
    year: e.year,
    turnout: e.overallTurnout,
    ballotsCast: e.ballotsCast,
    registeredVoters: e.registeredVoters,
    turnoverSeats: e.councilTurnoverCount,
    mayor: e.mayoralRace.winner.name,
    mayoralVotePct: e.mayoralRace.winner.votePercentage,
    mayoralMarginPct: e.mayoralRace.marginOfVictoryPct
  }));

  // Average Turnout by Ward across all 6 elections
  const wardAverageTurnout = WARD_GEOMETRIES.map((geo) => {
    let sumTurnout = 0;
    ALL_ELECTIONS.forEach((e) => {
      const w = e.wards.find((item) => item.wardNumber === geo.wardNumber);
      if (w) sumTurnout += w.turnoutPercentage;
    });
    const avg = Number((sumTurnout / ALL_ELECTIONS.length).toFixed(1));
    return {
      wardNumber: geo.wardNumber,
      wardShort: `Ward ${geo.wardNumber}`,
      name: geo.wardName,
      avgTurnout: avg
    };
  }).sort((a, b) => b.avgTurnout - a.avgTurnout);

  return (
    <div className="space-y-8">
      {/* Overview Banner */}
      <div className="bg-slate-900/60 backdrop-blur-md border border-slate-800 rounded-3xl p-6 sm:p-7 shadow-xl space-y-2 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10 pointer-events-none bg-[radial-gradient(circle_at_top_right,_var(--tw-gradient-stops))] from-emerald-500 via-transparent to-transparent" />
        <div className="flex items-center gap-2 relative z-10">
          <TrendingUp className="w-6 h-6 text-emerald-400" />
          <h2 className="text-xl sm:text-2xl font-black text-white tracking-tight">
            Historical Trends (2003-2022)
          </h2>
        </div>
        <p className="text-xs sm:text-sm text-slate-300 max-w-4xl leading-relaxed relative z-10">
          Longitudinal analysis of voter participation, mayoral dominance, council turnover rates, and ward stability across municipal election cycles.
        </p>
      </div>

      {/* Chart 1: Turnout Trends & Ballots Cast */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        <div className="lg:col-span-8 bg-slate-900/60 backdrop-blur-md border border-slate-800 rounded-3xl p-6 space-y-4 shadow-xl">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-base font-bold text-white flex items-center gap-2">
                <TrendingUp className="w-5 h-5 text-emerald-400" />
                Voter Turnout Evolution
              </h3>
              <p className="text-xs text-slate-400 mt-0.5">
                City-wide participation peaked at 51.5% in 2014 following key civic accountability debates
              </p>
            </div>
          </div>

          <div className="h-72 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={turnoutTrendData} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                <defs>
                  <linearGradient id="emeraldTurnoutGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#10b981" stopOpacity={0.4}/>
                    <stop offset="95%" stopColor="#10b981" stopOpacity={0.0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#334155" opacity={0.3} />
                <XAxis dataKey="year" stroke="#94a3b8" fontSize={12} />
                <YAxis domain={[35, 60]} unit="%" stroke="#94a3b8" fontSize={12} />
                <Tooltip
                  content={({ active, payload }) => {
                    if (active && payload && payload.length) {
                      const data = payload[0].payload;
                      return (
                        <div className="bg-slate-900 border border-slate-700 p-3 rounded-2xl shadow-xl text-xs space-y-1.5">
                          <div className="font-bold text-white text-sm">{data.year} Sudbury Municipal Election</div>
                          <div className="text-emerald-400 font-bold text-base">
                            Turnout: {data.turnout.toFixed(1)}%
                          </div>
                          <div className="text-slate-300 font-mono">
                            Ballots: {data.ballotsCast.toLocaleString()} / {data.registeredVoters.toLocaleString()}
                          </div>
                          <div className="text-slate-400 text-[11px] pt-1 border-t border-slate-800">
                            Mayor: {data.mayor} ({data.mayoralVotePct.toFixed(1)}% of vote)
                          </div>
                        </div>
                      );
                    }
                    return null;
                  }}
                />
                <Area 
                  type="monotone" 
                  dataKey="turnout" 
                  stroke="#10b981" 
                  strokeWidth={3} 
                  fillOpacity={1} 
                  fill="url(#emeraldTurnoutGrad)" 
                  name="Turnout %"
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Turnout Stats Cards (4 cols) */}
        <div className="lg:col-span-4 bg-slate-900/60 backdrop-blur-md border border-slate-800 rounded-3xl p-6 space-y-4 shadow-xl flex flex-col justify-between">
          <div>
            <h3 className="text-base font-bold text-white flex items-center gap-2 mb-3">
              <Users className="w-5 h-5 text-emerald-400" />
              Turnout Fast Facts
            </h3>

            <div className="space-y-3 text-xs">
              <div className="p-3.5 rounded-2xl bg-slate-800/40 border border-slate-700/60">
                <div className="text-slate-400 font-bold uppercase font-mono text-[10px]">Historical Average Turnout</div>
                <div className="text-2xl font-black text-white mt-1">48.07%</div>
                <div className="text-[11px] text-slate-400 mt-1">Average across all 6 elections (2003-2022)</div>
              </div>

              <div className="p-3.5 rounded-2xl bg-slate-800/40 border border-slate-700/60">
                <div className="text-slate-400 font-bold uppercase font-mono text-[10px]">Highest Voter Turnout</div>
                <div className="text-2xl font-black text-emerald-400 mt-1">51.50% (2014)</div>
                <div className="text-[11px] text-slate-400 mt-1">60,980 total ballots cast across the city</div>
              </div>

              <div className="p-3.5 rounded-2xl bg-slate-800/40 border border-slate-700/60">
                <div className="text-slate-400 font-bold uppercase font-mono text-[10px]">Most Active Wards</div>
                <div className="text-sm font-bold text-emerald-300 mt-1">Ward 10 (South End) & Ward 2 (Walden)</div>
                <div className="text-[11px] text-slate-400 mt-1">Consistently averaging 53%+ turnout</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Chart 2: Mayoral Vote Share & Council Turnover */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Mayoral Winning Vote Share */}
        <div className="bg-slate-900/60 backdrop-blur-md border border-slate-800 rounded-3xl p-6 space-y-4 shadow-xl">
          <div>
            <h3 className="text-base font-bold text-white flex items-center gap-2">
              <Award className="w-5 h-5 text-emerald-400" />
              Winning Mayor Vote Share (Mandate Strength)
            </h3>
            <p className="text-xs text-slate-400 mt-0.5">
              Comparison of popular vote share obtained by winning mayors (2003-2022)
            </p>
          </div>

          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={turnoutTrendData} margin={{ top: 10, right: 10, left: -10, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#334155" opacity={0.3} />
                <XAxis dataKey="year" stroke="#94a3b8" fontSize={12} />
                <YAxis domain={[0, 60]} unit="%" stroke="#94a3b8" fontSize={12} />
                <Tooltip
                  content={({ active, payload }) => {
                    if (active && payload && payload.length) {
                      const d = payload[0].payload;
                      return (
                        <div className="bg-slate-900 border border-slate-700 p-3 rounded-2xl shadow-xl text-xs space-y-1">
                          <div className="font-bold text-white">{d.year}: {d.mayor}</div>
                          <div className="text-emerald-400 font-bold">Vote Share: {d.mayoralVotePct.toFixed(1)}%</div>
                          <div className="text-slate-300">Victory Margin: +{d.mayoralMarginPct.toFixed(1)}%</div>
                        </div>
                      );
                    }
                    return null;
                  }}
                />
                <Bar dataKey="mayoralVotePct" fill="#10b981" radius={[6, 6, 0, 0]}>
                  {turnoutTrendData.map((entry, index) => (
                    <Cell 
                      key={`cell-${index}`}
                      fill={entry.year === 2022 ? '#10b981' : '#059669'} 
                    />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Council Turnover per Election */}
        <div className="bg-slate-900/60 backdrop-blur-md border border-slate-800 rounded-3xl p-6 space-y-4 shadow-xl">
          <div>
            <h3 className="text-base font-bold text-white flex items-center gap-2">
              <RotateCcw className="w-5 h-5 text-emerald-400" />
              Council Turnover (New Faces vs Incumbents)
            </h3>
            <p className="text-xs text-slate-400 mt-0.5">
              Number of new councillors elected out of 12 ward seats per municipal cycle
            </p>
          </div>

          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={turnoutTrendData} margin={{ top: 10, right: 10, left: -10, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#334155" opacity={0.3} />
                <XAxis dataKey="year" stroke="#94a3b8" fontSize={12} />
                <YAxis domain={[0, 12]} stroke="#94a3b8" fontSize={12} />
                <Tooltip
                  content={({ active, payload }) => {
                    if (active && payload && payload.length) {
                      const d = payload[0].payload;
                      return (
                        <div className="bg-slate-900 border border-slate-700 p-3 rounded-2xl shadow-xl text-xs space-y-1">
                          <div className="font-bold text-white">{d.year} Council Turnover</div>
                          <div className="text-emerald-400 font-bold">{d.turnoverSeats} of 12 seats turned over</div>
                          <div className="text-slate-400">{12 - d.turnoverSeats} incumbents held their seats</div>
                        </div>
                      );
                    }
                    return null;
                  }}
                />
                <Bar dataKey="turnoverSeats" fill="#0d9488" radius={[6, 6, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Historical Ward Average Turnout Ranking */}
      <div className="bg-slate-900/60 backdrop-blur-md border border-slate-800 rounded-3xl p-6 space-y-4 shadow-xl">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-base font-bold text-white flex items-center gap-2">
              <BarChart3 className="w-5 h-5 text-emerald-400" />
              Ward Participation Ranking (20-Year Average)
            </h3>
            <p className="text-xs text-slate-400 mt-0.5">
              Historical average turnout percentage for each of Greater Sudbury's 12 wards (2003–2022)
            </p>
          </div>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3.5">
          {wardAverageTurnout.map((ward, rank) => (
            <div 
              key={ward.wardNumber}
              onClick={() => onSelectWard(ward.wardNumber)}
              className="p-3.5 bg-slate-800/40 border border-slate-700/60 rounded-2xl hover:border-emerald-500 cursor-pointer transition-all space-y-2 group"
            >
              <div className="flex items-center justify-between text-xs">
                <span className="font-bold text-emerald-400 font-mono">#{rank + 1}</span>
                <span className="text-slate-400 font-semibold">{ward.wardShort}</span>
              </div>
              <div className="text-lg font-bold text-white font-mono">
                {ward.avgTurnout}%
              </div>
              <div className="w-full bg-slate-800 h-1.5 rounded-full overflow-hidden">
                <div 
                  className="bg-emerald-500 h-full rounded-full shadow-[0_0_6px_rgba(16,185,129,0.3)]" 
                  style={{ width: `${(ward.avgTurnout / 60) * 100}%` }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Historical Representation Matrix Table */}
      <div className="bg-slate-900/60 backdrop-blur-md border border-slate-800 rounded-3xl p-6 space-y-4 shadow-xl overflow-hidden">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-800 pb-4">
          <div>
            <h3 className="text-base font-bold text-white flex items-center gap-2">
              <Layers className="w-5 h-5 text-emerald-400" />
              20-Year Ward Council Representation Matrix
            </h3>
            <p className="text-xs text-slate-400 mt-0.5">
              Complete history of elected councillors for every Sudbury ward across all 6 election cycles
            </p>
          </div>

          <div className="flex items-center gap-1.5 text-xs bg-slate-800/40 p-1 rounded-full border border-slate-700/70">
            <button
              onClick={() => setSelectedMatrixMetric('winner')}
              className={`px-3 py-1 rounded-full font-semibold transition-all ${
                selectedMatrixMetric === 'winner' ? 'bg-emerald-500 text-slate-950 font-bold shadow-md shadow-emerald-500/20' : 'text-slate-400 hover:text-white'
              }`}
            >
              Elected Councillor
            </button>
            <button
              onClick={() => setSelectedMatrixMetric('turnout')}
              className={`px-3 py-1 rounded-full font-semibold transition-all ${
                selectedMatrixMetric === 'turnout' ? 'bg-emerald-500 text-slate-950 font-bold shadow-md shadow-emerald-500/20' : 'text-slate-400 hover:text-white'
              }`}
            >
              Turnout %
            </button>
            <button
              onClick={() => setSelectedMatrixMetric('margin')}
              className={`px-3 py-1 rounded-full font-semibold transition-all ${
                selectedMatrixMetric === 'margin' ? 'bg-emerald-500 text-slate-950 font-bold shadow-md shadow-emerald-500/20' : 'text-slate-400 hover:text-white'
              }`}
            >
              Victory Margin
            </button>
          </div>
        </div>

        {/* Matrix Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="border-b border-slate-700/60 bg-slate-800/40 text-slate-400 font-mono">
                <th className="py-3 px-3 font-bold sticky left-0 bg-slate-900 z-10">Ward</th>
                {ALL_ELECTIONS.map((e) => (
                  <th key={e.year} className="py-3 px-3 font-bold text-center">
                    <button 
                      onClick={() => onSelectYear(e.year)}
                      className="hover:text-emerald-400 hover:underline inline-flex items-center gap-1 font-bold"
                    >
                      {e.year}
                    </button>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60">
              {WARD_GEOMETRIES.map((geo) => (
                <tr key={geo.wardNumber} className="hover:bg-slate-800/30 transition-colors">
                  <td className="py-3 px-3 font-semibold text-white sticky left-0 bg-slate-950 z-10 flex items-center gap-2">
                    <span className="w-5 h-5 rounded-full bg-emerald-500/10 text-emerald-400 flex items-center justify-center text-[10px] font-bold font-mono">
                      {geo.wardNumber}
                    </span>
                    <button 
                      onClick={() => onSelectWard(geo.wardNumber)}
                      className="hover:text-emerald-400 hover:underline text-left"
                    >
                      {geo.shortLabel}
                    </button>
                  </td>
                  {ALL_ELECTIONS.map((e) => {
                    const ward = e.wards.find((w) => w.wardNumber === geo.wardNumber);
                    if (!ward) {
                      return (
                        <td key={e.year} className="py-3 px-3 text-center text-slate-500 text-[10px] italic font-mono">
                          (6-Ward Era)
                        </td>
                      );
                    }

                    if (selectedMatrixMetric === 'turnout') {
                      return (
                        <td key={e.year} className="py-3 px-3 text-center">
                          <span className="font-bold text-emerald-400 font-mono">
                            {ward.turnoutPercentage.toFixed(1)}%
                          </span>
                        </td>
                      );
                    }

                    if (selectedMatrixMetric === 'margin') {
                      return (
                        <td key={e.year} className="py-3 px-3 text-center">
                          <span className={`font-bold font-mono ${
                            ward.marginOfVictoryPct < 10 ? 'text-amber-400' : 'text-emerald-400'
                          }`}>
                            +{ward.marginOfVictoryPct.toFixed(1)}%
                          </span>
                        </td>
                      );
                    }

                    return (
                      <td key={e.year} className="py-3 px-3 text-center">
                        <div 
                          className="font-bold text-slate-200 truncate max-w-[130px] mx-auto" 
                          title={ward.councillors && ward.councillors.length > 1 ? `${ward.councillors[0].name} & ${ward.councillors[1].name}` : ward.winner.name}
                        >
                          {ward.councillors && ward.councillors.length > 1
                            ? `${ward.councillors[0].name.split(' ').pop()} & ${ward.councillors[1].name.split(' ').pop()}`
                            : ward.winner.name}
                        </div>
                        <div className="text-[10px] text-slate-400 font-mono">
                          {ward.councillors && ward.councillors.length > 1 ? 'Dual Seat' : `${ward.winner.votePercentage.toFixed(1)}%`}
                        </div>
                      </td>
                    );
                  })}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
