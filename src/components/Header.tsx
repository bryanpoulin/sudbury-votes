import React from 'react';
import { ViewTab } from '../types/election';
import { AVAILABLE_YEARS } from '../data/electionData';
import { 
  Map, 
  TrendingUp, 
  GitCompare, 
  Radio
} from 'lucide-react';

interface HeaderProps {
  selectedYear: number;
  onSelectYear: (year: number) => void;
  activeTab: ViewTab;
  onSelectTab: (tab: ViewTab) => void;
}

export const Header: React.FC<HeaderProps> = ({
  selectedYear,
  onSelectYear,
  activeTab,
  onSelectTab
}) => {
  const navItems: { id: ViewTab; label: string; icon: React.ReactNode }[] = [
    { id: 'overview', label: 'Results & Ward Map', icon: <Map className="w-4 h-4" /> },
    { id: 'trends', label: 'Historical Trends', icon: <TrendingUp className="w-4 h-4" /> },
    { id: 'compare', label: 'Compare Elections', icon: <GitCompare className="w-4 h-4" /> }
  ];

  const handleYearClick = (year: number) => {
    onSelectYear(year);
    if (year === 2026) {
      onSelectTab('election2026');
    } else if (activeTab === 'election2026') {
      onSelectTab('overview');
    }
  };

  const handleTabClick = (tabId: ViewTab) => {
    onSelectTab(tabId);
    if (tabId === 'election2026') {
      onSelectYear(2026);
    } else if (selectedYear === 2026) {
      onSelectYear(2022); // Revert to latest certified historical archive
    }
  };

  return (
    <header className="bg-slate-900/60 backdrop-blur-md border-b border-slate-800 text-white sticky top-0 z-40 shadow-xl">
      {/* Top Banner */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3.5 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        {/* Brand & Identity */}
        <div className="flex items-center gap-3.5">
          <div className="bg-[#00d68f] p-2 sm:p-2.5 rounded-2xl shadow-lg shadow-[#00d68f]/25 flex items-center justify-center shrink-0">
            <svg className="w-5 h-5 text-slate-950" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <rect x="5" y="13" width="3" height="7" rx="1.5" />
              <rect x="10.5" y="8" width="3" height="12" rx="1.5" />
              <rect x="16" y="4" width="3" height="16" rx="1.5" />
            </svg>
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-lg sm:text-xl font-black tracking-tight text-white uppercase">
                SUDBURY <span className="text-[#00d68f]">HISTORICAL</span> VOTES
              </h1>
            </div>
            <p className="text-[10px] sm:text-[11px] text-slate-400 font-mono tracking-[0.2em] uppercase">
              MUNICIPAL ARCHIVE | 2003 — 2022
            </p>
          </div>
        </div>

        {/* Election Controls & Cycle Selector */}
        <div className="flex items-center gap-2.5 overflow-x-auto">
          {/* 2026 Hub Button (Distinct Special Access Point in Emerald Green, to the left of Cycle Container) */}
          <button
            onClick={() => handleYearClick(2026)}
            className={`px-3.5 py-1.5 rounded-full text-xs font-bold transition-all duration-200 flex items-center gap-2 border shadow-sm ${
              selectedYear === 2026 || activeTab === 'election2026'
                ? 'bg-emerald-500 text-slate-950 border-emerald-400 font-black shadow-emerald-500/25 ring-2 ring-emerald-400/40 scale-[1.02]'
                : 'bg-slate-900/90 text-emerald-400 hover:text-emerald-300 hover:bg-slate-800/90 border-emerald-500/40 hover:border-emerald-400/70 shadow-inner'
            }`}
          >
            <Radio className="w-3.5 h-3.5 animate-pulse shrink-0" />
            <span className="tracking-wide uppercase font-black">Sudbury Votes 2026</span>
          </button>

          {/* Historical Cycle Container */}
          <div className="flex items-center gap-1.5 bg-slate-800/40 p-1 rounded-full border border-slate-700/70 shadow-inner">
            <span className="text-[10px] font-mono uppercase tracking-widest text-slate-500 pl-3 pr-1 hidden sm:inline">
              Cycle:
            </span>
            {AVAILABLE_YEARS.map((year) => {
              const isSelected = selectedYear === year && activeTab !== 'election2026';
              return (
                <button
                  key={year}
                  onClick={() => handleYearClick(year)}
                  className={`px-3.5 py-1 rounded-full text-xs font-semibold transition-all duration-200 ${
                    isSelected
                      ? 'bg-emerald-500 text-slate-950 shadow-md shadow-emerald-500/25 font-bold scale-[1.02]'
                      : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/60'
                  }`}
                >
                  {year}
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Historical Navigation Tabs Bar - Hidden when viewing 2026 Election Hub */}
      {activeTab !== 'election2026' && (
        <div className="border-t border-slate-800/80 bg-slate-950/70 backdrop-blur-md animate-fadeIn">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <nav className="flex space-x-1.5 overflow-x-auto py-2 scrollbar-none" aria-label="Historical Tabs">
              {navItems.map((item) => {
                const isActive = activeTab === item.id;
                return (
                  <button
                    key={item.id}
                    onClick={() => handleTabClick(item.id)}
                    className={`flex items-center gap-2 px-3 py-1.5 text-xs font-medium rounded-xl whitespace-nowrap transition-all duration-200 ${
                      isActive
                        ? 'bg-emerald-500/15 text-emerald-300 border border-emerald-500/30 shadow-sm shadow-emerald-500/10 font-semibold'
                        : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900/60 border border-transparent'
                    }`}
                  >
                    <span className={isActive ? 'text-emerald-400' : 'text-slate-400'}>
                      {item.icon}
                    </span>
                    <span>{item.label}</span>
                  </button>
                );
              })}
            </nav>
          </div>
        </div>
      )}
    </header>
  );
};
