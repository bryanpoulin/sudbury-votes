import React from 'react';
import { DEBATES_2026 } from '../../data/electionData2026';
import { 
  Tv, 
  Radio, 
  Clock, 
  MapPin, 
  Calendar 
} from 'lucide-react';

export const CandidateDebatesView2026: React.FC = () => {
  return (
    <div className="space-y-6">
      {/* Header Banner */}
      <div className="bg-gradient-to-br from-slate-900 via-slate-900/90 to-amber-950/30 border border-slate-800 rounded-3xl p-6 sm:p-8 space-y-4 shadow-2xl relative overflow-hidden">
        <div className="absolute top-0 right-0 w-80 h-80 bg-amber-500/5 rounded-full blur-3xl pointer-events-none -mr-20 -mt-20" />
        
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h3 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
              Candidate Debates
            </h3>
            <p className="text-xs sm:text-sm text-slate-300 mt-1.5 leading-relaxed max-w-2xl">
              Official schedule for Mayoral and Ward councillor debates, Chamber of Commerce leadership forums, and neighborhood all-candidates nights.
            </p>
          </div>

          <span className="px-3.5 py-1.5 bg-slate-900/90 text-amber-300 text-xs font-mono rounded-full border border-amber-500/30 self-start sm:self-auto font-bold flex items-center gap-2 shadow-lg">
            <Calendar className="w-3.5 h-3.5" />
            {DEBATES_2026.length} Scheduled Debates
          </span>
        </div>
      </div>

      {/* Debates Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {DEBATES_2026.map((event) => (
          <div
            key={event.id}
            className="bg-slate-900/60 border border-slate-800 rounded-3xl p-6 space-y-4 shadow-xl hover:border-slate-700 transition-all flex flex-col justify-between"
          >
            <div className="space-y-3">
              <div className="flex items-center justify-start">
                {event.isLivestreamed ? (
                  <span className="flex items-center gap-1.5 text-[10px] font-mono text-red-400 bg-red-500/10 px-2.5 py-0.5 rounded-full border border-red-500/30 font-semibold">
                    <Radio className="w-3 h-3 animate-pulse" /> Live Broadcast
                  </span>
                ) : (
                  <span className="flex items-center gap-1 text-[10px] font-mono text-slate-400 bg-slate-800/60 px-2 py-0.5 rounded-full border border-slate-700/60">
                    In-Person Only
                  </span>
                )}
              </div>

              <div>
                <h4 className="text-base font-bold text-white leading-snug">{event.title}</h4>
                <p className="text-xs text-slate-400 mt-1">Organized by: <span className="text-slate-300 font-medium">{event.organizer}</span></p>
              </div>

              <p className="text-xs text-slate-300 leading-relaxed bg-slate-950/60 p-3.5 rounded-2xl border border-slate-800/80">
                {event.description}
              </p>
            </div>

            <div className="pt-3 border-t border-slate-800/80 space-y-2 text-xs text-slate-400">
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-emerald-400 shrink-0" />
                <span className="font-semibold text-slate-200">{event.date} • {event.time}</span>
              </div>
              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-slate-400 shrink-0" />
                <span className="truncate">{event.location}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
