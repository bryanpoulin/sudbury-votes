import React from 'react';
import { ElectionYearData } from '../types/election';
import { 
  LayoutGrid, 
  Award, 
  Flame, 
  ChevronRight,
  ShieldCheck
} from 'lucide-react';

interface WardRacesGridProps {
  election: ElectionYearData;
  onSelectWard: (wardNumber: number) => void;
}

export const WardRacesGrid: React.FC<WardRacesGridProps> = ({
  election,
  onSelectWard
}) => {
  const is2003 = election.year === 2003;
  const wardCount = election.wards.length;

  return (
    <div className="space-y-6">
      {/* Ward Races Header */}
      <div className="bg-slate-900/60 backdrop-blur-md border border-slate-800 rounded-3xl p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-3 shadow-xl">
        <div>
          <h2 className="text-lg font-bold text-white flex items-center gap-2">
            <LayoutGrid className="w-5 h-5 text-emerald-400" />
            {is2003 ? '6 City Council Ward Races (Dual-Member Seats)' : '12 City Council Ward Races'} ({election.year})
          </h2>
          <p className="text-xs text-slate-400 mt-0.5">
            {is2003 
              ? 'Explore the 6 post-amalgamation dual-member wards (12 total council seats) with complete candidate breakdowns' 
              : 'Explore ward-by-ward candidate returns, local victory margins, and turnout across Greater Sudbury'}
          </p>
        </div>

        <div className="px-3 py-1 bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 rounded-full text-xs font-mono font-bold self-start sm:self-auto">
          {wardCount} Wards
        </div>
      </div>

      {/* Grid of Wards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {election.wards.map((ward) => {
          const isClose = ward.marginOfVictoryPct < 10;
          return (
            <div
              key={ward.wardNumber}
              className={`bg-slate-900/60 backdrop-blur-md border rounded-3xl p-5 space-y-3.5 hover:border-slate-700 transition-all flex flex-col justify-between shadow-lg ${
                isClose ? 'border-amber-500/30' : 'border-slate-800'
              }`}
            >
              <div>
                {/* Ward Top Info */}
                <div className="flex items-start justify-between gap-2 border-b border-slate-800 pb-3">
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-bold px-2.5 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 font-mono">
                        Ward {ward.wardNumber}
                      </span>
                      {isClose && (
                        <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-amber-500/20 text-amber-300 border border-amber-500/30 flex items-center gap-1">
                          <Flame className="w-3 h-3 text-amber-400" />
                          Close Race
                        </span>
                      )}
                      {!ward.isIncumbentRetained && (
                        <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-purple-500/20 text-purple-300 border border-purple-500/30">
                          Flipped
                        </span>
                      )}
                    </div>
                    <h3 className="text-sm font-bold text-white mt-1.5">
                      {ward.wardName}
                    </h3>
                  </div>

                  <div className="text-right shrink-0">
                    <div className="text-xs font-bold text-slate-200 font-mono">
                      {ward.turnoutPercentage.toFixed(1)}%
                    </div>
                    <div className="text-[10px] text-slate-500 font-mono">Turnout</div>
                  </div>
                </div>

                {/* Elected Councillor Highlight: Dual-Member Support */}
                {ward.isDualMemberWard && ward.councillors ? (
                  <div className="mt-3 bg-slate-800/50 border border-slate-700/60 rounded-2xl p-3 space-y-2">
                    <div className="flex items-center justify-between text-[11px] text-slate-400">
                      <span className="font-bold text-emerald-400 uppercase tracking-wider flex items-center gap-1.5">
                        <Award className="w-3.5 h-3.5 text-emerald-400" /> Elected Councillors (2 Seats)
                      </span>
                      <span className="text-[10px] text-slate-400 font-mono">Dual-Seat System</span>
                    </div>

                    <div className="space-y-1.5">
                      {ward.councillors.map((c, cIdx) => (
                        <div key={cIdx} className="bg-slate-900/60 p-2 rounded-xl border border-slate-700/40 flex items-center justify-between text-xs">
                          <div className="flex items-center gap-1.5 font-bold text-white">
                            <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                            <span>{c.name}</span>
                            <span className="text-[10px] text-emerald-400/80 font-normal font-mono">({c.notes || `Seat ${cIdx === 0 ? 'A' : 'B'}`})</span>
                          </div>
                          <div className="font-mono text-emerald-400 font-bold">
                            {c.votePercentage.toFixed(1)}% <span className="text-[10px] text-slate-400 font-normal">({c.votes})</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                ) : (
                  <div className="mt-3 bg-slate-800/50 border border-slate-700/60 rounded-2xl p-3.5 space-y-2">
                    <div className="flex items-center justify-between text-[11px] text-slate-400">
                      <span className="font-bold text-emerald-400 uppercase tracking-wider flex items-center gap-1.5">
                        <Award className="w-3.5 h-3.5 text-emerald-400" /> Elected Councillor
                      </span>
                      <span className="text-[10px] text-slate-400 font-mono">
                        {ward.isAcclaimed ? 'Acclaimed (Unopposed)' : (ward.isIncumbentRetained ? 'Incumbent Held' : 'New Representative')}
                      </span>
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="text-base font-bold text-white">
                        {ward.winner.name}
                      </div>
                      <div className="text-xs font-bold text-emerald-400 font-mono">
                        {ward.isAcclaimed ? 'Acclaimed' : `${ward.winner.votePercentage.toFixed(1)}%`}
                      </div>
                    </div>

                    {/* Progress Bar */}
                    <div className="w-full bg-slate-900 rounded-full h-1.5 overflow-hidden">
                      <div 
                        className="bg-emerald-500 h-full rounded-full shadow-[0_0_8px_rgba(16,185,129,0.4)]" 
                        style={{ width: `${Math.min(ward.winner.votePercentage, 100)}%` }}
                      />
                    </div>

                    <div className="flex items-center justify-between text-[11px] text-slate-400 pt-0.5 font-mono">
                      <span>{ward.isAcclaimed ? 'Elected by Acclamation' : `${ward.winner.votes.toLocaleString()} votes`}</span>
                      <span>{ward.isAcclaimed ? 'No Opponents Filed' : `Margin: +${ward.marginOfVictoryPct.toFixed(1)}%`}</span>
                    </div>
                  </div>
                )}

                {/* All Candidates in Race */}
                <div className="mt-3 space-y-1.5">
                  <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider font-mono">
                    Candidates ({ward.candidates.length})
                  </div>
                  <div className="space-y-1">
                    {ward.candidates.map((cand) => (
                      <div
                        key={cand.id}
                        className={`py-1 px-2.5 rounded-xl text-xs flex items-center justify-between transition-colors ${
                          cand.isWinner
                            ? 'bg-emerald-500/10 text-emerald-300 font-semibold border border-emerald-500/20'
                            : 'bg-slate-800/30 text-slate-300'
                        }`}
                      >
                        <span className="truncate">{cand.name}</span>
                        <span className="font-bold shrink-0 ml-2 font-mono text-right">
                          {cand.votePercentage.toFixed(1)}% <span className="text-[10px] text-slate-500 font-normal">({cand.votes.toLocaleString()})</span>
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Bottom Action */}
              <button
                onClick={() => onSelectWard(ward.wardNumber)}
                className="w-full py-2.5 px-3 bg-slate-800/80 hover:bg-slate-700 text-slate-200 hover:text-white rounded-2xl text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors border border-slate-700/60 mt-2"
              >
                <span>View Ward {ward.wardNumber} Historical Archive</span>
                <ChevronRight className="w-3.5 h-3.5 text-emerald-400" />
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
};
