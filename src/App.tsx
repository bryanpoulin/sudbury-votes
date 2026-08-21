import React, { useState } from 'react';
import { ViewTab } from './types/election';
import { ALL_ELECTIONS, getElectionByYear } from './data/electionData';
import { Header } from './components/Header';
import { ElectionSummaryCards } from './components/ElectionSummaryCards';
import { InteractiveWardMap } from './components/InteractiveWardMap';
import { MayoralRaceView } from './components/MayoralRaceView';
import { WardRacesGrid } from './components/WardRacesGrid';
import { HistoricalTrendsView } from './components/HistoricalTrendsView';
import { CandidateLookup } from './components/CandidateLookup';
import { ElectionComparison } from './components/ElectionComparison';
import { WardDetailModal } from './components/WardDetailModal';
import { DataTableExport } from './components/DataTableExport';
import { Crown, RotateCcw, ChevronRight, Award, Flame, TrendingUp } from 'lucide-react';

export default function App() {
  const [selectedYear, setSelectedYear] = useState<number>(2022);
  const [activeTab, setActiveTab] = useState<ViewTab>('overview');
  const [selectedWardNumber, setSelectedWardNumber] = useState<number | null>(null);
  const [isWardModalOpen, setIsWardModalOpen] = useState<boolean>(false);

  const currentElection = getElectionByYear(selectedYear);

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
        }}
        activeTab={activeTab}
        onSelectTab={setActiveTab}
      />

      {/* Main App Canvas */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-6">
        {/* Tab 1: Overview & Interactive Map */}
        {activeTab === 'overview' && (
          <div className="space-y-6">
            <ElectionSummaryCards
              election={currentElection}
              onSelectWard={handleSelectWard}
            />

            <InteractiveWardMap
              election={currentElection}
              selectedWardNumber={selectedWardNumber}
              onSelectWard={handleSelectWard}
            />

            {/* Quick Preview of Wards & Mayoral Races */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 pt-2">
              {/* Mayoral snapshot */}
              <div className="bg-slate-900/60 backdrop-blur-md border border-slate-800 rounded-3xl p-6 space-y-4 shadow-xl">
                <div className="flex items-center justify-between">
                  <h3 className="text-base font-bold text-white flex items-center gap-2">
                    <Crown className="w-4 h-4 text-emerald-400" />
                    {selectedYear} Mayoral Outcome
                  </h3>
                  <button
                    onClick={() => setActiveTab('mayoral')}
                    className="text-xs text-emerald-400 hover:text-emerald-300 font-semibold flex items-center gap-1 group"
                  >
                    <span>View Full Race</span>
                    <ChevronRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
                  </button>
                </div>

                <div className="p-4 bg-emerald-500/10 border border-emerald-500/30 rounded-2xl flex items-center justify-between shadow-inner">
                  <div>
                    <div className="text-[11px] text-emerald-400 font-bold uppercase tracking-wider font-mono">Mayor-Elect</div>
                    <div className="text-xl font-black text-white mt-0.5">{currentElection.mayoralRace.winner.name}</div>
                  </div>
                  <div className="text-right">
                    <div className="text-2xl font-black text-emerald-400 font-mono">{currentElection.mayoralRace.winner.votePercentage.toFixed(1)}%</div>
                    <div className="text-xs text-slate-400 font-mono">{currentElection.mayoralRace.winner.votes.toLocaleString()} votes</div>
                  </div>
                </div>

                <div className="space-y-1.5 pt-1">
                  <div className="text-[10px] text-slate-400 font-bold uppercase tracking-wider font-mono">Top Contenders</div>
                  {currentElection.mayoralRace.candidates.slice(1, 4).map((cand) => (
                    <div key={cand.id} className="p-2.5 bg-slate-800/40 rounded-xl text-xs flex items-center justify-between border border-slate-700/40">
                      <span className="text-slate-200 font-medium">{cand.name}</span>
                      <span className="font-bold text-slate-300 font-mono">{cand.votePercentage.toFixed(1)}% <span className="text-slate-500 font-normal">({cand.votes.toLocaleString()})</span></span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Council Quick Highlights */}
              <div className="bg-slate-900/60 backdrop-blur-md border border-slate-800 rounded-3xl p-6 space-y-4 shadow-xl">
                <div className="flex items-center justify-between">
                  <h3 className="text-base font-bold text-white flex items-center gap-2">
                    <RotateCcw className="w-4 h-4 text-emerald-400" />
                    {selectedYear} Council Turnover & Wards
                  </h3>
                  <button
                    onClick={() => setActiveTab('wards')}
                    className="text-xs text-emerald-400 hover:text-emerald-300 font-semibold flex items-center gap-1 group"
                  >
                    <span>View All 12 Wards</span>
                    <ChevronRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
                  </button>
                </div>

                <div className="p-4 bg-slate-800/40 border border-slate-700/60 rounded-2xl flex items-center justify-between shadow-inner">
                  <div>
                    <div className="text-[11px] text-slate-400 font-bold uppercase tracking-wider font-mono">Council Composition</div>
                    <div className="text-base font-bold text-white mt-0.5">
                      {12 - currentElection.councilTurnoverCount} Incumbents • {currentElection.councilTurnoverCount} New Reps
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-2xl font-black text-emerald-400 font-mono">{Math.round((currentElection.councilTurnoverCount / 12) * 100)}%</div>
                    <div className="text-xs text-slate-400 font-mono">Turnover Rate</div>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3 pt-1 text-xs">
                  <div className="p-3 bg-slate-800/40 rounded-2xl border border-slate-700/60">
                    <div className="text-slate-400 text-[10px] uppercase font-bold font-mono flex items-center gap-1">
                      <TrendingUp className="w-3 h-3 text-emerald-400" /> Highest Turnout
                    </div>
                    <div className="font-bold text-white mt-1 truncate">
                      {[...currentElection.wards].sort((a, b) => b.turnoutPercentage - a.turnoutPercentage)[0]?.wardName}
                    </div>
                    <div className="text-emerald-400 text-xs font-bold font-mono mt-0.5">
                      {[...currentElection.wards].sort((a, b) => b.turnoutPercentage - a.turnoutPercentage)[0]?.turnoutPercentage.toFixed(1)}% Turnout
                    </div>
                  </div>

                  <div className="p-3 bg-slate-800/40 rounded-2xl border border-slate-700/60">
                    <div className="text-slate-400 text-[10px] uppercase font-bold font-mono flex items-center gap-1">
                      <Flame className="w-3 h-3 text-amber-400" /> Closest Victory
                    </div>
                    <div className="font-bold text-white mt-1 truncate">
                      Ward {[...currentElection.wards].sort((a, b) => a.marginOfVictoryPct - b.marginOfVictoryPct)[0]?.wardNumber}
                    </div>
                    <div className="text-amber-400 text-xs font-bold font-mono mt-0.5">
                      +{[...currentElection.wards].sort((a, b) => a.marginOfVictoryPct - b.marginOfVictoryPct)[0]?.marginOfVictoryPct.toFixed(1)}% Margin
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Tab 2: Mayoral Race Deep Dive */}
        {activeTab === 'mayoral' && (
          <MayoralRaceView
            election={currentElection}
            onSelectYear={setSelectedYear}
          />
        )}

        {/* Tab 3: 12 Wards Races */}
        {activeTab === 'wards' && (
          <WardRacesGrid
            election={currentElection}
            onSelectWard={handleSelectWard}
          />
        )}

        {/* Tab 4: Historical Trends (2003-2022) */}
        {activeTab === 'trends' && (
          <HistoricalTrendsView
            onSelectYear={(year) => {
              setSelectedYear(year);
              setActiveTab('overview');
            }}
            onSelectWard={handleSelectWard}
          />
        )}

        {/* Tab 5: Candidate Career Tracker */}
        {activeTab === 'candidates' && (
          <CandidateLookup
            onSelectYear={(year) => {
              setSelectedYear(year);
              setActiveTab('overview');
            }}
          />
        )}

        {/* Tab 6: Side-by-Side Election Comparison */}
        {activeTab === 'compare' && (
          <ElectionComparison
            onSelectWard={handleSelectWard}
          />
        )}

        {/* Tab 7: Data & Export */}
        {activeTab === 'data' && (
          <DataTableExport />
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
