import React, { useState, useEffect, useRef } from 'react';
import { ViewTab } from '../types/election';
import { AVAILABLE_YEARS } from '../data/electionData';
import { 
  Map, 
  TrendingUp, 
  GitCompare, 
  Radio
} from 'lucide-react';
import { ThemeToggle } from './ThemeToggle';

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
  const [isVisible, setIsVisible] = useState(true);
  const lastScrollY = useRef(0);

  useEffect(() => {
    let ticking = false;

    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          const currentScrollY = window.scrollY;

          // Always visible at the very top of the page
          if (currentScrollY <= 50) {
            setIsVisible(true);
          } else if (currentScrollY > lastScrollY.current + 8) {
            // Scrolling down past threshold: hide header
            setIsVisible(false);
          } else if (currentScrollY < lastScrollY.current - 8) {
            // Scrolling up: reveal header
            setIsVisible(true);
          }

          lastScrollY.current = Math.max(0, currentScrollY);
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

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
    <header 
      className={`bg-white/85 dark:bg-slate-900/60 backdrop-blur-md border-b border-slate-200 dark:border-slate-800 text-slate-900 dark:text-white sticky top-0 z-40 shadow-sm dark:shadow-xl transition-all duration-300 ease-in-out transform ${
        isVisible 
          ? 'translate-y-0 opacity-100' 
          : '-translate-y-full opacity-0 pointer-events-none'
      }`}
    >
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
              <h1 className="text-lg sm:text-xl font-black tracking-tight text-slate-900 dark:text-white uppercase">
                SUDBURY <span className="text-[#00d68f]">HISTORICAL</span> VOTES
              </h1>
            </div>
            <p className="text-[10px] sm:text-[11px] text-slate-500 dark:text-slate-400 font-mono tracking-[0.2em] uppercase">
              MUNICIPAL ARCHIVE | 2003 — 2022
            </p>
          </div>
        </div>

        {/* Election Controls, Cycle Selector & Theme Toggle */}
        <div className="flex items-center gap-3 overflow-x-auto">
          {/* Unified Cycle Container with 2026 Live Hub and Historical Cycles */}
          <div className="flex items-center gap-1.5 bg-slate-100 dark:bg-slate-800/40 p-1 rounded-full border border-slate-200 dark:border-slate-700/70 shadow-inner">
            <span className="text-[10px] font-mono uppercase tracking-widest text-slate-500 pl-3 pr-1 hidden sm:inline">
              Cycle:
            </span>

            {/* 2026 Button within the Cycle Group with Pulsating Icon */}
            <button
              onClick={() => handleYearClick(2026)}
              className={`px-3.5 py-1 rounded-full text-xs font-bold transition-all duration-200 flex items-center gap-1.5 cursor-pointer ${
                selectedYear === 2026 || activeTab === 'election2026'
                  ? 'bg-emerald-500 text-slate-950 shadow-md shadow-emerald-500/25 font-black scale-[1.02]'
                  : 'text-emerald-600 dark:text-emerald-400 hover:text-emerald-700 dark:hover:text-emerald-300 hover:bg-slate-200/60 dark:hover:bg-slate-800/60'
              }`}
            >
              <Radio className="w-3.5 h-3.5 animate-pulse shrink-0" />
              <span className="tracking-wide">2026</span>
            </button>

            {/* Historical Cycle Years */}
            {AVAILABLE_YEARS.map((year) => {
              const isSelected = selectedYear === year && activeTab !== 'election2026';
              return (
                <button
                  key={year}
                  onClick={() => handleYearClick(year)}
                  className={`px-3.5 py-1 rounded-full text-xs font-semibold transition-all duration-200 cursor-pointer ${
                    isSelected
                      ? 'bg-emerald-500 text-slate-950 shadow-md shadow-emerald-500/25 font-bold scale-[1.02]'
                      : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200 hover:bg-slate-200/60 dark:hover:bg-slate-800/60'
                  }`}
                >
                  {year}
                </button>
              );
            })}
          </div>

          {/* Theme Toggle Button */}
          <ThemeToggle />
        </div>
      </div>

      {/* Historical Navigation Tabs Bar - Hidden when viewing 2026 Election Hub */}
      {activeTab !== 'election2026' && (
        <div className="border-t border-slate-200 dark:border-slate-800/80 bg-slate-50/90 dark:bg-slate-950/70 backdrop-blur-md animate-fadeIn">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <nav className="flex space-x-1.5 overflow-x-auto py-2 scrollbar-none" aria-label="Historical Tabs">
              {navItems.map((item) => {
                const isActive = activeTab === item.id;
                return (
                  <button
                    key={item.id}
                    onClick={() => handleTabClick(item.id)}
                    className={`flex items-center gap-2 px-3 py-1.5 text-xs font-medium rounded-xl whitespace-nowrap transition-all duration-200 cursor-pointer ${
                      isActive
                        ? 'bg-emerald-500/15 text-emerald-800 dark:text-emerald-300 border border-emerald-500/30 shadow-sm shadow-emerald-500/10 font-semibold'
                        : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200 hover:bg-slate-200/60 dark:hover:bg-slate-900/60 border border-transparent'
                    }`}
                  >
                    <span className={isActive ? 'text-emerald-600 dark:text-emerald-400' : 'text-slate-400'}>
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
