import React, { useState, useEffect } from 'react';
import { ViewTab } from './types/election';
import { getElectionByYear } from './data/electionData';
import { Header } from './components/Header';
import { ElectionSummaryCards } from './components/ElectionSummaryCards';
import { InteractiveWardMap } from './components/InteractiveWardMap';
import { WardRacesGrid } from './components/WardRacesGrid';
import { HistoricalTrendsView } from './components/HistoricalTrendsView';
import { ElectionComparison } from './components/ElectionComparison';
import { WardDetailModal } from './components/WardDetailModal';
import { ElectionHub2026 } from './components/election2026/ElectionHub2026';
import { CivicPrioritiesBanner } from './components/CivicPrioritiesBanner';
import { CivicIdeaBoard } from './components/CivicIdeaBoard';
import { Election2026HubTab } from './types/election2026';
import { CivicThemeId } from './types/civicIdeas';
import { ChevronRight, Radio } from 'lucide-react';

export default function App() {
  const [selectedYear, setSelectedYear] = useState<number>(2026);
  const [activeTab, setActiveTab] = useState<ViewTab>('election2026');
  const [hub2026Tab, setHub2026Tab] = useState<Election2026HubTab>('candidates');
  const [selectedWardNumber, setSelectedWardNumber] = useState<number | null>(null);
  const [isWardModalOpen, setIsWardModalOpen] = useState<boolean>(false);

  // Check if loaded in embed mode for external news site or iframe embed
  const isEmbedMode = typeof window !== 'undefined' && (
    window.location.pathname.startsWith('/embed') || 
    new URLSearchParams(window.location.search).get('embed') === 'feed' ||
    new URLSearchParams(window.location.search).get('embed') === 'true'
  );

  const embedWard = typeof window !== 'undefined' 
    ? new URLSearchParams(window.location.search).get('ward') || 'all' 
    : 'all';
  const embedTheme = typeof window !== 'undefined'
    ? (new URLSearchParams(window.location.search).get('theme') as CivicThemeId) || 'all'
    : 'all';

  // Deep-linking URL parameter and pathname initialization (/priorities, ?tab=priorities)
  useEffect(() => {
    try {
      if (typeof window !== 'undefined') {
        const pathname = window.location.pathname;
        const isPrioritiesPath = pathname === '/priorities' || pathname.startsWith('/priorities/') || pathname === '/board';
        const params = new URLSearchParams(window.location.search);
        const tabParam = params.get('tab');
        const hash = window.location.hash;

        if (isPrioritiesPath || tabParam === 'priorities' || tabParam === 'board' || hash === '#priorities') {
          setSelectedYear(2026);
          setActiveTab('election2026');
          setHub2026Tab('priorities');
        } else if (tabParam === 'candidates' || tabParam === 'debates' || tabParam === 'results') {
          setSelectedYear(2026);
          setActiveTab('election2026');
          setHub2026Tab(tabParam as Election2026HubTab);
        } else if (tabParam === 'overview' || tabParam === 'trends' || tabParam === 'compare') {
          setActiveTab(tabParam as ViewTab);
        }
      }
    } catch {
      // Graceful fallback
    }
  }, []);

  const currentElection = getElectionByYear(selectedYear === 2026 ? 2022 : selectedYear);

  const handleSelectWard = (wardNumber: number) => {
    setSelectedWardNumber(wardNumber);
    setIsWardModalOpen(true);
  };

  const handleOpenPriorities = () => {
    setSelectedYear(2026);
    setActiveTab('election2026');
    setHub2026Tab('priorities');
    // Update URL without reloading page
    try {
      if (typeof window !== 'undefined' && window.history && window.history.replaceState) {
        const url = new URL(window.location.href);
        url.searchParams.set('tab', 'priorities');
        window.history.replaceState({}, '', url.toString());
      }
    } catch {}
    // Scroll smoothly to board section if needed
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  if (isEmbedMode) {
    return (
      <div className="min-h-screen bg-slate-950 text-slate-100 p-2 sm:p-4 font-sans selection:bg-emerald-500 selection:text-slate-950">
        <CivicIdeaBoard isEmbedded={true} initialWard={embedWard} initialTheme={embedTheme} />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans selection:bg-emerald-500 selection:text-slate-950">
      {/* Top Civic Community Priorities Announcement Ribbon */}
      <CivicPrioritiesBanner
        onOpenPriorities={handleOpenPriorities}
        isAlreadyOnPrioritiesTab={activeTab === 'election2026' && hub2026Tab === 'priorities'}
      />

      {/* App Navigation Header */}
      <Header
        selectedYear={selectedYear}
        onSelectYear={(year) => {
          setSelectedYear(year);
          setSelectedWardNumber(null);
          if (year === 2026) {
            setActiveTab('election2026');
          } else if (activeTab === 'election2026') {
            setActiveTab('overview');
          }
        }}
        activeTab={activeTab}
        onSelectTab={setActiveTab}
      />

      {/* Main App Canvas */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-6">
        {/* Tab 0: 2026 Live Election Hub */}
        {activeTab === 'election2026' && (
          <ElectionHub2026
            initialHubTab={hub2026Tab}
            onTabChange={(tab) => setHub2026Tab(tab)}
          />
        )}

        {/* Tab 1: Results & Ward Map (Consolidated Historical Overview) */}
        {activeTab === 'overview' && (
          <div className="space-y-6">
            {/* Quick 2026 Hub Banner */}
            <div className="bg-gradient-to-r from-emerald-950/40 via-slate-900 to-slate-900 border border-emerald-500/30 rounded-3xl p-4 sm:p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4 shadow-xl">
              <div className="flex items-center gap-3">
                <div className="p-2.5 bg-emerald-500/20 text-emerald-400 rounded-2xl border border-emerald-500/30">
                  <Radio className="w-5 h-5 animate-pulse" />
                </div>
                <div>
                  <div className="text-xs font-mono uppercase tracking-wider text-emerald-400 font-bold flex items-center gap-1.5">
                    <span>Upcoming Election</span> • <span>October 26, 2026</span>
                  </div>
                  <h3 className="text-sm sm:text-base font-bold text-white mt-0.5">
                    Explore the 2026 Greater Sudbury Municipal Election Hub
                  </h3>
                </div>
              </div>

              <button
                onClick={() => {
                  setSelectedYear(2026);
                  setActiveTab('election2026');
                }}
                className="px-4 py-2 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold rounded-2xl text-xs flex items-center justify-center gap-1.5 transition-all shadow-md shadow-emerald-500/20 shrink-0"
              >
                <span>Open 2026 Election Hub</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>

            {/* Key Civic Indicators (Turnout, Winner, Ballots, Turnout Rate) */}
            <ElectionSummaryCards
              election={currentElection}
              onSelectWard={handleSelectWard}
            />

            {/* Interactive Color-Coded Ward Map */}
            <InteractiveWardMap
              election={currentElection}
              selectedWardNumber={selectedWardNumber}
              onSelectWard={handleSelectWard}
            />

            {/* Complete Ward-by-Ward Results */}
            <WardRacesGrid
              election={currentElection}
              onSelectWard={handleSelectWard}
            />
          </div>
        )}

        {/* Tab 2: Historical Trends (2003-2022) */}
        {activeTab === 'trends' && (
          <HistoricalTrendsView
            onSelectYear={(year) => {
              setSelectedYear(year);
              setActiveTab('overview');
            }}
            onSelectWard={handleSelectWard}
          />
        )}

        {/* Tab 3: Side-by-Side Election Comparison */}
        {activeTab === 'compare' && (
          <ElectionComparison
            onSelectWard={handleSelectWard}
          />
        )}
      </main>

      {/* Ward Drilldown Modal */}
      {isWardModalOpen && (
        <WardDetailModal
          wardNumber={selectedWardNumber}
          onClose={() => setIsWardModalOpen(false)}
          onSelectYear={(year) => {
            setSelectedYear(year);
            setActiveTab('overview');
          }}
        />
      )}

      {/* Sleek Footer */}
      <footer className="border-t border-slate-800/80 bg-slate-950/80 backdrop-blur-md mt-12 py-6 text-slate-400 text-xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-500 inline-block"></span>
            <span className="font-semibold text-slate-200">City of Greater Sudbury Municipal Elections Archive</span>
            <span className="text-slate-500 font-mono">• 2003–2022 Official Records</span>
          </div>
          <div className="text-slate-400 font-mono text-[11px]">
            Sleek Interface Edition • Interactive Ward Visualizer & Electoral Analytics
          </div>
        </div>
      </footer>
    </div>
  );
}
