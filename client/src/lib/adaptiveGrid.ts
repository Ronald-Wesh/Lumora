const FONT_BASE = 16
const BASE_WIDTH = 1920
const COEF = 0.6666

export function applyAdaptiveGrid() {
  const w = window.innerWidth
  const widthReduction = ((BASE_WIDTH - w) / BASE_WIDTH) * 100
  const size = FONT_BASE - (FONT_BASE * (widthReduction * COEF)) / 100
  if (size > FONT_BASE) {
    document.documentElement.style.fontSize = size + 'px'
  } else {
    document.documentElement.style.removeProperty('font-size')
  }
}
