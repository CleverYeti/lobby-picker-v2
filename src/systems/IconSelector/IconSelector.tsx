import { useEffect, useRef, useState } from "react"
import "./IconSelector.css"

export function IconSelector({
  activeOption,
  setActiveOption,
  options,
}: {
  activeOption: string,
  setActiveOption: Function,
  options: Array<{
    iconURL: string,
    key: string
  }>
}) {
  const [isAnimating, setIsAnimating] = useState(false)
  const isFirstRender = useRef(true)
  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false
      return
    }
    setIsAnimating(true)
    const timeout = setTimeout(() => setIsAnimating(false), 100)
    return () => clearTimeout(timeout)
  }, [activeOption])

  return (
    <div className="icon-selector" data-is-animating={isAnimating} style={{"--selected-index": options.findIndex(option => option.key == activeOption)} as React.CSSProperties}>
      {options.map(option => (
        <div className="option" key={option.key} data-is-active={option.key == activeOption} onClick={() => {
          if (option.key == activeOption) return
          setActiveOption(option.key)
        }}>
          <img src={option.iconURL} alt="" draggable="false"/>
        </div>
      ))}
    </div>
  )
}