export interface CandidateResult {
  id: string;
  name: string;
  votes: number;
  votePercentage: number;
  isWinner: boolean;
  isIncumbent: boolean;
  notes?: string;
  color?: string;
}

export interface WardRace {
  wardNumber: number;
  wardName: string;
  neighborhoods: string[];
  registeredVoters: number;
  ballotsCast: number;
  turnoutPercentage: number;
  candidates: CandidateResult[];
  winner: CandidateResult;
  runnerUp?: CandidateResult;
  councillors?: CandidateResult[]; // For dual-member wards (e.g. 2003)
  isDualMemberWard?: boolean;
  isAcclaimed?: boolean;
  marginOfVictoryVotes: number;
  marginOfVictoryPct: number;
  isIncumbentRetained: boolean;
  mayoralWinnerInWard?: string;
  mayoralVotesInWard?: {
    candidateName: string;
    votes: number;
    pct: number;
  }[];
  keyIssues?: string[];
}

export interface MayoralRace {
  totalVotes: number;
  candidates: CandidateResult[];
  winner: CandidateResult;
  runnerUp: CandidateResult;
  marginOfVictoryVotes: number;
  marginOfVictoryPct: number;
  wardWinners?: Record<number, string>; // wardNumber -> winning mayoral candidate name
}

export interface ElectionYearData {
  year: number;
  electionDate: string;
  registeredVoters: number;
  ballotsCast: number;
  overallTurnout: number;
  mayoralRace: MayoralRace;
  wards: WardRace[];
  notes: string;
  votingMethod: string;
  keyThemes: string[];
  councilTurnoverCount: number; // How many new councillors elected vs incumbents
  totalCouncilSeats: number;
}

export interface WardGeometry {
  wardNumber: number;
  wardName: string;
  shortLabel: string;
  svgPath: string;
  labelX: number;
  labelY: number;
  areaKm2: number;
  description: string;
}

export type MapColorMode = 'winners' | 'mayoral' | 'turnout' | 'margin' | 'turnover';
export type ViewTab = 'overview' | 'map' | 'mayoral' | 'wards' | 'trends' | 'candidates' | 'compare' | 'data';
