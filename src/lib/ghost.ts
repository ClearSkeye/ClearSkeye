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

  const ghostUrl = process.env.NEXT_PUBLIC_GHOST_URL
    ?.replace(/\/+$/, '')
    ?.trim()

  if (ghostUrl) {
    window.location.href = `${ghostUrl}/#/portal/signup`
  }
}

