import { ElectionYearData } from '../types/election';
import { ELECTION_2022, ELECTION_2018 } from './electionData2022_2018';
import { ELECTION_2014, ELECTION_2010 } from './electionData2014_2010';
import { ELECTION_2006, ELECTION_2003 } from './electionData2006_2003';

export const ALL_ELECTIONS: ElectionYearData[] = [
  ELECTION_2022,
  ELECTION_2018,
  ELECTION_2014,
  ELECTION_2010,
  ELECTION_2006,
  ELECTION_2003
];

export const AVAILABLE_YEARS = [2022, 2018, 2014, 2010, 2006, 2003];

export function getElectionByYear(year: number): ElectionYearData {
  const found = ALL_ELECTIONS.find((e) => e.year === year);
  return found || ELECTION_2022;
}

export interface CandidateCareerRecord {
  candidateName: string;
  totalRaces: number;
  victories: number;
  winRate: number;
  totalVotesAccumulated: number;
  races: {
    year: number;
    raceType: 'Mayoral' | string;
    wardNumber?: number;
    votes: number;
    percentage: number;
    isWinner: boolean;
    isIncumbent: boolean;
  }[];
}

export function getAllCandidatesCareer(): CandidateCareerRecord[] {
  const map: Record<string, CandidateCareerRecord> = {};

  ALL_ELECTIONS.forEach((election) => {
    // Mayoral candidates
    election.mayoralRace.candidates.forEach((cand) => {
      const cleanName = cand.name.trim();
      if (!map[cleanName]) {
        map[cleanName] = {
          candidateName: cleanName,
          totalRaces: 0,
          victories: 0,
          winRate: 0,
          totalVotesAccumulated: 0,
          races: []
        };
      }
      map[cleanName].totalRaces += 1;
      if (cand.isWinner) map[cleanName].victories += 1;
      map[cleanName].totalVotesAccumulated += cand.votes;
      map[cleanName].races.push({
        year: election.year,
        raceType: 'Mayoral',
        votes: cand.votes,
        percentage: cand.votePercentage,
        isWinner: cand.isWinner,
        isIncumbent: cand.isIncumbent
      });
    });

    // Ward candidates
    election.wards.forEach((ward) => {
      ward.candidates.forEach((cand) => {
        const cleanName = cand.name.trim();
        if (!map[cleanName]) {
          map[cleanName] = {
            candidateName: cleanName,
            totalRaces: 0,
            victories: 0,
            winRate: 0,
            totalVotesAccumulated: 0,
            races: []
          };
        }
        map[cleanName].totalRaces += 1;
        if (cand.isWinner) map[cleanName].victories += 1;
        map[cleanName].totalVotesAccumulated += cand.votes;
        map[cleanName].races.push({
          year: election.year,
          raceType: `Ward ${ward.wardNumber}`,
          wardNumber: ward.wardNumber,
          votes: cand.votes,
          percentage: cand.votePercentage,
          isWinner: cand.isWinner,
          isIncumbent: cand.isIncumbent
        });
      });
    });
  });

  return Object.values(map)
    .map((record) => ({
      ...record,
      winRate: Math.round((record.victories / record.totalRaces) * 100),
      races: record.races.sort((a, b) => b.year - a.year)
    }))
    .sort((a, b) => b.totalVotesAccumulated - a.totalVotesAccumulated);
}

export function getWardHistoricalProgression(wardNumber: number) {
  return ALL_ELECTIONS.map((election) => {
    const ward = election.wards.find((w) => w.wardNumber === wardNumber);
    if (!ward) return null;
    return {
      year: election.year,
      winnerName: ward.councillors && ward.councillors.length > 1 
        ? `${ward.councillors[0].name} & ${ward.councillors[1].name}` 
        : ward.winner.name,
      winnerVotes: ward.winner.votes || 0,
      winnerPct: ward.winner.votePercentage || 0,
      runnerUpName: ward.runnerUp?.name || 'N/A',
      runnerUpVotes: ward.runnerUp?.votes || 0,
      marginPct: ward.marginOfVictoryPct || 0,
      turnoutPct: ward.turnoutPercentage || 0,
      isIncumbentRetained: ward.isIncumbentRetained ?? true,
      totalBallots: ward.ballotsCast || 0,
      candidatesCount: ward.candidates.length || 0,
      isDualMemberWard: ward.isDualMemberWard
    };
  }).filter((x): x is NonNullable<typeof x> => x !== null).reverse();
}
