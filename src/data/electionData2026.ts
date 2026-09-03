import { Candidate2026, DebateEvent2026, WardLookupEntry, SchoolBoardTrustee2026 } from '../types/election2026';

// 2026 Declared & Registered Candidates (Official City of Greater Sudbury Registry)
export const CANDIDATES_2026: Candidate2026[] = [
  // ==========================================
  // Mayoral Contest (City-Wide)
  // ==========================================
  {
    id: 'mayoral-paul-lefebvre',
    name: 'Paul Lefebvre',
    race: 'Mayoral',
    status: 'Incumbent',
    nominationStatus: 'Certified',
    occupation: 'Current Mayor of Greater Sudbury / Lawyer & Business Owner',
    keyPillars: [
      'Downtown Events Centre & Cultural Hub Execution',
      'Long-Term Asset Management & Accelerated Road Resurfacing',
      'Economic Diversification, Mining Innovation & Housing Growth'
    ],
    bio: 'Elected Mayor in 2022 following service as Member of Parliament for Sudbury (2015–2021). Filed May 12, 2026. Campaigning on fiscal continuity, major project delivery, and accelerating residential builds across the city.',
    websiteUrl: 'https://www.paullefebvre.ca',
    socialLinks: [
      { platform: 'twitter', url: 'https://twitter.com/paullefebvresud' },
      { platform: 'facebook', url: 'https://facebook.com/paullefebvresudbury' },
      { platform: 'website', url: 'https://www.paullefebvre.ca' }
    ],
    liveVotes: 23650,
    liveVotePct: 47.3,
    isProjectedWinner: true
  },
  {
    id: 'mayoral-bob-johnston',
    name: 'Bob Johnston',
    race: 'Mayoral',
    status: 'Challenger',
    nominationStatus: 'Certified',
    occupation: 'Community Advocate & Founder of Tomorrow’s Hope',
    keyPillars: [
      'Frontline Homelessness & Addiction Solutions',
      'Property Tax Relief & Fiscal Scrutiny',
      'Empowering Outlying Communities & Seniors Support'
    ],
    bio: 'Longtime community advocate and founder of Tomorrow’s Hope. Dedicated to direct grassroots constituent engagement, addressing root causes of addiction, and fiscal accountability in municipal procurement.',
    websiteUrl: 'https://vote4change2026bob.wixsite.com/service-showcase',
    socialLinks: [
      { platform: 'website', url: 'https://vote4change2026bob.wixsite.com/service-showcase' }
    ],
    liveVotes: 9120,
    liveVotePct: 18.2,
    isProjectedWinner: false
  },
  {
    id: 'mayoral-miranda-rocca-circelli',
    name: 'Miranda Rocca-Circelli',
    race: 'Mayoral',
    status: 'Challenger',
    nominationStatus: 'Certified',
    occupation: 'Education Consultant & Small Business Owner',
    keyPillars: [
      'Small Business Tax Incentives & Red Tape Elimination',
      'Municipal Transparency & Audit of Capital Spending',
      'Decentralized Frontline Services for Valley East and Walden'
    ],
    bio: 'Business owner, education consultant, and previous mayoral contender bringing an economic growth and business accountability focus to municipal hall.',
    websiteUrl: 'https://www.mirandaformayor.ca',
    socialLinks: [
      { platform: 'website', url: 'https://www.mirandaformayor.ca' }
    ],
    liveVotes: 6680,
    liveVotePct: 13.4,
    isProjectedWinner: false
  },
  {
    id: 'mayoral-troy-crowder',
    name: 'Troy Crowder',
    race: 'Mayoral',
    status: 'Challenger',
    nominationStatus: 'Certified',
    occupation: 'Former NHL Athlete & Local Entrepreneur',
    keyPillars: [
      'Sports & Community Recreation Reinvestment',
      'Core Road Infrastructure Delivery',
      'Transparent Council Decision-Making'
    ],
    bio: 'Former NHL player and local entrepreneur campaigning on enhancing youth and senior sports facilities, fixing core road networks, and bringing practical leadership to city hall.',
    liveVotes: 4450,
    liveVotePct: 8.9,
    isProjectedWinner: false
  },
  {
    id: 'mayoral-joseph-boutros',
    name: 'Joseph Boutros',
    race: 'Mayoral',
    status: 'Challenger',
    nominationStatus: 'Certified',
    occupation: 'Local Business Professional & Civic Reformer',
    keyPillars: [
      'Municipal Spending Transparency & Debt Reduction',
      'Enhanced Core Road Resurfacing & Ditching',
      'Citizen-Driven Budget Consultations'
    ],
    bio: 'Sudbury business professional running for Mayor on a platform of municipal tax reform, balanced capital spending, and restoring accountability to city hall operations.',
    liveVotes: 2150,
    liveVotePct: 4.3,
    isProjectedWinner: false
  },
  {
    id: 'mayoral-michael-mcintosh',
    name: 'Michael McIntosh',
    race: 'Mayoral',
    status: 'Challenger',
    nominationStatus: 'Certified',
    occupation: 'Community Organizer & Environmental Advocate',
    keyPillars: [
      'Lake Water Protection & Green Infrastructure',
      'Reliable Public Transit Expansion to Outlying Towns',
      'Community Infill & Affordable Family Housing'
    ],
    bio: 'Grassroots community organizer advocating for watershed conservation, reliable public transit connections to Valley East and Walden, and sustainable housing growth.',
    liveVotes: 1650,
    liveVotePct: 3.3,
    isProjectedWinner: false
  },
  {
    id: 'mayoral-keenan-menard',
    name: 'Keenan Menard',
    race: 'Mayoral',
    status: 'Challenger',
    nominationStatus: 'Certified',
    occupation: 'Civic Activist & Youth Opportunities Advocate',
    keyPillars: [
      'Youth Retention & Skilled Trade Opportunities',
      'Mental Health & Frontline Crisis Response',
      'Open-Data Municipal Transparency'
    ],
    bio: 'Youth and community advocate focused on retaining young talent in Greater Sudbury, expanding grassroots addiction and mental health support, and open government data.',
    liveVotes: 1250,
    liveVotePct: 2.5,
    isProjectedWinner: false
  },
  {
    id: 'mayoral-rodney-newton',
    name: 'Rodney Newton',
    race: 'Mayoral',
    status: 'Challenger',
    nominationStatus: 'Certified',
    occupation: 'Contractor & Outlying Towns Infrastructure Advocate',
    keyPillars: [
      'Equitable Capital Investment Across Outlying Communities',
      'Rural Road Maintenance & Emergency Service Resourcing',
      'Property Tax Freeze for Low-Income Seniors'
    ],
    bio: 'Trades professional and contractor advocating for fair treatment and infrastructure funding for Greater Sudbury’s amalgamated outlying towns and rural sectors.',
    liveVotes: 1050,
    liveVotePct: 2.1,
    isProjectedWinner: false
  },

  // ==========================================
  // Ward 1 (West End, Copper Cliff, Robinson)
  // ==========================================
  {
    id: 'ward-1-mark-signoretti',
    name: 'Mark Signoretti',
    race: 1,
    status: 'Incumbent',
    nominationStatus: 'Certified',
    occupation: 'City Councillor (Ward 1, 2014–Present) / Financial Advisor',
    keyPillars: [
      'Fiscal Accountability & Budget Restraint',
      'West End & Copper Cliff Road Resurfacing',
      'Traffic Calming & Neighbourhood Safety'
    ],
    bio: 'Serving Ward 1 since 2014. Filed May 22, 2026. Consistent advocate for taxpayer value, maintaining Copper Cliff municipal assets, and neighbourhood park upgrades.',
    socialLinks: [{ platform: 'website', url: 'mailto:votemarksignoretti@gmail.com' }],
    liveVotes: 2380,
    liveVotePct: 51.4,
    isProjectedWinner: true
  },
  {
    id: 'ward-1-william-cable',
    name: 'William Cable',
    race: 1,
    status: 'Challenger',
    nominationStatus: 'Certified',
    occupation: 'Community Advocate & West End Resident',
    keyPillars: [
      'Active Transportation & Safe Sidewalks',
      'Junction Creek Environmental Stewardship',
      'Small Business Growth in Lorne & Regent Corridors'
    ],
    bio: 'West End resident and community volunteer. Filed May 15, 2026. Campaigning on pedestrian safety, park revitalization, and transparent constituent outreach.',
    websiteUrl: 'https://www.willcableward1.ca',
    socialLinks: [{ platform: 'website', url: 'https://www.willcableward1.ca' }],
    liveVotes: 1610,
    liveVotePct: 34.8,
    isProjectedWinner: false
  },
  {
    id: 'ward-1-tysen-galoni',
    name: 'Tysen Galoni',
    race: 1,
    status: 'Challenger',
    nominationStatus: 'Certified',
    occupation: 'Community Contender & Youth Sports Organizer',
    keyPillars: [
      'Youth & Senior Recreation Access',
      'Local Infrastructure Repair',
      'Responsive Constituent Representation'
    ],
    bio: 'Filed August 21, 2026. Campaigning on energetic neighbourhood advocacy and improved municipal service response times across Ward 1.',
    liveVotes: 640,
    liveVotePct: 13.8,
    isProjectedWinner: false
  },

  // ==========================================
  // Ward 2 (Walden, Lively, Waters, Beaver Lake)
  // ==========================================
  {
    id: 'ward-2-eric-benoit',
    name: 'Eric Benoit',
    race: 2,
    status: 'Incumbent',
    nominationStatus: 'Certified',
    occupation: 'City Councillor (Ward 2, 2022–Present) / Engineering Technologist',
    keyPillars: [
      'Walden Community Centre & Leisure Facilities',
      'Rural Road Resurfacing & Ditching Programs',
      'Volunteer Fire Hall & Paramedic Resourcing'
    ],
    bio: 'Elected in 2022 following service as engineering technologist. Filed May 4, 2026. Focuses on rural road equity, municipal water protection, and active constituent communication.',
    liveVotes: 2540,
    liveVotePct: 48.4,
    isProjectedWinner: true
  },
  {
    id: 'ward-2-christel-brandle',
    name: 'Christel Brandle',
    race: 2,
    status: 'Challenger',
    nominationStatus: 'Certified',
    occupation: 'Healthcare Professional & Community Organizer',
    keyPillars: [
      'Rural Transit & Senior Mobility',
      'Emergency Response Times in Beaver Lake / Whitefish',
      'Environmental Protection of Fairbank & Vermilion Watersheds'
    ],
    bio: 'Lively resident and healthcare worker bringing frontline community care experience and rural service advocacy to council.',
    liveVotes: 1180,
    liveVotePct: 22.5,
    isProjectedWinner: false
  },
  {
    id: 'ward-2-dan-xilon',
    name: 'Dan Xilon',
    race: 2,
    status: 'Challenger',
    nominationStatus: 'Certified',
    occupation: 'Former Food Bank Executive Director & Civic Leader',
    keyPillars: [
      'Poverty Reduction & Food Security Support',
      'Responsible Capital Budget Allocation',
      'Outlying Community Equity'
    ],
    bio: 'Prominent community builder and former long-time executive director of the Banque d’aliments Sudbury Food Bank, focusing on social infrastructure and prudent spending.',
    liveVotes: 790,
    liveVotePct: 15.1,
    isProjectedWinner: false
  },
  {
    id: 'ward-2-glen-duffy',
    name: 'Glen Duffy',
    race: 2,
    status: 'Challenger',
    nominationStatus: 'Certified',
    occupation: 'Walden Resident & Industrial Safety Specialist',
    keyPillars: [
      'Municipal Road 55 Corridor Safety & Resurfacing',
      'Walden Senior Recreational Facility Upgrades',
      'Fiscal Accountability on Major Projects'
    ],
    bio: 'Walden resident and industrial health and safety specialist advocating for high-quality rural roads, emergency response support, and responsible tax rates.',
    liveVotes: 440,
    liveVotePct: 8.4,
    isProjectedWinner: false
  },
  {
    id: 'ward-2-tracy-oost',
    name: 'Tracy Oost',
    race: 2,
    status: 'Challenger',
    nominationStatus: 'Certified',
    occupation: 'Forensic Entomologist & Environmental Educator',
    keyPillars: [
      'Vermilion & Fairbank Watershed Ecological Conservation',
      'Rural Broadband & Transparent Municipal Engagement',
      'Community Park Safety in Beaver Lake & Whitefish'
    ],
    bio: 'Forensic scientist and educator campaigning on strong environmental oversight, watershed conservation, and empowering rural residents across Ward 2.',
    liveVotes: 295,
    liveVotePct: 5.6,
    isProjectedWinner: false
  },

  // ==========================================
  // Ward 3 (Chelmsford, Azilda, Rayside-Balfour)
  // ==========================================
  {
    id: 'ward-3-michel-brabant',
    name: 'Michel Brabant',
    race: 3,
    status: 'Incumbent',
    nominationStatus: 'Certified',
    occupation: 'City Councillor (Ward 3) / Military Veteran (24 Years)',
    keyPillars: [
      'Whitson River Trail & Chelmsford Core Upgrades',
      'Agricultural Land Protection & Drainage',
      'Bilingual Community Services in Rayside-Balfour'
    ],
    bio: 'Sworn in to represent Ward 3 in March 2024 following the passing of Gerry Montpellier; 2022 election runner-up. Filed May 13, 2026. 24-year Canadian Forces veteran dedicated to Chelmsford and Azilda residents.',
    liveVotes: 2390,
    liveVotePct: 47.5,
    isProjectedWinner: true
  },
  {
    id: 'ward-3-marcel-montpellier',
    name: 'Marcel Montpellier',
    race: 3,
    status: 'Challenger',
    nominationStatus: 'Certified',
    occupation: 'Rayside-Balfour Community Advocate & Former School Board Trustee Candidate',
    keyPillars: [
      'Agricultural Land Drainage & Rural Roads Equity',
      'Whitson River Flood Prevention & Trail Enhancements',
      'Accountable Voice for Chelmsford & Azilda Families'
    ],
    bio: 'Lifelong Rayside-Balfour resident and community advocate carrying forward a deep dedication to Ward 3. Certified candidate on the official City Clerk list, championing rural road standards and responsive constituent communication.',
    liveVotes: 1480,
    liveVotePct: 29.4,
    isProjectedWinner: false
  },
  {
    id: 'ward-3-devin-white',
    name: 'Devin White',
    race: 3,
    status: 'Challenger',
    nominationStatus: 'Certified',
    occupation: 'Small Business Proprietor & Community Volunteer',
    keyPillars: [
      'Lowering Commercial Taxes in Rayside-Balfour',
      'Youth Sports Facilities & Arena Modernization',
      'Flood Mitigation on Whitson Lake'
    ],
    bio: 'Local entrepreneur and active Rayside-Balfour volunteer advocating for commercial revitalization and infrastructure investments in Azilda and Chelmsford.',
    liveVotes: 1160,
    liveVotePct: 23.1,
    isProjectedWinner: false
  },

  // ==========================================
  // Ward 4 (Donovan, Elm West, Gatchell)
  // ==========================================
  {
    id: 'ward-4-pauline-fortin',
    name: 'Pauline Fortin',
    race: 4,
    status: 'Incumbent',
    nominationStatus: 'Certified',
    occupation: 'City Councillor (Ward 4, 2022–Present) / Real Estate Broker',
    keyPillars: [
      'Kathleen Street Commercial Revitalization',
      'Neighbourhood Safety & Proactive Crime Prevention',
      'Infill Housing & Road Resurfacing'
    ],
    bio: 'Elected in 2022. Filed May 1, 2026. Real estate broker actively championing urban revitalization, small business support, and street safety in the Donovan and Elm West.',
    liveVotes: 2420,
    liveVotePct: 57.8,
    isProjectedWinner: true
  },
  {
    id: 'ward-4-vincent-bolt',
    name: 'Vincent Bolt',
    race: 4,
    status: 'Challenger',
    nominationStatus: 'Certified',
    occupation: 'Community Educator & Inclusion Specialist',
    keyPillars: [
      'Affordable Housing & Tenant Protections',
      'Active Transportation Corridors on Beatty & Elm',
      'Accessible Parks & Community Spaces'
    ],
    bio: 'Community educator and inclusion consultant campaigning on social equity, expanding active transit links, and supporting core neighborhood community programs.',
    liveVotes: 1765,
    liveVotePct: 42.2,
    isProjectedWinner: false
  },

  // ==========================================
  // Ward 5 (Sudbury North, Cambrian, New Sudbury West)
  // ==========================================
  {
    id: 'ward-5-mike-parent',
    name: 'Mike Parent',
    race: 5,
    status: 'Incumbent',
    nominationStatus: 'Certified',
    occupation: 'City Councillor & Deputy Mayor (Ward 5, 2022–Present) / Mining Safety Executive',
    keyPillars: [
      'Lasalle Boulevard Corridor Upgrades & Traffic Safety',
      'Municipal Asset Management & Taxpayer Value',
      'Mining Innovation & Skilled Trades Promotion'
    ],
    bio: 'Elected in 2022 and appointed Deputy Mayor. Filed May 1, 2026. Former mining safety executive focusing on rigorous municipal asset planning and community safety.',
    liveVotes: 2980,
    liveVotePct: 64.2,
    isProjectedWinner: true
  },
  {
    id: 'ward-5-roger-trottier',
    name: 'Roger Trottier',
    race: 5,
    status: 'Challenger',
    nominationStatus: 'Certified',
    occupation: 'Retired Public Servant & Community Volunteer',
    keyPillars: [
      'Transit Route Optimization for Cambrian College',
      'Enhanced Snow Clearing Standards',
      'Local Playground & Park Upgrades'
    ],
    bio: 'Longtime Ward 5 resident and community volunteer focusing on transit reliability for students and seniors and neighborhood park renewal.',
    liveVotes: 1660,
    liveVotePct: 35.8,
    isProjectedWinner: false
  },

  // ==========================================
  // Ward 6 (Hanmer, Val Thérèse, Valley East)
  // ==========================================
  {
    id: 'ward-6-rene-lapierre',
    name: 'René Lapierre',
    race: 6,
    status: 'Incumbent',
    nominationStatus: 'Certified',
    occupation: 'City Councillor (Ward 6, 2014–Present) / Paramedic Professor',
    keyPillars: [
      'Howard Armstrong Recreation Centre Modernization',
      'Valley East Emergency Services & Paramedic Hubs',
      'Municipal Road 80 / Regional Connector Resurfacing'
    ],
    bio: 'Representing Valley East on council since 2014. Filed May 4, 2026. Paramedic educator with extensive governance background in public health and emergency preparedness.',
    liveVotes: 2320,
    liveVotePct: 47.4,
    isProjectedWinner: true
  },
  {
    id: 'ward-6-dan-boulard',
    name: 'Dan Boulard',
    race: 6,
    status: 'Challenger',
    nominationStatus: 'Certified',
    occupation: 'Valley East Contractor & Heavy Equipment Specialist',
    keyPillars: [
      'Fair Capital Spending for Outlying Towns',
      'Commercial Park Expansion in Hanmer',
      'Lower Municipal Fees for Local Builds'
    ],
    bio: 'Hanmer contractor and community advocate advocating for equitable municipal capital funding and localized road work in Valley East.',
    liveVotes: 1540,
    liveVotePct: 31.5,
    isProjectedWinner: false
  },
  {
    id: 'ward-6-keegan-dutrisac',
    name: 'Keegan Dutrisac',
    race: 6,
    status: 'Challenger',
    nominationStatus: 'Certified',
    occupation: 'Valley East Youth Sports Organizer & Community Advocate',
    keyPillars: [
      'Howard Armstrong Sports Complex & Youth Ice Upgrades',
      'Rural Ditching & MR 80 Safety Improvements',
      'Accountable Municipal Budget Allocation'
    ],
    bio: 'Valley East community advocate and sports organizer campaigning on expanding recreational amenities for youth, ensuring equitable road maintenance in Hanmer and Val Thérèse, and fiscal discipline.',
    liveVotes: 1030,
    liveVotePct: 21.1,
    isProjectedWinner: false
  },

  // ==========================================
  // Ward 7 (Garson, Falconbridge, Skead, Capreol)
  // ==========================================
  {
    id: 'ward-7-natalie-labbee',
    name: 'Natalie Labbée',
    race: 7,
    status: 'Incumbent',
    nominationStatus: 'Certified',
    occupation: 'City Councillor (Ward 7, 2022–Present) / Non-Profit Director',
    keyPillars: [
      'Airport & Skead Road Arterial Modernization',
      'Falconbridge & Capreol Community Asset Preservation',
      'Support for Volunteer Fire Stations & Local Recreation'
    ],
    bio: 'Elected in 2022. Filed May 1, 2026. Active constituent representative hosting regular town halls across Garson, Falconbridge, Skead, and Capreol.',
    liveVotes: 2450,
    liveVotePct: 49.3,
    isProjectedWinner: true
  },
  {
    id: 'ward-7-aaron-walsh',
    name: 'Aaron Walsh',
    race: 7,
    status: 'Challenger',
    nominationStatus: 'Certified',
    occupation: 'Community Broadcaster & Small Business Owner',
    keyPillars: [
      'Autonomous Representation for Outlying Communities',
      'Skead Road Pavement Integrity & Rail Corridor Safety',
      'Fiscal Accountability & Property Tax Relief for Seniors'
    ],
    bio: 'Local broadcaster and small business owner. Filed August 20, 2026. Campaigning under the banner of strong independent representation for Capreol, Skead, Garson, and Falconbridge.',
    websiteUrl: 'https://electaaron.ca',
    socialLinks: [
      { platform: 'website', url: 'https://electaaron.ca' },
      { platform: 'facebook', url: 'https://facebook.com/electaaronwalsh' }
    ],
    liveVotes: 1530,
    liveVotePct: 30.8,
    isProjectedWinner: false
  },
  {
    id: 'ward-7-dave-rajotte',
    name: 'Dave Rajotte',
    race: 7,
    status: 'Challenger',
    nominationStatus: 'Certified',
    occupation: 'Public Sector Specialist & Capreol Community Organizer',
    keyPillars: [
      'Capreol Rail Heritage & Arena Funding',
      'Accelerated Culvert & Road Maintenance',
      'Enhanced Volunteer Emergency Responder Resources'
    ],
    bio: 'Capreol community organizer focusing on rural municipal equity, maintaining local recreation centres, and improving road safety in outlying wards.',
    liveVotes: 990,
    liveVotePct: 19.9,
    isProjectedWinner: false
  },

  // ==========================================
  // Ward 8 (New Sudbury East, Twin Forks, Maley)
  // ==========================================
  {
    id: 'ward-8-george-lalonde',
    name: 'George Lalonde',
    race: 8,
    status: 'Challenger',
    nominationStatus: 'Certified',
    occupation: 'Community Volunteer & Retired Municipal Operations Supervisor',
    keyPillars: [
      'Twin Forks Community Complex Renewal',
      'Barrydowne & Lasalle Corridor Traffic Calming',
      'Prudent Infrastructure Spending'
    ],
    bio: 'Filed May 8, 2026. Retired municipal operations supervisor bringing decades of practical infrastructure experience to council following Al Sizer’s retirement.',
    liveVotes: 2150,
    liveVotePct: 44.5,
    isProjectedWinner: true
  },
  {
    id: 'ward-8-karanbir-badhesha',
    name: 'Karanbir Badhesha',
    race: 8,
    status: 'Challenger',
    nominationStatus: 'Certified',
    occupation: 'Local Entrepreneur & Youth Sports Mentor',
    keyPillars: [
      'Small Business Infill on Barrydowne',
      'Pedestrian Crossings on Lasalle East',
      'Youth Leadership & Sports Opportunities'
    ],
    bio: 'New Sudbury business owner and mentor campaigning on vibrant commercial hubs and safe walking corridors for families.',
    liveVotes: 1320,
    liveVotePct: 27.3,
    isProjectedWinner: false
  },
  {
    id: 'ward-8-shawn-rossi',
    name: 'Shawn Rossi',
    race: 8,
    status: 'Challenger',
    nominationStatus: 'Certified',
    occupation: 'Logistics Coordinator & Neighborhood Advocate',
    keyPillars: [
      'Maley Drive Extension Phase 2 Oversight',
      'Park Playground Safety',
      'Transparent Budgeting'
    ],
    bio: 'Neighborhood advocate campaigning on disciplined capital expenditure and enhanced green spaces in New Sudbury East.',
    liveVotes: 850,
    liveVotePct: 17.6,
    isProjectedWinner: false
  },
  {
    id: 'ward-8-carla-ross-arsenault',
    name: 'Carla Ross-Arsenault',
    race: 8,
    status: 'Challenger',
    nominationStatus: 'Certified',
    occupation: 'Community Volunteer & Healthcare Professional',
    keyPillars: [
      'Senior Health & Community Outreach in New Sudbury',
      'Twin Forks Playground Infrastructure',
      'Transparent Municipal Spending'
    ],
    bio: 'Healthcare professional and New Sudbury community volunteer focusing on seniors wellness, park accessibility, and open municipal budgeting.',
    liveVotes: 610,
    liveVotePct: 12.6,
    isProjectedWinner: false
  },
  {
    id: 'ward-8-natalie-tessier',
    name: 'Natalie Tessier',
    race: 8,
    status: 'Challenger',
    nominationStatus: 'Certified',
    occupation: 'Local Educator & Neighbourhood Safety Advocate',
    keyPillars: [
      'Lasalle Boulevard Pedestrian & Traffic Safety',
      'Youth Recreational Spaces & Park Renewal',
      'Responsive Constituent Representation'
    ],
    bio: 'Educator and New Sudbury resident campaigning on safer school walking routes, revitalizing neighbourhood green spaces, and prompt resident communication.',
    liveVotes: 420,
    liveVotePct: 8.7,
    isProjectedWinner: false
  },

  // ==========================================
  // Ward 9 (South End, Lo-Ellen, Long Lake, Coniston)
  // ==========================================
  {
    id: 'ward-9-shawn-poland',
    name: 'Shawn Poland',
    race: 9,
    status: 'New Candidate',
    nominationStatus: 'Certified',
    occupation: 'VP Strategic Enrolment (Cambrian College) / Former Police Services Board Chair',
    keyPillars: [
      'Responsible Urban Growth & Regent/Long Lake Arterial Planning',
      'Ramsey Lake & Long Lake Watershed Protection',
      'Coniston Community Infill & Economic Development'
    ],
    bio: 'Vice President at Cambrian College and former Interim President; former Chair of the Greater Sudbury Police Services Board. Filed May 1, 2026. Campaigning on collaborative leadership, fiscal stewardship, and strong neighborhoods.',
    websiteUrl: 'https://shawnforsudbury.ca',
    socialLinks: [
      { platform: 'website', url: 'https://shawnforsudbury.ca' }
    ],
    liveVotes: 2680,
    liveVotePct: 48.7,
    isProjectedWinner: true
  },
  {
    id: 'ward-9-carly-gasparini',
    name: 'Carly Gasparini',
    race: 9,
    status: 'New Candidate',
    nominationStatus: 'Certified',
    occupation: 'Community Leader & Social Innovation Strategist',
    keyPillars: [
      'Active Transportation Networks & Trail Connectivity',
      'Affordable Housing Partnerships',
      'Environmental Conservation around South End Lakes'
    ],
    bio: 'Non-profit leader and social innovator focusing on sustainable urban planning, community health, and connecting South End neighborhoods with active trails.',
    liveVotes: 1420,
    liveVotePct: 25.8,
    isProjectedWinner: false
  },
  {
    id: 'ward-9-eddie-astgen',
    name: 'Eddie Astgen',
    race: 9,
    status: 'New Candidate',
    nominationStatus: 'Certified',
    occupation: 'Local Business Operator & Long Lake Resident',
    keyPillars: [
      'Four-Laning Regent Street South Bottlenecks',
      'Small Business Permitting Reform',
      'Coniston Industrial Park Expansion'
    ],
    bio: 'South End entrepreneur focusing on traffic decongestion along Regent South, business red-tape reduction, and supporting Coniston community projects.',
    liveVotes: 730,
    liveVotePct: 13.3,
    isProjectedWinner: false
  },
  {
    id: 'ward-9-wanda-berton-heyerichs',
    name: 'Wanda Berton-Heyerichs',
    race: 9,
    status: 'New Candidate',
    nominationStatus: 'Certified',
    occupation: 'Civic Reform Advocate & Community Volunteer',
    keyPillars: [
      'Long Lake Road Resurfacing & Arterial Traffic Safety',
      'Coniston Arena and Youth Sports Reinvestment',
      'Taxpayer Value & Council Accountability'
    ],
    bio: 'Long Lake resident and community volunteer campaigning for prioritized roadway rehabilitation on Long Lake Road, strong support for Coniston community assets, and strict spending controls.',
    liveVotes: 410,
    liveVotePct: 7.5,
    isProjectedWinner: false
  },
  {
    id: 'ward-9-james-borg',
    name: 'James Borg',
    race: 9,
    status: 'New Candidate',
    nominationStatus: 'Certified',
    occupation: 'Local Professional & Environmental Planner',
    keyPillars: [
      'Ramsey Lake Shoreline & Watershed Preservation',
      'Safe Walking & Biking School Corridors in Lo-Ellen',
      'Local Business Partnerships'
    ],
    bio: 'South End resident focusing on protecting watershed health, neighbourhood traffic calming near school zones, and transparent municipal decision-making.',
    liveVotes: 260,
    liveVotePct: 4.7,
    isProjectedWinner: false
  },

  // ==========================================
  // Ward 10 (South End, Lockerby, Robinson, Moonglo)
  // ==========================================
  {
    id: 'ward-10-paul-stopciati',
    name: 'Paul Stopciati',
    race: 10,
    status: 'New Candidate',
    nominationStatus: 'Certified',
    occupation: 'Lifelong Resident / Owner of PES Commercial Cleaning Ltd.',
    keyPillars: [
      'Full-Time Dedicated Councillor Commitment',
      'Prudent Fiscal Management & Zero Special Interest Influence',
      'Paris & Regent Corridor Safety & Lake Ramsey Shoreline Protection'
    ],
    bio: 'Lifelong Greater Sudbury resident and small business owner (PES Commercial Cleaning). Filed May 1, 2026. Pledged to serve as a full-time councillor with a self-funded campaign to represent all Ward 10 residents without compromise.',
    websiteUrl: 'https://electpaulstopciati.ca',
    socialLinks: [
      { platform: 'website', url: 'https://electpaulstopciati.ca' }
    ],
    liveVotes: 2250,
    liveVotePct: 42.1,
    isProjectedWinner: true
  },
  {
    id: 'ward-10-tay-butt',
    name: 'Tay Butt',
    race: 10,
    status: 'New Candidate',
    nominationStatus: 'Certified',
    occupation: 'Professional Engineer & Infrastructure Planner',
    keyPillars: [
      'Engineering Rigor in Capital Road Works',
      'Stormwater Management & Lake Nepahwin Protection',
      'Modern Transit Corridors for Students & Seniors'
    ],
    bio: 'Professional engineer bringing technical expertise in municipal drainage, asset management, and sustainable infill developments in Lockerby and Moonglo.',
    liveVotes: 1100,
    liveVotePct: 20.6,
    isProjectedWinner: false
  },
  {
    id: 'ward-10-derek-young',
    name: 'Derek Young',
    race: 10,
    status: 'New Candidate',
    nominationStatus: 'Certified',
    occupation: 'Arts & Cultural Event Producer / Community Volunteer',
    keyPillars: [
      'Lily Creek & Bell Park Active Trail Links',
      'School Zone Traffic Calming & Speed Enforcement',
      'Community Arts & Seniors Engagement'
    ],
    bio: 'Community arts producer and neighborhood organizer advocating for pedestrian-first street design, school safety, and vibrant public recreational spaces.',
    liveVotes: 720,
    liveVotePct: 13.5,
    isProjectedWinner: false
  },
  {
    id: 'ward-10-suzanne-seiling',
    name: 'Suzanne Seiling',
    race: 10,
    status: 'New Candidate',
    nominationStatus: 'Certified',
    occupation: 'Healthcare Professional & South End Active Transportation Advocate',
    keyPillars: [
      'Lake Nepahwin & Ramsey Environmental Protections',
      'Pedestrian Crossings on Regent & Paris Streets',
      'Responsive Ward 10 Resident Engagement'
    ],
    bio: 'Healthcare professional and neighbourhood advocate dedicated to watershed preservation, safe walkways for families, and open municipal consultations.',
    liveVotes: 480,
    liveVotePct: 9.0,
    isProjectedWinner: false
  },
  {
    id: 'ward-10-cora-demarco',
    name: 'Cora DeMarco',
    race: 10,
    status: 'New Candidate',
    nominationStatus: 'Certified',
    occupation: 'Civic Volunteer & Educational Specialist',
    keyPillars: [
      'Lockerby Neighbourhood Revitalization',
      'Senior Housing Mobility & Transit Connectivity',
      'Prudent Municipal Tax Rate Control'
    ],
    bio: 'Educator and community volunteer focusing on supporting seniors in Lockerby and Moonglo, fiscal transparency, and local community safety.',
    liveVotes: 360,
    liveVotePct: 6.7,
    isProjectedWinner: false
  },
  {
    id: 'ward-10-cathan-pasanen',
    name: 'Cathan Pasanen',
    race: 10,
    status: 'New Candidate',
    nominationStatus: 'Certified',
    occupation: 'Local Business Professional & Youth Sports Organizer',
    keyPillars: [
      'Youth Recreational Facilities & Park Upgrades',
      'Small Business Infill along South Regent',
      'Road Maintenance Accountability'
    ],
    bio: 'Local business professional and youth sports volunteer advocating for high-standard road maintenance, recreational parks, and community revitalization.',
    liveVotes: 240,
    liveVotePct: 4.5,
    isProjectedWinner: false
  },
  {
    id: 'ward-10-trinity-mary-hollis',
    name: 'Trinity Mary Hollis',
    race: 10,
    status: 'New Candidate',
    nominationStatus: 'Certified',
    occupation: 'Community Organizer & Environmental Studies Researcher',
    keyPillars: [
      'Ecological Sustainability & Urban Canopy Expansion',
      'Transparent Council Decision-Making',
      'Safe Multi-Use Cycling Infrastructure'
    ],
    bio: 'Community organizer championing green corridors, ecological lake protection, and transparent grassroots engagement in city hall decisions.',
    liveVotes: 190,
    liveVotePct: 3.6,
    isProjectedWinner: false
  },

  // ==========================================
  // Ward 11 (Minnow Lake, Adamsdale, Moonlight Beach)
  // ==========================================
  {
    id: 'ward-11-bill-leduc',
    name: 'Bill Leduc',
    race: 11,
    status: 'Incumbent',
    nominationStatus: 'Certified',
    occupation: 'City Councillor (Ward 11, 2018–Present) / Real Estate Specialist',
    keyPillars: [
      'Howey Drive & Bellevue Infrastructure Upgrades',
      'Minnow Lake Boardwalk & Park Enhancements',
      'Senior Citizen Transit Subsidies & Community Events'
    ],
    bio: 'Serving Minnow Lake and Moonlight Beach since 2018. Championing local park enhancements, neighbourhood cleanups, and senior citizen services.',
    liveVotes: 1980,
    liveVotePct: 39.2,
    isProjectedWinner: true
  },
  {
    id: 'ward-11-daniel-larocque',
    name: 'Daniel Larocque',
    race: 11,
    status: 'Challenger',
    nominationStatus: 'Certified',
    occupation: 'Small Business Owner (BBQ Spice Co.) & Community Advocate',
    keyPillars: [
      'Fixing Crumbling Ward 11 Roads & Traffic Calming',
      'Cutting Municipal Red Tape for Local Businesses',
      'Restoring Integrity, Loyalty & Transparency to Council'
    ],
    bio: 'Local entrepreneur and small business owner. Filed May 1, 2026. Campaigning to bring honest, accessible representation and urgent infrastructure repair to Minnow Lake.',
    liveVotes: 1050,
    liveVotePct: 20.8,
    isProjectedWinner: false
  },
  {
    id: 'ward-11-mike-bleskie',
    name: 'Mike Bleskie',
    race: 11,
    status: 'Challenger',
    nominationStatus: 'Certified',
    occupation: 'Former City Communications Specialist / Non-Profit Director',
    keyPillars: [
      'Year-Round Proactive Constituent Engagement',
      'Minnow Lake Ecological Remediation',
      'Smart Community Wealth & Targeted Local Investments'
    ],
    bio: 'Former City of Greater Sudbury communications professional and non-profit strategist with a Master’s in Political Management. Filed August 14, 2026.',
    websiteUrl: 'https://bleskie.ca',
    socialLinks: [
      { platform: 'website', url: 'https://bleskie.ca' }
    ],
    liveVotes: 780,
    liveVotePct: 15.4,
    isProjectedWinner: false
  },
  {
    id: 'ward-11-robert-rovinelli',
    name: 'Robert Rovinelli',
    race: 11,
    status: 'Challenger',
    nominationStatus: 'Certified',
    occupation: 'Minnow Lake Resident, Business Owner & Civic Volunteer',
    keyPillars: [
      'Howey Drive & Bellevue Avenue Reconstruction Standards',
      'Minnow Lake Natural Area Conservation',
      'Transparent Municipal Budget Oversight'
    ],
    bio: 'Minnow Lake resident and small business owner certified on the official City Clerk roster. Focused on delivering reliable road reconstruction, preserving neighborhood greenspaces, and ensuring practical fiscal management.',
    liveVotes: 420,
    liveVotePct: 8.3,
    isProjectedWinner: false
  },
  {
    id: 'ward-11-shawn-ouimet',
    name: 'Shawn Ouimet',
    race: 11,
    status: 'Challenger',
    nominationStatus: 'Certified',
    occupation: 'Local Trades Professional & Minnow Lake Resident',
    keyPillars: [
      'Bellevue & Bancroft Road Surface Quality',
      'Minnow Lake Park & Recreation Infrastructure',
      'Fiscal Accountability & Transparent City Governance'
    ],
    bio: 'Minnow Lake resident and skilled tradesperson campaigning for high road construction standards, community park enhancements, and accountable council representation.',
    liveVotes: 310,
    liveVotePct: 6.1,
    isProjectedWinner: false
  },
  {
    id: 'ward-11-roxanne-tessier',
    name: 'Roxanne Tessier',
    race: 11,
    status: 'Challenger',
    nominationStatus: 'Certified',
    occupation: 'Community Educator & Neighbourhood Safety Advocate',
    keyPillars: [
      'Safe Walking School Zones & Traffic Calming',
      'Minnow Lake Seniors Programs & Community Hub Access',
      'Responsible Tax Dollar Allocation'
    ],
    bio: 'Minnow Lake educator and community advocate certified on the official candidate list. Championing pedestrian and school zone safety, accessible senior services, and open neighborhood consultations.',
    liveVotes: 290,
    liveVotePct: 5.7,
    isProjectedWinner: false
  },
  {
    id: 'ward-11-amy-voz',
    name: 'Amy Voz',
    race: 11,
    status: 'Challenger',
    nominationStatus: 'Certified',
    occupation: 'Non-Profit Community Organizer & Active Transit Supporter',
    keyPillars: [
      'Moonlight Beach Ecosystem Preservation & Trail Upgrades',
      'Accessible Transit Connections for Minnow Lake & Adamsdale',
      'Grassroots Community Engagement'
    ],
    bio: 'Minnow Lake community organizer and non-profit advocate certified by the City Clerk. Campaigning on protecting the Moonlight Beach natural corridor, expanding youth recreation, and enhancing local transit routes.',
    liveVotes: 220,
    liveVotePct: 4.4,
    isProjectedWinner: false
  },

  // ==========================================
  // Ward 12 (Flour Mill, Downtown, Bell Park, Kingsmount)
  // ==========================================
  {
    id: 'ward-12-matteo-raso',
    name: 'Matteo Raso',
    race: 12,
    status: 'New Candidate',
    nominationStatus: 'Certified',
    occupation: 'Civic Campaign Organizer & Housing Affordability Advocate',
    keyPillars: [
      'Expanding Affordable Housing Supply & Cutting Red Tape',
      'Downtown Safety & Social Infrastructure Support',
      'Flour Mill Heritage & Community Renewal'
    ],
    bio: 'Housing affordability advocate and community organizer. Filed June 10, 2026. Dedicated to accelerating residential infill, making Sudbury safer and more affordable, and supporting downtown merchants.',
    websiteUrl: 'https://matteoraso.ca',
    socialLinks: [
      { platform: 'website', url: 'https://matteoraso.ca' }
    ],
    liveVotes: 2120,
    liveVotePct: 43.2,
    isProjectedWinner: true
  },
  {
    id: 'ward-12-jeff-macintyre',
    name: 'Jeff MacIntyre',
    race: 12,
    status: 'New Candidate',
    nominationStatus: 'Certified',
    occupation: 'Former Downtown BIA Chair & Small Business Owner',
    keyPillars: [
      'Downtown Arts, Entertainment & Events District Integration',
      'Pedestrian-Friendly Elm & Cedar Streetscapes',
      'Prudent Core Revitalization Investment'
    ],
    bio: 'Longtime downtown business owner and former Downtown Sudbury BIA chair, bringing deep urban core planning and commercial revitalization expertise.',
    websiteUrl: 'https://www.jeffmacintyre.ca',
    socialLinks: [
      { platform: 'website', url: 'https://www.jeffmacintyre.ca' }
    ],
    liveVotes: 1390,
    liveVotePct: 28.3,
    isProjectedWinner: false
  },
  {
    id: 'ward-12-ron-goswell',
    name: 'Ron Goswell',
    race: 12,
    status: 'New Candidate',
    nominationStatus: 'Certified',
    occupation: 'Downtown Resident & Community Advocate',
    keyPillars: [
      'Downtown Core Public Safety & Street Lighting',
      'Flour Mill Historic Silos & Trail Connections',
      'Responsible Municipal Taxation'
    ],
    bio: 'Downtown resident and community advocate filed August 7, 2026. Campaigning for enhanced urban cleanliness, downtown street safety, and sensible municipal taxation.',
    liveVotes: 620,
    liveVotePct: 12.6,
    isProjectedWinner: false
  },
  {
    id: 'ward-12-colin-mckerral',
    name: 'Colin McKerral',
    race: 12,
    status: 'New Candidate',
    nominationStatus: 'Certified',
    occupation: 'Civic Reformer & Small Business Supporter',
    keyPillars: [
      'Affordable Housing Infill & Streamlined Permitting',
      'Pedestrian & Cycling Trail Interconnectivity',
      'Transparent Council Decision-Making'
    ],
    bio: 'Sudbury civic reformer filed August 13, 2026. Advocating for transparent municipal governance, expanding affordable housing infill, and active transit corridors.',
    liveVotes: 450,
    liveVotePct: 9.2,
    isProjectedWinner: false
  },
  {
    id: 'ward-12-linnet-rimmer',
    name: 'Linnet Rimmer',
    race: 12,
    status: 'New Candidate',
    nominationStatus: 'Certified',
    occupation: 'Community Volunteer & Social Services Advocate',
    keyPillars: [
      'Frontline Mental Health & Shelter Coordination',
      'Bell Park Green Space & Waterfront Conservation',
      'Bilingual Community Services for Seniors'
    ],
    bio: 'Social services volunteer and neighborhood organizer filed August 21, 2026. Focusing on compassionate community care, downtown revitalization, and Bell Park preservation.',
    liveVotes: 330,
    liveVotePct: 6.7,
    isProjectedWinner: false
  }
];

// 2026 Debates & Public Town Halls Schedule
export const DEBATES_2026: DebateEvent2026[] = [
  {
    id: 'debate-1',
    title: 'Greater Sudbury Chamber of Commerce Mayoral Gala Debate',
    organizer: 'Greater Sudbury Chamber of Commerce',
    date: 'Thursday, October 1, 2026',
    time: '7:00 PM – 9:30 PM EDT',
    location: 'Fraser Auditorium, Laurentian University (935 Ramsey Lake Rd)',
    raceScope: 'Mayoral',
    description: 'The premier mayoral debate of the election cycle focusing on municipal taxation, business growth, downtown redevelopment, and infrastructure delivery.',
    isLivestreamed: true
  },
  {
    id: 'debate-2',
    title: 'Valley East All-Candidates Night (Wards 5 & 6)',
    organizer: 'Valley East Community Action Network (CAN)',
    date: 'Tuesday, October 6, 2026',
    time: '6:30 PM – 8:30 PM EDT',
    location: 'Howard Armstrong Recreation Centre, Hanmer',
    raceScope: 'Ward All-Candidates',
    description: 'Open community forum with questions on recreational facilities, EMS response times, and road maintenance in Hanmer, Val Thérèse, and surrounding neighborhoods.',
    isLivestreamed: true
  },
  {
    id: 'debate-3',
    title: 'Walden & Copper Cliff Candidates Forum (Wards 1 & 2)',
    organizer: 'Walden & Copper Cliff Community Action Group',
    date: 'Thursday, October 8, 2026',
    time: '7:00 PM – 9:00 PM EDT',
    location: 'T.M. Davies Community Centre & Arena, Lively',
    raceScope: 'Ward All-Candidates',
    description: 'Public town hall addressing rural transit availability, municipal water protection, volunteer firefighting infrastructure, and local arena upgrades.',
    isLivestreamed: false
  },
  {
    id: 'debate-4',
    title: 'Capreol & Garson Candidates Night (Ward 7)',
    organizer: 'Capreol & Garson Community Action Network',
    date: 'Friday, October 9, 2026',
    time: '7:00 PM – 9:00 PM EDT',
    location: 'Capreol Community Centre & Arena (MCR Room)',
    raceScope: 'Ward All-Candidates',
    description: 'Ward 7 candidates discuss Skead Road conditions, Capreol recreation funding, airport arterial links, and rural volunteer firefighting support.',
    isLivestreamed: true
  },
  {
    id: 'debate-5',
    title: 'South End & Minnow Lake Civic Forum (Wards 9, 10 & 11)',
    organizer: 'South End & Minnow Lake Neighborhood Associations',
    date: 'Tuesday, October 13, 2026',
    time: '6:30 PM – 9:00 PM EDT',
    location: 'Gerry McCrory Countryside Sports Complex, Sudbury',
    raceScope: 'Ward All-Candidates',
    description: 'Candidates will tackle Lake Ramsey conservation, four-lane artery expansions, Paris Street corridor planning, and active transportation trails.',
    isLivestreamed: true
  }
];

// Interactive Ward Finder Dictionary
export const WARD_LOOKUP_ENTRIES: WardLookupEntry[] = [
  {
    wardNumber: 1,
    wardName: 'West End, Copper Cliff, Robinson (Part)',
    neighborhoods: ['West End', 'Copper Cliff', 'Little Britain', 'Robinson (North)', 'Gatchell (Part)', 'Kelly Lake Road'],
    postalCodePrefixes: ['P3C', 'P3Y', 'P0M 1N0'],
    keyStreets: ['Regent Street North', 'Balsam Street', 'Power Street', 'Godfrey Drive', 'Lorne Street'],
    incumbentName: 'Mark Signoretti',
    historicalTurnoutAvg: 48.6,
    registeredVotersEst: 11200
  },
  {
    wardNumber: 2,
    wardName: 'Walden, Lively, Waters, Beaver Lake',
    neighborhoods: ['Lively', 'Walden', 'Naughton', 'Waters', 'Beaver Lake', 'Whitefish', 'Worthington'],
    postalCodePrefixes: ['P3Y', 'P0M 2E0', 'P0M 3G0', 'P0M 2A0'],
    keyStreets: ['Municipal Road 55', 'Main Street (Lively)', 'Black Lake Road', 'Fairbank Lake Road'],
    incumbentName: 'Eric Benoit',
    historicalTurnoutAvg: 53.4,
    registeredVotersEst: 10850
  },
  {
    wardNumber: 3,
    wardName: 'Chelmsford, Azilda, Rayside-Balfour',
    neighborhoods: ['Chelmsford', 'Azilda', 'Rayside-Balfour', 'Whitewater Lake', 'Vermilion Lake'],
    postalCodePrefixes: ['P0M 1L0', 'P0M 1B0', 'P3Y'],
    keyStreets: ['Highway 144', 'Main Street (Chelmsford)', 'St. Joseph Street', 'Notre Dame Street (Azilda)'],
    incumbentName: 'Michel Brabant',
    historicalTurnoutAvg: 47.8,
    registeredVotersEst: 11400
  },
  {
    wardNumber: 4,
    wardName: 'Donovan, Elm West, Gatchell',
    neighborhoods: ['The Donovan', 'Elm West', 'Gatchell', 'Kathleen Street', 'Beatty Street Area'],
    postalCodePrefixes: ['P3C', 'P3E'],
    keyStreets: ['Kathleen Street', 'Elm Street West', 'Frood Road', 'Beatty Street', 'Lorne Street'],
    incumbentName: 'Pauline Fortin',
    historicalTurnoutAvg: 44.2,
    registeredVotersEst: 9950
  },
  {
    wardNumber: 5,
    wardName: 'Sudbury North, Cambrian, New Sudbury West',
    neighborhoods: ['Cambrian Heights', 'Flour Mill (North)', 'New Sudbury (West)', 'Grandview Area', 'Parkwood'],
    postalCodePrefixes: ['P3A', 'P3B', 'P3C'],
    keyStreets: ['Lasalle Boulevard', 'Notre Dame Avenue', 'Barrydowne (North)', 'Cambrian Heights Drive'],
    incumbentName: 'Mike Parent',
    historicalTurnoutAvg: 46.5,
    registeredVotersEst: 10400
  },
  {
    wardNumber: 6,
    wardName: 'Hanmer, Val Thérèse, Valley East',
    neighborhoods: ['Hanmer', 'Val Thérèse', 'Valley East Central', 'Gravel Drive Area', 'Therese Street'],
    postalCodePrefixes: ['P3P', 'P3N'],
    keyStreets: ['Highway 69 North', 'Municipal Road 80', 'Cote Boulevard', 'Dominion Drive'],
    incumbentName: 'René Lapierre',
    historicalTurnoutAvg: 49.3,
    registeredVotersEst: 11100
  },
  {
    wardNumber: 7,
    wardName: 'Garson, Falconbridge, Skead, Capreol',
    neighborhoods: ['Garson', 'Falconbridge', 'Skead', 'Capreol', 'Airport Area', 'Lake Wanapitei'],
    postalCodePrefixes: ['P3L', 'P0M 1H0', 'P0M 1S0', 'P0M 2R0'],
    keyStreets: ['Falconbridge Road', 'Skead Road', 'Capreol Road', 'Church Street', 'O’Neil Drive'],
    incumbentName: 'Natalie Labbée',
    historicalTurnoutAvg: 48.1,
    registeredVotersEst: 10900
  },
  {
    wardNumber: 8,
    wardName: 'New Sudbury East, Twin Forks, Maley',
    neighborhoods: ['New Sudbury (East)', 'Twin Forks', 'Woodbine', 'Madison Avenue', 'Maley Corridor'],
    postalCodePrefixes: ['P3A'],
    keyStreets: ['Lasalle Boulevard East', 'Barrydowne Road', 'Falconbridge Road', 'Maley Drive'],
    incumbentName: 'Al Sizer (Not seeking re-election)',
    historicalTurnoutAvg: 49.8,
    registeredVotersEst: 10750
  },
  {
    wardNumber: 9,
    wardName: 'South End, Lo-Ellen, Long Lake, Coniston',
    neighborhoods: ['South End (East)', 'Lo-Ellen Park', 'Long Lake', 'Coniston', 'Wahnapitae'],
    postalCodePrefixes: ['P3E', 'P3G', 'P0M 1M0', 'P0M 3C0'],
    keyStreets: ['Regent Street South', 'Loach’s Road', 'Long Lake Road', 'Second Avenue (Coniston)', 'Highway 17 East'],
    incumbentName: 'Deb McIntosh (Not seeking re-election)',
    historicalTurnoutAvg: 54.1,
    registeredVotersEst: 11950
  },
  {
    wardNumber: 10,
    wardName: 'South End, Lockerby, Robinson, Moonglo',
    neighborhoods: ['Lockerby', 'Moonglo', 'South End (West)', 'Robinson Lake', 'Regent South', 'Paris South'],
    postalCodePrefixes: ['P3E'],
    keyStreets: ['Paris Street', 'Regent Street', 'Walford Road', 'Nepahwin Avenue', 'Southview Drive'],
    incumbentName: 'Fern Cormier (Not seeking re-election)',
    historicalTurnoutAvg: 55.6,
    registeredVotersEst: 11600
  },
  {
    wardNumber: 11,
    wardName: 'Minnow Lake, Adamsdale, Moonlight',
    neighborhoods: ['Minnow Lake', 'Adamsdale', 'Moonlight Beach', 'Bellevue', 'Ramsey Lake East'],
    postalCodePrefixes: ['P3B', 'P3A'],
    keyStreets: ['Howey Drive', 'Bancroft Drive', 'Bellevue Avenue', 'Moonlight Avenue', 'Kingsway'],
    incumbentName: 'Bill Leduc',
    historicalTurnoutAvg: 47.9,
    registeredVotersEst: 11300
  },
  {
    wardNumber: 12,
    wardName: 'Flour Mill, Downtown, Kingsmount, Bell Park',
    neighborhoods: ['The Flour Mill', 'Downtown Sudbury', 'Bell Park / Hospital Area', 'Kingsmount', 'St. Joseph Area'],
    postalCodePrefixes: ['P3C', 'P3B', 'P3E'],
    keyStreets: ['Notre Dame Avenue', 'Elm Street', 'Larch Street', 'Paris Street (North)', 'Kathleen Street (East)'],
    incumbentName: 'Joscelyne Landry-Altmann (Not seeking re-election)',
    historicalTurnoutAvg: 46.2,
    registeredVotersEst: 10100
  }
];

// Key Milestones & Dates for Greater Sudbury 2026 Election
export const KEY_DATES_2026 = [
  {
    date: 'May 1, 2026',
    title: 'Nomination Period Opened',
    desc: 'Candidates may officially file nomination papers with the City Clerk.',
    completed: true
  },
  {
    date: 'August 21, 2026 (2 PM)',
    title: 'Nomination Day (Filing Deadline)',
    desc: 'Official deadline for all mayoral and councillor candidate filings.',
    completed: true
  },
  {
    date: 'September 2026',
    title: 'Voter Information Letters Dispatched',
    desc: 'City mails personalized PINs and instructions for electronic voting to registered voters.',
    completed: false
  },
  {
    date: 'October 14–25, 2026',
    title: 'Advance Online & Phone Voting Window',
    desc: 'Secure electronic voting opens 24/7 for all eligible Sudbury electors.',
    completed: false
  },
  {
    date: 'October 26, 2026',
    title: 'Official Election Day (10 AM – 8 PM)',
    desc: 'Final polling day with in-person electronic ballot assistance locations across all wards.',
    completed: false,
    isElectionDay: true
  }
];

// Official Withdrawn Filings (as certified by City Clerk Eric Labelle on August 24, 2026)
export const WITHDRAWN_FILINGS_2026 = [
  { office: 'Mayor', candidateName: 'Bill Leduc', notes: 'Withdrew mayoral nomination; filed for Councillor - Ward 11' },
  { office: 'Councillor - Ward 9', candidateName: 'Braden Hill', notes: 'Nomination withdrawn prior to certification' },
  { office: 'Councillor - Ward 11', candidateName: 'George Lalonde', notes: 'Withdrew Ward 11 nomination; filed for Councillor - Ward 8' },
  { office: 'Councillor - Ward 12', candidateName: 'Deborah Josipovic', notes: 'Nomination withdrawn prior to certification' },
  { office: 'Conseil scolaire catholique du Nouvel-Ontario - Zone 4', candidateName: 'Marcel Montpellier', notes: 'Withdrew trustee nomination; filed for Councillor - Ward 3' }
];

// Official Certified & Acclaimed School Board Trustees (Certified August 24, 2026)
export const SCHOOL_BOARD_TRUSTEES_2026: SchoolBoardTrustee2026[] = [
  // Rainbow District School Board (English Public)
  {
    id: 'rdsb-area-1',
    boardName: 'Rainbow District School Board',
    zoneOrArea: 'Area 1',
    candidateName: 'Jessica Montgomery',
    status: 'Acclaimed',
    comments: 'Acclaimed to office'
  },
  {
    id: 'rdsb-area-2',
    boardName: 'Rainbow District School Board',
    zoneOrArea: 'Area 2',
    candidateName: 'Anita Gibson',
    status: 'Acclaimed',
    comments: 'Acclaimed to office'
  },
  {
    id: 'rdsb-area-3-afzal',
    boardName: 'Rainbow District School Board',
    zoneOrArea: 'Area 3',
    candidateName: 'Muhammad Afzal',
    status: 'Certified'
  },
  {
    id: 'rdsb-area-3-carroll',
    boardName: 'Rainbow District School Board',
    zoneOrArea: 'Area 3',
    candidateName: 'Tina Carroll',
    status: 'Certified'
  },
  {
    id: 'rdsb-area-4',
    boardName: 'Rainbow District School Board',
    zoneOrArea: 'Area 4',
    candidateName: 'Mohammed Islam',
    status: 'Acclaimed',
    comments: 'Acclaimed to office'
  },
  {
    id: 'rdsb-area-5',
    boardName: 'Rainbow District School Board',
    zoneOrArea: 'Area 5',
    candidateName: 'David Farrow',
    status: 'Acclaimed',
    comments: 'Acclaimed to office'
  },
  {
    id: 'rdsb-area-6',
    boardName: 'Rainbow District School Board',
    zoneOrArea: 'Area 6',
    candidateName: 'Judy Hunda',
    status: 'Acclaimed',
    comments: 'Acclaimed to office'
  },

  // Sudbury Catholic District School Board (English Catholic)
  {
    id: 'scdsb-zone-1',
    boardName: 'Sudbury Catholic District School Board',
    zoneOrArea: 'Zone 1',
    candidateName: 'Shirley McKnight',
    status: 'Acclaimed',
    comments: 'Acclaimed to office'
  },
  {
    id: 'scdsb-zone-2',
    boardName: 'Sudbury Catholic District School Board',
    zoneOrArea: 'Zone 2',
    candidateName: 'Raymond Desjardins',
    status: 'Acclaimed',
    comments: 'Acclaimed to office'
  },
  {
    id: 'scdsb-zone-3',
    boardName: 'Sudbury Catholic District School Board',
    zoneOrArea: 'Zone 3',
    candidateName: 'Michael Bellmore',
    status: 'Acclaimed',
    comments: 'Acclaimed to office'
  },
  {
    id: 'scdsb-zone-4',
    boardName: 'Sudbury Catholic District School Board',
    zoneOrArea: 'Zone 4',
    candidateName: 'Shannon Gouchie',
    status: 'Acclaimed',
    comments: 'Acclaimed to office'
  },
  {
    id: 'scdsb-zone-5-aube',
    boardName: 'Sudbury Catholic District School Board',
    zoneOrArea: 'Zone 5',
    candidateName: 'Katherine Ann Aube',
    status: 'Certified'
  },
  {
    id: 'scdsb-zone-5-mcfarthing',
    boardName: 'Sudbury Catholic District School Board',
    zoneOrArea: 'Zone 5',
    candidateName: 'Michael McFarthing',
    status: 'Certified'
  },
  {
    id: 'scdsb-zone-5-seguin',
    boardName: 'Sudbury Catholic District School Board',
    zoneOrArea: 'Zone 5',
    candidateName: 'Carmen Seguin',
    status: 'Certified'
  },
  {
    id: 'scdsb-zone-6',
    boardName: 'Sudbury Catholic District School Board',
    zoneOrArea: 'Zone 6',
    candidateName: 'Jody Cameron',
    status: 'Acclaimed',
    comments: 'Acclaimed to office'
  },

  // Conseil scolaire public du Grand Nord de l'Ontario (French Public)
  {
    id: 'cspgno-area-7',
    boardName: "Conseil scolaire public du Grand Nord de l'Ontario",
    zoneOrArea: 'Area 7',
    candidateName: 'Carole G. Anderson',
    status: 'Acclaimed',
    comments: 'Acclaimed to office'
  },
  {
    id: 'cspgno-area-8',
    boardName: "Conseil scolaire public du Grand Nord de l'Ontario",
    zoneOrArea: 'Area 8',
    candidateName: 'Rosine Bongnan',
    status: 'Acclaimed',
    comments: 'Acclaimed to office'
  },
  {
    id: 'cspgno-area-9',
    boardName: "Conseil scolaire public du Grand Nord de l'Ontario",
    zoneOrArea: 'Area 9',
    candidateName: 'Régis Desrochers',
    status: 'Acclaimed',
    comments: 'Acclaimed to office'
  },
  {
    id: 'cspgno-area-10',
    boardName: "Conseil scolaire public du Grand Nord de l'Ontario",
    zoneOrArea: 'Area 10',
    candidateName: 'Andréane Chénier',
    status: 'Acclaimed',
    comments: 'Acclaimed to office'
  },
  {
    id: 'cspgno-area-11',
    boardName: "Conseil scolaire public du Grand Nord de l'Ontario",
    zoneOrArea: 'Area 11',
    candidateName: 'Francine Vaillancourt',
    status: 'Acclaimed',
    comments: 'Acclaimed to office'
  },
  {
    id: 'cspgno-area-12',
    boardName: "Conseil scolaire public du Grand Nord de l'Ontario",
    zoneOrArea: 'Area 12',
    candidateName: 'François Boudreau',
    status: 'Acclaimed',
    comments: 'Acclaimed to office'
  },

  // Conseil scolaire catholique du Nouvel-Ontario (French Catholic)
  {
    id: 'cscno-zone-4-corriveau',
    boardName: 'Conseil scolaire catholique du Nouvel-Ontario',
    zoneOrArea: 'Zone 4',
    candidateName: 'Sydney Corriveau',
    status: 'Certified'
  },
  {
    id: 'cscno-zone-4-dube',
    boardName: 'Conseil scolaire catholique du Nouvel-Ontario',
    zoneOrArea: 'Zone 4',
    candidateName: 'Louise M. Dubé',
    status: 'Certified'
  },
  {
    id: 'cscno-zone-4-essiembre',
    boardName: 'Conseil scolaire catholique du Nouvel-Ontario',
    zoneOrArea: 'Zone 4',
    candidateName: 'Louise Essiembre',
    status: 'Certified'
  },
  {
    id: 'cscno-zone-5-aubin-gagne',
    boardName: 'Conseil scolaire catholique du Nouvel-Ontario',
    zoneOrArea: 'Zone 5',
    candidateName: 'Monique Aubin-Gagné',
    status: 'Certified'
  },
  {
    id: 'cscno-zone-5-bisson',
    boardName: 'Conseil scolaire catholique du Nouvel-Ontario',
    zoneOrArea: 'Zone 5',
    candidateName: 'Josée Roxanne Bisson',
    status: 'Certified'
  },
  {
    id: 'cscno-zone-5-clement',
    boardName: 'Conseil scolaire catholique du Nouvel-Ontario',
    zoneOrArea: 'Zone 5',
    candidateName: 'Stéphane Clément',
    status: 'Certified'
  },
  {
    id: 'cscno-zone-5-joanisse',
    boardName: 'Conseil scolaire catholique du Nouvel-Ontario',
    zoneOrArea: 'Zone 5',
    candidateName: 'Raymond Joanisse',
    status: 'Certified'
  },
  {
    id: 'cscno-zone-6-legault',
    boardName: 'Conseil scolaire catholique du Nouvel-Ontario',
    zoneOrArea: 'Zone 6',
    candidateName: 'Marcel Legault',
    status: 'Acclaimed',
    comments: 'Acclaimed to office'
  },
  {
    id: 'cscno-zone-6-proulx',
    boardName: 'Conseil scolaire catholique du Nouvel-Ontario',
    zoneOrArea: 'Zone 6',
    candidateName: 'Yanick Proulx',
    status: 'Acclaimed',
    comments: 'Acclaimed to office'
  }
];

