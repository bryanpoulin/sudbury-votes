import { SentimentTopic, SentimentTopicId, PollingWave, VoteTally } from '../types/sentiment';

export const WARD_NEIGHBORHOOD_GUIDE: Record<number, { name: string; type: 'core' | 'outlying'; communities: string }> = {
  1: { name: 'Ward 1', type: 'core', communities: 'South End, Robinson, Copper Cliff, Long Lake' },
  2: { name: 'Ward 2', type: 'outlying', communities: 'Lively, Walden, Copper Cliff, Naughton, Whitefish' },
  3: { name: 'Ward 3', type: 'outlying', communities: 'Chelmsford, Azilda, Onaping Falls' },
  4: { name: 'Ward 4', type: 'core', communities: 'Elm West, Donovan, Little Britain, Minnow Lake' },
  5: { name: 'Ward 5', type: 'outlying', communities: 'Valley East, Hanmer, Capreol, Val Therese' },
  6: { name: 'Ward 6', type: 'outlying', communities: 'Hanmer, Val Caron' },
  7: { name: 'Ward 7', type: 'outlying', communities: 'Garson, Falconbridge, Skead, Kukagami' },
  8: { name: 'Ward 8', type: 'core', communities: 'New Sudbury, Westmount' },
  9: { name: 'Ward 9', type: 'outlying', communities: 'Coniston, Wahnapitae, Wanup, Sudbury South' },
  10: { name: 'Ward 10', type: 'core', communities: 'South End, Lockerby, Lo-Ellen, Moonglo' },
  11: { name: 'Ward 11', type: 'core', communities: 'Downtown, Minnow Lake, Ramsey Lake' },
  12: { name: 'Ward 12', type: 'core', communities: 'Flour Mill, Downtown, Kingsway, Mountain St.' },
};

export const URBAN_CORE_WARDS = [1, 4, 8, 10, 11, 12];
export const OUTLYING_TOWN_WARDS = [2, 3, 5, 6, 7, 9];

const createZeroTally = (): VoteTally => ({ A: 0, B: 0, C: 0, D: 0, total: 0 });

const createZeroDistribution = () => ({
  cityWide: createZeroTally(),
  urbanCore: createZeroTally(),
  outlying: createZeroTally(),
  byWard: {
    1: createZeroTally(),
    2: createZeroTally(),
    3: createZeroTally(),
    4: createZeroTally(),
    5: createZeroTally(),
    6: createZeroTally(),
    7: createZeroTally(),
    8: createZeroTally(),
    9: createZeroTally(),
    10: createZeroTally(),
    11: createZeroTally(),
    12: createZeroTally(),
  }
});

export const INITIAL_SENTIMENT_TOPICS: Record<SentimentTopicId, SentimentTopic> = {
  arena: {
    id: 'arena',
    tabLabel: 'Downtown Events Centre',
    iconName: 'Landmark',
    title: 'Downtown Events Centre & Cultural District Funding',
    context: "City Council's planned downtown replacement facility vs. refurbishment and debt financing on Elgin Street.",
    options: [
      {
        id: 'A',
        label: 'Option A',
        text: 'Proceed with the planned ~$200M downtown replacement facility funded via municipal debt.'
      },
      {
        id: 'B',
        label: 'Option B',
        text: 'Renovate the existing Sudbury Arena on Elgin Street to reduce capital debt.'
      },
      {
        id: 'C',
        label: 'Option C',
        text: 'Pause all capital arena spending until road infrastructure deficits are prioritized.'
      },
      {
        id: 'D',
        label: 'Option D',
        text: 'Re-open the private partnership / periphery model (similar to former KED concepts).'
      }
    ],
    ...createZeroDistribution()
  },
  roads: {
    id: 'roads',
    tabLabel: 'Roads & Infrastructure',
    iconName: 'Construction',
    title: 'Road Quality & Arterial vs. Rural Infrastructure',
    context: "Balancing Sudbury's 3,200 km² road network, dedicated capital paving levy, arterial vs. rural connecting links.",
    options: [
      {
        id: 'A',
        label: 'Option A',
        text: 'Increase the dedicated road rehabilitation levy even if property taxes rise.'
      },
      {
        id: 'B',
        label: 'Option B',
        text: 'Reallocate funds from parks, culture, and transit into road paving.'
      },
      {
        id: 'C',
        label: 'Option C',
        text: 'Shift priority toward outlying rural connecting links over central urban repaving.'
      },
      {
        id: 'D',
        label: 'Option D',
        text: 'Keep the current funding balance unchanged.'
      }
    ],
    ...createZeroDistribution()
  },
  housing: {
    id: 'housing',
    tabLabel: 'Homelessness & Addictions',
    iconName: 'HeartHandshake',
    title: 'Homelessness, Encampments & Addiction Services',
    context: 'Supervised consumption services, transitional housing initiatives (Lorraine St.), downtown encampments, and municipal vs. provincial funding roles.',
    options: [
      {
        id: 'A',
        label: 'Option A',
        text: 'Expand municipal funding for supervised treatment/consumption and transitional housing.'
      },
      {
        id: 'B',
        label: 'Option B',
        text: 'Support housing initiatives, but insist health/consumption sites be 100% provincially funded.'
      },
      {
        id: 'C',
        label: 'Option C',
        text: 'Prioritize downtown enforcement, bylaws, and community safety measures.'
      },
      {
        id: 'D',
        label: 'Option D',
        text: 'Focus primarily on zoning incentives to stimulate private affordable rentals.'
      }
    ],
    ...createZeroDistribution()
  },
  taxes: {
    id: 'taxes',
    tabLabel: 'Property Taxes & Services',
    iconName: 'Receipt',
    title: 'Property Tax Levy & Municipal Service Levels',
    context: 'Annual property tax levy percentage caps, balancing municipal service delivery against taxpayer affordability, and independent efficiency audits.',
    options: [
      {
        id: 'A',
        label: 'Option A',
        text: 'Cap annual tax increases at inflation, accepting targeted cuts to municipal services.'
      },
      {
        id: 'B',
        label: 'Option B',
        text: 'Maintain all existing services and infrastructure investments, accepting higher tax levies.'
      },
      {
        id: 'C',
        label: 'Option C',
        text: 'Conduct an independent line-by-line efficiency audit before passing any future tax increase.'
      },
      {
        id: 'D',
        label: 'Option D',
        text: 'Freeze municipal taxes at 0% by deferring new capital projects and reducing departmental budgets.'
      }
    ],
    ...createZeroDistribution()
  }
};

export const POLLING_WAVES: PollingWave[] = [
  {
    id: 'wave1',
    title: 'Wave 1: Nominations & Platform Release',
    shortLabel: 'Wave 1 (Active)',
    dateRange: 'September 1 – September 24, 2026',
    status: 'active',
    badge: 'Active Window',
    description: 'Initial campaign sentiment tracking policy priorities following the official certification of candidates and mayoral platform rollouts.',
  },
  {
    id: 'wave2',
    title: 'Wave 2: Debates & Community Town Halls',
    shortLabel: 'Wave 2 (Upcoming)',
    dateRange: 'September 25 – October 13, 2026',
    status: 'upcoming',
    badge: 'Upcoming Window',
    description: 'Community sentiment pulse following the Greater Sudbury Chamber of Commerce debates, ward town halls, and detailed cost releases.',
  },
  {
    id: 'wave3',
    title: 'Wave 3: Advance Voting & Election Day',
    shortLabel: 'Wave 3 (Upcoming)',
    dateRange: 'October 14 – October 26, 2026',
    status: 'upcoming',
    badge: 'Upcoming Window',
    description: 'Final voting pulse tracking community stance through electronic & in-person Advance Voting through 8:00 PM on Municipal Election Day.',
  }
];

// Wave 1 Baseline Topics (Initialized to 0 - No votes recorded prior to live voting)
export const WAVE_1_SENTIMENT_TOPICS: Record<SentimentTopicId, SentimentTopic> = {
  arena: {
    ...INITIAL_SENTIMENT_TOPICS.arena,
    ...createZeroDistribution()
  },
  roads: {
    ...INITIAL_SENTIMENT_TOPICS.roads,
    ...createZeroDistribution()
  },
  housing: {
    ...INITIAL_SENTIMENT_TOPICS.housing,
    ...createZeroDistribution()
  },
  taxes: {
    ...INITIAL_SENTIMENT_TOPICS.taxes,
    ...createZeroDistribution()
  }
};

// Helper to calculate sentiment shift between Wave 1 (Baseline) and Wave 2 (Active)
export const getWaveSentimentShift = (
  topicId: SentimentTopicId, 
  optionId: 'A' | 'B' | 'C' | 'D'
): { diffPct: number; direction: 'up' | 'down' | 'flat' } => {
  const w1Topic = WAVE_1_SENTIMENT_TOPICS[topicId];
  const w2Topic = INITIAL_SENTIMENT_TOPICS[topicId];

  const w1Count = w1Topic.cityWide[optionId] || 0;
  const w1Pct = w1Topic.cityWide.total > 0 ? (w1Count / w1Topic.cityWide.total) * 100 : 0;

  const w2Count = w2Topic.cityWide[optionId] || 0;
  const w2Pct = w2Topic.cityWide.total > 0 ? (w2Count / w2Topic.cityWide.total) * 100 : 0;

  const diff = Number((w2Pct - w1Pct).toFixed(1));

  if (diff > 0.3) {
    return { diffPct: Math.abs(diff), direction: 'up' };
  } else if (diff < -0.3) {
    return { diffPct: Math.abs(diff), direction: 'down' };
  }
  return { diffPct: Math.abs(diff), direction: 'flat' };
};
