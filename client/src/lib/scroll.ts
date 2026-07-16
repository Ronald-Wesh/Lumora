import Lenis from 'lenis'

let lenis: Lenis | null = null
let lockCount = 0

export function initLenis() {
  if (lenis) return lenis
  lenis = new Lenis({ smoothWheel: true })
  function raf(time: number) {
    lenis?.raf(time)
    requestAnimationFrame(raf)
  }
  requestAnimationFrame(raf)
  return lenis
}

export function stopScroll() {
  lockCount++
  lenis?.stop()
  document.documentElement.classList.add('scroll-locked')
}

export function startScroll() {
  lockCount = Math.max(0, lockCount - 1)
  if (lockCount === 0) {
    lenis?.start()
    document.documentElement.classList.remove('scroll-locked')
  }
}

export function scrollToId(id: string) {
  stopScroll()
  setTimeout(() => {
    const el = document.getElementById(id)
    if (el) {
      const top = el.getBoundingClientRect().top + window.pageYOffset
      window.scrollTo({ top, behavior: 'smooth' })
    }
  }, 50)
  setTimeout(startScroll, 100)
}
