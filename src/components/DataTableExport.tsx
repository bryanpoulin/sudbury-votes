import React, { useState } from 'react';
import { ALL_ELECTIONS } from '../data/electionData';
import { 
  Table, 
  Download, 
  Search, 
  Filter, 
  FileSpreadsheet, 
  FileCode,
  CheckCircle2
} from 'lucide-react';

export const DataTableExport: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedYearFilter, setSelectedYearFilter] = useState<string>('all');
  const [selectedRaceType, setSelectedRaceType] = useState<string>('all');

  // Flatten data into structured tabular rows
  const allRows: {
    year: number;
    raceType: string;
    wardNumber: number | string;
    candidateName: string;
    votes: number;
    votePercentage: number;
    isWinner: boolean;
    isIncumbent: boolean;
    turnoutPercentage: number;
  }[] = [];

  ALL_ELECTIONS.forEach((election) => {
    // Mayoral Candidates
    election.mayoralRace.candidates.forEach((cand) => {
      allRows.push({
        year: election.year,
        raceType: 'Mayoral',
        wardNumber: 'City-wide',
        candidateName: cand.name,
        votes: cand.votes,
        votePercentage: cand.votePercentage,
        isWinner: cand.isWinner,
        isIncumbent: cand.isIncumbent,
        turnoutPercentage: election.overallTurnout
      });
    });

    // Ward Candidates
    election.wards.forEach((ward) => {
      ward.candidates.forEach((cand) => {
        allRows.push({
          year: election.year,
          raceType: `Ward ${ward.wardNumber}`,
          wardNumber: ward.wardNumber,
          candidateName: cand.name,
          votes: cand.votes,
          votePercentage: cand.votePercentage,
          isWinner: cand.isWinner,
          isIncumbent: cand.isIncumbent,
          turnoutPercentage: ward.turnoutPercentage
        });
      });
    });
  });

  // Filter rows
  const filteredRows = allRows.filter((row) => {
    const matchesSearch = 
      row.candidateName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      row.raceType.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesYear = selectedYearFilter === 'all' || row.year === Number(selectedYearFilter);
    const matchesRace = selectedRaceType === 'all' || 
      (selectedRaceType === 'mayoral' ? row.raceType === 'Mayoral' : row.raceType !== 'Mayoral');

    return matchesSearch && matchesYear && matchesRace;
  });

  // CSV Export Handler
  const downloadCSV = () => {
    const headers = ['Year', 'Race', 'Ward', 'Candidate', 'Votes', 'Vote_Percentage', 'Is_Winner', 'Is_Incumbent', 'Turnout_Percentage'];
    const csvContent = [
      headers.join(','),
      ...filteredRows.map((r) => [
        r.year,
        `"${r.raceType}"`,
        `"${r.wardNumber}"`,
        `"${r.candidateName}"`,
        r.votes,
        r.votePercentage,
        r.isWinner,
        r.isIncumbent,
        r.turnoutPercentage
      ].join(','))
    ].join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.setAttribute('href', url);
    link.setAttribute('download', `sudbury_election_results_${selectedYearFilter}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // JSON Export Handler
  const downloadJSON = () => {
    const jsonContent = JSON.stringify(filteredRows, null, 2);
    const blob = new Blob([jsonContent], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.setAttribute('href', url);
    link.setAttribute('download', `sudbury_election_results_${selectedYearFilter}.json`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="space-y-6">
      {/* Top Banner */}
      <div className="bg-slate-900/60 backdrop-blur-md border border-slate-800 rounded-3xl p-6 sm:p-7 shadow-xl flex flex-col md:flex-row md:items-center justify-between gap-4 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10 pointer-events-none bg-[radial-gradient(circle_at_top_right,_var(--tw-gradient-stops))] from-emerald-500 via-transparent to-transparent" />
        <div className="relative z-10">
          <div className="flex items-center gap-2">
            <Table className="w-6 h-6 text-emerald-400" />
            <h2 className="text-xl sm:text-2xl font-black text-white tracking-tight">
              Sudbury Municipal Elections Dataset (2003–2022)
            </h2>
          </div>
          <p className="text-xs sm:text-sm text-slate-300 mt-0.5">
            Query, filter, and export the complete municipal archive containing {allRows.length} official candidate returns
          </p>
        </div>

        {/* Export Buttons */}
        <div className="flex items-center gap-2.5 relative z-10">
          <button
            onClick={downloadCSV}
            className="px-4 py-2 bg-emerald-500 hover:bg-emerald-400 text-slate-950 rounded-full text-xs font-bold flex items-center gap-1.5 transition-all shadow-md shadow-emerald-500/20"
          >
            <FileSpreadsheet className="w-4 h-4" />
            <span>Export CSV</span>
          </button>

          <button
            onClick={downloadJSON}
            className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-slate-200 hover:text-white rounded-full text-xs font-semibold flex items-center gap-1.5 transition-colors border border-slate-700"
          >
            <FileCode className="w-4 h-4 text-emerald-400" />
            <span>Export JSON</span>
          </button>
        </div>
      </div>

      {/* Table Filter Controls */}
      <div className="bg-slate-900/60 backdrop-blur-md border border-slate-800 rounded-3xl p-5 flex flex-col md:flex-row md:items-center justify-between gap-4 shadow-xl">
        {/* Search Field */}
        <div className="relative min-w-[240px]">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search candidate name or race..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-9 pr-3.5 py-2 bg-slate-800/50 border border-slate-700/70 rounded-full text-xs text-white placeholder-slate-400 focus:outline-none focus:border-emerald-500 transition-colors"
          />
        </div>

        {/* Dropdown Filters */}
        <div className="flex flex-wrap items-center gap-3">
          <div className="flex items-center gap-1.5 text-xs text-slate-300">
            <span className="text-slate-500 font-mono">Year:</span>
            <select
              value={selectedYearFilter}
              onChange={(e) => setSelectedYearFilter(e.target.value)}
              className="bg-slate-800/70 border border-slate-700 text-white text-xs rounded-full px-3 py-1.5 focus:outline-none focus:border-emerald-500 font-mono"
            >
              <option value="all">All Elections (2003-2022)</option>
              <option value="2022">2022</option>
              <option value="2018">2018</option>
              <option value="2014">2014</option>
              <option value="2010">2010</option>
              <option value="2006">2006</option>
              <option value="2003">2003</option>
            </select>
          </div>

          <div className="flex items-center gap-1.5 text-xs text-slate-300">
            <span className="text-slate-500 font-mono">Race:</span>
            <select
              value={selectedRaceType}
              onChange={(e) => setSelectedRaceType(e.target.value)}
              className="bg-slate-800/70 border border-slate-700 text-white text-xs rounded-full px-3 py-1.5 focus:outline-none focus:border-emerald-500 font-mono"
            >
              <option value="all">All Races</option>
              <option value="mayoral">Mayoral Only</option>
              <option value="ward">Ward Council Only</option>
            </select>
          </div>

          <div className="text-xs text-slate-400 font-mono">
            Showing <strong className="text-emerald-400">{filteredRows.length}</strong> records
          </div>
        </div>
      </div>

      {/* Data Table */}
      <div className="bg-slate-900/60 backdrop-blur-md border border-slate-800 rounded-3xl overflow-hidden shadow-xl">
        <div className="overflow-x-auto max-h-[560px]">
          <table className="w-full text-left text-xs border-collapse">
            <thead className="sticky top-0 bg-slate-950 z-10 border-b border-slate-800 text-slate-400 font-mono">
              <tr>
                <th className="py-3 px-4 font-bold">Year</th>
                <th className="py-3 px-4 font-bold">Race</th>
                <th className="py-3 px-4 font-bold">Candidate Name</th>
                <th className="py-3 px-4 font-bold text-right">Votes</th>
                <th className="py-3 px-4 font-bold text-right">Vote Share</th>
                <th className="py-3 px-4 font-bold text-center">Result</th>
                <th className="py-3 px-4 font-bold text-center">Incumbent</th>
                <th className="py-3 px-4 font-bold text-right">Turnout</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60">
              {filteredRows.map((row, idx) => (
                <tr key={`${row.year}-${row.raceType}-${row.candidateName}-${idx}`} className="hover:bg-slate-800/30 transition-colors">
                  <td className="py-3 px-4 font-bold text-emerald-400 font-mono">{row.year}</td>
                  <td className="py-3 px-4 font-medium text-slate-200">{row.raceType}</td>
                  <td className="py-3 px-4 font-semibold text-white">{row.candidateName}</td>
                  <td className="py-3 px-4 text-right font-mono text-slate-300">{row.votes.toLocaleString()}</td>
                  <td className="py-3 px-4 text-right font-bold text-slate-200 font-mono">{row.votePercentage.toFixed(2)}%</td>
                  <td className="py-3 px-4 text-center">
                    {row.isWinner ? (
                      <span className="px-2.5 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 font-bold border border-emerald-500/20 text-[10px] font-mono">
                        Elected
                      </span>
                    ) : (
                      <span className="text-slate-500 text-[10px] font-mono">Defeated</span>
                    )}
                  </td>
                  <td className="py-3 px-4 text-center text-slate-400 font-mono">
                    {row.isIncumbent ? 'Yes' : 'No'}
                  </td>
                  <td className="py-3 px-4 text-right text-slate-300 font-mono">
                    {row.turnoutPercentage.toFixed(1)}%
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
