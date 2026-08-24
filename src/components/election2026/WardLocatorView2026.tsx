import React, { useState } from 'react';
import { WARD_LOOKUP_ENTRIES, CANDIDATES_2026 } from '../../data/electionData2026';
import { 
  Search, 
  MapPin, 
  Users, 
  ArrowRight,
  ExternalLink,
  ChevronRight,
  ShieldCheck,
  Building
} from 'lucide-react';

interface WardLocatorProps {
  onSelectCandidateWard?: (wardNum: number) => void;
  onOpenOfficialVoterGuide?: () => void;
}

export const WardLocatorView2026: React.FC<WardLocatorProps> = ({ 
  onSelectCandidateWard,
  onOpenOfficialVoterGuide 
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedWard, setSelectedWard] = useState<number | null>(null);

  // Filter wards based on search
  const filteredWards = WARD_LOOKUP_ENTRIES.filter((ward) => {
    if (!searchTerm.trim()) return true;
    const term = searchTerm.toLowerCase();
    return (
      ward.wardName.toLowerCase().includes(term) ||
      `ward ${ward.wardNumber}`.includes(term) ||
      ward.neighborhoods.some((n) => n.toLowerCase().includes(term)) ||
      ward.postalCodePrefixes.some((p) => p.toLowerCase().includes(term)) ||
      ward.keyStreets.some((s) => s.toLowerCase().includes(term))
    );
  });

  const activeWardData = selectedWard 
    ? WARD_LOOKUP_ENTRIES.find((w) => w.wardNumber === selectedWard) 
    : null;

  const activeWardCandidates = selectedWard 
    ? CANDIDATES_2026.filter((c) => c.race === selectedWard)
    : [];

  return (
    <div className="space-y-6">
      {/* Search Header Banner */}
      <div className="bg-gradient-to-br from-slate-900 via-slate-900/90 to-emerald-950/40 border border-slate-800 rounded-3xl p-6 sm:p-8 space-y-6 shadow-2xl relative overflow-hidden">
        <div className="absolute top-0 right-0 w-80 h-80 bg-emerald-500/5 rounded-full blur-3xl pointer-events-none -mr-20 -mt-20" />
        
        <div className="max-w-2xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 mb-3">
            <MapPin className="w-3.5 h-3.5" /> Interactive Ward Locator
          </div>
          <h3 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
            Find Your Ward
          </h3>
          <p className="text-xs sm:text-sm text-slate-300 mt-1.5 leading-relaxed">
            Search by neighbourhood or postal code to see your ward and candidates.
          </p>
        </div>

        {/* Search Bar Input */}
        <div className="relative max-w-xl">
          <Search className="w-5 h-5 text-slate-400 absolute left-4 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Type neighbourhood (e.g. Minnow Lake, Lively) or postal code (e.g. P3E)..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full bg-slate-950/80 border border-slate-700/80 focus:border-emerald-500 text-white rounded-2xl pl-12 pr-4 py-3.5 text-sm placeholder-slate-500 outline-none transition-all shadow-inner focus:ring-2 focus:ring-emerald-500/20"
          />
          {searchTerm && (
            <button
              onClick={() => setSearchTerm('')}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-xs text-slate-400 hover:text-white bg-slate-800 px-2 py-0.5 rounded-lg"
            >
              Clear
            </button>
          )}
        </div>

        {/* Quick Click Search Chips */}
        <div className="flex flex-wrap gap-2 pt-1 text-xs text-slate-400 items-center">
          <span className="text-slate-500">Popular shortcuts:</span>
          {['New Sudbury', 'Lively', 'Minnow Lake', 'Valley East', 'Capreol', 'Donovan', 'P3E', 'P3A'].map((chip) => (
            <button
              key={chip}
              onClick={() => setSearchTerm(chip)}
              className="px-2.5 py-1 rounded-lg bg-slate-800/80 hover:bg-slate-700 border border-slate-700/60 text-slate-300 hover:text-white transition-all text-[11px]"
            >
              {chip}
            </button>
          ))}
        </div>
      </div>

      {/* Ward Results Grid & Detailed Card */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Wards List / Results */}
        <div className={`space-y-3 ${selectedWard ? 'lg:col-span-6' : 'lg:col-span-12'}`}>
          <div className="flex items-center justify-between px-1">
            <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
              {searchTerm ? `Matching Wards (${filteredWards.length})` : 'All 12 Municipal Wards'}
            </span>
            <span className="text-xs text-slate-500">Click a ward to inspect boundaries & candidates</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {filteredWards.map((ward) => {
              const isSelected = selectedWard === ward.wardNumber;
              const candCount = CANDIDATES_2026.filter((c) => c.race === ward.wardNumber).length;
              return (
                <div
                  key={ward.wardNumber}
                  onClick={() => setSelectedWard(isSelected ? null : ward.wardNumber)}
                  className={`p-4 rounded-2xl border transition-all cursor-pointer text-left relative overflow-hidden group ${
                    isSelected
                      ? 'bg-emerald-950/40 border-emerald-500/80 shadow-lg shadow-emerald-950/50'
                      : 'bg-slate-900/60 border-slate-800/80 hover:border-slate-700 hover:bg-slate-900'
                  }`}
                >
                  <div className="flex items-start justify-between">
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="px-2 py-0.5 rounded-md bg-slate-800 text-emerald-400 text-xs font-mono font-bold">
                          Ward {ward.wardNumber}
                        </span>
                        <span className="text-xs font-semibold text-slate-300">
                          {ward.wardName}
                        </span>
                      </div>
                      <p className="text-xs text-slate-400 mt-2 line-clamp-1">
                        {ward.neighborhoods.slice(0, 3).join(', ')}
                        {ward.neighborhoods.length > 3 && '...'}
                      </p>
                    </div>
                    <ChevronRight className={`w-4 h-4 text-slate-500 transition-transform ${isSelected ? 'rotate-90 text-emerald-400' : 'group-hover:translate-x-0.5'}`} />
                  </div>

                  <div className="mt-3 pt-3 border-t border-slate-800/60 flex items-center justify-between text-[11px] text-slate-400">
                    <span>Incumbent: <strong className="text-slate-300">{ward.incumbentName}</strong></span>
                    <span className="text-emerald-400 font-medium">{candCount} Candidate{candCount !== 1 ? 's' : ''}</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Selected Ward Detail Card */}
        {activeWardData && (
          <div className="lg:col-span-6 space-y-4">
            <div className="bg-slate-900 border border-emerald-500/40 rounded-3xl p-6 shadow-2xl space-y-5 sticky top-4">
              <div className="flex items-start justify-between">
                <div>
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 mb-2">
                    Ward Profile
                  </div>
                  <h4 className="text-xl font-bold text-white">
                    Ward {activeWardData.wardNumber}: {activeWardData.wardName}
                  </h4>
                  <p className="text-xs text-slate-400 mt-0.5">Current Incumbent Councillor: <span className="text-slate-200 font-semibold">{activeWardData.incumbentName}</span></p>
                </div>
                <button
                  onClick={() => setSelectedWard(null)}
                  className="text-xs text-slate-400 hover:text-white bg-slate-800 px-2.5 py-1 rounded-lg"
                >
                  Close
                </button>
              </div>

              {/* Neighbourhoods & Postal Codes */}
              <div className="space-y-3 bg-slate-950/60 p-4 rounded-2xl border border-slate-800">
                <div>
                  <span className="text-[11px] font-semibold uppercase tracking-wider text-slate-400">Covered Neighbourhoods:</span>
                  <div className="flex flex-wrap gap-1.5 mt-1.5">
                    {activeWardData.neighborhoods.map((n) => (
                      <span key={n} className="px-2.5 py-1 bg-slate-800 text-slate-200 rounded-lg text-xs font-medium">
                        {n}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="pt-2 border-t border-slate-800/80">
                  <span className="text-[11px] font-semibold uppercase tracking-wider text-slate-400">Postal Code Prefixes:</span>
                  <div className="flex flex-wrap gap-1.5 mt-1.5">
                    {activeWardData.postalCodePrefixes.map((p) => (
                      <span key={p} className="px-2 py-0.5 bg-slate-900 text-emerald-400 border border-slate-700 rounded text-xs font-mono">
                        {p}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Candidates Running in this Ward */}
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <h5 className="text-xs font-bold uppercase tracking-wider text-slate-300 flex items-center gap-1.5">
                    <Users className="w-4 h-4 text-emerald-400" />
                    2026 Ward {activeWardData.wardNumber} Candidates ({activeWardCandidates.length})
                  </h5>
                  {onSelectCandidateWard && (
                    <button
                      onClick={() => onSelectCandidateWard(activeWardData.wardNumber)}
                      className="text-xs text-emerald-400 hover:text-emerald-300 hover:underline inline-flex items-center gap-1"
                    >
                      View in Candidate Directory <ArrowRight className="w-3 h-3" />
                    </button>
                  )}
                </div>

                <div className="space-y-2">
                  {activeWardCandidates.map((cand) => (
                    <div key={cand.id} className="p-3 bg-slate-950/70 border border-slate-800 rounded-xl flex items-center justify-between">
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="text-sm font-bold text-white">{cand.name}</span>
                          <span className={`text-[10px] px-2 py-0.2 rounded-full font-medium ${
                            cand.status === 'Incumbent' 
                              ? 'bg-amber-500/20 text-amber-300 border border-amber-500/30'
                              : 'bg-slate-800 text-slate-300'
                          }`}>
                            {cand.status}
                          </span>
                        </div>
                        <p className="text-[11px] text-slate-400 mt-0.5">{cand.occupation}</p>
                      </div>
                      <span className="text-[10px] font-mono text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/20">
                        {cand.nominationStatus}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Official Voting Portal Direct CTA */}
              {onOpenOfficialVoterGuide && (
                <div className="pt-2">
                  <button
                    onClick={onOpenOfficialVoterGuide}
                    className="w-full flex items-center justify-center gap-2 bg-emerald-500/10 hover:bg-emerald-500/20 border border-emerald-500/40 text-emerald-300 py-2.5 px-4 rounded-xl text-xs font-semibold transition-all group"
                  >
                    <span>Check Polling Station & ID Requirements</span>
                    <ExternalLink className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
                  </button>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
