import { EnvironmentIDs } from "./Environments"
import { GamemodeIDs, GamemodeNameIDs } from "./Gamemodes"
import { RegionIDs } from "./Regions"

export interface PushPlayerStatEndpointParams {
  gamemodeID?: GamemodeIDs, // 0 = all combined
  regionID?: RegionIDs, // 0 = all combined
  gamemodeNameID?: GamemodeNameIDs, // 0 = all combined
  environmentID?: EnvironmentIDs // 0 = all combined
  teamID?: number // -1 = none
  isCodepen?: boolean
}