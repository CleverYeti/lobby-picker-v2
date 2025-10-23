import { useState } from "react"
import { NotificationSystem } from "./systems/NotificationSystem/notificationSystem"
import { LBDataProvider, Lobby, Platform, platforms, useLBData } from "./systems/LBDataSystem/LBDataContext"
import { IconSelector } from "./systems/IconSelector/IconSelector"
import { NumberCounter } from "./NumberCounter/NumberCounter"
import { GraphsPage } from "./GraphsPage/GraphsPage"
import { MainPage } from "./MainPage/MainPage"
import { TeamSelector } from "./systems/TeamSelector/TeamSelector"
import { gamemodeInfo } from "./gamemodeInfo"
import { publicFileRoot, baseGameURL, baseMobileGameURL, pushStatAPIURL } from "./config"
import { PushPlayerStatEndpointParams } from "./DataTypes/pushPlayerStatTypes"
import { getGamemodeID, getGamemodeNameID } from "./DataTypes/Gamemodes"
import { getRegionID } from "./DataTypes/Regions"
import { getEnvironmentID } from "./DataTypes/Environments"

export function App() {
  return <>
    <NotificationSystem/>
    <LBDataProvider>
      <AppInner/>
    </LBDataProvider>
  </>
}

export const sorts = ["alphabetical", "player-count"] as const;
export type Sort = typeof sorts[number];

export const pages = ["lobby-grid", "graphs"] as const;
export type Page = typeof pages[number];

export const themes = ["light", "dark"] as const;
export type Theme = typeof themes[number];

function AppInner() {
  const { playerCountByPlatform } = useLBData()
  const [selectedPlatform, setSelectedPlatform] = useState<Platform>("pc")
  const [selectedSort, setSelectedSort] = useState<Sort>("alphabetical")
  const [selectedPage, setSelectedPage] = useState<Page>("lobby-grid")
  const [selectedTheme, setSelectedTheme] = useState<Theme>((localStorage.getItem("theme") == "light") ? "light" : "dark")
  const [selectedLobby, setSelectedLobby] = useState<Lobby|null>(null)

  document.body.dataset.theme = selectedTheme
  localStorage.setItem("theme", selectedTheme)

  function joinLobby(lobby: Lobby, team?: number) {
    const gamemode = gamemodeInfo[lobby.gamemode]
    if ((gamemode?.teamCount ?? 0) > 0 && team == undefined) {
      setSelectedLobby(lobby)
    } else {
      // main format
      /*
      const link = (lobby.platform == "mobile" ? baseMobileGameURL : baseGameURL) + "?" + new URLSearchParams({
        s: lobby.ip,
        g: lobby.gamemode,
        ...(team != null ? {l: `0x${team}`} : {})
      })
      const params: PushPlayerStatEndpointParams = {
        gamemodeID: getGamemodeID(lobby.gamemode),
        regionID: getRegionID(lobby.region),
        gamemodeNameID: getGamemodeNameID(lobby.gamemodeName),
        environmentID: getEnvironmentID(lobby.platform),
        teamID: team,
        isCodepen: window.location.href.includes("cdpn") || window.location.href.includes("codepen")
      }
      ;(async () => {
        try {
          const response = await fetch(pushStatAPIURL, {
            method: "POST",
            headers: {
              "Content-Type": "application/json"
            },
            body: JSON.stringify(params)
          })
          if (!response.ok) throw new Error();
        } catch (error) {
          console.error("failed to push to stats", error)
        }
      })()
      window.open(link, "_blank")
      */
      /* beta format */

      const randomIDs: Record<string, number> = { // idk where these come from and they probably change every update
        "atl": 62717,
        "fra": 25225,
        "sgp": 31220,
        "syd": 43127
      }

      const decodedLobby = [
        lobby.region,
        lobby.gamemode,
        lobby.ip,
        team != null ? randomIDs[lobby.region] : "x",
        (team ?? "x") + "",
      ]
  
      const encodedLobby = encodeURI(decodedLobby.join("_"))
      const link =  baseGameURL + "?lobby=" + encodedLobby
      window.open(link, "_blank")
    }
  }

  return (
    <div id="maingrid" data-page={selectedPage}>
      <div id="topbar">
        <IconSelector
          options={platforms.map(platform => ({key: platform, iconURL: `${publicFileRoot}/assets/icons/platform-${platform}.svg`}))}
          activeOption={selectedPlatform}
          setActiveOption={setSelectedPlatform}
        />
        <div className="selector-splitter"></div>
        <IconSelector
          options={sorts.map(sort => ({key: sort, iconURL: `${publicFileRoot}/assets/icons/sort-${sort}.svg`}))}
          activeOption={selectedSort}
          setActiveOption={setSelectedSort}
        />
        <div id="player-count">
          <NumberCounter value={playerCountByPlatform[selectedPlatform] ?? 0}/> Players Online ({selectedPlatform})
        </div>
        <IconSelector
          options={pages.map(page => ({key: page, iconURL: `${publicFileRoot}/assets/icons/page-${page}.svg`}))}
          activeOption={selectedPage}
          setActiveOption={setSelectedPage}
        />
        <div className="selector-splitter"></div>
        <IconSelector
          options={themes.map(theme => ({key: theme, iconURL: `${publicFileRoot}/assets/icons/theme-${theme}.svg`}))}
          activeOption={selectedTheme}
          setActiveOption={setSelectedTheme}
        />
      </div>
      <GraphsPage
        selectedPlatform={selectedPlatform}
        isActive={selectedPage == "graphs"}
        selectedTheme={selectedTheme}
      />
      <MainPage
        selectedPlatform={selectedPlatform}
        selectedSort={selectedSort}
        joinLobby={joinLobby}
        isActive={selectedPage == "lobby-grid"}
      />
      <TeamSelector
        selectedLobby={selectedLobby}
        closeFunction={() => setSelectedLobby(null)}
        joinLobby={joinLobby}
      />
    </div>
  )
}
