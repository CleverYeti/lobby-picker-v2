import { GamemodeIDs, GamemodeNameIDs } from "./Gamemodes";
import { RegionIDs } from "./Regions";
import { EnvironmentIDs } from "./Environments";

export interface GetGraphEndpointParams {
  startTime?: number, // 0 = automatic
  endTime?: number, // 0 = last data point
  dataPointInterval?: number, // min time between points, 0 = automatic (1000 points)
  lines: Array<{
    gamemodeID?: GamemodeIDs, // 0 = all combined
    regionID?: RegionIDs, // 0 = all combined
    gamemodeNameID?: GamemodeNameIDs, // 0 = all combined
    environmentID?: EnvironmentIDs // 0 = all combined
  }>
}
export interface GetGraphEndpointResponse {
  startTime: number,
  endTime: number,
  maxY: number,
  dataPointInterval: number,
  lines: Array<{
    gamemodeID: GamemodeIDs,
    regionID: RegionIDs,
    gamemodeNameID: GamemodeNameIDs,
    environmentID: EnvironmentIDs,
    points: Array<[number, number, boolean]> // x, y, isContinuous
  }>
}
