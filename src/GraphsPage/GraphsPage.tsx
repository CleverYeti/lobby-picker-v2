import { useEffect, useState } from "react";
import { DropdownSelector } from "../DropdownSelector/DropdownSelector";
import { Platform } from "../systems/LBDataSystem/LBDataContext";
import { GetGraphEndpointParams, GetGraphEndpointResponse } from "../DataTypes/getGraphEndpointTypes";
import { EnvironmentIDs } from "../DataTypes/Environments";
import { RegionIDs, regions } from "../DataTypes/Regions";
import { GamemodeIDs, GamemodeNameIDs, gamemodes } from "../DataTypes/Gamemodes";
import { ResponsiveLineCanvas } from "@nivo/line";
import { graphAPIURL } from "../config";
import { Theme } from "../App";
import "./GraphsPage.css"

export function GraphsPage({
    selectedPlatform,
    isActive,
    selectedTheme
}: {
    selectedPlatform: Platform,
    isActive: boolean,
    selectedTheme: Theme
}) {
    console.log(selectedPlatform, isActive)
    const [selectedRegion, setSelectedRegion] = useState<RegionIDs | "compare">("compare")
    const [selectedGamemode, setSelectedGamemode] = useState<GamemodeIDs | "compare">(GamemodeIDs.unknown) // combine
    const [selectedTimeSpan, setSelectedTimeSpan] = useState<number|"all">("all") // hours

    const [graphData, setGraphData] = useState<GetGraphEndpointResponse | null | "error">(null);

    useEffect(() => {
        if (!isActive) return
        let ignore = false;
        ;(async () => {
            let params: GetGraphEndpointParams = {
                endTime: Date.now(),
                lines: [{
                    environmentID: selectedPlatform == "pc" ? EnvironmentIDs.pc : EnvironmentIDs.mobile,
                    regionID: RegionIDs.unknown,
                    gamemodeID: GamemodeIDs.unknown,
                    gamemodeNameID: GamemodeNameIDs.unknown
                }]
            };
            if (selectedTimeSpan != "all") {
                params.startTime = Date.now() - selectedTimeSpan * 60 * 60 * 1000 // one hour
            }
            if (selectedRegion == "compare") {
                const newLines: GetGraphEndpointParams["lines"] = [];
                for (let line of params.lines) {
                    for (let strRegionID in regions) {
                        if (strRegionID == (RegionIDs.unknown + "")) continue;
                        newLines.push({
                            ...line,
                            regionID: parseInt(strRegionID)
                        })
                    }
                }
                params.lines = newLines
            } else {
                params.lines.forEach(line => line.regionID = selectedRegion)
            }
            if (selectedGamemode == "compare") {
                const newLines: GetGraphEndpointParams["lines"] = [];
                for (let line of params.lines) {
                    for (let strGamemodeID in gamemodes) {
                        if (strGamemodeID == (GamemodeIDs.unknown + "")) continue;
                        newLines.push({
                            ...line,
                            gamemodeID: parseInt(strGamemodeID)
                        })
                    }
                }
                params.lines = newLines
            } else {
                params.lines.forEach(line => line.gamemodeID = selectedGamemode)
            }

            console.log(params.lines)

            try {
                const response = await fetch(graphAPIURL, {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify(params)
                })
                if (!response.ok) throw new Error();
                if (ignore) return;
                const newData = await response.json()
                if (ignore) return;
                console.log(newData)
                setGraphData(newData);
            } catch (error) {
                if (ignore) return;
                setGraphData("error")
            }
        })()
        return () => {ignore = true};
    }, [selectedRegion, selectedGamemode, selectedTimeSpan, selectedPlatform, isActive])


    return (
        <div id="graphs">
            <div className="main-area">
                {graphData == null || graphData == "error" ? <>
                    <div className="loading-text">{graphData == "error" ? "An Error Occured" : "Loading..."}</div>
                </> : <>
                    <ResponsiveLineCanvas /* or LineCanvas for fixed dimensions */
                        data={[...graphData.lines.map((line, index) => {
                            const outputLine: {id: string, data: Array<{x: number, y: number|null}>} = {
                                id: ([
                                    line.regionID != RegionIDs.unknown ? regions[line.regionID]?.shortName : null,
                                    line.gamemodeID != GamemodeIDs.unknown ? gamemodes[line.gamemodeID]?.shortName : null,
                                ].filter(line => line != null).join(" ") || "All"),
                                data: []
                            }
                            for (let point of line.points) {
                                if (!point[2] && outputLine.data.length > 0) outputLine.data.push({x: new Date(point[0]) as any, y: null});
                                outputLine.data.push({x: new Date(point[0]) as any, y: point[1]});
                            }
                            return outputLine
                        })]}
                        margin={{ top: 30, right: graphData.lines.length > 1 ? 160 : 50, bottom: 60, left: 50 }}
                        xScale={{
                            type: 'time',
                            format: 'native',
                            min: new Date(graphData.startTime),
                            max: new Date(graphData.endTime),
                        }}
                        yScale={{ type: 'linear', min: 0, max: graphData.maxY }}
                        axisBottom={{
                            format: (value: Date) => (graphData.endTime - graphData.startTime > 1000 * 60 * 60 * 24) ? value.toLocaleDateString() : value.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) ,
                            tickRotation: -45,
                        }}
                        colors={selectedTheme == "dark" ? [
                            "hsl(86.667 48.293% 59.804%)",
                            "hsl(39.683 88.732% 58.235% / 1)",
                            "hsl(190 81.522% 63.922%)",
                            "hsl(252 81.522% 63.922%)",
                            "hsl(300 81.522% 63.922%)",
                            "hsl(20 81.522% 63.922%)"
                        ] : [
                            "hsl(165.625 39.669% 52.549%)",
                            "hsl(18 81.522% 63.922% / 1)",
                            "hsl(210.683 88.732% 58.235%)",
                            "hsl(228.683 88.732% 53.235%)",
                            "hsl(270.683 88.732% 53.235%)",
                            "hsl(0 88.732% 53.235%)"
                        ]}

                        lineWidth={1}
                        pointSize={0}
                        /*
                        pointLabel="data.data.yFormatted"
                        pointLabelYOffset={-12}
                        areaBlendMode="normal"
                        enableSlices={false}
                        debugSlices={false}
                        enableCrosshair={true}
                        enableTouchCrosshair={true}
                        crosshairType="bottom-left"
                        */
                        theme={{
                            axis: {
                                ticks: {
                                    text: {
                                        fill: selectedTheme == "dark" ? '#aaaaaa' : "#333333",  // <-- color of tick numbers/labels
                                        fontSize: 12,
                                        fontWeight: 500,
                                    }
                                }
                            },
                            grid: {
                                line: {
                                    stroke: selectedTheme == "dark" ? '#444444' : "#bbbbbb", // grid line color
                                    strokeWidth: 1,
                                }
                            }
                        }}

                        legends={graphData.lines.length > 1 ? [
                            {
                                anchor: 'bottom-right',
                                direction: 'column',
                                translateX: 140,
                                itemsSpacing: 2,
                                itemWidth: 80,
                                itemHeight: 12,
                                symbolSize: 12,
                                symbolShape: 'circle',
                                itemTextColor: selectedTheme == "dark" ? '#cccccc' : "#222222",  // <-- color of tick numbers/labels
                            }
                        ] : []}
                    />
                </>}
            </div>
            <div id="graphs-bottom-bar">
                <DropdownSelector
                    options={[
                        {value: "compare", name: "Compare Modes"},
                        ...Object.entries(gamemodes).map(([gamemodeID, gamemodeInfo]) => ({
                            value: gamemodeID,
                            name: gamemodeID == (GamemodeIDs.unknown + "") ? "Combine Modes" : gamemodeInfo.shortName
                        }))
                    ]}
                    currentValue={selectedGamemode + ""}
                    setCurrentValue={(newValue: string) => {
                        if (newValue == "compare") {
                            if (selectedRegion == "compare") setSelectedRegion(RegionIDs.unknown);
                            setSelectedGamemode("compare")
                        } else {
                            setSelectedGamemode(parseInt(newValue))
                        }
                    }}
                />
                <DropdownSelector
                    options={[
                        {value: "compare", name: "Compare Regions"},
                        ...Object.entries(regions).map(([regionID, regionInfo]) => ({
                            value: regionID,
                            name: regionID == (GamemodeIDs.unknown + "") ? "Combine Regions" : regionInfo.officialName
                        }))
                    ]}
                    currentValue={selectedRegion + ""}
                    setCurrentValue={(newValue: string) => {
                        if (newValue == "compare") {
                            if (selectedGamemode == "compare") setSelectedGamemode(GamemodeIDs.unknown);
                            setSelectedRegion("compare")
                        } else {
                            setSelectedRegion(parseInt(newValue))
                        }
                    }}
                />
                <DropdownSelector
                    options={[
                        {value: "1", name: "Last Hour"},
                        {value: "6", name: "Last 6 Hours"},
                        {value: "24", name: "Last 24 Hours"},
                        {value: "168", name: "Last 7 Days"},
                        {value: "720", name: "Last Month"},
                        {value: "8760", name: "Last Year"},
                        {value: "all", name: "All Thats Recorded"},
                    ]}
                    currentValue={selectedTimeSpan + ""}
                    setCurrentValue={(newValue: string) => {
                        if (newValue == "all") {
                            setSelectedTimeSpan("all")
                        } else {
                            setSelectedTimeSpan(parseFloat(newValue))
                        }
                    }}
                />
            </div>
        </div>
    )
}