import { useState } from "react";
import { gamemodeInfo } from "../../gamemodeInfo";
import { Lobby } from "../LBDataSystem/LBDataContext";
import "./TeamSelector.css"
import { publicFileRoot } from "../../config";

export function TeamSelector({
    selectedLobby,
    closeFunction,
    getLobbyButtonLink,
    getLobbyButtonFunction
}: {
    selectedLobby: Lobby|null;
    closeFunction: () => void
    getLobbyButtonLink: (lobby: Lobby, team?: number) => string|undefined
    getLobbyButtonFunction: (lobby: Lobby, team?: number) => ((event: React.MouseEvent) => void)|undefined
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
                    <a
                        className="team"
                        data-team-id={0}
                        data-team-position="top-left"
                        href={selectedLobby != null ? getLobbyButtonLink(selectedLobby, 0) : undefined}
                        onClick={selectedLobby != null ? getLobbyButtonFunction(selectedLobby, 0) : undefined}
                    >
                        <img src={`${publicFileRoot}/assets/team-arrow.svg`}/>
                    </a>
                    <a
                        className="team"
                        data-team-id={2}
                        data-team-position="top-right"
                        href={selectedLobby != null ? getLobbyButtonLink(selectedLobby, 2) : undefined}
                        onClick={selectedLobby != null ? getLobbyButtonFunction(selectedLobby, 2) : undefined}
                    >
                        <img src={`${publicFileRoot}/assets/team-arrow.svg`}/>
                    </a>
                    <a
                        className="team"
                        data-team-id={3}
                        data-team-position="bottom-left"
                        href={selectedLobby != null ? getLobbyButtonLink(selectedLobby, 3) : undefined}
                        onClick={selectedLobby != null ? getLobbyButtonFunction(selectedLobby, 3) : undefined}
                    >
                        <img src={`${publicFileRoot}/assets/team-arrow.svg`}/>
                    </a>
                    <a
                        className="team"
                        data-team-id={1}
                        data-team-position="bottom-right"
                        href={selectedLobby != null ? getLobbyButtonLink(selectedLobby, 1) : undefined}
                        onClick={selectedLobby != null ? getLobbyButtonFunction(selectedLobby, 1) : undefined}
                    >
                        <img src={`${publicFileRoot}/assets/team-arrow.svg`}/>
                    </a>
                </>):(<>
                    <a
                        className="team"
                        data-team-id={0}
                        data-team-position="left"
                        href={selectedLobby != null ? getLobbyButtonLink(selectedLobby, 0) : undefined}
                        onClick={selectedLobby != null ? getLobbyButtonFunction(selectedLobby, 0) : undefined}
                    >
                        <img src={`${publicFileRoot}/assets/team-arrow.svg`}/>
                    </a>
                    <a
                        className="team"
                        data-team-id={1}
                        data-team-position="right"
                        href={selectedLobby != null ? getLobbyButtonLink(selectedLobby, 1) : undefined}
                        onClick={selectedLobby != null ? getLobbyButtonFunction(selectedLobby, 1) : undefined}
                    >
                        <img src={`${publicFileRoot}/assets/team-arrow.svg`}/>
                    </a>
                </>)}
            </div>
        </div>
    )
}