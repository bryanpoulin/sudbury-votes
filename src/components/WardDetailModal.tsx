import React from 'react';
import { ALL_ELECTIONS, getWardHistoricalProgression } from '../data/electionData';
import { WARD_GEOMETRIES } from '../data/wardGeometries';
import { 
  X, 
  MapPin, 
  Award, 
  TrendingUp, 
  CheckCircle2, 
  Calendar, 
  Users,
  Compass
} from 'lucide-react';
import { 
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer 
} from 'recharts';

interface WardDetailModalProps {
  wardNumber: number | null;
  onClose: () => void;
  onSelectYear: (year: number) => void;
}

export const WardDetailModal: React.FC<WardDetailModalProps> = ({
  wardNumber,
  onClose,
  onSelectYear
}) => {
  if (!wardNumber) return null;

  const geo = WARD_GEOMETRIES.find((g) => g.wardNumber === wardNumber);
  const history = getWardHistoricalProgression(wardNumber);

  // Calculate average turnout for this ward
  const avgTurnout = (
    history.reduce((acc, curr) => acc + curr.turnoutPct, 0) / history.length
  ).toFixed(1);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-in fade-in duration-200">
      <div 
        className="bg-slate-900/95 border border-slate-700/80 w-full max-w-4xl max-h-[90vh] rounded-3xl shadow-2xl flex flex-col overflow-hidden text-slate-200 relative"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Radial glow */}
        <div className="absolute top-0 right-0 w-96 h-96 opacity-10 pointer-events-none bg-[radial-gradient(circle_at_top_right,_var(--tw-gradient-stops))] from-emerald-500 via-transparent to-transparent" />

        {/* Modal Header */}
        <div className="bg-slate-950/90 px-6 py-4.5 border-b border-slate-800 flex items-center justify-between relative z-10">
          <div className="flex items-center gap-3.5">
            <div className="w-11 h-11 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400 font-black text-base font-mono shadow-md">
              W{wardNumber}
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-lg font-bold text-white">
                  {geo?.wardName || `Ward ${wardNumber}`}
                </h3>
                <span className="text-xs px-2.5 py-0.5 rounded-full bg-slate-800 text-slate-400 border border-slate-700 font-mono">
                  {geo?.areaKm2} km²
                </span>
              </div>
              <p className="text-xs text-slate-400 mt-0.5">
                {geo?.description}
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 overflow-y-auto space-y-6 relative z-10">
          {/* Quick Metrics */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="bg-slate-800/40 border border-slate-700/60 p-4 rounded-2xl">
              <div className="text-[10px] text-slate-400 font-bold uppercase font-mono">Historical Turnout Average</div>
              <div className="text-2xl font-black text-emerald-400 mt-0.5 font-mono">{avgTurnout}%</div>
              <div className="text-[10px] text-slate-500">Across 6 municipal election cycles</div>
            </div>

            <div className="bg-slate-800/40 border border-slate-700/60 p-4 rounded-2xl">
              <div className="text-[10px] text-slate-400 font-bold uppercase font-mono">Elections Tracked</div>
              <div className="text-2xl font-black text-white mt-0.5 font-mono">{history.length} Cycles</div>
              <div className="text-[10px] text-slate-500">2003 through 2022</div>
            </div>

            <div className="bg-slate-800/40 border border-slate-700/60 p-4 rounded-2xl">
              <div className="text-[10px] text-slate-400 font-bold uppercase font-mono">Current Councillor (2022)</div>
              <div className="text-lg font-bold text-white mt-0.5 truncate">
                {history[history.length - 1]?.winnerName}
              </div>
              <div className="text-[10px] text-emerald-400 font-mono">
                Elected with {history[history.length - 1]?.winnerPct.toFixed(1)}%
              </div>
            </div>
          </div>

          {/* Turnout Chart for this Ward */}
          <div className="bg-slate-950/80 border border-slate-800 p-5 rounded-2xl space-y-3">
            <div className="flex items-center justify-between">
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-300 flex items-center gap-1.5 font-mono">
                <TrendingUp className="w-4 h-4 text-emerald-400" />
                Ward {wardNumber} Turnout History (2003 – 2022)
              </h4>
            </div>

            <div className="h-44 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={history} margin={{ top: 5, right: 20, left: -20, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#334155" opacity={0.3} />
                  <XAxis dataKey="year" stroke="#94a3b8" fontSize={11} />
                  <YAxis domain={[30, 65]} unit="%" stroke="#94a3b8" fontSize={11} />
                  <Tooltip
                    content={({ active, payload }) => {
                      if (active && payload && payload.length) {
                        const d = payload[0].payload;
                        return (
                          <div className="bg-slate-900 border border-slate-700 p-3 rounded-2xl shadow-xl text-xs space-y-1">
                            <div className="font-bold text-white">{d.year} Ward {wardNumber}</div>
                            <div className="text-emerald-400 font-bold">Turnout: {d.turnoutPct.toFixed(1)}%</div>
                            <div className="text-slate-300">Winner: {d.winnerName} ({d.winnerPct.toFixed(1)}%)</div>
                          </div>
                        );
                      }
                      return null;
                    }}
                  />
                  <Line 
                    type="monotone" 
                    dataKey="turnoutPct" 
                    stroke="#10b981" 
                    strokeWidth={2.5} 
                    dot={{ fill: '#10b981', r: 4 }} 
                    activeDot={{ r: 6 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Historical Election-by-Election Chronicle */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-300 flex items-center gap-1.5 font-mono">
              <Calendar className="w-4 h-4 text-emerald-400" />
              Historical Election Chronicle (2003–2022)
            </h4>

            <div className="space-y-3">
              {[...history].reverse().map((item) => (
                <div
                  key={item.year}
                  className="bg-slate-800/40 border border-slate-700/60 rounded-2xl p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3 hover:border-slate-600 transition-colors"
                >
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => {
                          onSelectYear(item.year);
                          onClose();
                        }}
                        className="text-xs font-bold px-3 py-1 rounded-full bg-emerald-500 text-slate-950 font-mono hover:bg-emerald-400 transition-colors"
                      >
                        {item.year}
                      </button>
                      <span className="text-sm font-bold text-white">
                        {item.winnerName}
                      </span>
                      {item.isIncumbentRetained ? (
                        <span className="text-[10px] px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 font-bold font-mono">
                          Incumbent Held
                        </span>
                      ) : (
                        <span className="text-[10px] px-2 py-0.5 rounded-full bg-purple-500/20 text-purple-300 font-bold font-mono">
                          New Councillor
                        </span>
                      )}
                    </div>

                    <div className="text-xs text-slate-300 flex items-center gap-3 font-mono">
                      <span>Winner: <strong className="text-emerald-400 font-bold">{item.winnerPct.toFixed(1)}%</strong> ({item.winnerVotes.toLocaleString()} votes)</span>
                      <span>•</span>
                      <span className="text-slate-400">Runner-up: {item.runnerUpName} ({item.runnerUpVotes.toLocaleString()} votes)</span>
                    </div>
                  </div>

                  <div className="text-right shrink-0 border-t sm:border-t-0 sm:border-l border-slate-700/60 pt-2 sm:pt-0 sm:pl-4">
                    <div className="text-base font-bold text-emerald-400 font-mono">
                      {item.turnoutPct.toFixed(1)}%
                    </div>
                    <div className="text-[10px] text-slate-500 font-mono">
                      {item.totalBallots.toLocaleString()} ballots
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Modal Footer */}
        <div className="bg-slate-950 px-6 py-4 border-t border-slate-800 flex justify-end relative z-10">
          <button
            onClick={onClose}
            className="px-5 py-2 bg-slate-800 hover:bg-slate-700 text-white rounded-full text-xs font-semibold transition-colors"
          >
            Close Ward Profile
          </button>
        </div>
      </div>
    </div>
  );
};
