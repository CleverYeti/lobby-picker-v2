export enum RegionIDs {
  unknown = 0,
  atlanta = 1,
  frankfurt = 2,
  singapore = 3,
  sydney = 4
}
export const regions: Record<RegionIDs, {
  key: string,
  shortName: string,
  officialName: string
}> = {
  [RegionIDs.unknown]:    { key: "unknown", shortName: "Unknown", officialName: "Unknown"   },
  [RegionIDs.atlanta]:    { key: "atl",     shortName: "ATL",     officialName: "Atlanta"   },
  [RegionIDs.frankfurt]:  { key: "fra",     shortName: "FRA",     officialName: "Frankfurt" },
  [RegionIDs.singapore]:  { key: "sgp",     shortName: "SGP",     officialName: "Singapore" },
  [RegionIDs.sydney]:     { key: "syd",     shortName: "SYD",     officialName: "Sydney"    },
}

export function getRegionID(key: string): RegionIDs {
  const matchingRegion = Object.entries(regions).find(([id, region]) => region.key == key)
  if (matchingRegion) return parseInt(matchingRegion[0]) as RegionIDs
  return RegionIDs.unknown
}