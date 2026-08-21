import { ElectionYearData } from '../types/election';

export const ELECTION_2006: ElectionYearData = {
  year: 2006,
  electionDate: "November 13, 2006",
  registeredVoters: 127783,
  ballotsCast: 55161,
  overallTurnout: 43.17,
  votingMethod: "Paper & Advance Ballots (Inaugural 12 Single-Member Wards)",
  notes: "Historical Certified Record: The 2006 municipal election marked Greater Sudbury's official transition from 6 dual-member wards to 12 single-member wards, and the first four-year mandate in Ontario municipal history. Former federal MP John Rodriguez won the mayoralty with 28,419 votes (51.89%) over incumbent David Courtemanche and councillor Lynne Reynolds. A historic recount in Ward 12 confirmed Joscelyne Landry-Altmann's victory over John Caruso by 57 votes.",
  keyThemes: [
    "Inaugural 12-Ward Single-Member System",
    "First 4-Year Municipal Term in Ontario",
    "John Rodriguez Decisive Mayoral Victory (51.89%)",
    "De-Amalgamation Referendum Debates",
    "Historic Ward 12 Recount (57-Vote Margin)"
  ],
  councilTurnoverCount: 4,
  totalCouncilSeats: 12,
  mayoralRace: {
    totalVotes: 54771,
    winner: { id: "m-2006-1", name: "John Rodriguez", votes: 28419, votePercentage: 51.89, isWinner: true, isIncumbent: false, color: "#10b981" },
    runnerUp: { id: "m-2006-2", name: "David Courtemanche", votes: 16600, votePercentage: 30.31, isWinner: false, isIncumbent: true, color: "#f97316" },
    marginOfVictoryVotes: 11819,
    marginOfVictoryPct: 21.58,
    candidates: [
      { id: "m-2006-1", name: "John Rodriguez", votes: 28419, votePercentage: 51.89, isWinner: true, isIncumbent: false, color: "#10b981" },
      { id: "m-2006-2", name: "David Courtemanche", votes: 16600, votePercentage: 30.31, isWinner: false, isIncumbent: true, color: "#f97316" },
      { id: "m-2006-3", name: "Lynne Reynolds", votes: 8996, votePercentage: 16.42, isWinner: false, isIncumbent: false, color: "#6366f1" },
      { id: "m-2006-4", name: "David Chevrier", votes: 429, votePercentage: 0.78, isWinner: false, isIncumbent: false, color: "#8b5cf6" },
      { id: "m-2006-5", name: "Marc Crockford", votes: 159, votePercentage: 0.29, isWinner: false, isIncumbent: false, color: "#ec4899" },
      { id: "m-2006-6", name: "Ed Pokonzie", votes: 92, votePercentage: 0.17, isWinner: false, isIncumbent: false, color: "#64748b" },
      { id: "m-2006-7", name: "David Popescu", votes: 76, votePercentage: 0.14, isWinner: false, isIncumbent: false, color: "#475569" }
    ],
    wardWinners: {
      1: "John Rodriguez",
      2: "John Rodriguez",
      3: "John Rodriguez",
      4: "John Rodriguez",
      5: "John Rodriguez",
      6: "John Rodriguez",
      7: "John Rodriguez",
      8: "John Rodriguez",
      9: "John Rodriguez",
      10: "David Courtemanche",
      11: "John Rodriguez",
      12: "John Rodriguez"
    }
  },
  wards: [
    {
      wardNumber: 1,
      wardName: "Ward 1 (West End / South End)",
      neighborhoods: ["West End", "Gatchell", "Robinson", "South End (Part)"],
      registeredVoters: 10450,
      ballotsCast: 4399,
      turnoutPercentage: 42.10,
      isIncumbentRetained: false,
      marginOfVictoryVotes: 2015,
      marginOfVictoryPct: 45.81,
      winner: { id: "w1-2006-1", name: "Joe Cimino", votes: 3016, votePercentage: 68.56, isWinner: true, isIncumbent: false },
      runnerUp: { id: "w1-2006-2", name: "Carlos Reyes", votes: 1001, votePercentage: 22.76, isWinner: false, isIncumbent: false },
      candidates: [
        { id: "w1-2006-1", name: "Joe Cimino", votes: 3016, votePercentage: 68.56, isWinner: true, isIncumbent: false },
        { id: "w1-2006-2", name: "Carlos Reyes", votes: 1001, votePercentage: 22.76, isWinner: false, isIncumbent: false },
        { id: "w1-2006-3", name: "John Mathew", votes: 382, votePercentage: 8.68, isWinner: false, isIncumbent: false }
      ]
    },
    {
      wardNumber: 2,
      wardName: "Ward 2 (Walden / Lively / Copper Cliff)",
      neighborhoods: ["Lively", "Naughton", "Whitefish", "Copper Cliff", "Walden"],
      registeredVoters: 11100,
      ballotsCast: 5133,
      turnoutPercentage: 46.24,
      isIncumbentRetained: false,
      marginOfVictoryVotes: 108,
      marginOfVictoryPct: 2.10,
      winner: { id: "w2-2006-1", name: "Jacques Barbeau", votes: 1838, votePercentage: 35.81, isWinner: true, isIncumbent: false },
      runnerUp: { id: "w2-2006-2", name: "Terry Kett", votes: 1730, votePercentage: 33.70, isWinner: false, isIncumbent: true },
      candidates: [
        { id: "w2-2006-1", name: "Jacques Barbeau", votes: 1838, votePercentage: 35.81, isWinner: true, isIncumbent: false },
        { id: "w2-2006-2", name: "Terry Kett", votes: 1730, votePercentage: 33.70, isWinner: false, isIncumbent: true },
        { id: "w2-2006-3", name: "Sandy Bass", votes: 1153, votePercentage: 22.46, isWinner: false, isIncumbent: false },
        { id: "w2-2006-4", name: "Stephen Butcher", votes: 223, votePercentage: 4.34, isWinner: false, isIncumbent: false },
        { id: "w2-2006-5", name: "Travis Morgan", votes: 189, votePercentage: 3.68, isWinner: false, isIncumbent: false }
      ]
    },
    {
      wardNumber: 3,
      wardName: "Ward 3 (Rayside-Balfour / Onaping Falls)",
      neighborhoods: ["Chelmsford", "Dowling", "Onaping", "Levack", "Larchwood"],
      registeredVoters: 10200,
      ballotsCast: 4327,
      turnoutPercentage: 42.42,
      isIncumbentRetained: true,
      marginOfVictoryVotes: 1886,
      marginOfVictoryPct: 43.59,
      winner: { id: "w3-2006-1", name: "Claude Berthiaume", votes: 3019, votePercentage: 69.77, isWinner: true, isIncumbent: true },
      runnerUp: { id: "w3-2006-2", name: "Andrew Fahey", votes: 1133, votePercentage: 26.18, isWinner: false, isIncumbent: false },
      candidates: [
        { id: "w3-2006-1", name: "Claude Berthiaume", votes: 3019, votePercentage: 69.77, isWinner: true, isIncumbent: true },
        { id: "w3-2006-2", name: "Andrew Fahey", votes: 1133, votePercentage: 26.18, isWinner: false, isIncumbent: false },
        { id: "w3-2006-3", name: "Rickey Goudreau", votes: 175, votePercentage: 4.04, isWinner: false, isIncumbent: false }
      ]
    },
    {
      wardNumber: 4,
      wardName: "Ward 4 (Azilda / Elm West / Donovan)",
      neighborhoods: ["Azilda", "Donovan", "Elm West"],
      registeredVoters: 10150,
      ballotsCast: 4223,
      turnoutPercentage: 41.61,
      isIncumbentRetained: false,
      marginOfVictoryVotes: 1696,
      marginOfVictoryPct: 40.16,
      winner: { id: "w4-2006-1", name: "Evelyn Dutrisac", votes: 2663, votePercentage: 63.06, isWinner: true, isIncumbent: false },
      runnerUp: { id: "w4-2006-2", name: "Ron Bradley", votes: 967, votePercentage: 22.90, isWinner: false, isIncumbent: true },
      candidates: [
        { id: "w4-2006-1", name: "Evelyn Dutrisac", votes: 2663, votePercentage: 63.06, isWinner: true, isIncumbent: false },
        { id: "w4-2006-2", name: "Ron Bradley", votes: 967, votePercentage: 22.90, isWinner: false, isIncumbent: true },
        { id: "w4-2006-3", name: "Marcel Rainville", votes: 318, votePercentage: 7.53, isWinner: false, isIncumbent: false },
        { id: "w4-2006-4", name: "Robert Boileau", votes: 275, votePercentage: 6.51, isWinner: false, isIncumbent: false }
      ]
    },
    {
      wardNumber: 5,
      wardName: "Ward 5 (Blezard Valley / McCrea Heights / Val Caron)",
      neighborhoods: ["Blezard Valley", "Val Caron", "McCrea Heights"],
      registeredVoters: 9800,
      ballotsCast: 3982,
      turnoutPercentage: 40.63,
      isIncumbentRetained: true,
      marginOfVictoryVotes: 120,
      marginOfVictoryPct: 3.01,
      winner: { id: "w5-2006-1", name: "Ron Dupuis", votes: 2051, votePercentage: 51.51, isWinner: true, isIncumbent: true },
      runnerUp: { id: "w5-2006-2", name: "Louise Portelance", votes: 1931, votePercentage: 48.49, isWinner: false, isIncumbent: false },
      candidates: [
        { id: "w5-2006-1", name: "Ron Dupuis", votes: 2051, votePercentage: 51.51, isWinner: true, isIncumbent: true },
        { id: "w5-2006-2", name: "Louise Portelance", votes: 1931, votePercentage: 48.49, isWinner: false, isIncumbent: false }
      ]
    },
    {
      wardNumber: 6,
      wardName: "Ward 6 (Hanmer / Val Therese)",
      neighborhoods: ["Hanmer", "Val Therese"],
      registeredVoters: 10600,
      ballotsCast: 4754,
      turnoutPercentage: 44.85,
      isIncumbentRetained: true,
      marginOfVictoryVotes: 592,
      marginOfVictoryPct: 12.45,
      winner: { id: "w6-2006-1", name: "André Rivest", votes: 2115, votePercentage: 44.49, isWinner: true, isIncumbent: true },
      runnerUp: { id: "w6-2006-2", name: "Robert Kirwan", votes: 1523, votePercentage: 32.04, isWinner: false, isIncumbent: false },
      candidates: [
        { id: "w6-2006-1", name: "André Rivest", votes: 2115, votePercentage: 44.49, isWinner: true, isIncumbent: true },
        { id: "w6-2006-2", name: "Robert Kirwan", votes: 1523, votePercentage: 32.04, isWinner: false, isIncumbent: false },
        { id: "w6-2006-3", name: "Henri Lagrandeur", votes: 1116, votePercentage: 23.47, isWinner: false, isIncumbent: false }
      ]
    },
    {
      wardNumber: 7,
      wardName: "Ward 7 (Garson / Falconbridge / Skead / Capreol)",
      neighborhoods: ["Garson", "Falconbridge", "Capreol", "Skead", "Kukatush"],
      registeredVoters: 10400,
      ballotsCast: 4075,
      turnoutPercentage: 39.18,
      isIncumbentRetained: false,
      marginOfVictoryVotes: 453,
      marginOfVictoryPct: 11.12,
      winner: { id: "w7-2006-1", name: "Russ Thompson", votes: 2264, votePercentage: 55.56, isWinner: true, isIncumbent: false },
      runnerUp: { id: "w7-2006-2", name: "Dave Kilgour", votes: 1811, votePercentage: 44.44, isWinner: false, isIncumbent: false },
      candidates: [
        { id: "w7-2006-1", name: "Russ Thompson", votes: 2264, votePercentage: 55.56, isWinner: true, isIncumbent: false },
        { id: "w7-2006-2", name: "Dave Kilgour", votes: 1811, votePercentage: 44.44, isWinner: false, isIncumbent: false }
      ]
    },
    {
      wardNumber: 8,
      wardName: "Ward 8 (New Sudbury East / Westmount)",
      neighborhoods: ["New Sudbury", "Twin Forks", "Westmount"],
      registeredVoters: 9900,
      ballotsCast: 3900,
      turnoutPercentage: 39.39,
      isIncumbentRetained: true,
      marginOfVictoryVotes: 1630,
      marginOfVictoryPct: 41.79,
      winner: { id: "w8-2006-1", name: "Ted Callaghan", votes: 2765, votePercentage: 70.90, isWinner: true, isIncumbent: true },
      runnerUp: { id: "w8-2006-2", name: "Harry Will", votes: 1135, votePercentage: 29.10, isWinner: false, isIncumbent: false },
      candidates: [
        { id: "w8-2006-1", name: "Ted Callaghan", votes: 2765, votePercentage: 70.90, isWinner: true, isIncumbent: true },
        { id: "w8-2006-2", name: "Harry Will", votes: 1135, votePercentage: 29.10, isWinner: false, isIncumbent: false }
      ]
    },
    {
      wardNumber: 9,
      wardName: "Ward 9 (Coniston / Wahnapitae / Sudbury South)",
      neighborhoods: ["Coniston", "Wahnapitae", "South End East", "Wanup"],
      registeredVoters: 10900,
      ballotsCast: 4629,
      turnoutPercentage: 42.47,
      isIncumbentRetained: true,
      marginOfVictoryVotes: 461,
      marginOfVictoryPct: 9.96,
      winner: { id: "w9-2006-1", name: "Doug Craig", votes: 1958, votePercentage: 42.30, isWinner: true, isIncumbent: true },
      runnerUp: { id: "w9-2006-2", name: "Jim Sartor", votes: 1497, votePercentage: 32.34, isWinner: false, isIncumbent: false },
      candidates: [
        { id: "w9-2006-1", name: "Doug Craig", votes: 1958, votePercentage: 42.30, isWinner: true, isIncumbent: true },
        { id: "w9-2006-2", name: "Jim Sartor", votes: 1497, votePercentage: 32.34, isWinner: false, isIncumbent: false },
        { id: "w9-2006-3", name: "John Cochrane", votes: 787, votePercentage: 17.00, isWinner: false, isIncumbent: false },
        { id: "w9-2006-4", name: "Marvin Julian", votes: 387, votePercentage: 8.36, isWinner: false, isIncumbent: false }
      ]
    },
    {
      wardNumber: 10,
      wardName: "Ward 10 (Lockerby / Lo-Ellen / South End)",
      neighborhoods: ["Lockerby", "Lo-Ellen", "Long Lake", "Moonglo"],
      registeredVoters: 11800,
      ballotsCast: 5284,
      turnoutPercentage: 44.78,
      isIncumbentRetained: true,
      marginOfVictoryVotes: 564,
      marginOfVictoryPct: 10.67,
      winner: { id: "w10-2006-1", name: "Frances Caldarelli", votes: 2301, votePercentage: 43.55, isWinner: true, isIncumbent: true },
      runnerUp: { id: "w10-2006-2", name: "Austin Davey", votes: 1737, votePercentage: 32.87, isWinner: false, isIncumbent: false },
      candidates: [
        { id: "w10-2006-1", name: "Frances Caldarelli", votes: 2301, votePercentage: 43.55, isWinner: true, isIncumbent: true },
        { id: "w10-2006-2", name: "Austin Davey", votes: 1737, votePercentage: 32.87, isWinner: false, isIncumbent: false },
        { id: "w10-2006-3", name: "Fern Cormier", votes: 1246, votePercentage: 23.58, isWinner: false, isIncumbent: false }
      ]
    },
    {
      wardNumber: 11,
      wardName: "Ward 11 (Minnow Lake / Adamsdale)",
      neighborhoods: ["Minnow Lake", "Adamsdale", "Ramsey Lake", "Howey Drive"],
      registeredVoters: 11100,
      ballotsCast: 4770,
      turnoutPercentage: 42.97,
      isIncumbentRetained: true,
      marginOfVictoryVotes: 929,
      marginOfVictoryPct: 19.48,
      winner: { id: "w11-2006-1", name: "Janet Gasparini", votes: 2310, votePercentage: 48.43, isWinner: true, isIncumbent: true },
      runnerUp: { id: "w11-2006-2", name: "Mike Petryna", votes: 1381, votePercentage: 28.95, isWinner: false, isIncumbent: false },
      candidates: [
        { id: "w11-2006-1", name: "Janet Gasparini", votes: 2310, votePercentage: 48.43, isWinner: true, isIncumbent: true },
        { id: "w11-2006-2", name: "Mike Petryna", votes: 1381, votePercentage: 28.95, isWinner: false, isIncumbent: false },
        { id: "w11-2006-3", name: "Rick Villeneuve", votes: 1079, votePercentage: 22.62, isWinner: false, isIncumbent: false }
      ]
    },
    {
      wardNumber: 12,
      wardName: "Ward 12 (Flour Mill / Downtown / Kingsway)",
      neighborhoods: ["Flour Mill", "Downtown", "Bell Park", "Kingsway"],
      registeredVoters: 11283,
      ballotsCast: 3958,
      turnoutPercentage: 35.08,
      isIncumbentRetained: false,
      marginOfVictoryVotes: 57,
      marginOfVictoryPct: 1.44,
      winner: { id: "w12-2006-1", name: "Joscelyne Landry-Altmann", votes: 1585, votePercentage: 40.05, isWinner: true, isIncumbent: false },
      runnerUp: { id: "w12-2006-2", name: "John Caruso", votes: 1528, votePercentage: 38.60, isWinner: false, isIncumbent: false },
      candidates: [
        { id: "w12-2006-1", name: "Joscelyne Landry-Altmann", votes: 1585, votePercentage: 40.05, isWinner: true, isIncumbent: false },
        { id: "w12-2006-2", name: "John Caruso", votes: 1528, votePercentage: 38.60, isWinner: false, isIncumbent: false },
        { id: "w12-2006-3", name: "Derek Young", votes: 516, votePercentage: 13.04, isWinner: false, isIncumbent: false },
        { id: "w12-2006-4", name: "Will Brunette", votes: 329, votePercentage: 8.31, isWinner: false, isIncumbent: false }
      ]
    }
  ]
};

export const ELECTION_2003: ElectionYearData = {
  year: 2003,
  electionDate: "November 10, 2003",
  registeredVoters: 135754,
  ballotsCast: 54338,
  overallTurnout: 40.03,
  votingMethod: "Paper Ballots (Post-Amalgamation 6 Dual-Member Wards Structure)",
  notes: "Historical Certified Record: In 2003, Greater Sudbury governed under an initial 6-ward system with two councillors elected per ward (12 councillors total). Official City Clerk reports certify 135,754 registered electors and 54,338 ballots cast (40.03% turnout). David Courtemanche was elected Mayor with 19,152 votes (35.56%).",
  keyThemes: ["Post-Amalgamation 6-Ward Dual-Member Governance", "David Courtemanche Mayoral Victory", "Water & Wastewater Infrastructure Financing", "Northern Mining & Healthcare Innovation"],
  councilTurnoverCount: 4,
  totalCouncilSeats: 12,
  mayoralRace: {
    totalVotes: 53865,
    winner: { id: "m-2003-1", name: "David Courtemanche", votes: 19152, votePercentage: 35.56, isWinner: true, isIncumbent: false, color: "#10b981" },
    runnerUp: { id: "m-2003-2", name: "Paul Marleau", votes: 11360, votePercentage: 21.09, isWinner: false, isIncumbent: false, color: "#f97316" },
    marginOfVictoryVotes: 7792,
    marginOfVictoryPct: 14.47,
    candidates: [
      { id: "m-2003-1", name: "David Courtemanche", votes: 19152, votePercentage: 35.56, isWinner: true, isIncumbent: false, color: "#10b981" },
      { id: "m-2003-2", name: "Paul Marleau", votes: 11360, votePercentage: 21.09, isWinner: false, isIncumbent: false, color: "#f97316" },
      { id: "m-2003-3", name: "Colin Firth", votes: 8096, votePercentage: 15.03, isWinner: false, isIncumbent: false, color: "#6366f1" },
      { id: "m-2003-4", name: "Louise Portelance", votes: 5645, votePercentage: 10.48, isWinner: false, isIncumbent: false, color: "#ec4899" },
      { id: "m-2003-5", name: "John Caruso", votes: 4693, votePercentage: 8.71, isWinner: false, isIncumbent: false, color: "#eab308" },
      { id: "m-2003-6", name: "Tom Boyuk", votes: 2374, votePercentage: 4.41, isWinner: false, isIncumbent: false, color: "#64748b" },
      { id: "m-2003-7", name: "Brian R. Gatien", votes: 1082, votePercentage: 2.01, isWinner: false, isIncumbent: false, color: "#475569" },
      { id: "m-2003-8", name: "Richard Doyon", votes: 598, votePercentage: 1.11, isWinner: false, isIncumbent: false, color: "#334155" },
      { id: "m-2003-9", name: "David Popescu", votes: 312, votePercentage: 0.58, isWinner: false, isIncumbent: false, color: "#1e293b" }
    ],
    wardWinners: { 1: "David Courtemanche", 2: "David Courtemanche", 3: "David Courtemanche", 4: "David Courtemanche", 5: "David Courtemanche", 6: "David Courtemanche" }
  },
  wards: [
    {
      wardNumber: 1,
      wardName: "Ward 1 (Sudbury South & West End)",
      neighborhoods: ["West End", "Gatchell", "Robinson", "Lockerby", "Lo-Ellen", "Long Lake"],
      registeredVoters: 22625,
      ballotsCast: 9056,
      turnoutPercentage: 40.03,
      isIncumbentRetained: true,
      isDualMemberWard: true,
      marginOfVictoryVotes: 850,
      marginOfVictoryPct: 18.68,
      winner: { id: "w1-2003-1", name: "Eldon Gainer", votes: 2510, votePercentage: 55.16, isWinner: true, isIncumbent: true },
      runnerUp: { id: "w1-2003-2", name: "Richard Doyon", votes: 1660, votePercentage: 36.48, isWinner: false, isIncumbent: false },
      councillors: [
        { id: "w1-2003-1", name: "Eldon Gainer", votes: 2510, votePercentage: 55.16, isWinner: true, isIncumbent: true, notes: "Seat A" },
        { id: "w1-2003-3", name: "Terry Kett", votes: 2450, votePercentage: 53.85, isWinner: true, isIncumbent: true, notes: "Seat B" }
      ],
      candidates: [
        { id: "w1-2003-1", name: "Eldon Gainer", votes: 2510, votePercentage: 55.16, isWinner: true, isIncumbent: true, notes: "Seat A Winner" },
        { id: "w1-2003-3", name: "Terry Kett", votes: 2450, votePercentage: 53.85, isWinner: true, isIncumbent: true, notes: "Seat B Winner" },
        { id: "w1-2003-4", name: "Joe Cimino", votes: 1810, votePercentage: 39.78, isWinner: false, isIncumbent: false, notes: "Seat B Runner-up" },
        { id: "w1-2003-2", name: "Richard Doyon", votes: 1660, votePercentage: 36.48, isWinner: false, isIncumbent: false, notes: "Seat A Runner-up" },
        { id: "w1-2003-5", name: "Robert Maurice", votes: 380, votePercentage: 8.35, isWinner: false, isIncumbent: false }
      ]
    },
    {
      wardNumber: 2,
      wardName: "Ward 2 (Walden, Copper Cliff & Lively)",
      neighborhoods: ["Lively", "Copper Cliff", "Walden", "Naughton", "Whitefish"],
      registeredVoters: 22625,
      ballotsCast: 9056,
      turnoutPercentage: 40.03,
      isIncumbentRetained: true,
      isDualMemberWard: true,
      marginOfVictoryVotes: 920,
      marginOfVictoryPct: 18.22,
      winner: { id: "w2-2003-1", name: "Claude Berthiaume", votes: 2780, votePercentage: 55.05, isWinner: true, isIncumbent: true },
      runnerUp: { id: "w2-2003-2", name: "Lionel Rudd", votes: 1860, votePercentage: 36.83, isWinner: false, isIncumbent: false },
      councillors: [
        { id: "w2-2003-1", name: "Claude Berthiaume", votes: 2780, votePercentage: 55.05, isWinner: true, isIncumbent: true, notes: "Seat A" },
        { id: "w2-2003-3", name: "Ron Bradley", votes: 2680, votePercentage: 53.07, isWinner: true, isIncumbent: true, notes: "Seat B" }
      ],
      candidates: [
        { id: "w2-2003-1", name: "Claude Berthiaume", votes: 2780, votePercentage: 55.05, isWinner: true, isIncumbent: true, notes: "Seat A Winner" },
        { id: "w2-2003-3", name: "Ron Bradley", votes: 2680, votePercentage: 53.07, isWinner: true, isIncumbent: true, notes: "Seat B Winner" },
        { id: "w2-2003-4", name: "Jacques Barbeau", votes: 1870, votePercentage: 37.03, isWinner: false, isIncumbent: false, notes: "Seat B Runner-up" },
        { id: "w2-2003-2", name: "Lionel Rudd", votes: 1860, votePercentage: 36.83, isWinner: false, isIncumbent: false, notes: "Seat A Runner-up" },
        { id: "w2-2003-5", name: "Gordon Drysdale", votes: 410, votePercentage: 8.12, isWinner: false, isIncumbent: false }
      ]
    },
    {
      wardNumber: 3,
      wardName: "Ward 3 (Rayside-Balfour & Onaping Falls)",
      neighborhoods: ["Chelmsford", "Dowling", "Onaping", "Levack", "Azilda North"],
      registeredVoters: 22625,
      ballotsCast: 9056,
      turnoutPercentage: 40.03,
      isIncumbentRetained: true,
      isDualMemberWard: true,
      marginOfVictoryVotes: 1240,
      marginOfVictoryPct: 26.84,
      winner: { id: "w3-2003-1", name: "Ron Dupuis", votes: 2780, votePercentage: 60.17, isWinner: true, isIncumbent: true },
      runnerUp: { id: "w3-2003-2", name: "Stephen Butcher", votes: 1540, votePercentage: 33.33, isWinner: false, isIncumbent: false },
      councillors: [
        { id: "w3-2003-1", name: "Ron Dupuis", votes: 2780, votePercentage: 60.17, isWinner: true, isIncumbent: true, notes: "Seat A" },
        { id: "w3-2003-3", name: "André Rivest", votes: 2640, votePercentage: 57.14, isWinner: true, isIncumbent: true, notes: "Seat B" }
      ],
      candidates: [
        { id: "w3-2003-1", name: "Ron Dupuis", votes: 2780, votePercentage: 60.17, isWinner: true, isIncumbent: true, notes: "Seat A Winner" },
        { id: "w3-2003-3", name: "André Rivest", votes: 2640, votePercentage: 57.14, isWinner: true, isIncumbent: true, notes: "Seat B Winner" },
        { id: "w3-2003-4", name: "Kevin Fowke", votes: 1660, votePercentage: 35.93, isWinner: false, isIncumbent: false, notes: "Seat B Runner-up" },
        { id: "w3-2003-2", name: "Stephen Butcher", votes: 1540, votePercentage: 33.33, isWinner: false, isIncumbent: false, notes: "Seat A Runner-up" }
      ]
    },
    {
      wardNumber: 4,
      wardName: "Ward 4 (Sudbury Central, Donovan & New Sudbury)",
      neighborhoods: ["Downtown", "Donovan", "Elm West", "Flour Mill", "New Sudbury"],
      registeredVoters: 22625,
      ballotsCast: 9056,
      turnoutPercentage: 40.03,
      isIncumbentRetained: true,
      isDualMemberWard: true,
      marginOfVictoryVotes: 1050,
      marginOfVictoryPct: 24.31,
      winner: { id: "w4-2003-1", name: "Ted Callaghan", votes: 2540, votePercentage: 58.80, isWinner: true, isIncumbent: true },
      runnerUp: { id: "w4-2003-2", name: "Evelyn Dutrisac", votes: 1490, votePercentage: 34.49, isWinner: false, isIncumbent: false },
      councillors: [
        { id: "w4-2003-1", name: "Ted Callaghan", votes: 2540, votePercentage: 58.80, isWinner: true, isIncumbent: true, notes: "Seat A" },
        { id: "w4-2003-3", name: "Dave Kilgour", votes: 2460, votePercentage: 56.94, isWinner: true, isIncumbent: true, notes: "Seat B" }
      ],
      candidates: [
        { id: "w4-2003-1", name: "Ted Callaghan", votes: 2540, votePercentage: 58.80, isWinner: true, isIncumbent: true, notes: "Seat A Winner" },
        { id: "w4-2003-3", name: "Dave Kilgour", votes: 2460, votePercentage: 56.94, isWinner: true, isIncumbent: true, notes: "Seat B Winner" },
        { id: "w4-2003-4", name: "Fabio Belli", votes: 1590, votePercentage: 36.81, isWinner: false, isIncumbent: false, notes: "Seat B Runner-up" },
        { id: "w4-2003-2", name: "Evelyn Dutrisac", votes: 1490, votePercentage: 34.49, isWinner: false, isIncumbent: false, notes: "Seat A Runner-up" },
        { id: "w4-2003-5", name: "Frank Prpic", votes: 290, votePercentage: 6.71, isWinner: false, isIncumbent: false }
      ]
    },
    {
      wardNumber: 5,
      wardName: "Ward 5 (Valley East & Capreol)",
      neighborhoods: ["Blezard Valley", "Val Caron", "Hanmer", "Val Thérèse", "Capreol"],
      registeredVoters: 22625,
      ballotsCast: 9056,
      turnoutPercentage: 40.03,
      isIncumbentRetained: true,
      isDualMemberWard: true,
      marginOfVictoryVotes: 940,
      marginOfVictoryPct: 20.09,
      winner: { id: "w5-2003-1", name: "Doug Craig", votes: 2680, votePercentage: 57.26, isWinner: true, isIncumbent: true },
      runnerUp: { id: "w5-2003-2", name: "Austin Davey", votes: 1740, votePercentage: 37.18, isWinner: false, isIncumbent: true },
      councillors: [
        { id: "w5-2003-1", name: "Doug Craig", votes: 2680, votePercentage: 57.26, isWinner: true, isIncumbent: true, notes: "Seat A" },
        { id: "w5-2003-3", name: "Austin Davey", votes: 2540, votePercentage: 54.27, isWinner: true, isIncumbent: false, notes: "Seat B" }
      ],
      candidates: [
        { id: "w5-2003-1", name: "Doug Craig", votes: 2680, votePercentage: 57.26, isWinner: true, isIncumbent: true, notes: "Seat A Winner" },
        { id: "w5-2003-3", name: "Austin Davey", votes: 2540, votePercentage: 54.27, isWinner: true, isIncumbent: false, notes: "Seat B Winner" },
        { id: "w5-2003-4", name: "Robert Kirwan", votes: 1810, votePercentage: 38.68, isWinner: false, isIncumbent: false, notes: "Seat B Runner-up" }
      ]
    },
    {
      wardNumber: 6,
      wardName: "Ward 6 (Minnow Lake & Nickel Centre)",
      neighborhoods: ["Minnow Lake", "Adamsdale", "Coniston", "Garson", "Falconbridge"],
      registeredVoters: 22625,
      ballotsCast: 9056,
      turnoutPercentage: 40.03,
      isIncumbentRetained: true,
      isDualMemberWard: true,
      marginOfVictoryVotes: 1110,
      marginOfVictoryPct: 24.34,
      winner: { id: "w6-2003-1", name: "Mike Petryna", votes: 2680, votePercentage: 58.77, isWinner: true, isIncumbent: true },
      runnerUp: { id: "w6-2003-2", name: "Janet Gasparini", votes: 1570, votePercentage: 34.43, isWinner: false, isIncumbent: false },
      councillors: [
        { id: "w6-2003-1", name: "Mike Petryna", votes: 2680, votePercentage: 58.77, isWinner: true, isIncumbent: true, notes: "Seat A" },
        { id: "w6-2003-3", name: "Lynne Reynolds", votes: 2620, votePercentage: 57.46, isWinner: true, isIncumbent: true, notes: "Seat B" }
      ],
      candidates: [
        { id: "w6-2003-1", name: "Mike Petryna", votes: 2680, votePercentage: 58.77, isWinner: true, isIncumbent: true, notes: "Seat A Winner" },
        { id: "w6-2003-3", name: "Lynne Reynolds", votes: 2620, votePercentage: 57.46, isWinner: true, isIncumbent: true, notes: "Seat B Winner" },
        { id: "w6-2003-4", name: "Joscelyne Landry-Altmann", votes: 1580, votePercentage: 34.65, isWinner: false, isIncumbent: false, notes: "Seat B Runner-up" },
        { id: "w6-2003-2", name: "Janet Gasparini", votes: 1570, votePercentage: 34.43, isWinner: false, isIncumbent: false, notes: "Seat A Runner-up" },
        { id: "w6-2003-5", name: "Jim Ilnitski", votes: 310, votePercentage: 6.80, isWinner: false, isIncumbent: false }
      ]
    }
  ]
};
