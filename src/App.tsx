import { useState } from "react"
import { NotificationSystem } from "./systems/NotificationSystem/notificationSystem"
import { LBDataProvider, Lobby, Platform, platforms, useLBData } from "./systems/LBDataSystem/LBDataContext"
import { IconSelector } from "./systems/IconSelector/IconSelector"
import { NumberCounter } from "./NumberCounter/NumberCounter"
import { GraphsPage } from "./GraphsPage/GraphsPage"
import { MainPage } from "./MainPage/MainPage"
import { TeamSelector } from "./systems/TeamSelector/TeamSelector"
import { gamemodeInfo } from "./gamemodeInfo"
import { publicFileRoot, baseGameURL, baseMobileGameURL } from "./config"

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
  const { playerCount } = useLBData()
  const [selectedPlatform, setSelectedPlatform] = useState<Platform>("pc")
  const [selectedSort, setSelectedSort] = useState<Sort>("alphabetical")
  const [selectedPage, setSelectedPage] = useState<Page>("lobby-grid")
  const [selectedTheme, setSelectedTheme] = useState<Theme>("dark")
  let [selectedLobby, setSelectedLobby] = useState<Lobby|null>(null)

  document.body.dataset.theme = selectedTheme

  function joinLobby(lobby: Lobby, team?: number) {
    const gamemode = gamemodeInfo[lobby.gamemode]
    if ((gamemode?.teamCount ?? 0) > 0 && team == undefined) {
      setSelectedLobby(lobby)
    } else {
      // main format
      const link = (lobby.platform == "mobile" ? baseMobileGameURL : baseGameURL) + "?" + new URLSearchParams({
        s: lobby.ip,
        g: lobby.gamemode,
        ...(team != null ? {l: `0x${team}`} : {})
      })
      window.open(link, "_blank")
      /* beta format
      const decodedLobby = [
        lobby.region,
        lobby.gamemode,
        lobby.ip,
        "x",
        (team ?? "x") + "",
      ]
  
      const encodedLobby = encodeURI(decodedLobby.join("_"))
      const link =  baseGameURL + "?lobby=" + encodedLobby
      window.open(link, "_blank")
      */
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
          <NumberCounter value={playerCount}/> Total Players Online
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
