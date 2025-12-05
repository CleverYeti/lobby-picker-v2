export const gamemodeInfo: {
    [key: string]: {
        sortIndex: number,
        colorIndex: number,
        name: string,
        teamCount?: number,
    }
} = {
    "ffa": {
        sortIndex: 0,
        colorIndex: 0,
        name: "FFA",
    },
    "teams": {
        sortIndex: 1,
        colorIndex: 1,
        name: "2 Teams",
        teamCount: 2
    },
    "4teams": {
        sortIndex: 2,
        colorIndex: 2,
        name: "4 Teams",
        teamCount: 4,
    },
    "maze": {
        sortIndex: 3,
        colorIndex: 3,
        name: "Maze"
    },
    "event": {
        sortIndex: 4,
        colorIndex: 4,
        name: "Event / CTF"
    },
    "sandbox": {
        sortIndex: 5,
        colorIndex: 5,
        name: "Sandbox"
    },
}