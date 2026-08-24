export type Candidate2026Status = 'Incumbent' | 'Challenger' | 'New Candidate';
export type NominationStatus = 'Certified' | 'Filed' | 'Declared';

export interface Candidate2026 {
  id: string;
  name: string;
  race: 'Mayoral' | number; // 'Mayoral' or wardNumber (1-12)
  status: Candidate2026Status;
  nominationStatus: NominationStatus;
  occupation: string;
  keyPillars: string[];
  bio: string;
  websiteUrl?: string;
  socialLinks?: {
    platform: 'twitter' | 'facebook' | 'linkedin' | 'instagram' | 'website';
    url: string;
  }[];
  // Live results simulation / tracking fields
  liveVotes?: number;
  liveVotePct?: number;
  isProjectedWinner?: boolean;
}

export interface DebateEvent2026 {
  id: string;
  title: string;
  organizer: string;
  date: string;
  time: string;
  location: string;
  raceScope: 'Mayoral' | 'Ward All-Candidates' | 'All Races';
  description: string;
  isLivestreamed: boolean;
  streamUrl?: string;
}

export interface WardLookupEntry {
  wardNumber: number;
  wardName: string;
  neighborhoods: string[];
  postalCodePrefixes: string[];
  keyStreets: string[];
  incumbentName: string;
  historicalTurnoutAvg: number;
  registeredVotersEst: number;
}

export type Election2026HubTab = 'candidates' | 'ward-locator' | 'debates' | 'live-results';
