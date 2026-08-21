import { ElectionYearData } from '../types/election';

export const ELECTION_2014: ElectionYearData = {
  year: 2014,
  electionDate: "October 27, 2014",
  registeredVoters: 117701,
  ballotsCast: 59686,
  overallTurnout: 50.71,
  votingMethod: "Paper Ballots + Advance Online / Internet Voting (First in City History)",
  notes: "Former City Auditor General Brian Bigger swept to power on a campaign of municipal transparency, accountability, and fiscal audit, winning nearly half of all votes (27,303 | 46.32%). The election brought a historic wave of change to council, with 10 of 12 wards electing new councillors (only Evelyn Dutrisac in Ward 4 and Joscelyne Landry-Altmann in Ward 12 were re-elected). Greater Sudbury also offered online/internet voting for the first time in its history (26,859 online votes cast).",
  keyThemes: [
    "Brian Bigger Landslide Mayoral Victory (46.32%)",
    "Historic Council Turnover (10 of 12 Wards Changed)",
    "Inaugural Online / Internet Voting (26,859 Ballots)",
    "Retail Store Hours Deregulation Referendum",
    "Municipal Audit & City Hall Transparency Mandate"
  ],
  councilTurnoverCount: 10,
  totalCouncilSeats: 12,
  mayoralRace: {
    totalVotes: 58945,
    winner: { id: "m-2014-1", name: "Brian Bigger", votes: 27303, votePercentage: 46.32, isWinner: true, isIncumbent: false, color: "#2563eb" },
    runnerUp: { id: "m-2014-2", name: "Dan Melanson", votes: 11345, votePercentage: 19.25, isWinner: false, isIncumbent: false, color: "#ea580c" },
    marginOfVictoryVotes: 15958,
    marginOfVictoryPct: 27.07,
    candidates: [
      { id: "m-2014-1", name: "Brian Bigger", votes: 27303, votePercentage: 46.32, isWinner: true, isIncumbent: false, color: "#2563eb" },
      { id: "m-2014-2", name: "Dan Melanson", votes: 11345, votePercentage: 19.25, isWinner: false, isIncumbent: false, color: "#ea580c" },
      { id: "m-2014-3", name: "John Rodriguez", votes: 10243, votePercentage: 17.38, isWinner: false, isIncumbent: false, color: "#16a34a" },
      { id: "m-2014-4", name: "Ron Dupuis", votes: 5176, votePercentage: 8.78, isWinner: false, isIncumbent: false, color: "#9333ea" },
      { id: "m-2014-5", name: "Jeff Huska", votes: 2584, votePercentage: 4.38, isWinner: false, isIncumbent: false, color: "#06b6d4" },
      { id: "m-2014-6", name: "Richard Majkot", votes: 1412, votePercentage: 2.40, isWinner: false, isIncumbent: false, color: "#0891b2" },
      { id: "m-2014-7", name: "Jeanne Brohart", votes: 494, votePercentage: 0.84, isWinner: false, isIncumbent: false, color: "#ec4899" },
      { id: "m-2014-8", name: "Jean-Raymond Audet", votes: 256, votePercentage: 0.43, isWinner: false, isIncumbent: false, color: "#64748b" },
      { id: "m-2014-9", name: "David Popescu", votes: 67, votePercentage: 0.11, isWinner: false, isIncumbent: false, color: "#475569" },
      { id: "m-2014-10", name: "Ed Pokonzie", votes: 65, votePercentage: 0.11, isWinner: false, isIncumbent: false, color: "#d97706" }
    ],
    wardWinners: {
      1: "Brian Bigger",
      2: "Brian Bigger",
      3: "Brian Bigger",
      4: "Brian Bigger",
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
      wardName: "Ward 1 (West End / South End)",
      neighborhoods: ["West End", "Gatchell", "Robinson", "South End (Part)"],
      registeredVoters: 10450,
      ballotsCast: 4480,
      turnoutPercentage: 42.87,
      isIncumbentRetained: false,
      marginOfVictoryVotes: 655,
      marginOfVictoryPct: 14.79,
      winner: { id: "w1-2014-1", name: "Mark Signoretti", votes: 1780, votePercentage: 40.20, isWinner: true, isIncumbent: false },
      runnerUp: { id: "w1-2014-2", name: "Chris Spry", votes: 1125, votePercentage: 25.41, isWinner: false, isIncumbent: false },
      candidates: [
        { id: "w1-2014-1", name: "Mark Signoretti", votes: 1780, votePercentage: 40.20, isWinner: true, isIncumbent: false },
        { id: "w1-2014-2", name: "Chris Spry", votes: 1125, votePercentage: 25.41, isWinner: false, isIncumbent: false },
        { id: "w1-2014-3", name: "Matt Alexander", votes: 589, votePercentage: 13.30, isWinner: false, isIncumbent: false },
        { id: "w1-2014-4", name: "Paul Soucie", votes: 274, votePercentage: 6.19, isWinner: false, isIncumbent: false },
        { id: "w1-2014-5", name: "Tom Trainor", votes: 261, votePercentage: 5.89, isWinner: false, isIncumbent: false },
        { id: "w1-2014-6", name: "Denis Ferron", votes: 232, votePercentage: 5.24, isWinner: false, isIncumbent: false },
        { id: "w1-2014-7", name: "Mathieu Labonté", votes: 167, votePercentage: 3.77, isWinner: false, isIncumbent: false }
      ]
    },
    {
      wardNumber: 2,
      wardName: "Ward 2 (Walden / Lively / Copper Cliff)",
      neighborhoods: ["Lively", "Naughton", "Whitefish", "Copper Cliff", "Walden"],
      registeredVoters: 10300,
      ballotsCast: 5550,
      turnoutPercentage: 53.88,
      isIncumbentRetained: false,
      marginOfVictoryVotes: 622,
      marginOfVictoryPct: 11.28,
      winner: { id: "w2-2014-1", name: "Michael Vagnini", votes: 2752, votePercentage: 49.90, isWinner: true, isIncumbent: false },
      runnerUp: { id: "w2-2014-2", name: "Jacques Barbeau", votes: 2130, votePercentage: 38.62, isWinner: false, isIncumbent: true },
      candidates: [
        { id: "w2-2014-1", name: "Michael Vagnini", votes: 2752, votePercentage: 49.90, isWinner: true, isIncumbent: false },
        { id: "w2-2014-2", name: "Jacques Barbeau", votes: 2130, votePercentage: 38.62, isWinner: false, isIncumbent: true },
        { id: "w2-2014-3", name: "Daniel Xilon", votes: 398, votePercentage: 7.22, isWinner: false, isIncumbent: false },
        { id: "w2-2014-4", name: "Chad Odnokon", votes: 152, votePercentage: 2.76, isWinner: false, isIncumbent: false },
        { id: "w2-2014-5", name: "Joseph Palmateer", votes: 83, votePercentage: 1.50, isWinner: false, isIncumbent: false }
      ]
    },
    {
      wardNumber: 3,
      wardName: "Ward 3 (Rayside-Balfour / Onaping Falls)",
      neighborhoods: ["Chelmsford", "Dowling", "Onaping", "Levack", "Larchwood"],
      registeredVoters: 9800,
      ballotsCast: 4510,
      turnoutPercentage: 46.02,
      isIncumbentRetained: false,
      marginOfVictoryVotes: 573,
      marginOfVictoryPct: 12.82,
      winner: { id: "w3-2014-1", name: "Gerry Montpellier", votes: 1884, votePercentage: 42.14, isWinner: true, isIncumbent: false },
      runnerUp: { id: "w3-2014-2", name: "Marcel Montpellier", votes: 1311, votePercentage: 29.32, isWinner: false, isIncumbent: false },
      candidates: [
        { id: "w3-2014-1", name: "Gerry Montpellier", votes: 1884, votePercentage: 42.14, isWinner: true, isIncumbent: false },
        { id: "w3-2014-2", name: "Marcel Montpellier", votes: 1311, votePercentage: 29.32, isWinner: false, isIncumbent: false },
        { id: "w3-2014-3", name: "Matt Belanger", votes: 960, votePercentage: 21.47, isWinner: false, isIncumbent: false },
        { id: "w3-2014-4", name: "Jesse Gaudet", votes: 316, votePercentage: 7.07, isWinner: false, isIncumbent: false }
      ]
    },
    {
      wardNumber: 4,
      wardName: "Ward 4 (Azilda / Elm West / Donovan)",
      neighborhoods: ["The Donovan", "Elm West", "Azilda"],
      registeredVoters: 9600,
      ballotsCast: 4430,
      turnoutPercentage: 46.15,
      isIncumbentRetained: true,
      marginOfVictoryVotes: 399,
      marginOfVictoryPct: 9.09,
      winner: { id: "w4-2014-1", name: "Evelyn Dutrisac", votes: 2112, votePercentage: 48.10, isWinner: true, isIncumbent: true },
      runnerUp: { id: "w4-2014-2", name: "Francois Couture", votes: 1713, votePercentage: 39.01, isWinner: false, isIncumbent: false },
      candidates: [
        { id: "w4-2014-1", name: "Evelyn Dutrisac", votes: 2112, votePercentage: 48.10, isWinner: true, isIncumbent: true },
        { id: "w4-2014-2", name: "Francois Couture", votes: 1713, votePercentage: 39.01, isWinner: false, isIncumbent: false },
        { id: "w4-2014-3", name: "Paul Lefebvre", votes: 566, votePercentage: 12.89, isWinner: false, isIncumbent: false }
      ]
    },
    {
      wardNumber: 5,
      wardName: "Ward 5 (Blezard Valley / McCrea Heights / Val Caron)",
      neighborhoods: ["Blezard Valley", "Val Caron", "McCrea Heights"],
      registeredVoters: 9900,
      ballotsCast: 4140,
      turnoutPercentage: 41.82,
      isIncumbentRetained: false,
      marginOfVictoryVotes: 498,
      marginOfVictoryPct: 12.15,
      winner: { id: "w5-2014-1", name: "Robert Kirwan", votes: 1467, votePercentage: 35.78, isWinner: true, isIncumbent: false },
      runnerUp: { id: "w5-2014-2", name: "John Lundrigan", votes: 969, votePercentage: 23.63, isWinner: false, isIncumbent: false },
      candidates: [
        { id: "w5-2014-1", name: "Robert Kirwan", votes: 1467, votePercentage: 35.78, isWinner: true, isIncumbent: false },
        { id: "w5-2014-2", name: "John Lundrigan", votes: 969, votePercentage: 23.63, isWinner: false, isIncumbent: false },
        { id: "w5-2014-3", name: "Richard Larcher", votes: 891, votePercentage: 21.73, isWinner: false, isIncumbent: false },
        { id: "w5-2014-4", name: "Joseph Berthelot", votes: 483, votePercentage: 11.78, isWinner: false, isIncumbent: false },
        { id: "w5-2014-5", name: "Kent MacNeill", votes: 290, votePercentage: 7.07, isWinner: false, isIncumbent: false }
      ]
    },
    {
      wardNumber: 6,
      wardName: "Ward 6 (Hanmer / Val Therese)",
      neighborhoods: ["Hanmer", "Val Therese"],
      registeredVoters: 10150,
      ballotsCast: 5180,
      turnoutPercentage: 51.03,
      isIncumbentRetained: false,
      marginOfVictoryVotes: 270,
      marginOfVictoryPct: 5.25,
      winner: { id: "w6-2014-1", name: "René Lapierre", votes: 1933, votePercentage: 37.56, isWinner: true, isIncumbent: false },
      runnerUp: { id: "w6-2014-2", name: "André Rivest", votes: 1663, votePercentage: 32.31, isWinner: false, isIncumbent: true },
      candidates: [
        { id: "w6-2014-1", name: "René Lapierre", votes: 1933, votePercentage: 37.56, isWinner: true, isIncumbent: false },
        { id: "w6-2014-2", name: "André Rivest", votes: 1663, votePercentage: 32.31, isWinner: false, isIncumbent: true },
        { id: "w6-2014-3", name: "Fernand Bidal", votes: 865, votePercentage: 16.81, isWinner: false, isIncumbent: false },
        { id: "w6-2014-4", name: "Kevin Brault", votes: 686, votePercentage: 13.33, isWinner: false, isIncumbent: false }
      ]
    },
    {
      wardNumber: 7,
      wardName: "Ward 7 (Garson / Falconbridge / Skead / Capreol)",
      neighborhoods: ["Garson", "Falconbridge", "Capreol", "Skead", "Kukatush"],
      registeredVoters: 10100,
      ballotsCast: 4920,
      turnoutPercentage: 48.71,
      isIncumbentRetained: false,
      marginOfVictoryVotes: 961,
      marginOfVictoryPct: 19.68,
      winner: { id: "w7-2014-1", name: "Mike Jakubo", votes: 2486, votePercentage: 50.90, isWinner: true, isIncumbent: false },
      runnerUp: { id: "w7-2014-2", name: "Dave Kilgour", votes: 1525, votePercentage: 31.22, isWinner: false, isIncumbent: true },
      candidates: [
        { id: "w7-2014-1", name: "Mike Jakubo", votes: 2486, votePercentage: 50.90, isWinner: true, isIncumbent: false },
        { id: "w7-2014-2", name: "Dave Kilgour", votes: 1525, votePercentage: 31.22, isWinner: false, isIncumbent: true },
        { id: "w7-2014-3", name: "Robin Auger", votes: 414, votePercentage: 8.48, isWinner: false, isIncumbent: false },
        { id: "w7-2014-4", name: "Gordon Drysdale", votes: 371, votePercentage: 7.60, isWinner: false, isIncumbent: false },
        { id: "w7-2014-5", name: "Walter Prus", votes: 88, votePercentage: 1.80, isWinner: false, isIncumbent: false }
      ]
    },
    {
      wardNumber: 8,
      wardName: "Ward 8 (New Sudbury East / Westmount)",
      neighborhoods: ["New Sudbury", "Twin Forks", "Westmount"],
      registeredVoters: 9850,
      ballotsCast: 4410,
      turnoutPercentage: 44.77,
      isIncumbentRetained: false,
      marginOfVictoryVotes: 931,
      marginOfVictoryPct: 21.25,
      winner: { id: "w8-2014-1", name: "Al Sizer", votes: 1973, votePercentage: 45.04, isWinner: true, isIncumbent: false },
      runnerUp: { id: "w8-2014-2", name: "Stefano Presenza", votes: 1042, votePercentage: 23.79, isWinner: false, isIncumbent: false },
      candidates: [
        { id: "w8-2014-1", name: "Al Sizer", votes: 1973, votePercentage: 45.04, isWinner: true, isIncumbent: false },
        { id: "w8-2014-2", name: "Stefano Presenza", votes: 1042, votePercentage: 23.79, isWinner: false, isIncumbent: false },
        { id: "w8-2014-3", name: "Michael Cullen", votes: 1013, votePercentage: 23.12, isWinner: false, isIncumbent: false },
        { id: "w8-2014-4", name: "Gerry Perras", votes: 219, votePercentage: 5.00, isWinner: false, isIncumbent: false },
        { id: "w8-2014-5", name: "Kerry Latham", votes: 134, votePercentage: 3.06, isWinner: false, isIncumbent: false }
      ]
    },
    {
      wardNumber: 9,
      wardName: "Ward 9 (Coniston / Wahnapitae / Sudbury South)",
      neighborhoods: ["Coniston", "Wahnapitae", "South End East", "Wanup"],
      registeredVoters: 10350,
      ballotsCast: 5710,
      turnoutPercentage: 55.17,
      isIncumbentRetained: false,
      marginOfVictoryVotes: 963,
      marginOfVictoryPct: 16.99,
      winner: { id: "w9-2014-1", name: "Deb McIntosh", votes: 2000, votePercentage: 35.28, isWinner: true, isIncumbent: false },
      runnerUp: { id: "w9-2014-2", name: "Les Lisk", votes: 1037, votePercentage: 18.29, isWinner: false, isIncumbent: false },
      candidates: [
        { id: "w9-2014-1", name: "Deb McIntosh", votes: 2000, votePercentage: 35.28, isWinner: true, isIncumbent: false },
        { id: "w9-2014-2", name: "Les Lisk", votes: 1037, votePercentage: 18.29, isWinner: false, isIncumbent: false },
        { id: "w9-2014-3", name: "Wyman MacKinnon", votes: 691, votePercentage: 12.19, isWinner: false, isIncumbent: false },
        { id: "w9-2014-4", name: "Lin Gibson", votes: 679, votePercentage: 11.98, isWinner: false, isIncumbent: false },
        { id: "w9-2014-5", name: "Paul Stopciati", votes: 657, votePercentage: 11.59, isWinner: false, isIncumbent: false },
        { id: "w9-2014-6", name: "Aaron Beaudry", votes: 353, votePercentage: 6.23, isWinner: false, isIncumbent: false },
        { id: "w9-2014-7", name: "Will Thomson", votes: 252, votePercentage: 4.45, isWinner: false, isIncumbent: false }
      ]
    },
    {
      wardNumber: 10,
      wardName: "Ward 10 (Lockerby / Lo-Ellen / South End)",
      neighborhoods: ["Lockerby", "Lo-Ellen", "Long Lake", "Moonglo", "Laurentian"],
      registeredVoters: 10650,
      ballotsCast: 5420,
      turnoutPercentage: 50.89,
      isIncumbentRetained: false,
      marginOfVictoryVotes: 885,
      marginOfVictoryPct: 16.48,
      winner: { id: "w10-2014-1", name: "Fern Cormier", votes: 2085, votePercentage: 38.84, isWinner: true, isIncumbent: false },
      runnerUp: { id: "w10-2014-2", name: "John Antonioni", votes: 1200, votePercentage: 22.36, isWinner: false, isIncumbent: false },
      candidates: [
        { id: "w10-2014-1", name: "Fern Cormier", votes: 2085, votePercentage: 38.84, isWinner: true, isIncumbent: false },
        { id: "w10-2014-2", name: "John Antonioni", votes: 1200, votePercentage: 22.36, isWinner: false, isIncumbent: false },
        { id: "w10-2014-3", name: "Hannu Piironen", votes: 1042, votePercentage: 19.41, isWinner: false, isIncumbent: false },
        { id: "w10-2014-4", name: "Mila Wong", votes: 794, votePercentage: 14.79, isWinner: false, isIncumbent: false },
        { id: "w10-2014-5", name: "Steve Ripley", votes: 247, votePercentage: 4.60, isWinner: false, isIncumbent: false }
      ]
    },
    {
      wardNumber: 11,
      wardName: "Ward 11 (Minnow Lake / Adamsdale)",
      neighborhoods: ["Minnow Lake", "Adamsdale", "Ramsey Lake", "Howey Drive"],
      registeredVoters: 10300,
      ballotsCast: 5390,
      turnoutPercentage: 52.33,
      isIncumbentRetained: false,
      marginOfVictoryVotes: 494,
      marginOfVictoryPct: 9.23,
      winner: { id: "w11-2014-1", name: "Lynne Reynolds", votes: 2194, votePercentage: 40.96, isWinner: true, isIncumbent: false },
      runnerUp: { id: "w11-2014-2", name: "Terry Kett", votes: 1700, votePercentage: 31.73, isWinner: false, isIncumbent: true },
      candidates: [
        { id: "w11-2014-1", name: "Lynne Reynolds", votes: 2194, votePercentage: 40.96, isWinner: true, isIncumbent: false },
        { id: "w11-2014-2", name: "Terry Kett", votes: 1700, votePercentage: 31.73, isWinner: false, isIncumbent: true },
        { id: "w11-2014-3", name: "Mike Bleskie", votes: 851, votePercentage: 15.89, isWinner: false, isIncumbent: false },
        { id: "w11-2014-4", name: "Chris Nerpin", votes: 356, votePercentage: 6.65, isWinner: false, isIncumbent: false },
        { id: "w11-2014-5", name: "Vincent Lacroix", votes: 256, votePercentage: 4.78, isWinner: false, isIncumbent: false }
      ]
    },
    {
      wardNumber: 12,
      wardName: "Ward 12 (Flour Mill / Downtown / Kingsway)",
      neighborhoods: ["Flour Mill", "Downtown", "Bell Park", "Kingsway"],
      registeredVoters: 9350,
      ballotsCast: 4150,
      turnoutPercentage: 44.39,
      isIncumbentRetained: true,
      marginOfVictoryVotes: 1043,
      marginOfVictoryPct: 25.36,
      winner: { id: "w12-2014-1", name: "Joscelyne Landry-Altmann", votes: 2179, votePercentage: 52.98, isWinner: true, isIncumbent: true },
      runnerUp: { id: "w12-2014-2", name: "Tay Butt", votes: 1136, votePercentage: 27.62, isWinner: false, isIncumbent: false },
      candidates: [
        { id: "w12-2014-1", name: "Joscelyne Landry-Altmann", votes: 2179, votePercentage: 52.98, isWinner: true, isIncumbent: true },
        { id: "w12-2014-2", name: "Tay Butt", votes: 1136, votePercentage: 27.62, isWinner: false, isIncumbent: false },
        { id: "w12-2014-3", name: "Shawn Ouimet", votes: 496, votePercentage: 12.06, isWinner: false, isIncumbent: false },
        { id: "w12-2014-4", name: "Robert McCarthy", votes: 302, votePercentage: 7.34, isWinner: false, isIncumbent: false }
      ]
    }
  ]
};

export const ELECTION_2010: ElectionYearData = {
  year: 2010,
  electionDate: "October 25, 2010",
  registeredVoters: 115318,
  ballotsCast: 57373,
  overallTurnout: 49.75,
  votingMethod: "Paper Ballots + Optical Mark Scan (Advance Malls & Civic Centres)",
  notes: "Historical Certified Record: Marianne Matichuk became the first female mayor in Greater Sudbury's history, securing 25,042 votes (46.22%) and defeating incumbent John Rodriguez. Ward 10 featured one of the closest races in Ontario municipal history, with incumbent Frances Caldarelli defeating Fern Cormier by exactly 5 votes (2,151 to 2,146). Incumbents Joe Cimino (Ward 1) and Ron Dupuis (Ward 5) were returned by acclamation.",
  keyThemes: [
    "Historic Election of Marianne Matichuk (First Female Mayor)",
    "Defeat of Incumbent Mayor John Rodriguez (46.22% to 36.58%)",
    "Ward 10 Five-Vote Nailbiter (Frances Caldarelli over Fern Cormier)",
    "Acclamations in Ward 1 (Cimino) & Ward 5 (Dupuis)",
    "Transit Ticket Scandal & City Hall Accountability Focus"
  ],
  councilTurnoverCount: 3,
  totalCouncilSeats: 12,
  mayoralRace: {
    totalVotes: 54179,
    winner: { id: "m-2010-1", name: "Marianne Matichuk", votes: 25042, votePercentage: 46.22, isWinner: true, isIncumbent: false, color: "#2563eb" },
    runnerUp: { id: "m-2010-2", name: "John Rodriguez", votes: 19819, votePercentage: 36.58, isWinner: false, isIncumbent: true, color: "#ea580c" },
    marginOfVictoryVotes: 5223,
    marginOfVictoryPct: 9.64,
    candidates: [
      { id: "m-2010-1", name: "Marianne Matichuk", votes: 25042, votePercentage: 46.22, isWinner: true, isIncumbent: false, color: "#2563eb" },
      { id: "m-2010-2", name: "John Rodriguez", votes: 19819, votePercentage: 36.58, isWinner: false, isIncumbent: true, color: "#ea580c" },
      { id: "m-2010-3", name: "Ted Callaghan", votes: 7298, votePercentage: 13.47, isWinner: false, isIncumbent: false, color: "#16a34a" },
      { id: "m-2010-4", name: "Derek Young", votes: 1432, votePercentage: 2.64, isWinner: false, isIncumbent: false, color: "#9333ea" },
      { id: "m-2010-5", name: "Zack Gauthier", votes: 390, votePercentage: 0.72, isWinner: false, isIncumbent: false, color: "#06b6d4" },
      { id: "m-2010-6", name: "Ed Pokonzie", votes: 102, votePercentage: 0.19, isWinner: false, isIncumbent: false, color: "#d97706" },
      { id: "m-2010-7", name: "David Popescu", votes: 96, votePercentage: 0.18, isWinner: false, isIncumbent: false, color: "#475569" }
    ],
    wardWinners: {
      1: "Marianne Matichuk",
      2: "Marianne Matichuk",
      3: "Marianne Matichuk",
      4: "Marianne Matichuk",
      5: "Marianne Matichuk",
      6: "John Rodriguez",
      7: "Marianne Matichuk",
      8: "Marianne Matichuk",
      9: "Marianne Matichuk",
      10: "Marianne Matichuk",
      11: "Marianne Matichuk",
      12: "John Rodriguez"
    }
  },
  wards: [
    {
      wardNumber: 1,
      wardName: "Ward 1 (West End / South End)",
      neighborhoods: ["West End", "Gatchell", "Robinson", "South End (Part)"],
      registeredVoters: 10250,
      ballotsCast: 4620,
      turnoutPercentage: 45.07,
      isIncumbentRetained: true,
      marginOfVictoryVotes: 0,
      marginOfVictoryPct: 100.0,
      winner: { id: "w1-2010-1", name: "Joe Cimino", votes: 4620, votePercentage: 100.0, isWinner: true, isIncumbent: true },
      runnerUp: { id: "w1-2010-2", name: "Acclaimed (No Opponents)", votes: 0, votePercentage: 0.0, isWinner: false, isIncumbent: false },
      candidates: [
        { id: "w1-2010-1", name: "Joe Cimino", votes: 4620, votePercentage: 100.0, isWinner: true, isIncumbent: true }
      ]
    },
    {
      wardNumber: 2,
      wardName: "Ward 2 (Walden / Lively / Copper Cliff)",
      neighborhoods: ["Lively", "Naughton", "Whitefish", "Copper Cliff", "Walden"],
      registeredVoters: 10100,
      ballotsCast: 4905,
      turnoutPercentage: 48.56,
      isIncumbentRetained: true,
      marginOfVictoryVotes: 2473,
      marginOfVictoryPct: 50.42,
      winner: { id: "w2-2010-1", name: "Jacques Barbeau", votes: 3689, votePercentage: 75.21, isWinner: true, isIncumbent: true },
      runnerUp: { id: "w2-2010-2", name: "Peter Albers", votes: 1216, votePercentage: 24.79, isWinner: false, isIncumbent: false },
      candidates: [
        { id: "w2-2010-1", name: "Jacques Barbeau", votes: 3689, votePercentage: 75.21, isWinner: true, isIncumbent: true },
        { id: "w2-2010-2", name: "Peter Albers", votes: 1216, votePercentage: 24.79, isWinner: false, isIncumbent: false }
      ]
    },
    {
      wardNumber: 3,
      wardName: "Ward 3 (Rayside-Balfour / Onaping Falls)",
      neighborhoods: ["Chelmsford", "Dowling", "Onaping", "Levack", "Larchwood"],
      registeredVoters: 9650,
      ballotsCast: 4327,
      turnoutPercentage: 44.84,
      isIncumbentRetained: true,
      marginOfVictoryVotes: 1886,
      marginOfVictoryPct: 43.59,
      winner: { id: "w3-2010-1", name: "Claude Berthiaume", votes: 3019, votePercentage: 69.77, isWinner: true, isIncumbent: true },
      runnerUp: { id: "w3-2010-2", name: "Andrew Fahey", votes: 1133, votePercentage: 26.18, isWinner: false, isIncumbent: false },
      candidates: [
        { id: "w3-2010-1", name: "Claude Berthiaume", votes: 3019, votePercentage: 69.77, isWinner: true, isIncumbent: true },
        { id: "w3-2010-2", name: "Andrew Fahey", votes: 1133, votePercentage: 26.18, isWinner: false, isIncumbent: false },
        { id: "w3-2010-3", name: "Rickey Goudreau", votes: 175, votePercentage: 4.04, isWinner: false, isIncumbent: false }
      ]
    },
    {
      wardNumber: 4,
      wardName: "Ward 4 (Azilda / Elm West / Donovan)",
      neighborhoods: ["Azilda", "Donovan", "Elm West"],
      registeredVoters: 9350,
      ballotsCast: 4093,
      turnoutPercentage: 43.78,
      isIncumbentRetained: true,
      marginOfVictoryVotes: 1135,
      marginOfVictoryPct: 27.73,
      winner: { id: "w4-2010-1", name: "Evelyn Dutrisac", votes: 2614, votePercentage: 63.86, isWinner: true, isIncumbent: true },
      runnerUp: { id: "w4-2010-2", name: "Richard L. Paquette", votes: 1479, votePercentage: 36.14, isWinner: false, isIncumbent: false },
      candidates: [
        { id: "w4-2010-1", name: "Evelyn Dutrisac", votes: 2614, votePercentage: 63.86, isWinner: true, isIncumbent: true },
        { id: "w4-2010-2", name: "Richard L. Paquette", votes: 1479, votePercentage: 36.14, isWinner: false, isIncumbent: false }
      ]
    },
    {
      wardNumber: 5,
      wardName: "Ward 5 (Blezard Valley / McCrea Heights / Val Caron)",
      neighborhoods: ["Blezard Valley", "Val Caron", "McCrea Heights"],
      registeredVoters: 9200,
      ballotsCast: 4180,
      turnoutPercentage: 45.43,
      isIncumbentRetained: true,
      marginOfVictoryVotes: 0,
      marginOfVictoryPct: 100.0,
      winner: { id: "w5-2010-1", name: "Ron Dupuis", votes: 4180, votePercentage: 100.0, isWinner: true, isIncumbent: true },
      runnerUp: { id: "w5-2010-2", name: "Acclaimed (No Opponents)", votes: 0, votePercentage: 0.0, isWinner: false, isIncumbent: false },
      candidates: [
        { id: "w5-2010-1", name: "Ron Dupuis", votes: 4180, votePercentage: 100.0, isWinner: true, isIncumbent: true }
      ]
    },
    {
      wardNumber: 6,
      wardName: "Ward 6 (Hanmer / Val Therese)",
      neighborhoods: ["Hanmer", "Val Therese"],
      registeredVoters: 9750,
      ballotsCast: 4502,
      turnoutPercentage: 46.17,
      isIncumbentRetained: true,
      marginOfVictoryVotes: 802,
      marginOfVictoryPct: 17.81,
      winner: { id: "w6-2010-1", name: "André Rivest", votes: 2400, votePercentage: 53.31, isWinner: true, isIncumbent: true },
      runnerUp: { id: "w6-2010-2", name: "Pete Chenier", votes: 1598, votePercentage: 35.50, isWinner: false, isIncumbent: false },
      candidates: [
        { id: "w6-2010-1", name: "André Rivest", votes: 2400, votePercentage: 53.31, isWinner: true, isIncumbent: true },
        { id: "w6-2010-2", name: "Pete Chenier", votes: 1598, votePercentage: 35.50, isWinner: false, isIncumbent: false },
        { id: "w6-2010-3", name: "Christine Guillot-Proulx", votes: 504, votePercentage: 11.19, isWinner: false, isIncumbent: false }
      ]
    },
    {
      wardNumber: 7,
      wardName: "Ward 7 (Garson / Falconbridge / Skead / Capreol)",
      neighborhoods: ["Garson", "Falconbridge", "Capreol", "Skead", "Kukatush"],
      registeredVoters: 9600,
      ballotsCast: 4034,
      turnoutPercentage: 42.02,
      isIncumbentRetained: false,
      marginOfVictoryVotes: 897,
      marginOfVictoryPct: 22.24,
      winner: { id: "w7-2010-1", name: "Dave Kilgour", votes: 2078, votePercentage: 51.51, isWinner: true, isIncumbent: false },
      runnerUp: { id: "w7-2010-2", name: "Gordon Drysdale", votes: 1181, votePercentage: 29.28, isWinner: false, isIncumbent: false },
      candidates: [
        { id: "w7-2010-1", name: "Dave Kilgour", votes: 2078, votePercentage: 51.51, isWinner: true, isIncumbent: false },
        { id: "w7-2010-2", name: "Gordon Drysdale", votes: 1181, votePercentage: 29.28, isWinner: false, isIncumbent: false },
        { id: "w7-2010-3", name: "Dave Della Vedova", votes: 775, votePercentage: 19.21, isWinner: false, isIncumbent: false }
      ]
    },
    {
      wardNumber: 8,
      wardName: "Ward 8 (New Sudbury East / Westmount)",
      neighborhoods: ["New Sudbury", "Twin Forks", "Westmount"],
      registeredVoters: 9550,
      ballotsCast: 4446,
      turnoutPercentage: 46.55,
      isIncumbentRetained: false,
      marginOfVictoryVotes: 1070,
      marginOfVictoryPct: 24.07,
      winner: { id: "w8-2010-1", name: "Fabio Belli", votes: 1991, votePercentage: 44.78, isWinner: true, isIncumbent: false },
      runnerUp: { id: "w8-2010-2", name: "Al Sizer", votes: 921, votePercentage: 20.72, isWinner: false, isIncumbent: false },
      candidates: [
        { id: "w8-2010-1", name: "Fabio Belli", votes: 1991, votePercentage: 44.78, isWinner: true, isIncumbent: false },
        { id: "w8-2010-2", name: "Al Sizer", votes: 921, votePercentage: 20.72, isWinner: false, isIncumbent: false },
        { id: "w8-2010-3", name: "Lorenzo Tripodi", votes: 662, votePercentage: 14.89, isWinner: false, isIncumbent: false },
        { id: "w8-2010-4", name: "Ron LaPlante", votes: 281, votePercentage: 6.32, isWinner: false, isIncumbent: false },
        { id: "w8-2010-5", name: "Leo Bisson", votes: 259, votePercentage: 5.83, isWinner: false, isIncumbent: false },
        { id: "w8-2010-6", name: "Ian McCracken", votes: 155, votePercentage: 3.49, isWinner: false, isIncumbent: false },
        { id: "w8-2010-7", name: "Louis Delongchamp", votes: 72, votePercentage: 1.62, isWinner: false, isIncumbent: false },
        { id: "w8-2010-8", name: "Harry Will", votes: 71, votePercentage: 1.60, isWinner: false, isIncumbent: false },
        { id: "w8-2010-9", name: "Alex Martinez", votes: 34, votePercentage: 0.76, isWinner: false, isIncumbent: false }
      ]
    },
    {
      wardNumber: 9,
      wardName: "Ward 9 (Coniston / Wahnapitae / Sudbury South)",
      neighborhoods: ["Coniston", "Wahnapitae", "South End East", "Wanup"],
      registeredVoters: 9900,
      ballotsCast: 4827,
      turnoutPercentage: 48.76,
      isIncumbentRetained: true,
      marginOfVictoryVotes: 378,
      marginOfVictoryPct: 7.83,
      winner: { id: "w9-2010-1", name: "Doug Craig", votes: 1879, votePercentage: 38.93, isWinner: true, isIncumbent: true },
      runnerUp: { id: "w9-2010-2", name: "Jim Sartor", votes: 1501, votePercentage: 31.09, isWinner: false, isIncumbent: false },
      candidates: [
        { id: "w9-2010-1", name: "Doug Craig", votes: 1879, votePercentage: 38.93, isWinner: true, isIncumbent: true },
        { id: "w9-2010-2", name: "Jim Sartor", votes: 1501, votePercentage: 31.09, isWinner: false, isIncumbent: false },
        { id: "w9-2010-3", name: "Paul Stopciati", votes: 1447, votePercentage: 29.98, isWinner: false, isIncumbent: false }
      ]
    },
    {
      wardNumber: 10,
      wardName: "Ward 10 (Lockerby / Lo-Ellen / South End)",
      neighborhoods: ["Lockerby", "Lo-Ellen", "Long Lake", "Moonglo", "Laurentian"],
      registeredVoters: 10500,
      ballotsCast: 5295,
      turnoutPercentage: 50.43,
      isIncumbentRetained: true,
      marginOfVictoryVotes: 5,
      marginOfVictoryPct: 0.09,
      winner: { id: "w10-2010-1", name: "Frances Caldarelli", votes: 2151, votePercentage: 40.62, isWinner: true, isIncumbent: true },
      runnerUp: { id: "w10-2010-2", name: "Fern Cormier", votes: 2146, votePercentage: 40.53, isWinner: false, isIncumbent: false },
      candidates: [
        { id: "w10-2010-1", name: "Frances Caldarelli", votes: 2151, votePercentage: 40.62, isWinner: true, isIncumbent: true },
        { id: "w10-2010-2", name: "Fern Cormier", votes: 2146, votePercentage: 40.53, isWinner: false, isIncumbent: false },
        { id: "w10-2010-3", name: "Mark Signoretti", votes: 682, votePercentage: 12.88, isWinner: false, isIncumbent: false },
        { id: "w10-2010-4", name: "Steve Ripley", votes: 316, votePercentage: 5.97, isWinner: false, isIncumbent: false }
      ]
    },
    {
      wardNumber: 11,
      wardName: "Ward 11 (Minnow Lake / Adamsdale)",
      neighborhoods: ["Minnow Lake", "Adamsdale", "Ramsey Lake", "Howey Drive"],
      registeredVoters: 10200,
      ballotsCast: 5028,
      turnoutPercentage: 49.29,
      isIncumbentRetained: false,
      marginOfVictoryVotes: 461,
      marginOfVictoryPct: 9.17,
      winner: { id: "w11-2010-1", name: "Terry Kett", votes: 1971, votePercentage: 39.20, isWinner: true, isIncumbent: false },
      runnerUp: { id: "w11-2010-2", name: "Tom Fenske", votes: 1510, votePercentage: 30.03, isWinner: false, isIncumbent: false },
      candidates: [
        { id: "w11-2010-1", name: "Terry Kett", votes: 1971, votePercentage: 39.20, isWinner: true, isIncumbent: false },
        { id: "w11-2010-2", name: "Tom Fenske", votes: 1510, votePercentage: 30.03, isWinner: false, isIncumbent: false },
        { id: "w11-2010-3", name: "Mike Petryna", votes: 796, votePercentage: 15.83, isWinner: false, isIncumbent: false },
        { id: "w11-2010-4", name: "Gerry Paquette", votes: 512, votePercentage: 10.18, isWinner: false, isIncumbent: false },
        { id: "w11-2010-5", name: "Joe Vairo", votes: 239, votePercentage: 4.75, isWinner: false, isIncumbent: false }
      ]
    },
    {
      wardNumber: 12,
      wardName: "Ward 12 (Flour Mill / Downtown / Kingsway)",
      neighborhoods: ["Flour Mill", "Downtown", "Bell Park", "Kingsway"],
      registeredVoters: 9300,
      ballotsCast: 3992,
      turnoutPercentage: 42.92,
      isIncumbentRetained: true,
      marginOfVictoryVotes: 1696,
      marginOfVictoryPct: 42.48,
      winner: { id: "w12-2010-1", name: "Joscelyne Landry-Altmann", votes: 2844, votePercentage: 71.24, isWinner: true, isIncumbent: true },
      runnerUp: { id: "w12-2010-2", name: "Jeff MacIntyre", votes: 1148, votePercentage: 28.76, isWinner: false, isIncumbent: false },
      candidates: [
        { id: "w12-2010-1", name: "Joscelyne Landry-Altmann", votes: 2844, votePercentage: 71.24, isWinner: true, isIncumbent: true },
        { id: "w12-2010-2", name: "Jeff MacIntyre", votes: 1148, votePercentage: 28.76, isWinner: false, isIncumbent: false }
      ]
    }
  ]
};
