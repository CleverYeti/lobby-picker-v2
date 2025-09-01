import { useState } from "react";
import { gamemodeInfo } from "../../gamemodeInfo";
import { Lobby } from "../LBDataSystem/LBDataContext";
import "./TeamSelector.css"
import { publicFileRoot } from "../../config";

export function TeamSelector({
    selectedLobby,
    closeFunction,
    joinLobby
}: {
    selectedLobby: Lobby|null;
    closeFunction: () => void
    joinLobby: (lobby: Lobby, team?: number) => void
}) {
    const [animatingLobby, setAnimatingLobby] = useState<Lobby|null>(null)
    if (selectedLobby != null && selectedLobby != animatingLobby) setAnimatingLobby(selectedLobby)

    return (
        <div id="teamSelector" data-is-active={selectedLobby != null} data-team-count={gamemodeInfo[animatingLobby?.gamemode ?? ""]?.teamCount ?? 0} onClick={closeFunction}>
            <div className="background">
                {Array.from({length: 8}, (_, index) => (
                    <div style={{"--index": index} as React.CSSProperties}></div>
                ))}
            </div>
            <div className="title">
                {"Pick a Team".split("").map((char, index) => (
                    char == " " ? (
                        <div className="space" key={index} style={{"--index": index} as React.CSSProperties}></div>
                    ) : (
                        <div key={index} style={{"--index": index} as React.CSSProperties}>{char}</div>
                    )
                ))}
            </div>
            <div id="teamGrid">
                {gamemodeInfo[animatingLobby?.gamemode ?? ""]?.teamCount == 4 ? (<>
                    <div className="team" data-team-id={0} data-team-position="top-left"     onClick={() => selectedLobby != null && joinLobby(selectedLobby, 0)}> <img src={`${publicFileRoot}/assets/team-arrow.svg`}/> </div>
                    <div className="team" data-team-id={2} data-team-position="top-right"    onClick={() => selectedLobby != null && joinLobby(selectedLobby, 2)}> <img src={`${publicFileRoot}/assets/team-arrow.svg`}/> </div>
                    <div className="team" data-team-id={3} data-team-position="bottom-left"  onClick={() => selectedLobby != null && joinLobby(selectedLobby, 3)}> <img src={`${publicFileRoot}/assets/team-arrow.svg`}/> </div>
                    <div className="team" data-team-id={1} data-team-position="bottom-right" onClick={() => selectedLobby != null && joinLobby(selectedLobby, 1)}> <img src={`${publicFileRoot}/assets/team-arrow.svg`}/> </div>
                </>):(<>
                    <div className="team" data-team-id={0} data-team-position="left"  onClick={() => selectedLobby != null && joinLobby(selectedLobby, 0)}> <img src={`${publicFileRoot}/assets/team-arrow.svg`}/> </div>
                    <div className="team" data-team-id={1} data-team-position="right" onClick={() => selectedLobby != null && joinLobby(selectedLobby, 1)}> <img src={`${publicFileRoot}/assets/team-arrow.svg`}/> </div>
                </>)}
            </div>
        </div>
    )
}