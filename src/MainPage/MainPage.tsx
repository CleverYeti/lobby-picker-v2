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
    joinLobby
}: {
    selectedPlatform: Platform,
    selectedSort: Sort,
    isActive: Boolean,
    joinLobby: (lobby: Lobby, team?: number) => void
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
                                <div className="lobby" key={i} onClick={() => joinLobby(lobby)}>
                                    <div className="region">{lobby.region}</div>
                                    <div className="player-count"><NumberCounter value={lobby.numPlayers}/></div>
                                </div>
                            ))}
                        </div>
                    </div>
                </>)
            })}
            {/*
            <div className="partner-section">
                <div className="partners-title">Check out our other projects:</div>
                <div className="partner-links">
                    <a className="partner-banner" href="https://diepeditor.io" target="_blank">
                        <img src="https://dieplobbypicker.io/assets/partners/diepEditorBanner.png" alt="" />
                    </a>
                    <a className="partner-banner" href="https://diepWiki.io" target="_blank">
                        <img src="https://dieplobbypicker.io/assets/partners/diepWikiBanner.png" alt="" />
                    </a>
                    <a className="partner-banner" href="" target="_blank">
                        <img src="/assets/partners/diepVerseBanner.png" alt="" />
                    </a>
                </div>
            </div>
            */}
        </div>
    )
}