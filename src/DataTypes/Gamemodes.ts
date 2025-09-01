import { match } from "assert"

export enum GamemodeIDs {
  unknown = 0,
  ffa = 1,
  tdm2 = 2,
  tdm4 = 3,
  maze = 4,
  event = 5,
  sandbox = 6
}

export const gamemodes: Record<GamemodeIDs, {
  key: string,
  shortName: string,
  officialName: string
}> = {
  [GamemodeIDs.unknown]:  { key: "unknown", shortName: "Unknown", officialName: "Unknown"       },
  [GamemodeIDs.ffa]:      { key: "ffa",     shortName: "FFA",     officialName: "Free For All"  },
  [GamemodeIDs.tdm2]:     { key: "teams",   shortName: "2TDM",    officialName: "2 Teams"       },
  [GamemodeIDs.tdm4]:     { key: "4teams",  shortName: "4TDM",    officialName: "4 Teams"       },
  [GamemodeIDs.maze]:     { key: "maze",    shortName: "Maze",    officialName: "Maze"          },
  [GamemodeIDs.event]:    { key: "event",   shortName: "Event",   officialName: "Event"         },
  [GamemodeIDs.sandbox]:  { key: "sandbox", shortName: "SBX",     officialName: "Sandbox"       },
}

export function getGamemodeID(key: string): GamemodeIDs {
  const matchingGamemode = Object.entries(gamemodes).find(([id, gamemode]) => gamemode.key == key)
  if (matchingGamemode) return parseInt(matchingGamemode[0]) as GamemodeIDs
  return GamemodeIDs.unknown
}



export enum GamemodeNameIDs {
  unknown = 0,
  ffa = 1,
  tdm2 = 2,
  tdm4 = 3,
  sandbox = 4,
  maze = 5,
  maze2tdm = 6,
  maze4tdm = 7,
  domination = 8,
  tag = 9,
  breakout = 10,
}

export const gamemodeNames: Record<GamemodeNameIDs, string> = {
  [GamemodeNameIDs.unknown]:    "Unknown",
  [GamemodeNameIDs.ffa]:        "Free For All",
  [GamemodeNameIDs.tdm2]:       "2 Teams",
  [GamemodeNameIDs.tdm4]:       "4 Teams",
  [GamemodeNameIDs.sandbox]:    "Sandbox",
  [GamemodeNameIDs.maze]:       "Maze",
  [GamemodeNameIDs.maze2tdm]:   "2 Teams Maze",
  [GamemodeNameIDs.maze4tdm]:   "4 Teams Maze",
  [GamemodeNameIDs.domination]: "Domination",
  [GamemodeNameIDs.tag]:        "Tag",
  [GamemodeNameIDs.breakout]:   "Breakout",
}

export function getGamemodeNameID(name: string): GamemodeNameIDs {
  const matchingGamemodeNameEntry = Object.entries(gamemodeNames).find(([id, matchName]) => matchName == name)
  if (matchingGamemodeNameEntry) return parseInt(matchingGamemodeNameEntry[0]) as GamemodeNameIDs
  return GamemodeNameIDs.unknown
}