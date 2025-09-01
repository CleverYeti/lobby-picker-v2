import "./DropdownSelector.css"

export function DropdownSelector({
    currentValue,
    setCurrentValue,
    options
}: {
    currentValue: string,
    setCurrentValue: Function,
    options: Array<{
        value: string,
        name: string,
        colorIndex?: number | null,
    }>
}) {
    return (
        <div
            className="dropdown-selector"
            id="graphs-gamemode-selector"
            style={{"--count": options.length} as React.CSSProperties}
            data-show-color-dots={currentValue == "compare"}
        >
            {options.map((option, i) => (
                <div
                    className="option"
                    key={option.value}
                    style={{"--index": i, "--color": `var(--color-${(option.colorIndex ?? 0) + 1})`} as React.CSSProperties}
                    data-value={option.value}
                    data-is-active={option.value == currentValue}
                    data-has-color-dot={option.colorIndex != null}
                    onClick={() => setCurrentValue(option.value)}
                >{option.name}</div>
            ))}
        </div>
    )
}