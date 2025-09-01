export enum EnvironmentIDs {
  unknown = 0,
  pc = 1,
  mobile = 2,
}
export const environments: Record<EnvironmentIDs, {
  key: string,
  name: string
}> = {
  [EnvironmentIDs.unknown]: { key: "unknown", name: "Unknown" },
  [EnvironmentIDs.pc]:      { key: "pc",      name: "PC"      },
  [EnvironmentIDs.mobile]:  { key: "mobile",  name: "Mobile"  },
}

export function getEnvironmentID(key: string): EnvironmentIDs {
  const matchingEnvironment = Object.entries(environments).find(([id, environment]) => environment.key == key)
  if (matchingEnvironment) return parseInt(matchingEnvironment[0]) as EnvironmentIDs
  return EnvironmentIDs.unknown
}