import { useEffect, useState } from "react";
import { PageLoader } from "@/components/PageLoader";
import { Header } from "@/components/Header";
import { Hero } from "@/components/hero/Hero";
import { About } from "@/components/sections/About";
import { CreateBand } from "@/components/sections/CreateBand";
import { Portfolio } from "@/components/sections/Portfolio";
import { Services } from "@/components/sections/Services";
import { Stats } from "@/components/sections/Stats";
import { Footer } from "@/components/Footer";
import { NavMenu } from "@/components/NavMenu";
import { RequestModal } from "@/components/RequestModal";
import { ReadyContext } from "@/lib/ready-context";
import { initLenis } from "@/lib/scroll";
import { applyAdaptiveGrid } from "@/lib/adaptiveGrid";

function App() {
  const [ready, setReady] = useState(false);
  const [loaderMounted, setLoaderMounted] = useState(true);
  const [navOpen, setNavOpen] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
    initLenis();
    applyAdaptiveGrid();
    window.addEventListener("resize", applyAdaptiveGrid);
    return () => window.removeEventListener("resize", applyAdaptiveGrid);
  }, []);

  const openModal = () => setModalOpen(true);

  return (
    <ReadyContext.Provider value={ready}>
      <a
        href="#main"
        className="fixed left-4 top-4 z-[60] -translate-y-20 rounded-control bg-ink px-4 py-2 text-sm text-white focus:translate-y-0"
      >
        Skip to content
      </a>

      {loaderMounted && (
        <PageLoader
          onDone={() => {
            setReady(true);
            setLoaderMounted(false);
          }}
        />
      )}

      <Header onOpenMenu={() => setNavOpen(true)} onOpenModal={openModal} />

      <main id="main">
        <Hero onOpenModal={openModal} />
        <About />
        <CreateBand />
        <Portfolio />
        <Services />
        <Stats />
      </main>

      <Footer onOpenModal={openModal} />

      <NavMenu
        open={navOpen}
        onClose={() => setNavOpen(false)}
        onOpenModal={openModal}
      />
      <RequestModal open={modalOpen} onClose={() => setModalOpen(false)} />
    </ReadyContext.Provider>
  );
}

export default App;
