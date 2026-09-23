import React, { useState } from 'react';
import { ElectionYearData } from '../types/election';
import { getWardGeometriesForYear } from '../data/wardGeometries';
import { 
  ZoomIn, 
  ZoomOut, 
  RotateCcw, 
  Award, 
  Compass, 
  MapPin, 
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
  const [hoveredWardNumber, setHoveredWardNumber] = useState<number | null>(null);
  const [zoomLevel, setZoomLevel] = useState<number>(1);
  const [panOffset, setPanOffset] = useState<{ x: number; y: number }>({ x: 0, y: 0 });

  const is2003 = election.year === 2003;
  const wardGeometries = getWardGeometriesForYear(election.year);

  const activeWardNumber = hoveredWardNumber ?? selectedWardNumber ?? 1;
  const activeWardData = election.wards.find((w) => w.wardNumber === activeWardNumber);
  const activeWardGeo = wardGeometries.find((g) => g.wardNumber === activeWardNumber);

  // Clean color palette for wards
  const getWardFillColor = (wardNumber: number): string => {
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
    <div className="bg-white dark:bg-slate-900/60 backdrop-blur-md border border-slate-200 dark:border-slate-800 rounded-3xl p-5 sm:p-6 shadow-sm dark:shadow-xl space-y-5">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-200 dark:border-slate-800 pb-4">
        <div>
          <div className="flex items-center gap-2">
            <Compass className="w-5 h-5 text-emerald-500 dark:text-emerald-400" />
            <h2 className="text-base sm:text-lg font-bold text-slate-900 dark:text-white tracking-tight">
              Interactive Greater Sudbury Ward Map ({election.year})
            </h2>
            {is2003 && (
              <span className="px-2.5 py-0.5 rounded-full bg-emerald-500/10 text-emerald-700 dark:text-emerald-300 border border-emerald-500/20 text-xs font-mono">
                6 Dual-Member Wards
              </span>
            )}
          </div>
          <p className="text-xs text-slate-600 dark:text-slate-400 mt-0.5">
            {is2003 
              ? "Click on any of the 6 post-amalgamation wards to inspect the elected councillors and returns"
              : "Click on any of the 12 municipal wards to view councillor returns, victory margins, and turnout"}
          </p>
        </div>

        <div className="text-xs text-slate-500 dark:text-slate-400 font-mono flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-emerald-500 dark:bg-emerald-400"></span>
          <span>Click any ward to inspect</span>
        </div>
      </div>

      {/* Main Map View & Ward Inspector Side Panel */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* SVG Map Canvas (8 cols) */}
        <div className="lg:col-span-8 bg-slate-50 dark:bg-slate-950/80 border border-slate-200 dark:border-slate-800 rounded-2xl relative overflow-hidden flex flex-col items-center justify-center min-h-[460px] shadow-inner">
          
          {/* Zoom and Reset Overlay Controls */}
          <div className="absolute top-3 right-3 z-10 flex flex-col gap-1.5 bg-white/90 dark:bg-slate-900/90 backdrop-blur p-1 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-md">
            <button
              onClick={() => handleZoom(0.2)}
              className="p-2 text-slate-700 dark:text-slate-300 hover:text-slate-950 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800 rounded-xl transition-colors cursor-pointer"
              title="Zoom In"
            >
              <ZoomIn className="w-4 h-4" />
            </button>
            <button
              onClick={() => handleZoom(-0.2)}
              className="p-2 text-slate-700 dark:text-slate-300 hover:text-slate-950 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800 rounded-xl transition-colors cursor-pointer"
              title="Zoom Out"
            >
              <ZoomOut className="w-4 h-4" />
            </button>
            <button
              onClick={handleResetView}
              className="p-2 text-slate-700 dark:text-slate-300 hover:text-slate-950 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800 rounded-xl transition-colors cursor-pointer"
              title="Reset View"
            >
              <RotateCcw className="w-4 h-4" />
            </button>
          </div>

          {/* Geographic Extent Tag */}
          <div className="absolute top-3 left-3 z-10 bg-white/95 dark:bg-slate-900/90 backdrop-blur px-3 py-1.5 rounded-xl border border-slate-200 dark:border-slate-800 text-[11px] text-slate-700 dark:text-slate-300 shadow">
            <div className="font-bold text-slate-900 dark:text-white flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-emerald-500 inline-block animate-pulse"></span>
              <span>Sudbury Geographic District</span>
            </div>
            <div className="text-[10px] font-mono text-slate-500 dark:text-slate-400">
              {is2003 ? "6 Dual-Member Wards • Scale: 3,228 km² Geographic Extent" : "Scale: 3,228 km² Geographic Extent"}
            </div>
          </div>

          {/* SVG Map */}
          <div className="w-full h-full flex items-center justify-center p-2">
            <svg
              viewBox="45 35 490 410"
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
                        fontSize={is2003 ? '13' : isSelected ? '12' : '10.5'}
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
                          fontSize={is2003 ? '8' : '7.5'}
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

              {/* Clean Cartographic Community Reference Markers */}
              <g className="pointer-events-none">
                {[
                  { name: "Chelmsford", x: 135, y: 215, ward: 3 },
                  { name: "Levack", x: 110, y: 90, ward: 3 },
                  { name: "Onaping", x: 95, y: 120, ward: 3 },
                  { name: "Dowling", x: 115, y: 155, ward: 3 },
                  { name: "Hanmer", x: 285, y: 72, ward: 6 },
                  { name: "Val Thérèse", x: 265, y: 118, ward: 6 },
                  { name: "Capreol", x: 420, y: 80, ward: 7 },
                  { name: "Skead", x: 470, y: 135, ward: 7 },
                  { name: "Garson", x: 415, y: 215, ward: 7 },
                  { name: "Falconbridge", x: 465, y: 210, ward: 7 },
                  { name: "Val Caron", x: 285, y: 155, ward: 5 },
                  { name: "Blezard Valley", x: 245, y: 175, ward: 5 },
                  { name: "Azilda", x: 235, y: 220, ward: 4 },
                  { name: "Lively", x: 130, y: 320, ward: 2 },
                  { name: "Copper Cliff", x: 175, y: 295, ward: 2 },
                  { name: "Whitefish", x: 110, y: 390, ward: 2 },
                  { name: "Coniston", x: 440, y: 285, ward: 9 },
                  { name: "Wahnapitae", x: 470, y: 310, ward: 9 },
                  { name: "Wanup", x: 440, y: 395, ward: 9 },
                ].map((com, i) => (
                  <g key={i} className="opacity-75">
                    <circle cx={com.x} cy={com.y} r="1.8" fill="#e2e8f0" className="drop-shadow-[0_1px_2px_rgba(0,0,0,0.8)]" />
                    <text
                      x={com.x}
                      y={com.y - 4}
                      textAnchor="middle"
                      fill="#cbd5e1"
                      fontSize="6"
                      fontWeight="600"
                      className="tracking-wider drop-shadow-[0_1px_2px_rgba(0,0,0,0.9)]"
                    >
                      {com.name}
                    </text>
                  </g>
                ))}
              </g>
            </svg>
          </div>

          {/* Clean Map Legend Footer */}
          {/* Map Status Bar */}
          <div className="w-full bg-white/90 dark:bg-slate-900/80 backdrop-blur border-t border-slate-200 dark:border-slate-800/80 p-3 flex flex-wrap items-center justify-between gap-2 text-xs text-slate-700 dark:text-slate-300 rounded-b-2xl">
            <div className="flex items-center gap-2 text-slate-600 dark:text-slate-400 text-xs">
              <span className="w-2 h-2 rounded-full bg-emerald-500 dark:bg-emerald-400"></span>
              <span>{is2003 ? "Color-coded across 6 dual-member wards (12 councillors total)." : "Color-coded across Greater Sudbury's 12 council wards."}</span>
            </div>

            <div className="text-[11px] font-mono text-slate-500 dark:text-slate-400 ml-auto">
              Active: <strong className="text-emerald-600 dark:text-emerald-400">Ward {activeWardNumber}</strong>
            </div>
          </div>
        </div>

        {/* Selected / Hovered Ward Information Card (4 cols) */}
        <div className="lg:col-span-4 bg-white dark:bg-slate-900/60 backdrop-blur-md border border-slate-200 dark:border-slate-800 rounded-2xl p-5 space-y-4 shadow-sm dark:shadow-lg">
          {activeWardData && activeWardGeo ? (
            <div className="space-y-4">
              {/* Ward Header */}
              <div className="border-b border-slate-200 dark:border-slate-800 pb-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs px-2.5 py-0.5 rounded-full bg-emerald-500/10 text-emerald-700 dark:text-emerald-400 font-bold border border-emerald-500/20 font-mono">
                    Ward {activeWardData.wardNumber} {activeWardData.isDualMemberWard ? '(Dual-Member)' : ''}
                  </span>
                  <span className="text-xs text-slate-500 font-mono">
                    {activeWardGeo.areaKm2} km²
                  </span>
                </div>
                <h3 className="text-base font-bold text-slate-900 dark:text-white mt-2">
                  {activeWardData.wardName}
                </h3>
                <p className="text-xs text-slate-600 dark:text-slate-400 mt-1 leading-relaxed">
                  {activeWardGeo.description}
                </p>
              </div>

              {/* Winner Showcase: Dual-Member Support */}
              {activeWardData.isDualMemberWard && activeWardData.councillors ? (
                <div className="space-y-2">
                  <div className="text-[11px] font-bold text-emerald-600 dark:text-emerald-400 uppercase tracking-wider flex items-center gap-1.5">
                    <Award className="w-4 h-4 text-emerald-500 dark:text-emerald-400" />
                    Elected Councillors (2 Seats)
                  </div>
                  <div className="grid grid-cols-1 gap-2">
                    {activeWardData.councillors.map((c, idx) => (
                      <div key={idx} className="bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700/60 rounded-xl p-3 space-y-1">
                        <div className="flex items-center justify-between">
                          <span className="text-sm font-bold text-slate-900 dark:text-white flex items-center gap-1.5">
                            <ShieldCheck className="w-3.5 h-3.5 text-emerald-500 dark:text-emerald-400" />
                            {c.name}
                          </span>
                          <span className="px-1.5 py-0.5 rounded bg-emerald-500/10 text-emerald-700 dark:text-emerald-300 text-[10px] font-mono">
                            {c.notes || `Seat ${idx === 0 ? 'A' : 'B'}`}
                          </span>
                        </div>
                        <div className="flex items-center justify-between text-xs text-emerald-600 dark:text-emerald-400 font-mono">
                          <span>{c.votes.toLocaleString()} votes</span>
                          <span>{c.votePercentage.toFixed(1)}%</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ) : (
                <div className="bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700/60 rounded-2xl p-4 space-y-2.5">
                  <div className="flex items-center justify-between text-xs text-slate-500 dark:text-slate-400">
                    <span className="font-bold uppercase tracking-wider text-emerald-600 dark:text-emerald-400 flex items-center gap-1.5">
                      <Award className="w-4 h-4 text-emerald-500 dark:text-emerald-400" />
                      Elected Councillor
                    </span>
                    <span className="px-2 py-0.5 rounded-md bg-white dark:bg-slate-900/80 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700 text-[10px] font-mono">
                      {activeWardData.isIncumbentRetained ? 'Incumbent Re-elected' : 'New Representative'}
                    </span>
                  </div>

                  <div>
                    <div className="text-lg font-bold text-slate-900 dark:text-white">
                      {activeWardData.winner.name}
                    </div>
                    <div className="flex items-center justify-between mt-1 text-xs">
                      <span className="text-emerald-600 dark:text-emerald-400 font-bold">
                        {activeWardData.winner.votes.toLocaleString()} votes ({activeWardData.winner.votePercentage.toFixed(1)}%)
                      </span>
                      <span className="text-slate-500 dark:text-slate-400">
                        Margin: +{activeWardData.marginOfVictoryPct.toFixed(1)}%
                      </span>
                    </div>
                  </div>

                  {/* Progress Bar */}
                  <div className="w-full bg-slate-200 dark:bg-slate-900 rounded-full h-1.5 overflow-hidden mt-1">
                    <div 
                      className="bg-emerald-500 h-full rounded-full shadow-[0_0_8px_rgba(16,185,129,0.4)]" 
                      style={{ width: `${Math.min(activeWardData.winner.votePercentage, 100)}%` }}
                    />
                  </div>
                </div>
              )}

              {/* Full Candidate Breakdown */}
              <div className="space-y-1.5">
                <div className="text-[10px] font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider font-mono">
                  Full Candidate Breakdown
                </div>
                <div className="space-y-1">
                  {activeWardData.candidates.map((cand, idx) => (
                    <div 
                      key={cand.id}
                      className={`py-1.5 px-2.5 rounded-xl text-xs flex items-center justify-between transition-colors ${
                        cand.isWinner 
                          ? 'bg-emerald-500/10 border border-emerald-500/30 text-emerald-800 dark:text-emerald-200 font-semibold' 
                          : 'bg-slate-50 dark:bg-slate-800/40 border border-slate-200 dark:border-slate-700/40 text-slate-700 dark:text-slate-300'
                      }`}
                    >
                      <div className="flex items-center gap-1.5 truncate">
                        <span className="text-slate-400 font-mono text-[10px] w-4">
                          #{idx + 1}
                        </span>
                        <span className="truncate font-medium">{cand.name}</span>
                        {cand.notes && (
                          <span className="text-[9px] text-slate-500 dark:text-slate-400 font-mono hidden sm:inline">({cand.notes})</span>
                        )}
                      </div>
                      <div className="flex items-center gap-2 shrink-0 ml-2 font-mono">
                        <span className="text-[11px] text-slate-500 dark:text-slate-400">
                          {cand.votes.toLocaleString()}
                        </span>
                        <span className="font-bold text-slate-900 dark:text-white text-xs min-w-[42px] text-right">
                          {cand.votePercentage.toFixed(1)}%
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Turnout & Electors */}
              <div className="grid grid-cols-2 gap-2 pt-2 border-t border-slate-200 dark:border-slate-800 text-xs">
                <div className="bg-slate-50 dark:bg-slate-800/40 p-2.5 rounded-xl border border-slate-200 dark:border-slate-700/40">
                  <div className="text-slate-500 dark:text-slate-400 text-[10px] uppercase font-bold font-mono">Ward Turnout</div>
                  <div className="text-base font-bold text-slate-900 dark:text-white mt-0.5 font-mono">
                    {activeWardData.turnoutPercentage.toFixed(1)}%
                  </div>
                  <div className="text-[10px] text-slate-500 font-mono">
                    {activeWardData.ballotsCast.toLocaleString()} ballots
                  </div>
                </div>

                <div className="bg-slate-50 dark:bg-slate-800/40 p-2.5 rounded-xl border border-slate-200 dark:border-slate-700/40">
                  <div className="text-slate-500 dark:text-slate-400 text-[10px] uppercase font-bold font-mono">Electors</div>
                  <div className="text-base font-bold text-slate-900 dark:text-white mt-0.5 font-mono">
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
                className="w-full py-2.5 px-3 bg-emerald-500 hover:bg-emerald-400 text-slate-950 rounded-xl text-xs font-bold flex items-center justify-center gap-1.5 transition-all shadow-md shadow-emerald-500/20 cursor-pointer"
              >
                <span>View Historical Ward {activeWardData.wardNumber} Archive</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center py-12 text-center text-slate-500 dark:text-slate-400 space-y-2">
              <MapPin className="w-8 h-8 text-emerald-500/60 animate-pulse" />
              <div className="text-sm font-bold text-slate-900 dark:text-white">
                Select a Ward on the Map
              </div>
              <p className="text-xs text-slate-600 dark:text-slate-400 max-w-xs leading-relaxed">
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
