export type SentimentTopicId = 'arena' | 'roads' | 'housing' | 'taxes';

export type PolicyOptionId = 'A' | 'B' | 'C' | 'D';

export interface PolicyOption {
  id: PolicyOptionId;
  label: string;
  text: string;
}

export interface VoteTally {
  A: number;
  B: number;
  C: number;
  D: number;
  total: number;
}

export interface SentimentTopic {
  id: SentimentTopicId;
  title: string;
  tabLabel: string;
  iconName: string;
  context: string;
  options: PolicyOption[];
  cityWide: VoteTally;
  byWard: Record<number, VoteTally>;
  urbanCore: VoteTally;
  outlying: VoteTally;
}

export type PollingWaveId = 'wave1' | 'wave2' | 'wave3';

export interface PollingWave {
  id: PollingWaveId;
  title: string;
  shortLabel: string;
  dateRange: string;
  status: 'archived' | 'active' | 'upcoming';
  description: string;
  badge: string;
}

export interface UserVoteRecord {
  choice: PolicyOptionId;
  ward: number | null; // null represents "Greater Sudbury (At-Large / General)"
  timestamp: number;
  waveId?: PollingWaveId;
}

export type UserVotesState = Partial<Record<SentimentTopicId, UserVoteRecord>>;

export type ResultsCompareMode = 'cityWide' | 'byWard' | 'coreVsOutlying';

export type CivicThemeId = 
  | 'housing' 
  | 'transit' 
  | 'infrastructure' 
  | 'environment' 
  | 'taxes' 
  | 'community' 
  | 'downtown' 
  | 'youth_seniors';

export interface CivicTheme {
  id: CivicThemeId;
  label: string;
  iconName: string;
  color: string;
  badgeBg: string;
  badgeText: string;
  badgeBorder: string;
  description: string;
}

export interface CivicIdea {
  id: string;
  title: string;
  description: string;
  ward: string; // 'all' | '1'-'12' | 'at-large'
  theme: CivicThemeId;
  secondsCount: number;
  authorToken: string;
  createdAt: string;
  status: 'active' | 'flagged' | 'hidden';
  isBenchmark?: boolean;
}
