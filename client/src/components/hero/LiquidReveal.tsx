import { useEffect, useRef } from 'react'

const BEFORE_SRC =
  'https://api.getlayers.ai/storage/v1/object/public/public/assets/lumora-e8b711fc68/hero/after.jpg'
const AFTER_SRC =
  'https://api.getlayers.ai/storage/v1/object/public/public/assets/lumora-e8b711fc68/hero/before.jpg'

const BRUSH_RADIUS = 143
const DECAY = 0.016

export function LiquidReveal() {
  const containerRef = useRef<HTMLDivElement>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const container = containerRef.current
    const canvas = canvasRef.current
    if (!container || !canvas) return

    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (reduceMotion) return

    const ctx = canvas.getContext('2d')!
    const dpr = Math.min(window.devicePixelRatio || 1, 2)

    const coverCanvas = document.createElement('canvas')
    const coverCtx = coverCanvas.getContext('2d')!
    const brushCanvas = document.createElement('canvas')
    const brushCtx = brushCanvas.getContext('2d')!

    const afterImg = new Image()
    afterImg.crossOrigin = 'anonymous'
    let afterLoaded = false
    let W = 0
    let H = 0

    function drawCover() {
      if (!afterLoaded || W === 0 || H === 0) return
      coverCanvas.width = W
      coverCanvas.height = H
      const iw = afterImg.naturalWidth
      const ih = afterImg.naturalHeight
      const scale = Math.max(W / iw, H / ih)
      const sw = iw * scale
      const sh = ih * scale
      const sx = (W - sw) / 2
      const sy = (H - sh) / 2
      coverCtx.clearRect(0, 0, W, H)
      coverCtx.drawImage(afterImg, sx, sy, sw, sh)
    }

    function resize() {
      const rect = container!.getBoundingClientRect()
      W = Math.round(rect.width * dpr)
      H = Math.round(rect.height * dpr)
      canvas!.width = W
      canvas!.height = H
      canvas!.style.width = rect.width + 'px'
      canvas!.style.height = rect.height + 'px'
      drawCover()
      const diam = Math.ceil(BRUSH_RADIUS * dpr * 2)
      brushCanvas.width = diam
      brushCanvas.height = diam
    }

    afterImg.onload = () => {
      afterLoaded = true
      drawCover()
    }
    afterImg.src = AFTER_SRC

    const ro = new ResizeObserver(resize)
    ro.observe(container)
    resize()

    let points: { x: number; y: number }[] = []
    let last: { x: number; y: number } | null = null
    let idle = 0

    function toCanvasCoords(clientX: number, clientY: number) {
      const rect = container!.getBoundingClientRect()
      return { x: (clientX - rect.left) * dpr, y: (clientY - rect.top) * dpr }
    }

    function onPointerMove(e: PointerEvent) {
      const p = toCanvasCoords(e.clientX, e.clientY)
      const radius = BRUSH_RADIUS * dpr
      if (p.x < -radius || p.x > W + radius || p.y < -radius || p.y > H + radius) {
        last = null
        return
      }
      if (last) {
        const dx = p.x - last.x
        const dy = p.y - last.y
        const dist = Math.hypot(dx, dy)
        const step = Math.max(radius * 0.3, 1)
        const n = Math.min(Math.ceil(dist / step), 60)
        for (let i = 1; i <= n; i++) {
          points.push({ x: last.x + (dx * i) / n, y: last.y + (dy * i) / n })
        }
      } else {
        points.push(p)
      }
      last = p
    }
    window.addEventListener('pointermove', onPointerMove)

    function stamp(x: number, y: number) {
      const radius = BRUSH_RADIUS * dpr
      const diam = Math.ceil(radius * 2)
      brushCtx.clearRect(0, 0, diam, diam)
      brushCtx.globalCompositeOperation = 'source-over'
      const grad = brushCtx.createRadialGradient(diam / 2, diam / 2, 0, diam / 2, diam / 2, radius)
      grad.addColorStop(0, 'rgba(255,255,255,1)')
      grad.addColorStop(0.55, 'rgba(255,255,255,.82)')
      grad.addColorStop(1, 'rgba(255,255,255,0)')
      brushCtx.fillStyle = grad
      brushCtx.fillRect(0, 0, diam, diam)
      brushCtx.globalCompositeOperation = 'source-in'
      brushCtx.drawImage(coverCanvas, x - radius, y - radius, diam, diam, 0, 0, diam, diam)
      ctx.globalCompositeOperation = 'source-over'
      ctx.drawImage(brushCanvas, x - radius, y - radius)
    }

    let raf: number
    function tick() {
      if (W === 0 || H === 0) {
        raf = requestAnimationFrame(tick)
        return
      }
      const drawing = points.length > 0
      if (drawing) {
        idle = 0
      } else {
        idle++
        if (idle > 120) {
          raf = requestAnimationFrame(tick)
          return
        }
      }

      const fade = drawing ? DECAY : Math.min(DECAY + idle * 0.004, 0.5)
      ctx.globalCompositeOperation = 'destination-out'
      ctx.fillStyle = `rgba(0,0,0,${fade})`
      ctx.fillRect(0, 0, W, H)

      if (drawing) {
        points.forEach((p) => stamp(p.x, p.y))
        points = []
      }
      if (idle === 120) {
        ctx.clearRect(0, 0, W, H)
      }
      raf = requestAnimationFrame(tick)
    }
    raf = requestAnimationFrame(tick)

    return () => {
      cancelAnimationFrame(raf)
      ro.disconnect()
      window.removeEventListener('pointermove', onPointerMove)
    }
  }, [])

  return (
    <div ref={containerRef} className="absolute inset-0 z-0">
      <img
        alt=""
        src={BEFORE_SRC}
        className="absolute inset-0 h-full w-full object-cover"
      />
      <canvas ref={canvasRef} aria-hidden className="absolute inset-0 h-full w-full pointer-events-none" />
    </div>
  )
}
