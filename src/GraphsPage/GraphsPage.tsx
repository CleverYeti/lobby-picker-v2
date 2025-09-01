import { useState } from "react";
import { DropdownSelector } from "../DropdownSelector/DropdownSelector";
import { Platform } from "../systems/LBDataSystem/LBDataContext";

export function GraphsPage({
    selectedPlatform,
    isActive
}: {
    selectedPlatform: Platform,
    isActive: boolean
}) {
    console.log(selectedPlatform, isActive)
    const [selectedRegion, setSelectedRegion] = useState<string>("compare")
    const [selectedGamemode, setSelectedGamemode] = useState<string>("combine")
    const [selectedTimeSpan, setSelectedTimeSpan] = useState<number|"all">("all")
    return (
        <div id="graphs">
            <div className="main-area">
                <canvas id="graph-canvas"></canvas>
            </div>
            <div id="graphs-bottom-bar">
            <DropdownSelector
                    options={[
                        {value: "combine", name: "Combine Modes"},
                        {value: "compare", name: "Compare Modes"},
                        {value: "ffa", name: "FFA", colorIndex: 0},
                        {value: "teams", name: "2 Teams", colorIndex: 1},
                        {value: "4teams", name: "4 Teams", colorIndex: 2},
                        {value: "maze", name: "Maze", colorIndex: 3},
                        {value: "event", name: "Event", colorIndex: 4},
                        {value: "sandbox", name: "Sandbox", colorIndex: 5},
                    ]}
                    currentValue={selectedGamemode}
                    setCurrentValue={(newValue: string) => {
                        setSelectedGamemode(newValue)
                        if (newValue == "compare" && selectedRegion == "compare") setSelectedRegion("combine")
                    }}
                />
                <DropdownSelector
                    options={[
                        {value: "combine", name: "Combine Regions"},
                        {value: "compare", name: "Compare Regions"},
                        {value: "atl", name: "Atlanta", colorIndex: 1},
                        {value: "fra", name: "Frankfurt", colorIndex: 2},
                        {value: "sgp", name: "Singapore", colorIndex: 3},
                        {value: "syd", name: "Sydney", colorIndex: 4},
                    ]}
                    currentValue={selectedRegion}
                    setCurrentValue={(newValue: string) => {
                        setSelectedRegion(newValue)
                        if (newValue == "compare" && selectedGamemode == "compare") setSelectedGamemode("combine")
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