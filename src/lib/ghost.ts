declare global {
  interface Window {
    Portal?: {
      open: (options?: unknown) => void
    }
  }
}

export function openGhostPortal() {
  if (window.Portal) {
    window.Portal.open()
    return
  }

  const ghostUrl = (import.meta.env.VITE_GHOST_URL as string | undefined)
    ?.replace(/\/+$/, '')
    ?.trim()

  if (ghostUrl) {
    window.location.href = `${ghostUrl}/#/portal/signup`
  }
}

