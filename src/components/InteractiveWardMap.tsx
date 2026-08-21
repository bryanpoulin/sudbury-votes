import React, { useState } from 'react';
import { ElectionYearData, MapColorMode } from '../types/election';
import { getWardGeometriesForYear, LAKE_GEOMETRIES } from '../data/wardGeometries';
import { 
  Layers, 
  ZoomIn, 
  ZoomOut, 
  RotateCcw, 
  Award, 
  Compass, 
  MapPin, 
  Users,
  ChevronRight,
  ShieldCheck
} from 'lucide-react';

interface InteractiveWardMapProps {
  election: ElectionYearData;
  selectedWardNumber: number | null;
  onSelectWard: (wardNumber: number) => void;
}

export const InteractiveWardMap: React.FC<InteractiveWardMapProps> = ({
  election,
  selectedWardNumber,
  onSelectWard
}) => {
  const [colorMode, setColorMode] = useState<MapColorMode>('winners');
  const [hoveredWardNumber, setHoveredWardNumber] = useState<number | null>(null);
  const [zoomLevel, setZoomLevel] = useState<number>(1);
  const [panOffset, setPanOffset] = useState<{ x: number; y: number }>({ x: 0, y: 0 });

  const is2003 = election.year === 2003;
  const wardGeometries = getWardGeometriesForYear(election.year);

  const activeWardNumber = hoveredWardNumber ?? selectedWardNumber;
  const activeWardData = election.wards.find((w) => w.wardNumber === activeWardNumber);
  const activeWardGeo = wardGeometries.find((g) => g.wardNumber === activeWardNumber);

  // Helper color functions for choropleth modes with sleek palette
  const getWardFillColor = (wardNumber: number): string => {
    const ward = election.wards.find((w) => w.wardNumber === wardNumber);
    if (!ward) return '#1e293b';

    if (colorMode === 'turnout') {
      const turnout = ward.turnoutPercentage;
      if (turnout >= 55) return '#10b981'; // vibrant emerald
      if (turnout >= 50) return '#059669'; // emerald
      if (turnout >= 45) return '#0d9488'; // teal
      if (turnout >= 40) return '#0284c7'; // sky
      return '#475569'; // slate
    }

    if (colorMode === 'margin') {
      const margin = ward.marginOfVictoryPct;
      if (margin < 5) return '#ef4444'; // Red (<5% Razor close)
      if (margin < 15) return '#f97316'; // Orange
      if (margin < 25) return '#eab308'; // Amber
      return '#10b981'; // Emerald (>25% Safe)
    }

    if (colorMode === 'turnover') {
      return ward.isIncumbentRetained ? '#0ea5e9' : '#10b981';
    }

    if (colorMode === 'mayoral') {
      const mayoralLead = election.mayoralRace.wardWinners?.[wardNumber] || election.mayoralRace.winner.name;
      if (mayoralLead === election.mayoralRace.winner.name) return '#10b981';
      if (mayoralLead === election.mayoralRace.runnerUp.name) return '#f97316';
      return '#6366f1';
    }

    // Default 'winners' mode palette with refined sleek colors
    const palette = [
      '#10b981', '#06b6d4', '#3b82f6', '#6366f1',
      '#8b5cf6', '#ec4899', '#f59e0b', '#14b8a6',
      '#10b981', '#0284c7', '#84cc16', '#a855f7'
    ];
    return palette[(wardNumber - 1) % palette.length];
  };

  const handleZoom = (delta: number) => {
    setZoomLevel((prev) => Math.min(Math.max(prev + delta, 0.8), 2.2));
  };

  const handleResetView = () => {
    setZoomLevel(1);
    setPanOffset({ x: 0, y: 0 });
  };

  return (
    <div className="bg-slate-900/60 backdrop-blur-md border border-slate-800 rounded-3xl p-5 sm:p-6 shadow-xl space-y-5">
      {/* Header & Mode Selector */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 border-b border-slate-800 pb-4">
        <div>
          <div className="flex items-center gap-2">
            <Compass className="w-5 h-5 text-emerald-400" />
            <h2 className="text-base sm:text-lg font-bold text-white tracking-tight">
              Interactive Greater Sudbury Ward Map ({election.year})
            </h2>
            {is2003 && (
              <span className="px-2.5 py-0.5 rounded-full bg-emerald-500/10 text-emerald-300 border border-emerald-500/20 text-xs font-mono">
                6 Dual-Member Wards
              </span>
            )}
          </div>
          <p className="text-xs text-slate-400 mt-0.5">
            {is2003 
              ? "Click on any of the 6 post-amalgamation wards to inspect the two elected councillors and full candidate returns"
              : "Click on any of the 12 municipal wards to view detailed candidate returns, margins, and turnout"}
          </p>
        </div>

        {/* Map Layers Switcher */}
        <div className="flex items-center gap-1.5 overflow-x-auto bg-slate-800/40 p-1 rounded-full border border-slate-700/70">
          <div className="px-2 text-[10px] font-mono uppercase tracking-widest text-slate-400 flex items-center gap-1">
            <Layers className="w-3.5 h-3.5 text-emerald-400" />
            <span className="hidden sm:inline">Layer:</span>
          </div>

          <button
            onClick={() => setColorMode('winners')}
            className={`px-3 py-1 text-xs font-semibold rounded-full transition-all ${
              colorMode === 'winners'
                ? 'bg-emerald-500 text-slate-950 font-bold shadow-md shadow-emerald-500/20'
                : 'text-slate-400 hover:text-white hover:bg-slate-800/60'
            }`}
          >
            Council Winners
          </button>

          <button
            onClick={() => setColorMode('mayoral')}
            className={`px-3 py-1 text-xs font-semibold rounded-full transition-all ${
              colorMode === 'mayoral'
                ? 'bg-emerald-500 text-slate-950 font-bold shadow-md shadow-emerald-500/20'
                : 'text-slate-400 hover:text-white hover:bg-slate-800/60'
            }`}
          >
            Mayoral Lead
          </button>

          <button
            onClick={() => setColorMode('turnout')}
            className={`px-3 py-1 text-xs font-semibold rounded-full transition-all ${
              colorMode === 'turnout'
                ? 'bg-emerald-500 text-slate-950 font-bold shadow-md shadow-emerald-500/20'
                : 'text-slate-400 hover:text-white hover:bg-slate-800/60'
            }`}
          >
            Turnout %
          </button>

          <button
            onClick={() => setColorMode('margin')}
            className={`px-3 py-1 text-xs font-semibold rounded-full transition-all ${
              colorMode === 'margin'
                ? 'bg-emerald-500 text-slate-950 font-bold shadow-md shadow-emerald-500/20'
                : 'text-slate-400 hover:text-white hover:bg-slate-800/60'
            }`}
          >
            Margin & Closeness
          </button>

          <button
            onClick={() => setColorMode('turnover')}
            className={`px-3 py-1 text-xs font-semibold rounded-full transition-all ${
              colorMode === 'turnover'
                ? 'bg-emerald-500 text-slate-950 font-bold shadow-md shadow-emerald-500/20'
                : 'text-slate-400 hover:text-white hover:bg-slate-800/60'
            }`}
          >
            Turnover
          </button>
        </div>
      </div>

      {/* Main Map View & Ward Inspector Side Panel */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* SVG Map Canvas (8 cols) */}
        <div className="lg:col-span-8 bg-slate-950/80 border border-slate-800 rounded-2xl relative overflow-hidden flex flex-col items-center justify-center min-h-[460px] shadow-inner">
          
          {/* Zoom and Reset Overlay Controls */}
          <div className="absolute top-3 right-3 z-10 flex flex-col gap-1.5 bg-slate-900/90 backdrop-blur p-1 rounded-2xl border border-slate-800 shadow-md">
            <button
              onClick={() => handleZoom(0.2)}
              className="p-2 text-slate-300 hover:text-white hover:bg-slate-800 rounded-xl transition-colors"
              title="Zoom In"
            >
              <ZoomIn className="w-4 h-4" />
            </button>
            <button
              onClick={() => handleZoom(-0.2)}
              className="p-2 text-slate-300 hover:text-white hover:bg-slate-800 rounded-xl transition-colors"
              title="Zoom Out"
            >
              <ZoomOut className="w-4 h-4" />
            </button>
            <button
              onClick={handleResetView}
              className="p-2 text-slate-300 hover:text-white hover:bg-slate-800 rounded-xl transition-colors"
              title="Reset View"
            >
              <RotateCcw className="w-4 h-4" />
            </button>
          </div>

          {/* Geographic Extent Tag */}
          <div className="absolute top-3 left-3 z-10 bg-slate-900/90 backdrop-blur px-3 py-1.5 rounded-xl border border-slate-800 text-[11px] text-slate-300 shadow">
            <div className="font-bold text-white flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-emerald-500 inline-block animate-pulse"></span>
              <span>{is2003 ? "2003 6-Ward Boundary Model" : "Sudbury Geographic District"}</span>
            </div>
            <div className="text-[10px] font-mono text-slate-400">
              {is2003 ? "6 Dual-Member Wards (12 Councillors)" : "Scale: 3,228 km² Geographic Extent"}
            </div>
          </div>

          {/* SVG Map */}
          <div className="w-full h-full flex items-center justify-center p-2">
            <svg
              viewBox="40 50 500 420"
              className="w-full max-w-[620px] h-auto drop-shadow-[0_0_30px_rgba(16,185,129,0.12)] transition-transform duration-300"
              style={{
                transform: `scale(${zoomLevel}) translate(${panOffset.x}px, ${panOffset.y}px)`
              }}
            >
              {/* Background Grid Pattern */}
              <defs>
                <pattern id="sleek-grid" width="20" height="20" patternUnits="userSpaceOnUse">
                  <path d="M 20 0 L 0 0 0 20" fill="none" stroke="rgba(51, 65, 85, 0.25)" strokeWidth="0.5" />
                </pattern>
                <filter id="emerald-glow" x="-20%" y="-20%" width="140%" height="140%">
                  <feGaussianBlur stdDeviation="4" result="blur" />
                  <feComposite in="SourceGraphic" in2="blur" operator="over" />
                </filter>
              </defs>
              <rect width="600" height="500" fill="url(#sleek-grid)" />

              {/* Geographic Landmarks (Lakes) */}
              <g className="opacity-40">
                {LAKE_GEOMETRIES.map((lake, idx) => (
                  <path
                    key={idx}
                    d={lake.path}
                    fill="#0284c7"
                    stroke="#38bdf8"
                    strokeWidth="0.8"
                    strokeDasharray="2 2"
                  >
                    <title>{lake.name}</title>
                  </path>
                ))}
              </g>

              {/* Ward Polygons */}
              <g>
                {wardGeometries.map((geo) => {
                  const ward = election.wards.find((w) => w.wardNumber === geo.wardNumber);
                  const isSelected = selectedWardNumber === geo.wardNumber;
                  const isHovered = hoveredWardNumber === geo.wardNumber;
                  const fillColor = getWardFillColor(geo.wardNumber);

                  return (
                    <g key={geo.wardNumber} className="cursor-pointer">
                      <path
                        d={geo.svgPath}
                        fill={fillColor}
                        fillOpacity={isSelected ? 0.95 : isHovered ? 0.85 : 0.65}
                        stroke={isSelected ? '#10b981' : isHovered ? '#34d399' : '#0f172a'}
                        strokeWidth={isSelected ? '3' : isHovered ? '2.5' : '1.5'}
                        strokeLinejoin="round"
                        filter={isSelected ? 'url(#emerald-glow)' : undefined}
                        onClick={() => onSelectWard(geo.wardNumber)}
                        onMouseEnter={() => setHoveredWardNumber(geo.wardNumber)}
                        onMouseLeave={() => setHoveredWardNumber(null)}
                        className="transition-all duration-200"
                      />

                      {/* Ward Number */}
                      <text
                        x={geo.labelX}
                        y={is2003 ? geo.labelY - 6 : geo.labelY}
                        textAnchor="middle"
                        dominantBaseline="central"
                        fill="#ffffff"
                        fontSize={is2003 ? '13' : isSelected ? '12' : '10'}
                        fontWeight="bold"
                        className="pointer-events-none drop-shadow-[0_1px_3px_rgba(0,0,0,0.9)]"
                      >
                        W{geo.wardNumber}
                      </text>

                      {/* Winner Sublabel */}
                      {ward && (
                        <text
                          x={geo.labelX}
                          y={is2003 ? geo.labelY + 8 : geo.labelY + 11}
                          textAnchor="middle"
                          dominantBaseline="central"
                          fill="#e2e8f0"
                          fontSize={is2003 ? '7.5' : '7.5'}
                          fontWeight="600"
                          className="pointer-events-none drop-shadow-[0_1px_3px_rgba(0,0,0,0.95)]"
                        >
                          {ward.councillors && ward.councillors.length > 1
                            ? `${ward.councillors[0].name.split(' ').pop()} & ${ward.councillors[1].name.split(' ').pop()}`
                            : ward.winner.name.split(' ').pop()}
                        </text>
                      )}
                    </g>
                  );
                })}
              </g>
            </svg>
          </div>

          {/* Dynamic Map Legend Footer */}
          <div className="w-full bg-slate-900/80 backdrop-blur border-t border-slate-800/80 p-3 flex flex-wrap items-center justify-between gap-2 text-xs text-slate-300 rounded-b-2xl">
            {colorMode === 'turnout' && (
              <div className="flex items-center gap-3">
                <span className="text-slate-400 font-mono text-[11px] uppercase">Turnout:</span>
                <div className="flex items-center gap-2.5">
                  <span className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-full bg-[#475569]"></span> &lt;40%</span>
                  <span className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-full bg-[#0284c7]"></span> 40-45%</span>
                  <span className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-full bg-[#0d9488]"></span> 45-50%</span>
                  <span className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-full bg-[#059669]"></span> 50-55%</span>
                  <span className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-full bg-[#10b981] shadow-[0_0_6px_rgba(16,185,129,0.5)]"></span> 55%+</span>
                </div>
              </div>
            )}

            {colorMode === 'margin' && (
              <div className="flex items-center gap-3">
                <span className="text-slate-400 font-mono text-[11px] uppercase">Margin:</span>
                <div className="flex items-center gap-2.5">
                  <span className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-full bg-[#ef4444]"></span> &lt;5% (Toss-up)</span>
                  <span className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-full bg-[#f97316]"></span> 5-15% (Competitive)</span>
                  <span className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-full bg-[#eab308]"></span> 15-25%</span>
                  <span className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-full bg-[#10b981]"></span> 25%+ (Safe)</span>
                </div>
              </div>
            )}

            {colorMode === 'turnover' && (
              <div className="flex items-center gap-3">
                <span className="text-slate-400 font-mono text-[11px] uppercase">Status:</span>
                <div className="flex items-center gap-2.5">
                  <span className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-full bg-[#0ea5e9]"></span> Incumbent Retained</span>
                  <span className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-full bg-[#10b981]"></span> New Councillor / Flipped</span>
                </div>
              </div>
            )}

            {colorMode === 'mayoral' && (
              <div className="flex items-center gap-3">
                <span className="text-slate-400 font-mono text-[11px] uppercase">Plurality:</span>
                <div className="flex items-center gap-2.5">
                  <span className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-full bg-[#10b981]"></span> {election.mayoralRace.winner.name}</span>
                  <span className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-full bg-[#f97316]"></span> {election.mayoralRace.runnerUp.name}</span>
                </div>
              </div>
            )}

            {colorMode === 'winners' && (
              <div className="flex items-center gap-2 text-slate-400 text-xs">
                <span>{is2003 ? "Color-coded across 6 dual-member wards (12 councillors total)." : "Color-coded across Greater Sudbury's 12 council districts."}</span>
              </div>
            )}

            <div className="text-[11px] font-mono text-slate-400 ml-auto">
              Selected: <strong className="text-emerald-400">{selectedWardNumber ? `Ward ${selectedWardNumber}` : 'None'}</strong>
            </div>
          </div>
        </div>

        {/* Selected / Hovered Ward Information Card (4 cols) */}
        <div className="lg:col-span-4 bg-slate-900/60 backdrop-blur-md border border-slate-800 rounded-2xl p-5 space-y-4 shadow-lg">
          {activeWardData && activeWardGeo ? (
            <div className="space-y-4">
              {/* Ward Header */}
              <div className="border-b border-slate-800 pb-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs px-2.5 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 font-bold border border-emerald-500/20 font-mono">
                    Ward {activeWardData.wardNumber} {activeWardData.isDualMemberWard ? '(Dual-Member)' : ''}
                  </span>
                  <span className="text-xs text-slate-500 font-mono">
                    {activeWardGeo.areaKm2} km²
                  </span>
                </div>
                <h3 className="text-base font-bold text-white mt-2">
                  {activeWardData.wardName}
                </h3>
                <p className="text-xs text-slate-400 mt-1 leading-relaxed">
                  {activeWardGeo.description}
                </p>
              </div>

              {/* Winner Showcase: Dual-Member Support */}
              {activeWardData.isDualMemberWard && activeWardData.councillors ? (
                <div className="space-y-2">
                  <div className="text-[11px] font-bold text-emerald-400 uppercase tracking-wider flex items-center gap-1.5">
                    <Award className="w-4 h-4 text-emerald-400" />
                    Elected Councillors (2 Seats)
                  </div>
                  <div className="grid grid-cols-1 gap-2">
                    {activeWardData.councillors.map((c, idx) => (
                      <div key={idx} className="bg-slate-800/60 border border-slate-700/60 rounded-xl p-3 space-y-1">
                        <div className="flex items-center justify-between">
                          <span className="text-sm font-bold text-white flex items-center gap-1.5">
                            <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                            {c.name}
                          </span>
                          <span className="px-1.5 py-0.5 rounded bg-emerald-500/10 text-emerald-300 text-[10px] font-mono">
                            {c.notes || `Seat ${idx === 0 ? 'A' : 'B'}`}
                          </span>
                        </div>
                        <div className="flex items-center justify-between text-xs text-emerald-400 font-mono">
                          <span>{c.votes.toLocaleString()} votes</span>
                          <span>{c.votePercentage.toFixed(1)}%</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ) : (
                <div className="bg-slate-800/60 border border-slate-700/60 rounded-2xl p-4 space-y-2.5">
                  <div className="flex items-center justify-between text-xs text-slate-400">
                    <span className="font-bold uppercase tracking-wider text-emerald-400 flex items-center gap-1.5">
                      <Award className="w-4 h-4 text-emerald-400" />
                      Elected Councillor
                    </span>
                    <span className="px-2 py-0.5 rounded-md bg-slate-900/80 text-slate-300 text-[10px] font-mono">
                      {activeWardData.isIncumbentRetained ? 'Incumbent Re-elected' : 'New Representative'}
                    </span>
                  </div>

                  <div>
                    <div className="text-lg font-bold text-white">
                      {activeWardData.winner.name}
                    </div>
                    <div className="flex items-center justify-between mt-1 text-xs">
                      <span className="text-emerald-400 font-bold">
                        {activeWardData.winner.votes.toLocaleString()} votes ({activeWardData.winner.votePercentage.toFixed(1)}%)
                      </span>
                      <span className="text-slate-400">
                        Margin: +{activeWardData.marginOfVictoryPct.toFixed(1)}%
                      </span>
                    </div>
                  </div>

                  {/* Progress Bar */}
                  <div className="w-full bg-slate-900 rounded-full h-1.5 overflow-hidden mt-1">
                    <div 
                      className="bg-emerald-500 h-full rounded-full shadow-[0_0_8px_rgba(16,185,129,0.4)]" 
                      style={{ width: `${Math.min(activeWardData.winner.votePercentage, 100)}%` }}
                    />
                  </div>
                </div>
              )}

              {/* Full Candidate Breakdown */}
              <div className="space-y-2">
                <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider font-mono">
                  Full Candidate Breakdown
                </div>
                <div className="space-y-1.5 max-h-44 overflow-y-auto pr-1">
                  {activeWardData.candidates.map((cand, idx) => (
                    <div 
                      key={cand.id}
                      className={`p-2.5 rounded-xl text-xs flex items-center justify-between transition-colors ${
                        cand.isWinner 
                          ? 'bg-emerald-500/10 border border-emerald-500/30 text-emerald-200 font-semibold' 
                          : 'bg-slate-800/40 border border-slate-700/40 text-slate-300'
                      }`}
                    >
                      <div className="flex items-center gap-2 truncate">
                        <span className="text-slate-500 font-mono text-[10px] w-3.5">
                          #{idx + 1}
                        </span>
                        <div className="truncate">
                          <div className="truncate font-medium">{cand.name}</div>
                          {cand.notes && (
                            <div className="text-[9px] text-slate-400 font-mono">{cand.notes}</div>
                          )}
                        </div>
                      </div>
                      <div className="text-right shrink-0 ml-2">
                        <div className="font-bold text-white font-mono">
                          {cand.votePercentage.toFixed(1)}%
                        </div>
                        <div className="text-[10px] text-slate-400 font-mono">
                          {cand.votes.toLocaleString()} votes
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Turnout & Electors */}
              <div className="grid grid-cols-2 gap-2 pt-2 border-t border-slate-800 text-xs">
                <div className="bg-slate-800/40 p-2.5 rounded-xl border border-slate-700/40">
                  <div className="text-slate-400 text-[10px] uppercase font-bold font-mono">Ward Turnout</div>
                  <div className="text-base font-bold text-white mt-0.5 font-mono">
                    {activeWardData.turnoutPercentage.toFixed(1)}%
                  </div>
                  <div className="text-[10px] text-slate-500 font-mono">
                    {activeWardData.ballotsCast.toLocaleString()} ballots
                  </div>
                </div>

                <div className="bg-slate-800/40 p-2.5 rounded-xl border border-slate-700/40">
                  <div className="text-slate-400 text-[10px] uppercase font-bold font-mono">Electors</div>
                  <div className="text-base font-bold text-white mt-0.5 font-mono">
                    {activeWardData.registeredVoters.toLocaleString()}
                  </div>
                  <div className="text-[10px] text-slate-500 font-mono">
                    Registered Voters
                  </div>
                </div>
              </div>

              {/* Drilldown button */}
              <button
                onClick={() => onSelectWard(activeWardData.wardNumber)}
                className="w-full py-2.5 px-3 bg-emerald-500 hover:bg-emerald-400 text-slate-950 rounded-xl text-xs font-bold flex items-center justify-center gap-1.5 transition-all shadow-md shadow-emerald-500/20"
              >
                <span>View Historical Ward {activeWardData.wardNumber} Archive</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center py-12 text-center text-slate-400 space-y-2">
              <MapPin className="w-8 h-8 text-emerald-500/60 animate-pulse" />
              <div className="text-sm font-bold text-white">
                Select a Ward on the Map
              </div>
              <p className="text-xs text-slate-400 max-w-xs leading-relaxed">
                {is2003 
                  ? "Hover or click any of the 6 post-amalgamation wards to inspect the two elected councillors, vote margins, candidate totals, and turnout."
                  : "Hover or click any ward geometry (Wards 1 through 12) to inspect local returns, vote margins, candidate totals, and historical profiles."}
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
