import { I18nProvider } from "@/i18n/I18nProvider";
import { Blobs } from "@/components/portfolio/Blobs";
import { Navbar } from "@/components/portfolio/Navbar";
import { Hero } from "@/components/portfolio/Hero";
import { Values } from "@/components/portfolio/Values";
import { Featured } from "@/components/portfolio/Featured";
import { Projects } from "@/components/portfolio/Projects";
import { Services } from "@/components/portfolio/Services";
import { Stack } from "@/components/portfolio/Stack";
import { Contact } from "@/components/portfolio/Contact";
import { Footer } from "@/components/portfolio/Footer";
import { LanguageModal } from "@/components/portfolio/LanguageModal";

const Index = () => {
  return (
    <I18nProvider>
      <main className="relative min-h-screen">
        <Blobs />
        <Navbar />
        <Hero />
        <Values />
        <Featured />
        <Projects />
        <Services />
        <Stack />
        <Contact />
        <Footer />
        <LanguageModal />
      </main>
    </I18nProvider>
  );
};

export default Index;
