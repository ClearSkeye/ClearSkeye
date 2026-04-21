import { useEffect } from 'react'

function normalizeUrl(url: string) {
  return url.replace(/\/+$/, '')
}

export function GhostPortalScript() {
  const ghostUrl = import.meta.env.VITE_GHOST_URL as string | undefined

  useEffect(() => {
    if (!ghostUrl) return
    const base = normalizeUrl(ghostUrl)
    const scriptId = 'ghost-portal-script'
    if (document.getElementById(scriptId)) return

    const script = document.createElement('script')
    script.id = scriptId
    script.defer = true
    script.src = `${base}/members.js`
    script.dataset.ghost = `${base}/`
    script.crossOrigin = 'anonymous'
    document.head.appendChild(script)
  }, [ghostUrl])

  return null
}

