export interface WardNeighborhoodInfo {
  name: string;
  type: 'core' | 'outlying';
  communities: string;
}

export const WARD_NEIGHBORHOOD_GUIDE: Record<number, WardNeighborhoodInfo> = {
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
