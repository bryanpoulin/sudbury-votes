import { CivicIdea, CivicTheme, CivicThemeId } from '../types/sentiment';

export const CIVIC_THEMES: Record<CivicThemeId, CivicTheme> = {
  housing: {
    id: 'housing',
    label: 'Housing & Supports',
    iconName: 'Home',
    color: '#ec4899',
    badgeBg: 'bg-pink-500/10',
    badgeText: 'text-pink-400',
    badgeBorder: 'border-pink-500/30',
    description: 'Affordable rentals, unhoused warming/cooling supports, and transitional housing'
  },
  transit: {
    id: 'transit',
    label: 'Transit & Biking',
    iconName: 'Bus',
    color: '#38bdf8',
    badgeBg: 'bg-sky-500/10',
    badgeText: 'text-sky-400',
    badgeBorder: 'border-sky-500/30',
    description: 'GOVA bus frequency, evening/weekend service, and safe protected bike infrastructure'
  },
  environment: {
    id: 'environment',
    label: 'Greenspaces & Climate',
    iconName: 'Trees',
    color: '#34d399',
    badgeBg: 'bg-emerald-500/10',
    badgeText: 'text-emerald-400',
    badgeBorder: 'border-emerald-500/30',
    description: 'Protecting nature, lakes, urban greenspaces, trails, and extreme weather resilience'
  },
  infrastructure: {
    id: 'infrastructure',
    label: 'Roads & Traffic',
    iconName: 'Construction',
    color: '#fbbf24',
    badgeBg: 'bg-amber-500/10',
    badgeText: 'text-amber-400',
    badgeBorder: 'border-amber-500/30',
    description: 'Arterial road paving, pothole repairs, sidewalk snow-clearing, and neighborhood traffic calming'
  },
  downtown: {
    id: 'downtown',
    label: 'Event Centre & Downtown',
    iconName: 'Landmark',
    color: '#a855f7',
    badgeBg: 'bg-purple-500/10',
    badgeText: 'text-purple-400',
    badgeBorder: 'border-purple-500/30',
    description: 'The Downtown Event Centre project, arena replacement, Elgin greenway, and street vibrancy'
  },
  taxes: {
    id: 'taxes',
    label: 'Taxes & Core Services',
    iconName: 'DollarSign',
    color: '#f97316',
    badgeBg: 'bg-orange-500/10',
    badgeText: 'text-orange-400',
    badgeBorder: 'border-orange-500/30',
    description: 'Property tax levy capping, spending accountability, and core service quality'
  },
  community: {
    id: 'community',
    label: 'Community Care & Food',
    iconName: 'HeartHandshake',
    color: '#06b6d4',
    badgeBg: 'bg-cyan-500/10',
    badgeText: 'text-cyan-400',
    badgeBorder: 'border-cyan-500/30',
    description: 'Community gardens, food security initiatives, volunteer neighborhood clean-ups, and arts'
  },
  youth_seniors: {
    id: 'youth_seniors',
    label: 'Youth, Seniors & Hubs',
    iconName: 'Users',
    color: '#818cf8',
    badgeBg: 'bg-indigo-500/10',
    badgeText: 'text-indigo-400',
    badgeBorder: 'border-indigo-500/30',
    description: 'Free community spaces, youth recreation, seniors programming, and outlying community centres'
  }
};

export const INITIAL_CIVIC_IDEAS: CivicIdea[] = [
  {
    id: 'idea_cls_housing_1',
    title: 'Inclusionary zoning requiring 10% deeply affordable units in all large developments',
    description: 'City Council should enact an inclusionary zoning by-law that requires 10% of units in any new multi-residential build of 20+ units to be maintained at affordable and rent-geared-to-income rates for at least 25 years.',
    ward: 'all',
    theme: 'housing',
    secondsCount: 0,
    authorToken: 'vt_benchmark_coalition',
    createdAt: '2026-09-02T10:00:00Z',
    status: 'active',
    isBenchmark: true
  },
  {
    id: 'idea_cls_transit_2',
    title: 'Extend Route 20 (New Sudbury) & Route 1 (Mainline) GOVA buses past 1:00 AM on weekends',
    description: 'Shift workers, retail staff at the New Sudbury Centre, and downtown hospitality workers currently have no safe transit options after midnight. Weekend transit service must be extended to serve working families.',
    ward: '8',
    theme: 'transit',
    secondsCount: 0,
    authorToken: 'vt_benchmark_coalition',
    createdAt: '2026-09-04T14:30:00Z',
    status: 'active',
    isBenchmark: true
  },
  {
    id: 'idea_cls_unhoused_3',
    title: 'Fund permanent 24/7 low-barrier warming/cooling hub with integrated mental health workers',
    description: 'Stop relying on temporary emergency shelters that open and close based on unpredictable weather alerts. Greater Sudbury needs a permanent, 24/7 low-barrier day-and-night center connected directly to social work and paramedic health teams.',
    ward: '10',
    theme: 'housing',
    secondsCount: 0,
    authorToken: 'vt_benchmark_coalition',
    createdAt: '2026-09-01T09:15:00Z',
    status: 'active',
    isBenchmark: true
  },
  {
    id: 'idea_cls_greenspace_4',
    title: 'Enact permanent conservation buffer zoning for Junction Creek and urban lake watersheds',
    description: 'Our lakes and linear parks are Greater Sudbury’s greatest natural asset. Prohibit encroachment and clear-cutting near Junction Creek trails and sensitive lake shorelines to protect drinking water and wildlife habitat.',
    ward: '11',
    theme: 'environment',
    secondsCount: 0,
    authorToken: 'vt_benchmark_coalition',
    createdAt: '2026-09-05T11:00:00Z',
    status: 'active',
    isBenchmark: true
  },
  {
    id: 'idea_roads_potholes_5',
    title: 'Targeted asphalt resurfacing on Notre Dame & Lasalle before aesthetic streetscape projects',
    description: 'High-volume commuter roads like Notre Dame Avenue and Lasalle Boulevard have severe rutting and pothole damage that damages tires and ball joints daily. Prioritize arterial repaving over decorative downtown pavers.',
    ward: '4',
    theme: 'infrastructure',
    secondsCount: 0,
    authorToken: 'vt_local_resident',
    createdAt: '2026-09-07T16:20:00Z',
    status: 'active',
    isBenchmark: false
  },
  {
    id: 'idea_food_gardens_6',
    title: 'Provide city water hookups and free mulch to all volunteer neighborhood community gardens',
    description: 'Food insecurity is climbing in Greater Sudbury. The city already owns dozens of vacant lots—let neighborhood groups convert them into food gardens by supplying municipal water connections and compost without red tape.',
    ward: 'all',
    theme: 'community',
    secondsCount: 0,
    authorToken: 'vt_benchmark_coalition',
    createdAt: '2026-09-08T13:45:00Z',
    status: 'active',
    isBenchmark: true
  },
  {
    id: 'idea_taxes_freeze_7',
    title: 'Cap property tax rate increases strictly at the Consumer Price Index (CPI) rate',
    description: 'Seniors on fixed pensions and young homeowners cannot absorb annual tax hikes of 5% to 7%. The 2026-2030 Council must enforce an operating budget cap tied to provincial inflation.',
    ward: '2',
    theme: 'taxes',
    secondsCount: 0,
    authorToken: 'vt_local_resident',
    createdAt: '2026-09-10T08:30:00Z',
    status: 'active',
    isBenchmark: false
  },
  {
    id: 'idea_youth_centres_8',
    title: 'Keep outlying community arenas and youth recreation halls open year-round with free drop-ins',
    description: 'Towns in the outlying service areas (Valley East, Capreol, Walden, Rayside-Balfour) are losing youth to boredom and screen time. Re-invest in free indoor gym hours, sports equipment lending, and youth club nights.',
    ward: '6',
    theme: 'youth_seniors',
    secondsCount: 0,
    authorToken: 'vt_benchmark_coalition',
    createdAt: '2026-09-12T19:00:00Z',
    status: 'active',
    isBenchmark: true
  },
  {
    id: 'idea_arena_referendum_9',
    title: 'Require transparent quarterly cost updates and private co-investment for the Event Centre',
    description: 'If the City builds the new downtown arena on Minto, protect municipal taxpayers with firm maximum price guarantees and private hospitality sector co-financing before breaking ground.',
    ward: 'all',
    theme: 'downtown',
    secondsCount: 0,
    authorToken: 'vt_local_resident',
    createdAt: '2026-09-14T15:10:00Z',
    status: 'active',
    isBenchmark: false
  }
];
