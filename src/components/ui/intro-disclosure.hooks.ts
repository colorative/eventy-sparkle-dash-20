
import * as React from "react"
import { type PanInfo } from "framer-motion"

export function useMediaQuery(query: string) {
  const [matches, setMatches] = React.useState<boolean | null>(null)

  React.useEffect(() => {
    const media = window.matchMedia(query)
    setMatches(media.matches)

    const listener = (e: MediaQueryListEvent) => setMatches(e.matches)
    media.addEventListener("change", listener)
    return () => media.removeEventListener("change", listener)
  }, [query])

  return matches ?? false
}

export function useFeatureVisibility(featureId: string) {
  const [isVisible, setIsVisible] = React.useState<boolean | null>(null)

  React.useEffect(() => {
    const storedValue = localStorage.getItem(`feature_${featureId}`)
    setIsVisible(storedValue ? JSON.parse(storedValue) : true)
  }, [featureId])

  const hideFeature = React.useCallback(() => {
    localStorage.setItem(`feature_${featureId}`, JSON.stringify(false))
    setIsVisible(false)
  }, [featureId])

  return { isVisible: isVisible === null ? true : isVisible, hideFeature }
}

export function useSwipe(onSwipe: (direction: "left" | "right") => void) {
  const handleDragEnd = React.useCallback(
    (event: MouseEvent | TouchEvent | PointerEvent, info: PanInfo) => {
      if (info.offset.x > 100) {
        onSwipe("right")
      } else if (info.offset.x < -100) {
        onSwipe("left")
      }
    },
    [onSwipe],
  )

  return { handleDragEnd }
}
