"use client"

import { useEffect, useMemo, useRef } from "react"
import styles from "./DayCycleSkyBackground.module.css"
import type { DayCycleSkyBackgroundProps, ReducedMotionPhase } from "./types"

type SkyState = {
  id: string
  at: number
  phase: ReducedMotionPhase
  skyTop: string
  skyUpper: string
  skyMiddle: string
  skyLower: string
  horizon: string
  glowColor: string
  glowOpacity: number
  glowX: number
  glowY: number
  glowSize: number
  horizonGlowOpacity: number
  nightOverlayOpacity: number
  starOpacity: number
  vignetteOpacity: number
}

type ComputedSkyState = Omit<SkyState, "id" | "at" | "phase">

const SKY_STATES: SkyState[] = [
  { id: "morning-golden-hour", at: 0.0, phase: "morning", skyTop: "#7fb7e8", skyUpper: "#a9cff1", skyMiddle: "#f7dba0", skyLower: "#ffbd72", horizon: "#ff9f5a", glowColor: "#fff0bf", glowOpacity: 0.7, glowX: 50, glowY: 84, glowSize: 42, horizonGlowOpacity: 0.8, nightOverlayOpacity: 0, starOpacity: 0, vignetteOpacity: 0.08 },
  { id: "late-morning", at: 0.1, phase: "day", skyTop: "#58aee8", skyUpper: "#86cdf4", skyMiddle: "#bfe8fb", skyLower: "#f6e5b4", horizon: "#ffd18b", glowColor: "#fff4cf", glowOpacity: 0.38, glowX: 58, glowY: 68, glowSize: 34, horizonGlowOpacity: 0.35, nightOverlayOpacity: 0, starOpacity: 0, vignetteOpacity: 0.04 },
  { id: "clear-midday", at: 0.25, phase: "day", skyTop: "#2f8edc", skyUpper: "#54b4ed", skyMiddle: "#8bd3f7", skyLower: "#c9efff", horizon: "#e8f8ff", glowColor: "#ffffff", glowOpacity: 0.16, glowX: 52, glowY: 38, glowSize: 28, horizonGlowOpacity: 0.08, nightOverlayOpacity: 0, starOpacity: 0, vignetteOpacity: 0.02 },
  { id: "soft-afternoon", at: 0.42, phase: "day", skyTop: "#4fa2e0", skyUpper: "#74c4ef", skyMiddle: "#aadff5", skyLower: "#f4dcae", horizon: "#ffc982", glowColor: "#fff1c7", glowOpacity: 0.24, glowX: 64, glowY: 56, glowSize: 32, horizonGlowOpacity: 0.25, nightOverlayOpacity: 0, starOpacity: 0, vignetteOpacity: 0.04 },
  { id: "evening-golden-hour", at: 0.58, phase: "evening", skyTop: "#5f8fcf", skyUpper: "#8fb7dd", skyMiddle: "#f1c786", skyLower: "#ff9e5e", horizon: "#ff784f", glowColor: "#ffd58a", glowOpacity: 0.72, glowX: 46, glowY: 78, glowSize: 46, horizonGlowOpacity: 0.85, nightOverlayOpacity: 0.04, starOpacity: 0, vignetteOpacity: 0.1 },
  { id: "sunset", at: 0.7, phase: "evening", skyTop: "#344b91", skyUpper: "#755ba6", skyMiddle: "#d26f73", skyLower: "#ff8a4c", horizon: "#ff5d3f", glowColor: "#ffbd6a", glowOpacity: 0.68, glowX: 42, glowY: 88, glowSize: 52, horizonGlowOpacity: 0.95, nightOverlayOpacity: 0.14, starOpacity: 0, vignetteOpacity: 0.18 },
  { id: "dusk-twilight", at: 0.8, phase: "night", skyTop: "#121d4f", skyUpper: "#26356f", skyMiddle: "#5b4c89", skyLower: "#b56d74", horizon: "#e08a66", glowColor: "#ff9f6e", glowOpacity: 0.28, glowX: 39, glowY: 96, glowSize: 56, horizonGlowOpacity: 0.52, nightOverlayOpacity: 0.38, starOpacity: 0.22, vignetteOpacity: 0.28 },
  { id: "full-night", at: 0.9, phase: "night", skyTop: "#030615", skyUpper: "#07102b", skyMiddle: "#101b3f", skyLower: "#1a2450", horizon: "#252f62", glowColor: "#8797ff", glowOpacity: 0.08, glowX: 50, glowY: 92, glowSize: 60, horizonGlowOpacity: 0.05, nightOverlayOpacity: 0.72, starOpacity: 0.65, vignetteOpacity: 0.45 },
  { id: "pre-dawn", at: 0.97, phase: "morning", skyTop: "#08102a", skyUpper: "#172b55", skyMiddle: "#3f5d86", skyLower: "#c18573", horizon: "#f6a064", glowColor: "#ffc48c", glowOpacity: 0.26, glowX: 50, glowY: 94, glowSize: 58, horizonGlowOpacity: 0.45, nightOverlayOpacity: 0.25, starOpacity: 0.24, vignetteOpacity: 0.24 },
  { id: "loop-morning", at: 1.0, phase: "morning", skyTop: "#7fb7e8", skyUpper: "#a9cff1", skyMiddle: "#f7dba0", skyLower: "#ffbd72", horizon: "#ff9f5a", glowColor: "#fff0bf", glowOpacity: 0.7, glowX: 50, glowY: 84, glowSize: 42, horizonGlowOpacity: 0.8, nightOverlayOpacity: 0, starOpacity: 0, vignetteOpacity: 0.08 },
]

const clamp = (value: number, min: number, max: number) => Math.min(max, Math.max(min, value))
const lerp = (a: number, b: number, t: number) => a + (b - a) * t
const smoothstep = (t: number) => t * t * (3 - 2 * t)

const hexToRgb = (hex: string): { r: number; g: number; b: number } => {
  const clean = hex.replace("#", "")
  const full = clean.length === 3 ? clean.split("").map((c) => `${c}${c}`).join("") : clean
  const value = Number.parseInt(full, 16)
  return { r: (value >> 16) & 255, g: (value >> 8) & 255, b: value & 255 }
}

const rgbToCss = ({ r, g, b }: { r: number; g: number; b: number }): string =>
  `${Math.round(clamp(r, 0, 255))} ${Math.round(clamp(g, 0, 255))} ${Math.round(clamp(b, 0, 255))}`

const lerpColor = (colorA: string, colorB: string, t: number): string => {
  const a = hexToRgb(colorA)
  const b = hexToRgb(colorB)
  return rgbToCss({ r: lerp(a.r, b.r, t), g: lerp(a.g, b.g, t), b: lerp(a.b, b.b, t) })
}

const interpolateSkyState = (states: SkyState[], progress: number): ComputedSkyState => {
  const p = clamp(progress, 0, 1)
  let nextIndex = states.findIndex((state) => state.at >= p)
  if (nextIndex <= 0) nextIndex = 1
  const prev = states[nextIndex - 1]
  const next = states[nextIndex]
  const span = Math.max(next.at - prev.at, 0.000001)
  const eased = smoothstep(clamp((p - prev.at) / span, 0, 1))
  return {
    skyTop: lerpColor(prev.skyTop, next.skyTop, eased),
    skyUpper: lerpColor(prev.skyUpper, next.skyUpper, eased),
    skyMiddle: lerpColor(prev.skyMiddle, next.skyMiddle, eased),
    skyLower: lerpColor(prev.skyLower, next.skyLower, eased),
    horizon: lerpColor(prev.horizon, next.horizon, eased),
    glowColor: lerpColor(prev.glowColor, next.glowColor, eased),
    glowOpacity: lerp(prev.glowOpacity, next.glowOpacity, eased),
    glowX: lerp(prev.glowX, next.glowX, eased),
    glowY: lerp(prev.glowY, next.glowY, eased),
    glowSize: lerp(prev.glowSize, next.glowSize, eased),
    horizonGlowOpacity: lerp(prev.horizonGlowOpacity, next.horizonGlowOpacity, eased),
    nightOverlayOpacity: lerp(prev.nightOverlayOpacity, next.nightOverlayOpacity, eased),
    starOpacity: lerp(prev.starOpacity, next.starOpacity, eased),
    vignetteOpacity: lerp(prev.vignetteOpacity, next.vignetteOpacity, eased),
  }
}

const phaseTargetProgress: Record<ReducedMotionPhase, number> = {
  morning: 0.0,
  day: 0.25,
  evening: 0.7,
  night: 0.9,
}

const composeClassName = (base: string, extra?: string) => (extra ? `${base} ${extra}` : base)

export function DayCycleSkyBackground({
  durationSeconds = 180,
  className,
  fixed = true,
  intensity = 1,
  showStars = true,
  showSunGlow = true,
  reducedMotionPhase = "morning",
}: DayCycleSkyBackgroundProps) {
  const rootRef = useRef<HTMLDivElement>(null)
  const intensityValue = clamp(intensity, 0, 1.5)
  const durationMs = Math.max(durationSeconds, 20) * 1000

  const containerClassName = useMemo(() => {
    const fixedClassName = fixed ? ` ${styles.fixed}` : ""
    return composeClassName(`${styles.root}${fixedClassName}`, className)
  }, [className, fixed])

  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)")
    const root = rootRef.current
    if (!root) return

    const applyState = (state: ComputedSkyState) => {
      root.style.setProperty("--sky-top", state.skyTop)
      root.style.setProperty("--sky-upper", state.skyUpper)
      root.style.setProperty("--sky-middle", state.skyMiddle)
      root.style.setProperty("--sky-lower", state.skyLower)
      root.style.setProperty("--sky-horizon", state.horizon)
      root.style.setProperty("--glow-color-rgb", state.glowColor)
      root.style.setProperty("--glow-opacity", (showSunGlow ? state.glowOpacity * intensityValue : 0).toFixed(4))
      root.style.setProperty("--glow-x", `${state.glowX.toFixed(2)}%`)
      root.style.setProperty("--glow-y", `${state.glowY.toFixed(2)}%`)
      root.style.setProperty("--glow-size", `${state.glowSize.toFixed(2)}%`)
      root.style.setProperty("--horizon-glow-opacity", (state.horizonGlowOpacity * intensityValue).toFixed(4))
      root.style.setProperty("--night-overlay-opacity", (state.nightOverlayOpacity * intensityValue).toFixed(4))
      root.style.setProperty("--star-opacity", (showStars ? state.starOpacity * intensityValue : 0).toFixed(4))
      root.style.setProperty("--vignette-opacity", clamp(state.vignetteOpacity * intensityValue, 0, 0.6).toFixed(4))
    }

    const renderPhase = (phase: ReducedMotionPhase) => {
      applyState(interpolateSkyState(SKY_STATES, phaseTargetProgress[phase]))
    }

    let reduced = mediaQuery.matches
    let hidden = document.visibilityState === "hidden"
    let frameId = 0
    let running = false
    let elapsedOffset = 0
    let startAt = performance.now()

    const frame = (timestamp: number) => {
      if (reduced || hidden) {
        running = false
        return
      }
      const elapsed = elapsedOffset + (timestamp - startAt)
      applyState(interpolateSkyState(SKY_STATES, (elapsed % durationMs) / durationMs))
      frameId = window.requestAnimationFrame(frame)
    }

    const start = () => {
      if (running || reduced || hidden) return
      running = true
      startAt = performance.now()
      frameId = window.requestAnimationFrame(frame)
    }

    const stop = () => {
      if (!running) return
      elapsedOffset += performance.now() - startAt
      running = false
      cancelAnimationFrame(frameId)
    }

    if (reduced) {
      renderPhase(reducedMotionPhase)
    } else {
      start()
    }

    const onMotionChange = (event: MediaQueryListEvent) => {
      reduced = event.matches
      if (reduced) {
        stop()
        renderPhase(reducedMotionPhase)
      } else if (!hidden) {
        start()
      }
    }

    const onVisibilityChange = () => {
      hidden = document.visibilityState === "hidden"
      if (hidden) {
        stop()
      } else if (!reduced) {
        start()
      }
    }

    mediaQuery.addEventListener("change", onMotionChange)
    document.addEventListener("visibilitychange", onVisibilityChange)

    return () => {
      stop()
      mediaQuery.removeEventListener("change", onMotionChange)
      document.removeEventListener("visibilitychange", onVisibilityChange)
    }
  }, [durationMs, intensityValue, reducedMotionPhase, showStars, showSunGlow])

  return (
    <div ref={rootRef} className={containerClassName} aria-hidden="true" role="presentation">
      <div className={styles.base} />
      <div className={styles.glow} />
      <div className={styles.horizonGlow} />
      <div className={styles.stars} />
      <div className={styles.nightOverlay} />
      <div className={styles.vignette} />
    </div>
  )
}
