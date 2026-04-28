export type ReducedMotionPhase = "morning" | "day" | "evening" | "night"

export type DayCycleSkyBackgroundProps = {
  durationSeconds?: number
  className?: string
  fixed?: boolean
  intensity?: number
  showStars?: boolean
  showSunGlow?: boolean
  reducedMotionPhase?: ReducedMotionPhase
}
