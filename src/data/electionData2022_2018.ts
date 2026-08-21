import { ElectionYearData } from '../types/election';

export const ELECTION_2022: ElectionYearData = {
  year: 2022,
  electionDate: "October 24, 2022",
  registeredVoters: 119418,
  ballotsCast: 49941,
  overallTurnout: 41.82,
  votingMethod: "Electronic (Online Oct 14–24) & In-Person Paper / Electronic Assistance (74% Electronic)",
  notes: "Former Sudbury MP Paul Lefebvre achieved a commanding mayoral victory with 52.44% of the vote (26,187 votes), winning all 12 wards. Incumbent mayor Brian Bigger withdrew in early October but remained on ballots. Council turnover saw two incumbents unseated (Robert Kirwan in Ward 5, Geoff McCausland in Ward 4) and one open seat won (Natalie Labbée in Ward 7).",
  keyThemes: [
    "Cancellation of Kingsway Entertainment District (KED) / Downtown Event Centre",
    "Municipal Infrastructure & Road Renewal Deficit",
    "Affordable Housing & Supervised Consumption Services",
    "Fiscal Transparency & Council Decorum"
  ],
  councilTurnoverCount: 3,
  totalCouncilSeats: 12,
  mayoralRace: {
    totalVotes: 49941,
    winner: { id: "m-2022-1", name: "Paul Lefebvre", votes: 26187, votePercentage: 52.44, isWinner: true, isIncumbent: false, color: "#2563eb" },
    runnerUp: { id: "m-2022-2", name: "Evelyn Dutrisac", votes: 9094, votePercentage: 18.21, isWinner: false, isIncumbent: false, color: "#0891b2" },
    marginOfVictoryVotes: 17093,
    marginOfVictoryPct: 34.23,
    candidates: [
      { id: "m-2022-1", name: "Paul Lefebvre", votes: 26187, votePercentage: 52.44, isWinner: true, isIncumbent: false, color: "#2563eb" },
      { id: "m-2022-2", name: "Evelyn Dutrisac", votes: 9094, votePercentage: 18.21, isWinner: false, isIncumbent: false, color: "#0891b2" },
      { id: "m-2022-3", name: "Miranda Rocca-Circelli", votes: 6651, votePercentage: 13.32, isWinner: false, isIncumbent: false, color: "#ea580c" },
      { id: "m-2022-4", name: "Mila Wong", votes: 3002, votePercentage: 6.01, isWinner: false, isIncumbent: false, color: "#e11d48" },
      { id: "m-2022-5", name: "Bob Johnston", votes: 1860, votePercentage: 3.72, isWinner: false, isIncumbent: false, color: "#16a34a" },
      { id: "m-2022-6", name: "Devin Labranche", votes: 1367, votePercentage: 2.74, isWinner: false, isIncumbent: false, color: "#9333ea" },
      { id: "m-2022-7", name: "Don Gravelle", votes: 1090, votePercentage: 2.18, isWinner: false, isIncumbent: false, color: "#d97706" },
      { id: "m-2022-8", name: "Brian Bigger", votes: 607, votePercentage: 1.22, isWinner: false, isIncumbent: true, color: "#64748b", notes: "Withdrew Oct 4, 2022; remained on ballot" },
      { id: "m-2022-9", name: "David Popescu", votes: 83, votePercentage: 0.17, isWinner: false, isIncumbent: false, color: "#475569" }
    ],
    wardWinners: { 1: "Paul Lefebvre", 2: "Paul Lefebvre", 3: "Paul Lefebvre", 4: "Paul Lefebvre", 5: "Paul Lefebvre", 6: "Paul Lefebvre", 7: "Paul Lefebvre", 8: "Paul Lefebvre", 9: "Paul Lefebvre", 10: "Paul Lefebvre", 11: "Paul Lefebvre", 12: "Paul Lefebvre" }
  },
  wards: [
    {
      wardNumber: 1,
      wardName: "Ward 1 (West End / South End / Lockerby)",
      neighborhoods: ["West End", "Gatchell", "Robinson", "Lockerby North"],
      registeredVoters: 9842,
      ballotsCast: 4117,
      turnoutPercentage: 41.83,
      isIncumbentRetained: true,
      marginOfVictoryVotes: 267,
      marginOfVictoryPct: 6.49,
      winner: { id: "w1-2022-1", name: "Mark Signoretti", votes: 2000, votePercentage: 48.58, isWinner: true, isIncumbent: true },
      runnerUp: { id: "w1-2022-2", name: "Mark Facendi", votes: 1733, votePercentage: 42.09, isWinner: false, isIncumbent: false },
      candidates: [
        { id: "w1-2022-1", name: "Mark Signoretti", votes: 2000, votePercentage: 48.58, isWinner: true, isIncumbent: true },
        { id: "w1-2022-2", name: "Mark Facendi", votes: 1733, votePercentage: 42.09, isWinner: false, isIncumbent: false },
        { id: "w1-2022-3", name: "Jordan Derro", votes: 384, votePercentage: 9.33, isWinner: false, isIncumbent: false }
      ]
    },
    {
      wardNumber: 2,
      wardName: "Ward 2 (Walden / Lively / Copper Cliff)",
      neighborhoods: ["Lively", "Naughton", "Whitefish", "Copper Cliff", "Beaver Lake"],
      registeredVoters: 10120,
      ballotsCast: 4644,
      turnoutPercentage: 45.89,
      isIncumbentRetained: true,
      marginOfVictoryVotes: 1016,
      marginOfVictoryPct: 21.88,
      winner: { id: "w2-2022-1", name: "Michael Vagnini", votes: 2830, votePercentage: 60.94, isWinner: true, isIncumbent: true },
      runnerUp: { id: "w2-2022-2", name: "Eric Benoit", votes: 1814, votePercentage: 39.06, isWinner: false, isIncumbent: false },
      candidates: [
        { id: "w2-2022-1", name: "Michael Vagnini", votes: 2830, votePercentage: 60.94, isWinner: true, isIncumbent: true },
        { id: "w2-2022-2", name: "Eric Benoit", votes: 1814, votePercentage: 39.06, isWinner: false, isIncumbent: false }
      ]
    },
    {
      wardNumber: 3,
      wardName: "Ward 3 (Rayside-Balfour / Onaping Falls)",
      neighborhoods: ["Chelmsford", "Dowling", "Onaping", "Levack"],
      registeredVoters: 9210,
      ballotsCast: 3742,
      turnoutPercentage: 40.63,
      isIncumbentRetained: true,
      marginOfVictoryVotes: 1004,
      marginOfVictoryPct: 26.83,
      winner: { id: "w3-2022-1", name: "Gerry Montpellier", votes: 2373, votePercentage: 63.42, isWinner: true, isIncumbent: true },
      runnerUp: { id: "w3-2022-2", name: "Michel Brabant", votes: 1369, votePercentage: 36.58, isWinner: false, isIncumbent: false },
      candidates: [
        { id: "w3-2022-1", name: "Gerry Montpellier", votes: 2373, votePercentage: 63.42, isWinner: true, isIncumbent: true },
        { id: "w3-2022-2", name: "Michel Brabant", votes: 1369, votePercentage: 36.58, isWinner: false, isIncumbent: false }
      ]
    },
    {
      wardNumber: 4,
      wardName: "Ward 4 (Elm West / Donovan / Azilda)",
      neighborhoods: ["The Donovan", "Elm West", "Azilda"],
      registeredVoters: 9560,
      ballotsCast: 3998,
      turnoutPercentage: 41.82,
      isIncumbentRetained: false,
      marginOfVictoryVotes: 106,
      marginOfVictoryPct: 2.65,
      winner: { id: "w4-2022-1", name: "Pauline Fortin", votes: 1972, votePercentage: 49.32, isWinner: true, isIncumbent: false },
      runnerUp: { id: "w4-2022-2", name: "Geoff McCausland", votes: 1866, votePercentage: 46.67, isWinner: false, isIncumbent: true },
      candidates: [
        { id: "w4-2022-1", name: "Pauline Fortin", votes: 1972, votePercentage: 49.32, isWinner: true, isIncumbent: false },
        { id: "w4-2022-2", name: "Geoff McCausland", votes: 1866, votePercentage: 46.67, isWinner: false, isIncumbent: true },
        { id: "w4-2022-3", name: "Alice Norquay", votes: 160, votePercentage: 4.00, isWinner: false, isIncumbent: false }
      ]
    },
    {
      wardNumber: 5,
      wardName: "Ward 5 (Blezard Valley / Val Caron / McCrea Heights)",
      neighborhoods: ["Blezard Valley", "Val Caron", "McCrea Heights"],
      registeredVoters: 9410,
      ballotsCast: 3768,
      turnoutPercentage: 40.04,
      isIncumbentRetained: false,
      marginOfVictoryVotes: 2342,
      marginOfVictoryPct: 62.15,
      winner: { id: "w5-2022-1", name: "Michel Parent", votes: 3055, votePercentage: 81.08, isWinner: true, isIncumbent: false },
      runnerUp: { id: "w5-2022-2", name: "Robert Kirwan", votes: 713, votePercentage: 18.92, isWinner: false, isIncumbent: true },
      candidates: [
        { id: "w5-2022-1", name: "Michel Parent", votes: 3055, votePercentage: 81.08, isWinner: true, isIncumbent: false },
        { id: "w5-2022-2", name: "Robert Kirwan", votes: 713, votePercentage: 18.92, isWinner: false, isIncumbent: true }
      ]
    },
    {
      wardNumber: 6,
      wardName: "Ward 6 (Hanmer / Val Thérèse)",
      neighborhoods: ["Hanmer", "Val Thérèse"],
      registeredVoters: 10240,
      ballotsCast: 4410,
      turnoutPercentage: 43.07,
      isIncumbentRetained: true,
      marginOfVictoryVotes: 338,
      marginOfVictoryPct: 7.66,
      winner: { id: "w6-2022-1", name: "René Lapierre", votes: 1451, votePercentage: 32.90, isWinner: true, isIncumbent: true },
      runnerUp: { id: "w6-2022-2", name: "Michel Lalonde", votes: 1113, votePercentage: 25.24, isWinner: false, isIncumbent: false },
      candidates: [
        { id: "w6-2022-1", name: "René Lapierre", votes: 1451, votePercentage: 32.90, isWinner: true, isIncumbent: true },
        { id: "w6-2022-2", name: "Michel Lalonde", votes: 1113, votePercentage: 25.24, isWinner: false, isIncumbent: false },
        { id: "w6-2022-3", name: "Scott Seguin", votes: 864, votePercentage: 19.59, isWinner: false, isIncumbent: false },
        { id: "w6-2022-4", name: "Dan Boulard", votes: 501, votePercentage: 11.36, isWinner: false, isIncumbent: false },
        { id: "w6-2022-5", name: "Ginette Trotier", votes: 481, votePercentage: 10.91, isWinner: false, isIncumbent: false }
      ]
    },
    {
      wardNumber: 7,
      wardName: "Ward 7 (Capreol / Garson / Falconbridge / Skead)",
      neighborhoods: ["Capreol", "Garson", "Falconbridge", "Skead"],
      registeredVoters: 9680,
      ballotsCast: 4022,
      turnoutPercentage: 41.55,
      isIncumbentRetained: false,
      marginOfVictoryVotes: 911,
      marginOfVictoryPct: 22.65,
      winner: { id: "w7-2022-1", name: "Natalie Labbée", votes: 2192, votePercentage: 54.50, isWinner: true, isIncumbent: false },
      runnerUp: { id: "w7-2022-2", name: "Mark McKillop", votes: 1281, votePercentage: 31.85, isWinner: false, isIncumbent: false },
      candidates: [
        { id: "w7-2022-1", name: "Natalie Labbée", votes: 2192, votePercentage: 54.50, isWinner: true, isIncumbent: false },
        { id: "w7-2022-2", name: "Mark McKillop", votes: 1281, votePercentage: 31.85, isWinner: false, isIncumbent: false },
        { id: "w7-2022-3", name: "Randy Hazlett", votes: 357, votePercentage: 8.88, isWinner: false, isIncumbent: false },
        { id: "w7-2022-4", name: "Daniel Wiebes", votes: 192, votePercentage: 4.77, isWinner: false, isIncumbent: false }
      ]
    },
    {
      wardNumber: 8,
      wardName: "Ward 8 (New Sudbury West / Twin Forks)",
      neighborhoods: ["New Sudbury West", "Lasalle", "Collège Boréal", "Twin Forks"],
      registeredVoters: 9350,
      ballotsCast: 3583,
      turnoutPercentage: 38.32,
      isIncumbentRetained: true,
      marginOfVictoryVotes: 352,
      marginOfVictoryPct: 9.82,
      winner: { id: "w8-2022-1", name: "Al Sizer", votes: 1412, votePercentage: 39.41, isWinner: true, isIncumbent: true },
      runnerUp: { id: "w8-2022-2", name: "Patrick McCoy", votes: 1060, votePercentage: 29.58, isWinner: false, isIncumbent: false },
      candidates: [
        { id: "w8-2022-1", name: "Al Sizer", votes: 1412, votePercentage: 39.41, isWinner: true, isIncumbent: true },
        { id: "w8-2022-2", name: "Patrick McCoy", votes: 1060, votePercentage: 29.58, isWinner: false, isIncumbent: false },
        { id: "w8-2022-3", name: "Vital Rainville", votes: 383, votePercentage: 10.69, isWinner: false, isIncumbent: false },
        { id: "w8-2022-4", name: "Bill McElree", votes: 338, votePercentage: 9.43, isWinner: false, isIncumbent: false },
        { id: "w8-2022-5", name: "Carla Ross-Arsenault", votes: 157, votePercentage: 4.38, isWinner: false, isIncumbent: false },
        { id: "w8-2022-6", name: "Patrick Auge", votes: 119, votePercentage: 3.32, isWinner: false, isIncumbent: false },
        { id: "w8-2022-7", name: "Gordon Drysdale", votes: 114, votePercentage: 3.18, isWinner: false, isIncumbent: false }
      ]
    },
    {
      wardNumber: 9,
      wardName: "Ward 9 (Coniston / Wahnapitae / South East)",
      neighborhoods: ["Coniston", "Wahnapitae", "Wanup", "McFarlane Lake"],
      registeredVoters: 10340,
      ballotsCast: 4760,
      turnoutPercentage: 46.03,
      isIncumbentRetained: true,
      marginOfVictoryVotes: 1595,
      marginOfVictoryPct: 33.51,
      winner: { id: "w9-2022-1", name: "Deb McIntosh", votes: 2930, votePercentage: 61.55, isWinner: true, isIncumbent: true },
      runnerUp: { id: "w9-2022-2", name: "Leslie Steel", votes: 1335, votePercentage: 28.05, isWinner: false, isIncumbent: false },
      candidates: [
        { id: "w9-2022-1", name: "Deb McIntosh", votes: 2930, votePercentage: 61.55, isWinner: true, isIncumbent: true },
        { id: "w9-2022-2", name: "Leslie Steel", votes: 1335, votePercentage: 28.05, isWinner: false, isIncumbent: false },
        { id: "w9-2022-3", name: "Keith Clarkson", votes: 260, votePercentage: 5.46, isWinner: false, isIncumbent: false },
        { id: "w9-2022-4", name: "Sharon Jane Scott", votes: 235, votePercentage: 4.94, isWinner: false, isIncumbent: false }
      ]
    },
    {
      wardNumber: 10,
      wardName: "Ward 10 (Fernwood / South End / Laurentian)",
      neighborhoods: ["South End", "Lo-Ellen Park", "Laurentian Univ", "South Algonquin"],
      registeredVoters: 10480,
      ballotsCast: 4758,
      turnoutPercentage: 45.40,
      isIncumbentRetained: true,
      marginOfVictoryVotes: 1746,
      marginOfVictoryPct: 36.70,
      winner: { id: "w10-2022-1", name: "Fern Cormier", votes: 2844, votePercentage: 59.77, isWinner: true, isIncumbent: true },
      runnerUp: { id: "w10-2022-2", name: "Jolene Felsbourg-Linton", votes: 1098, votePercentage: 23.08, isWinner: false, isIncumbent: false },
      candidates: [
        { id: "w10-2022-1", name: "Fern Cormier", votes: 2844, votePercentage: 59.77, isWinner: true, isIncumbent: true },
        { id: "w10-2022-2", name: "Jolene Felsbourg-Linton", votes: 1098, votePercentage: 23.08, isWinner: false, isIncumbent: false },
        { id: "w10-2022-3", name: "Michael Sanders", votes: 816, votePercentage: 17.15, isWinner: false, isIncumbent: false }
      ]
    },
    {
      wardNumber: 11,
      wardName: "Ward 11 (Minnow Lake / New Sudbury East)",
      neighborhoods: ["Minnow Lake", "Adamsdale", "Moonlight"],
      registeredVoters: 10250,
      ballotsCast: 4483,
      turnoutPercentage: 43.74,
      isIncumbentRetained: true,
      marginOfVictoryVotes: 1521,
      marginOfVictoryPct: 33.93,
      winner: { id: "w11-2022-1", name: "Bill Leduc", votes: 3002, votePercentage: 66.96, isWinner: true, isIncumbent: true },
      runnerUp: { id: "w11-2022-2", name: "Christopher Duncanson-Hales", votes: 1481, votePercentage: 33.04, isWinner: false, isIncumbent: false },
      candidates: [
        { id: "w11-2022-1", name: "Bill Leduc", votes: 3002, votePercentage: 66.96, isWinner: true, isIncumbent: true },
        { id: "w11-2022-2", name: "Christopher Duncanson-Hales", votes: 1481, votePercentage: 33.04, isWinner: false, isIncumbent: false }
      ]
    },
    {
      wardNumber: 12,
      wardName: "Ward 12 (Flour Mill / Downtown / Kingsway)",
      neighborhoods: ["Downtown Sudbury", "Flour Mill", "Bell Park North"],
      registeredVoters: 8846,
      ballotsCast: 3259,
      turnoutPercentage: 36.84,
      isIncumbentRetained: true,
      marginOfVictoryVotes: 565,
      marginOfVictoryPct: 17.34,
      winner: { id: "w12-2022-1", name: "Joscelyne Landry-Altmann", votes: 1609, votePercentage: 49.37, isWinner: true, isIncumbent: true },
      runnerUp: { id: "w12-2022-2", name: "Jeff MacIntyre", votes: 1044, votePercentage: 32.03, isWinner: false, isIncumbent: false },
      candidates: [
        { id: "w12-2022-1", name: "Joscelyne Landry-Altmann", votes: 1609, votePercentage: 49.37, isWinner: true, isIncumbent: true },
        { id: "w12-2022-2", name: "Jeff MacIntyre", votes: 1044, votePercentage: 32.03, isWinner: false, isIncumbent: false },
        { id: "w12-2022-3", name: "Shawn Ouimet", votes: 471, votePercentage: 14.45, isWinner: false, isIncumbent: false },
        { id: "w12-2022-3-b", name: "Luciano Di Mario", votes: 135, votePercentage: 4.14, isWinner: false, isIncumbent: false }
      ]
    }
  ]
};

export const ELECTION_2018: ElectionYearData = {
  year: 2018,
  electionDate: "October 22, 2018 (Extended to Oct 23)",
  registeredVoters: 115784,
  ballotsCast: 52087,
  overallTurnout: 44.99,
  votingMethod: "Online / Internet Voting (Primary) & Physical Electronic Assistance (Extended 24h due to province-wide Dominion Voting bandwidth glitch)",
  notes: "Mayor Brian Bigger won re-election in a crowded 11-candidate field with 28.32% of the vote amidst heated civic debates over the Kingsway Entertainment District (KED) arena/casino project and large legacy capital investments. Due to a province-wide Dominion Voting Systems colocation server glitch on election night, voting was officially extended by 24 hours to October 23, 2018. All 10 running incumbents retained their seats (including Michael Vagnini in Ward 2 and Gerry Montpellier in Ward 3 who won by acclamation), with turnover limited to the two open wards where long-serving councillors retired (Ward 4 and Ward 11).",
  keyThemes: [
    "Kingsway Entertainment District (KED) Arena / Event Centre Debate",
    "Province-Wide Dominion Online Voting Glitch & 24h Extension",
    "Incumbent Council Stability (10 of 10 Incumbents Returned)",
    "Two Acclamations (Ward 2 & Ward 3)",
    "Large Capital Legacy Projects & Core Infrastructure Balance"
  ],
  councilTurnoverCount: 2,
  totalCouncilSeats: 12,
  mayoralRace: {
    totalVotes: 51870,
    winner: { id: "m-2018-1", name: "Brian Bigger", votes: 14684, votePercentage: 28.32, isWinner: true, isIncumbent: true, color: "#2563eb" },
    runnerUp: { id: "m-2018-2", name: "Patricia Mills", votes: 9746, votePercentage: 18.79, isWinner: false, isIncumbent: false, color: "#ea580c" },
    marginOfVictoryVotes: 4938,
    marginOfVictoryPct: 9.53,
    candidates: [
      { id: "m-2018-1", name: "Brian Bigger", votes: 14684, votePercentage: 28.32, isWinner: true, isIncumbent: true, color: "#2563eb" },
      { id: "m-2018-2", name: "Patricia Mills", votes: 9746, votePercentage: 18.79, isWinner: false, isIncumbent: false, color: "#ea580c" },
      { id: "m-2018-3", name: "Dan Melanson", votes: 8673, votePercentage: 16.73, isWinner: false, isIncumbent: false, color: "#16a34a" },
      { id: "m-2018-4", name: "Cody Cacciotti", votes: 8066, votePercentage: 15.56, isWinner: false, isIncumbent: false, color: "#9333ea" },
      { id: "m-2018-5", name: "Troy Crowder", votes: 4297, votePercentage: 8.29, isWinner: false, isIncumbent: false, color: "#d97706" },
      { id: "m-2018-6", name: "Jeff Huska", votes: 2746, votePercentage: 5.30, isWinner: false, isIncumbent: false, color: "#06b6d4" },
      { id: "m-2018-7", name: "Bill Crumplin", votes: 2158, votePercentage: 4.16, isWinner: false, isIncumbent: false, color: "#e11d48" },
      { id: "m-2018-8", name: "Bill Sanders", votes: 792, votePercentage: 1.53, isWinner: false, isIncumbent: false, color: "#0891b2" },
      { id: "m-2018-9", name: "Ron Leclair", votes: 534, votePercentage: 1.03, isWinner: false, isIncumbent: false, color: "#8b5cf6" },
      { id: "m-2018-10", name: "Rodney Newton", votes: 102, votePercentage: 0.20, isWinner: false, isIncumbent: false, color: "#64748b" },
      { id: "m-2018-11", name: "David Popescu", votes: 72, votePercentage: 0.14, isWinner: false, isIncumbent: false, color: "#475569" }
    ],
    wardWinners: {
      1: "Brian Bigger",
      2: "Brian Bigger",
      3: "Brian Bigger",
      4: "Patricia Mills",
      5: "Brian Bigger",
      6: "Brian Bigger",
      7: "Brian Bigger",
      8: "Brian Bigger",
      9: "Brian Bigger",
      10: "Brian Bigger",
      11: "Brian Bigger",
      12: "Brian Bigger"
    }
  },
  wards: [
    {
      wardNumber: 1,
      wardName: "Ward 1 (West End / South End / Lockerby)",
      neighborhoods: ["West End", "Gatchell", "Robinson", "Lockerby North"],
      registeredVoters: 9800,
      ballotsCast: 4320,
      turnoutPercentage: 44.08,
      isIncumbentRetained: true,
      marginOfVictoryVotes: 1216,
      marginOfVictoryPct: 28.29,
      winner: { id: "w1-2018-1", name: "Mark Signoretti", votes: 2291, votePercentage: 53.30, isWinner: true, isIncumbent: true },
      runnerUp: { id: "w1-2018-2", name: "Bob Johnston", votes: 1075, votePercentage: 25.01, isWinner: false, isIncumbent: false },
      candidates: [
        { id: "w1-2018-1", name: "Mark Signoretti", votes: 2291, votePercentage: 53.30, isWinner: true, isIncumbent: true },
        { id: "w1-2018-2", name: "Bob Johnston", votes: 1075, votePercentage: 25.01, isWinner: false, isIncumbent: false },
        { id: "w1-2018-3", name: "Justin Pappano", votes: 719, votePercentage: 16.73, isWinner: false, isIncumbent: false },
        { id: "w1-2018-4", name: "Gordon D. Harris", votes: 213, votePercentage: 4.96, isWinner: false, isIncumbent: false }
      ]
    },
    {
      wardNumber: 2,
      wardName: "Ward 2 (Walden / Lively / Copper Cliff)",
      neighborhoods: ["Lively", "Naughton", "Whitefish", "Copper Cliff", "Beaver Lake"],
      registeredVoters: 9950,
      ballotsCast: 4450,
      turnoutPercentage: 44.72,
      isIncumbentRetained: true,
      isAcclaimed: true,
      marginOfVictoryVotes: 0,
      marginOfVictoryPct: 100.0,
      winner: { id: "w2-2018-1", name: "Michael Vagnini", votes: 0, votePercentage: 100.0, isWinner: true, isIncumbent: true, notes: "Acclaimed (No Opposing Candidates Filed)" },
      candidates: [
        { id: "w2-2018-1", name: "Michael Vagnini", votes: 0, votePercentage: 100.0, isWinner: true, isIncumbent: true, notes: "Acclaimed" }
      ]
    },
    {
      wardNumber: 3,
      wardName: "Ward 3 (Rayside-Balfour / Onaping Falls)",
      neighborhoods: ["Chelmsford", "Dowling", "Onaping", "Levack", "Larchwood"],
      registeredVoters: 9350,
      ballotsCast: 3950,
      turnoutPercentage: 42.25,
      isIncumbentRetained: true,
      isAcclaimed: true,
      marginOfVictoryVotes: 0,
      marginOfVictoryPct: 100.0,
      winner: { id: "w3-2018-1", name: "Gerry Montpellier", votes: 0, votePercentage: 100.0, isWinner: true, isIncumbent: true, notes: "Acclaimed (No Opposing Candidates Filed)" },
      candidates: [
        { id: "w3-2018-1", name: "Gerry Montpellier", votes: 0, votePercentage: 100.0, isWinner: true, isIncumbent: true, notes: "Acclaimed" }
      ]
    },
    {
      wardNumber: 4,
      wardName: "Ward 4 (Azilda / Elm West / Donovan)",
      neighborhoods: ["The Donovan", "Elm West", "Azilda"],
      registeredVoters: 9300,
      ballotsCast: 3980,
      turnoutPercentage: 42.80,
      isIncumbentRetained: false,
      marginOfVictoryVotes: 366,
      marginOfVictoryPct: 9.30,
      winner: { id: "w4-2018-1", name: "Geoff McCausland", votes: 1503, votePercentage: 38.18, isWinner: true, isIncumbent: false },
      runnerUp: { id: "w4-2018-2", name: "Don Roy", votes: 1137, votePercentage: 28.88, isWinner: false, isIncumbent: false },
      candidates: [
        { id: "w4-2018-1", name: "Geoff McCausland", votes: 1503, votePercentage: 38.18, isWinner: true, isIncumbent: false },
        { id: "w4-2018-2", name: "Don Roy", votes: 1137, votePercentage: 28.88, isWinner: false, isIncumbent: false },
        { id: "w4-2018-3", name: "Eric Lachance", votes: 812, votePercentage: 20.62, isWinner: false, isIncumbent: false },
        { id: "w4-2018-4", name: "Jessica Bertrand", votes: 358, votePercentage: 9.09, isWinner: false, isIncumbent: false },
        { id: "w4-2018-5", name: "Sharon Scott", votes: 127, votePercentage: 3.23, isWinner: false, isIncumbent: false }
      ]
    },
    {
      wardNumber: 5,
      wardName: "Ward 5 (Blezard Valley / McCrea Heights / Val Caron)",
      neighborhoods: ["Blezard Valley", "Val Caron", "McCrea Heights"],
      registeredVoters: 9550,
      ballotsCast: 3640,
      turnoutPercentage: 38.12,
      isIncumbentRetained: true,
      marginOfVictoryVotes: 564,
      marginOfVictoryPct: 15.66,
      winner: { id: "w5-2018-1", name: "Robert Kirwan", votes: 1807, votePercentage: 50.19, isWinner: true, isIncumbent: true },
      runnerUp: { id: "w5-2018-2", name: "Michel Lalonde", votes: 1243, votePercentage: 34.53, isWinner: false, isIncumbent: false },
      candidates: [
        { id: "w5-2018-1", name: "Robert Kirwan", votes: 1807, votePercentage: 50.19, isWinner: true, isIncumbent: true },
        { id: "w5-2018-2", name: "Michel Lalonde", votes: 1243, votePercentage: 34.53, isWinner: false, isIncumbent: false },
        { id: "w5-2018-3", name: "Jerry Desormeaux", votes: 550, votePercentage: 15.28, isWinner: false, isIncumbent: false }
      ]
    },
    {
      wardNumber: 6,
      wardName: "Ward 6 (Hanmer / Val Therese)",
      neighborhoods: ["Hanmer", "Val Therese"],
      registeredVoters: 9800,
      ballotsCast: 4520,
      turnoutPercentage: 46.12,
      isIncumbentRetained: true,
      marginOfVictoryVotes: 340,
      marginOfVictoryPct: 7.58,
      winner: { id: "w6-2018-1", name: "René Lapierre", votes: 1649, votePercentage: 36.78, isWinner: true, isIncumbent: true },
      runnerUp: { id: "w6-2018-2", name: "André Rivest", votes: 1309, votePercentage: 29.20, isWinner: false, isIncumbent: false },
      candidates: [
        { id: "w6-2018-1", name: "René Lapierre", votes: 1649, votePercentage: 36.78, isWinner: true, isIncumbent: true },
        { id: "w6-2018-2", name: "André Rivest", votes: 1309, votePercentage: 29.20, isWinner: false, isIncumbent: false },
        { id: "w6-2018-3", name: "Jesse Brooks", votes: 1104, votePercentage: 24.63, isWinner: false, isIncumbent: false },
        { id: "w6-2018-4", name: "Chris Bentley", votes: 421, votePercentage: 9.39, isWinner: false, isIncumbent: false }
      ]
    },
    {
      wardNumber: 7,
      wardName: "Ward 7 (Garson / Falconbridge / Skead / Capreol)",
      neighborhoods: ["Garson", "Falconbridge", "Capreol", "Skead"],
      registeredVoters: 9750,
      ballotsCast: 4560,
      turnoutPercentage: 46.77,
      isIncumbentRetained: true,
      marginOfVictoryVotes: 1142,
      marginOfVictoryPct: 25.28,
      winner: { id: "w7-2018-1", name: "Mike Jakubo", votes: 2347, votePercentage: 51.95, isWinner: true, isIncumbent: true },
      runnerUp: { id: "w7-2018-2", name: "Frank Mazzuca Jr.", votes: 1205, votePercentage: 26.67, isWinner: false, isIncumbent: false },
      candidates: [
        { id: "w7-2018-1", name: "Mike Jakubo", votes: 2347, votePercentage: 51.95, isWinner: true, isIncumbent: true },
        { id: "w7-2018-2", name: "Frank Mazzuca Jr.", votes: 1205, votePercentage: 26.67, isWinner: false, isIncumbent: false },
        { id: "w7-2018-3", name: "Deborah Swyer-Burke", votes: 966, votePercentage: 21.38, isWinner: false, isIncumbent: false }
      ]
    },
    {
      wardNumber: 8,
      wardName: "Ward 8 (New Sudbury West / Twin Forks)",
      neighborhoods: ["New Sudbury West", "Lasalle", "Twin Forks"],
      registeredVoters: 9400,
      ballotsCast: 4020,
      turnoutPercentage: 42.77,
      isIncumbentRetained: true,
      marginOfVictoryVotes: 797,
      marginOfVictoryPct: 20.03,
      winner: { id: "w8-2018-1", name: "Al Sizer", votes: 1822, votePercentage: 45.79, isWinner: true, isIncumbent: true },
      runnerUp: { id: "w8-2018-2", name: "Stefano Presenza", votes: 1025, votePercentage: 25.76, isWinner: false, isIncumbent: false },
      candidates: [
        { id: "w8-2018-1", name: "Al Sizer", votes: 1822, votePercentage: 45.79, isWinner: true, isIncumbent: true },
        { id: "w8-2018-2", name: "Stefano Presenza", votes: 1025, votePercentage: 25.76, isWinner: false, isIncumbent: false },
        { id: "w8-2018-3", name: "Rob Franceschini", votes: 668, votePercentage: 16.79, isWinner: false, isIncumbent: false },
        { id: "w8-2018-4", name: "Kyle McCall", votes: 464, votePercentage: 11.66, isWinner: false, isIncumbent: false }
      ]
    },
    {
      wardNumber: 9,
      wardName: "Ward 9 (Coniston / Wahnapitae / Sudbury South)",
      neighborhoods: ["Coniston", "Wahnapitae", "South End East", "Wanup"],
      registeredVoters: 10100,
      ballotsCast: 5160,
      turnoutPercentage: 51.09,
      isIncumbentRetained: true,
      marginOfVictoryVotes: 1966,
      marginOfVictoryPct: 38.35,
      winner: { id: "w9-2018-1", name: "Deb McIntosh", votes: 3170, votePercentage: 61.85, isWinner: true, isIncumbent: true },
      runnerUp: { id: "w9-2018-2", name: "Paul Stopciati", votes: 1204, votePercentage: 23.50, isWinner: false, isIncumbent: false },
      candidates: [
        { id: "w9-2018-1", name: "Deb McIntosh", votes: 3170, votePercentage: 61.85, isWinner: true, isIncumbent: true },
        { id: "w9-2018-2", name: "Paul Stopciati", votes: 1204, votePercentage: 23.50, isWinner: false, isIncumbent: false },
        { id: "w9-2018-3", name: "Simon Nickson", votes: 546, votePercentage: 10.65, isWinner: false, isIncumbent: false },
        { id: "w9-2018-4", name: "Trinity Mary Hollis", votes: 205, votePercentage: 4.00, isWinner: false, isIncumbent: false }
      ]
    },
    {
      wardNumber: 10,
      wardName: "Ward 10 (Lockerby / Lo-Ellen / South End)",
      neighborhoods: ["Lockerby", "Lo-Ellen", "Long Lake", "Laurentian"],
      registeredVoters: 10300,
      ballotsCast: 4900,
      turnoutPercentage: 47.57,
      isIncumbentRetained: true,
      marginOfVictoryVotes: 2892,
      marginOfVictoryPct: 59.60,
      winner: { id: "w10-2018-1", name: "Fern Cormier", votes: 3611, votePercentage: 74.42, isWinner: true, isIncumbent: true },
      runnerUp: { id: "w10-2018-2", name: "Steve Ripley", votes: 719, votePercentage: 14.82, isWinner: false, isIncumbent: false },
      candidates: [
        { id: "w10-2018-1", name: "Fern Cormier", votes: 3611, votePercentage: 74.42, isWinner: true, isIncumbent: true },
        { id: "w10-2018-2", name: "Steve Ripley", votes: 719, votePercentage: 14.82, isWinner: false, isIncumbent: false },
        { id: "w10-2018-3", name: "Denis Ferron", votes: 522, votePercentage: 10.76, isWinner: false, isIncumbent: false }
      ]
    },
    {
      wardNumber: 11,
      wardName: "Ward 11 (Minnow Lake / Adamsdale)",
      neighborhoods: ["Minnow Lake", "Adamsdale", "Moonlight", "Ramsey Lake"],
      registeredVoters: 9900,
      ballotsCast: 4810,
      turnoutPercentage: 48.59,
      isIncumbentRetained: false,
      marginOfVictoryVotes: 1286,
      marginOfVictoryPct: 26.97,
      winner: { id: "w11-2018-1", name: "Bill Leduc", votes: 2317, votePercentage: 48.60, isWinner: true, isIncumbent: false },
      runnerUp: { id: "w11-2018-2", name: "Terry Kett", votes: 1031, votePercentage: 21.63, isWinner: false, isIncumbent: false },
      candidates: [
        { id: "w11-2018-1", name: "Bill Leduc", votes: 2317, votePercentage: 48.60, isWinner: true, isIncumbent: false },
        { id: "w11-2018-2", name: "Terry Kett", votes: 1031, votePercentage: 21.63, isWinner: false, isIncumbent: false },
        { id: "w11-2018-3", name: "Elisabeth De Luisa", votes: 523, votePercentage: 10.97, isWinner: false, isIncumbent: false },
        { id: "w11-2018-4", name: "Derek Young", votes: 363, votePercentage: 7.61, isWinner: false, isIncumbent: false },
        { id: "w11-2018-5", name: "John Lindsay", votes: 348, votePercentage: 7.30, isWinner: false, isIncumbent: false },
        { id: "w11-2018-6", name: "Kevin Lalonde", votes: 185, votePercentage: 3.88, isWinner: false, isIncumbent: false }
      ]
    },
    {
      wardNumber: 12,
      wardName: "Ward 12 (Flour Mill / Downtown / Kingsway)",
      neighborhoods: ["Downtown", "Flour Mill", "Bell Park", "Kingsway"],
      registeredVoters: 8894,
      ballotsCast: 3610,
      turnoutPercentage: 40.59,
      isIncumbentRetained: true,
      marginOfVictoryVotes: 1653,
      marginOfVictoryPct: 46.20,
      winner: { id: "w12-2018-1", name: "Joscelyne Landry-Altmann", votes: 2237, votePercentage: 62.52, isWinner: true, isIncumbent: true },
      runnerUp: { id: "w12-2018-2", name: "Shawn Ouimet", votes: 584, votePercentage: 16.32, isWinner: false, isIncumbent: false },
      candidates: [
        { id: "w12-2018-1", name: "Joscelyne Landry-Altmann", votes: 2237, votePercentage: 62.52, isWinner: true, isIncumbent: true },
        { id: "w12-2018-2", name: "Shawn Ouimet", votes: 584, votePercentage: 16.32, isWinner: false, isIncumbent: false },
        { id: "w12-2018-3", name: "Tay Butt", votes: 373, votePercentage: 10.42, isWinner: false, isIncumbent: false },
        { id: "w12-2018-4", name: "Leo Frappier", votes: 204, votePercentage: 5.70, isWinner: false, isIncumbent: false, notes: "Stepped down 2 months prior; remained on ballot" },
        { id: "w12-2018-5", name: "Mike Petryna", votes: 180, votePercentage: 5.03, isWinner: false, isIncumbent: false }
      ]
    }
  ]
};
