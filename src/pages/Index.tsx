import { I18nProvider } from "@/i18n/I18nProvider";
import { LenisProvider } from "@/components/smooth-scroll/LenisProvider";
import { Scene } from "@/components/webgl/Scene";
import { MagneticCursor } from "@/components/cursor/MagneticCursor";
import { Navbar } from "@/components/portfolio/Navbar";
import { Hero } from "@/components/portfolio/Hero";
import { KineticPillars } from "@/components/portfolio/KineticPillars";
import { Stats } from "@/components/portfolio/Stats";
import { About } from "@/components/portfolio/About";
import { Values } from "@/components/portfolio/Values";
import { Featured } from "@/components/portfolio/Featured";
import { Projects } from "@/components/portfolio/Projects";
import { Process } from "@/components/portfolio/Process";
import { Services } from "@/components/portfolio/Services";
import { Stack } from "@/components/portfolio/Stack";
import { Testimonials } from "@/components/portfolio/Testimonials";
import { FAQ } from "@/components/portfolio/FAQ";
import { Contact } from "@/components/portfolio/Contact";
import { Footer } from "@/components/portfolio/Footer";
import { LanguageModal } from "@/components/portfolio/LanguageModal";

const Index = () => {
  return (
    <I18nProvider>
      <LenisProvider>
        {/* Persistent WebGL canvas — fixed behind all content */}
        <Scene />

        {/* Morphing custom cursor (desktop only) */}
        <MagneticCursor />

        {/* Counter-scrolling Kinetic Typography Pillars & Mobile Progress Bar */}
        <KineticPillars />

        {/* All content sits above the WebGL canvas via z-index */}
        <main className="relative min-h-screen" style={{ zIndex: 1 }}>
          <Navbar />
          <Hero />
          <Stats />
          <About />
          <Values />
          <Featured />
          <Projects />
          <Process />
          <Services />
          <Stack />
          <Testimonials />
          <FAQ />
          <Contact />
          <Footer />
          <LanguageModal />
        </main>
      </LenisProvider>
    </I18nProvider>
  );
};

export default Index;
