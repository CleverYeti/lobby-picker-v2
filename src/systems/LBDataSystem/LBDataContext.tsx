import { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { LBAPIURL, otherLBAPIURL, refreshInterval } from "../../config";

export const platforms = ["pc", "mobile"] as const;
export type Platform = typeof platforms[number];

export interface LoadBalancingResponse {
  regions: Array<{
    region: string,
    regionName: string,
    countryCode: string
    lobbies: Array<{
      ip: string,
      gamemode: string,
      gamemodeName: string,
      changeTimestamp?: number,
      nextGamemode?: string,
      nextGamemodeName?: string
      numPlayers: number,
      playableWithParty?: boolean,
    }>
  }>
}

export interface Lobby {
  platform: Platform
  region: string
  regionName: string,
  countryCode: string,
  ip: string,
  gamemode: string,
  gamemodeName: string,
  changeTimestamp?: number,
  nextGamemode?: string,
  nextGamemodeName?: string
  numPlayers: number,
  playableWithParty?: boolean,
}


interface LBDataContextType {
  LBData: Array<{
    platform: Platform,
    data: LoadBalancingResponse,
    timestamp: number,
    playerCount: number
  }>
  availableLobbies: Array<Lobby>,
  playerCount: number,
  playerCountByPlatform: Record<Platform, number>,
}

const LBDataContext = createContext<LBDataContextType>({
  LBData: [],
  availableLobbies: [],
  playerCount: 0,
  playerCountByPlatform: Object.fromEntries(platforms.map((platform) => ([platform, 0]))) as Record<Platform, number>
});

export function LBDataProvider({ children }: { children: ReactNode }) {
  const [LBData, setLBData] = useState<LBDataContextType["LBData"]>([])

  async function fetchLBData(platform: Platform) {
    try {
      const response = await fetch(LBAPIURL + platform)
      if (!response.ok) {
        const text = await response.text()
        throw new Error(text.startsWith("<!DOCTYPE html>") ? response.statusText : text)
      }
      const data = (await response.json()) as LoadBalancingResponse
      const playerCount = data.regions.reduce((regionSum, region) => regionSum + region.lobbies.reduce((lobbySum, lobby) => lobbySum + lobby.numPlayers , 0), 0)
      setLBData(prev => ([
        ...prev.filter(entry => entry.platform != platform),
        {platform, timestamp: Date.now(), data, playerCount}
      ]))
      return
    } catch (error) {
      console.warn("fetch error: " + error)
    }
    try {
      const response = await fetch(otherLBAPIURL + platform)
      if (!response.ok) {
        const text = await response.text()
        throw new Error(text.startsWith("<!DOCTYPE html>") ? response.statusText : text)
      }
      const data = (await response.json()) as LoadBalancingResponse
      const playerCount = data.regions.reduce((regionSum, region) => regionSum + region.lobbies.reduce((lobbySum, lobby) => lobbySum + lobby.numPlayers , 0), 0)
      setLBData(prev => ([
        ...prev.filter(entry => entry.platform != platform),
        {platform, timestamp: Date.now(), data, playerCount}
      ]))
    } catch (error) {
      console.warn("fetch error: " + error)
    }
  }



  useEffect(() => {
    platforms.forEach(platform => fetchLBData(platform))
    const interval = setInterval(() => {
      platforms.forEach(platform => fetchLBData(platform))
    }, refreshInterval)
    return () => clearInterval(interval)
  }, [])


  const availableLobbies: LBDataContextType["availableLobbies"] = []

  let playerCount = 0
  let playerCountByPlatform = Object.fromEntries(platforms.map((platform) => ([platform, 0]))) as Record<Platform, number>

  for (let platform of LBData) {
    if (platform.data == null) continue
    playerCount += platform.playerCount
    playerCountByPlatform[platform.platform] = platform.playerCount
    for (let region of platform.data.regions) {
      for (let lobby of region.lobbies) {
        availableLobbies.push({
          ...lobby,
          region: region.region,
          regionName: region.regionName,
          countryCode: region.countryCode,
          platform: platform.platform
        })
      }
    }
  }


  return (
    <LBDataContext.Provider value={{ LBData, availableLobbies, playerCount, playerCountByPlatform }}>
      {children}
    </LBDataContext.Provider>
  );
}

export function useLBData() {
  return useContext(LBDataContext);
}