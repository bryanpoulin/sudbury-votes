import React from 'react';
import { ViewTab } from '../types/election';
import { AVAILABLE_YEARS } from '../data/electionData';
import { 
  Vote, 
  Map, 
  UserCheck, 
  LayoutGrid, 
  TrendingUp, 
  Users, 
  GitCompare, 
  Table, 
  Calendar,
  Layers,
  BarChart2
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
    { id: 'overview', label: 'Election Overview', icon: <Map className="w-4 h-4" /> },
    { id: 'wards', label: 'Ward Races', icon: <LayoutGrid className="w-4 h-4" /> },
    { id: 'mayoral', label: 'Mayoral Contest', icon: <UserCheck className="w-4 h-4" /> },
    { id: 'trends', label: 'Historical Trends', icon: <TrendingUp className="w-4 h-4" /> },
    { id: 'candidates', label: 'Candidate Database', icon: <Users className="w-4 h-4" /> },
    { id: 'compare', label: 'Compare Elections', icon: <GitCompare className="w-4 h-4" /> },
    { id: 'data', label: 'Data & Export', icon: <Table className="w-4 h-4" /> }
  ];

  return (
    <header className="bg-slate-900/60 backdrop-blur-md border-b border-slate-800 text-white sticky top-0 z-40 shadow-xl">
      {/* Top Banner */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3.5 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        {/* Brand & Identity */}
        <div className="flex items-center gap-3.5">
          <div className="bg-emerald-500 p-2.5 rounded-xl shadow-lg shadow-emerald-500/25 flex items-center justify-center shrink-0">
            <svg className="w-5 h-5 text-slate-950" fill="none" stroke="currentColor" strokeWidth="2.2" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
            </svg>
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-lg sm:text-xl font-bold tracking-tight text-white">
                SUDBURY <span className="text-emerald-400 font-extrabold uppercase">Historical</span> VOTES
              </h1>
            </div>
            <p className="text-[10px] text-slate-400 font-mono tracking-widest uppercase">
              MUNICIPAL ARCHIVE | 2003 — 2022
            </p>
          </div>
        </div>

        {/* Election Year Selector in Sleek Pill Design */}
        <div className="flex items-center gap-1.5 overflow-x-auto bg-slate-800/40 p-1 rounded-full border border-slate-700/70 shadow-inner">
          <span className="text-[10px] font-mono uppercase tracking-widest text-slate-500 pl-3 pr-1 hidden sm:inline">
            Cycle:
          </span>
          {AVAILABLE_YEARS.map((year) => {
            const isSelected = selectedYear === year;
            return (
              <button
                key={year}
                onClick={() => onSelectYear(year)}
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

      {/* Navigation Tabs Bar */}
      <div className="border-t border-slate-800/80 bg-slate-950/70 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <nav className="flex space-x-1.5 overflow-x-auto py-2 scrollbar-none" aria-label="Tabs">
            {navItems.map((item) => {
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => onSelectTab(item.id)}
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
    </header>
  );
};
