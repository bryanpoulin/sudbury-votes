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
