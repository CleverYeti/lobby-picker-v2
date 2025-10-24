import { useState } from "react"
import { Sort } from "../App"
import { gamemodeInfo } from "../gamemodeInfo"
import { NumberCounter } from "../NumberCounter/NumberCounter"
import { Lobby, Platform, useLBData } from "../systems/LBDataSystem/LBDataContext"
import "./MainPage.css"

export function MainPage({
    selectedPlatform,
    selectedSort,
    isActive,
    getLobbyButtonLink,
    getLobbyButtonFunction
}: {
    selectedPlatform: Platform,
    selectedSort: Sort,
    isActive: boolean,
    getLobbyButtonLink: (lobby: Lobby, team?: number) => string|undefined
    getLobbyButtonFunction: (lobby: Lobby, team?: number) => ((event: React.MouseEvent) => void)|undefined
}) {
    const { availableLobbies } = useLBData()
    let filteredLobbies = availableLobbies.filter(lobby => lobby.platform == selectedPlatform)
    
    const gridGamemodes:Array<string> = [
        "ffa",
        "teams",
        "4teams",
        "maze",
        "event"
    ]

    return (
        <div id="gamemode-grid">
            {gridGamemodes.map((gamemodeKey, index) => {
                const gamemode = gamemodeInfo[gamemodeKey]
                return (<>
                    {index == 3 && <div></div>}
                    <div className="gamemode" key={gamemodeKey} style={{"--color": `var(--color-${gamemode.colorIndex + 1})`} as React.CSSProperties}>
                        <div className="name">{gamemode.name}</div>
                        <div className="lobbygrid">
                            {filteredLobbies.filter(lobby => lobby.gamemode == gamemodeKey).map((lobby, i) => (
                                <a
                                    className="lobby"
                                    key={i}
                                    onClick={getLobbyButtonFunction(lobby, undefined)}
                                    href={getLobbyButtonLink(lobby, undefined)}
                                >
                                    <div className="region">{lobby.region}</div>
                                    <div className="player-count"><NumberCounter value={lobby.numPlayers}/></div>
                                </a>
                            ))}
                        </div>
                    </div>
                </>)
            })}
            <div className="partner-section">
                <div className="partners-title">Check out our other projects:</div>
                <div className="partner-links">
                    <a className="partner-banner" href="https://tankeditor.io" target="_blank">
                        <img src="https://dieplobbypicker.io/assets/partners/tankEditorBanner.png" alt="" />
                    </a>
                    <a className="partner-banner" href="https://diepWiki.io" target="_blank">
                        <img src="https://dieplobbypicker.io/assets/partners/diepWikiBanner.png" alt="" />
                    </a>
                    <a className="partner-banner" href="https://discord.gg/xF4ZmX3XnV" target="_blank">
                        <img src="https://dieplobbypicker.io/assets/partners/diepVerseBanner.png" alt="" />
                    </a>
                </div>
            </div>
        </div>
    )
}