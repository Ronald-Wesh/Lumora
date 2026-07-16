import { useEffect, useState } from 'react'
import { PageLoader } from '@/components/PageLoader'
import { Header } from '@/components/Header'
import { Hero } from '@/components/hero/Hero'
import { ReadyContext } from '@/lib/ready-context'
import { initLenis } from '@/lib/scroll'
import { applyAdaptiveGrid } from '@/lib/adaptiveGrid'

function App() {
  const [ready, setReady] = useState(false)
  const [loaderMounted, setLoaderMounted] = useState(true)

  useEffect(() => {
    window.scrollTo(0, 0)
    initLenis()
    applyAdaptiveGrid()
    window.addEventListener('resize', applyAdaptiveGrid)
    return () => window.removeEventListener('resize', applyAdaptiveGrid)
  }, [])

  return (
    <ReadyContext.Provider value={ready}>
      {loaderMounted && (
        <PageLoader
          onDone={() => {
            setReady(true)
            setLoaderMounted(false)
          }}
        />
      )}

      <Header onOpenMenu={() => {}} onOpenModal={() => {}} />

      <main id="main">
        <Hero onOpenModal={() => {}} />
      </main>
    </ReadyContext.Provider>
  )
}

export default App
