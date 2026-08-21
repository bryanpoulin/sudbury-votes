import { WardGeometry } from '../types/election';

// Modern 12-Ward System (2006, 2010, 2014, 2018, 2022)
export const WARD_GEOMETRIES: WardGeometry[] = [
  {
    wardNumber: 1,
    wardName: "Ward 1 (West End / South End / Lockerby)",
    shortLabel: "W1",
    svgPath: "M 230,270 L 265,260 L 285,275 L 290,320 L 270,360 L 225,350 L 210,310 Z",
    labelX: 250,
    labelY: 310,
    areaKm2: 38.4,
    description: "Encompasses West End, Robinson, Gatchell, Lockerby, and portions of Moonglo."
  },
  {
    wardNumber: 2,
    wardName: "Ward 2 (Walden / Lively / Copper Cliff)",
    shortLabel: "W2",
    svgPath: "M 90,260 L 210,250 L 230,270 L 210,310 L 225,350 L 200,430 L 80,420 L 60,330 Z",
    labelX: 145,
    labelY: 340,
    areaKm2: 812.5,
    description: "Largest southern ward including Lively, Waters, Copper Cliff, Naughton, Whitefish, Beaver Lake & Worthington."
  },
  {
    wardNumber: 3,
    wardName: "Ward 3 (Rayside-Balfour / Onaping Falls)",
    shortLabel: "W3",
    svgPath: "M 70,120 L 190,110 L 220,170 L 205,240 L 90,260 L 50,190 Z",
    labelX: 130,
    labelY: 185,
    areaKm2: 1240.2,
    description: "North-western rural & suburban communities: Chelmsford, Dowling, Onaping, Levack & Cartier boundary."
  },
  {
    wardNumber: 4,
    wardName: "Ward 4 (Elm West / Donovan / Azilda)",
    shortLabel: "W4",
    svgPath: "M 205,240 L 255,215 L 280,240 L 265,260 L 230,270 L 210,250 Z",
    labelX: 242,
    labelY: 246,
    areaKm2: 44.1,
    description: "Historic inner-city neighborhoods and Azilda, including Elm West, the Donovan, and St. Charles."
  },
  {
    wardNumber: 5,
    wardName: "Ward 5 (Blezard Valley / Val Caron / McCrea)",
    shortLabel: "W5",
    svgPath: "M 190,110 L 280,95 L 305,160 L 275,210 L 220,170 Z",
    labelX: 250,
    labelY: 145,
    areaKm2: 145.8,
    description: "Valley East core: Blezard Valley, Val Caron, McCrea Heights & Rayside."
  },
  {
    wardNumber: 6,
    wardName: "Ward 6 (Hanmer / Val Thérèse)",
    shortLabel: "W6",
    svgPath: "M 280,95 L 375,80 L 390,145 L 305,160 Z",
    labelX: 335,
    labelY: 120,
    areaKm2: 215.3,
    description: "Northern residential agricultural communities of Hanmer and Val Thérèse."
  },
  {
    wardNumber: 7,
    wardName: "Ward 7 (Capreol / Garson / Falconbridge / Skead)",
    shortLabel: "W7",
    svgPath: "M 375,80 L 480,70 L 495,190 L 415,225 L 390,145 Z",
    labelX: 435,
    labelY: 135,
    areaKm2: 490.6,
    description: "Northeastern towns including Capreol, Garson, Falconbridge, Skead & Sudbury Airport corridor."
  },
  {
    wardNumber: 8,
    wardName: "Ward 8 (New Sudbury West / Barrydowne)",
    shortLabel: "W8",
    svgPath: "M 275,210 L 345,195 L 360,240 L 300,250 L 280,240 L 255,215 Z",
    labelX: 310,
    labelY: 225,
    areaKm2: 22.7,
    description: "Dense commercial and residential hub of New Sudbury, Lasalle corridor, and College Boreal area."
  },
  {
    wardNumber: 9,
    wardName: "Ward 9 (Coniston / Wahnapitae / South East)",
    shortLabel: "W9",
    svgPath: "M 415,225 L 495,190 L 520,340 L 440,430 L 350,390 L 365,310 L 410,290 Z",
    labelX: 430,
    labelY: 320,
    areaKm2: 670.4,
    description: "East rural and suburban sectors: Coniston, Wahnapitae, Wanup, and McFarlane Lake south."
  },
  {
    wardNumber: 10,
    wardName: "Ward 10 (Fernwood / South End / Laurentian)",
    shortLabel: "W10",
    svgPath: "M 270,360 L 290,320 L 330,325 L 350,390 L 275,440 L 200,430 L 225,350 Z",
    labelX: 285,
    labelY: 385,
    areaKm2: 52.3,
    description: "South End, Lo-Ellen Park, South Algonquin, St. Charles Lake & Laurentian University."
  },
  {
    wardNumber: 11,
    wardName: "Ward 11 (Minnow Lake / New Sudbury East)",
    shortLabel: "W11",
    svgPath: "M 345,195 L 415,225 L 410,290 L 365,310 L 335,275 L 360,240 Z",
    labelX: 375,
    labelY: 255,
    areaKm2: 31.9,
    description: "Minnow Lake, Adamsdale, Moonlight Beach area, and eastern New Sudbury."
  },
  {
    wardNumber: 12,
    wardName: "Ward 12 (Flour Mill / Downtown / Kingsway)",
    shortLabel: "W12",
    svgPath: "M 280,240 L 300,250 L 335,275 L 330,325 L 290,320 L 285,275 L 265,260 Z",
    labelX: 300,
    labelY: 285,
    areaKm2: 18.2,
    description: "Sudbury downtown core, Flour Mill, Bell Park north, and Kingsway."
  }
];

// Historical 6-Ward System (2000 & 2003 Post-Amalgamation Dual-Member Wards)
export const WARD_GEOMETRIES_2003: WardGeometry[] = [
  {
    wardNumber: 1,
    wardName: "Ward 1 (Sudbury South & West End)",
    shortLabel: "W1",
    svgPath: "M 210,250 L 265,260 L 285,275 L 290,320 L 330,325 L 350,390 L 275,440 L 200,430 L 225,350 L 210,310 Z",
    labelX: 265,
    labelY: 340,
    areaKm2: 90.7,
    description: "Former Sudbury South & West End: West End, Gatchell, Robinson, Lockerby, Lo-Ellen, Long Lake & Moonglo. Elected 2 Councillors: Eldon Gainer & Terry Kett."
  },
  {
    wardNumber: 2,
    wardName: "Ward 2 (Walden, Copper Cliff & Lively)",
    shortLabel: "W2",
    svgPath: "M 90,260 L 210,250 L 210,310 L 225,350 L 200,430 L 80,420 L 60,330 Z",
    labelX: 145,
    labelY: 340,
    areaKm2: 812.5,
    description: "Town of Walden communities: Lively, Copper Cliff, Naughton, Whitefish, Beaver Lake & Worthington. Elected 2 Councillors: Claude Berthiaume & Ron Bradley."
  },
  {
    wardNumber: 3,
    wardName: "Ward 3 (Rayside-Balfour & Onaping Falls)",
    shortLabel: "W3",
    svgPath: "M 70,120 L 190,110 L 220,170 L 205,240 L 90,260 L 50,190 Z",
    labelX: 130,
    labelY: 185,
    areaKm2: 1240.2,
    description: "North-western communities: Chelmsford, Dowling, Onaping, Levack & Azilda fringe. Elected 2 Councillors: Ron Dupuis & André Rivest."
  },
  {
    wardNumber: 4,
    wardName: "Ward 4 (Sudbury Central, Donovan & New Sudbury)",
    shortLabel: "W4",
    svgPath: "M 205,240 L 255,215 L 275,210 L 345,195 L 360,240 L 335,275 L 285,275 L 265,260 L 210,250 Z",
    labelX: 285,
    labelY: 245,
    areaKm2: 85.0,
    description: "Inner city and New Sudbury: Downtown, Donovan, Flour Mill, Elm West, and Lasalle Corridor. Elected 2 Councillors: Ted Callaghan & Dave Kilgour."
  },
  {
    wardNumber: 5,
    wardName: "Ward 5 (Valley East & Capreol)",
    shortLabel: "W5",
    svgPath: "M 190,110 L 280,95 L 375,80 L 480,70 L 495,190 L 415,225 L 345,195 L 275,210 L 220,170 Z",
    labelX: 340,
    labelY: 135,
    areaKm2: 851.7,
    description: "Valley East and Capreol: Val Caron, Blezard Valley, Hanmer, Val Thérèse & Capreol. Elected 2 Councillors: Doug Craig & Austin Davey."
  },
  {
    wardNumber: 6,
    wardName: "Ward 6 (Minnow Lake & Nickel Centre)",
    shortLabel: "W6",
    svgPath: "M 345,195 L 415,225 L 495,190 L 520,340 L 440,430 L 350,390 L 330,325 L 335,275 L 360,240 Z",
    labelX: 420,
    labelY: 290,
    areaKm2: 702.3,
    description: "Nickel Centre and Minnow Lake: Coniston, Falconbridge, Garson, Wahnapitae & Adamsdale. Elected 2 Councillors: Mike Petryna & Lynne Reynolds."
  }
];

export const getWardGeometriesForYear = (year: number): WardGeometry[] => {
  return year === 2003 ? WARD_GEOMETRIES_2003 : WARD_GEOMETRIES;
};

export const LAKE_GEOMETRIES = [
  {
    name: "Ramsey Lake",
    path: "M 305,320 C 315,315 330,320 338,332 C 342,342 335,355 320,350 C 310,345 300,335 305,320 Z"
  },
  {
    name: "Wanapitei Lake (North East)",
    path: "M 460,95 C 475,85 490,95 488,125 C 480,140 465,130 460,95 Z"
  },
  {
    name: "Lake Laurentian / Kelly Lake",
    path: "M 255,340 C 265,335 272,345 268,355 C 260,358 252,350 255,340 Z"
  }
];
