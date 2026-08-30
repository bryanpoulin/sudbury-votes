import React, { useState } from 'react';
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
import { ChevronRight, Radio } from 'lucide-react';

export default function App() {
  const [selectedYear, setSelectedYear] = useState<number>(2022);
  const [activeTab, setActiveTab] = useState<ViewTab>('overview');
  const [selectedWardNumber, setSelectedWardNumber] = useState<number | null>(null);
  const [isWardModalOpen, setIsWardModalOpen] = useState<boolean>(false);

  const currentElection = getElectionByYear(selectedYear === 2026 ? 2022 : selectedYear);

  const handleSelectWard = (wardNumber: number) => {
    setSelectedWardNumber(wardNumber);
    setIsWardModalOpen(true);
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans selection:bg-emerald-500 selection:text-slate-950">
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
          <ElectionHub2026 />
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
