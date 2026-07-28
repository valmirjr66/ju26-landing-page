import AgendaSection from "@/components/AgendaSection";
import Footer from "@/components/Footer";
import HeroSection from "@/components/HeroSection";
import Layout from "@/components/Layout";
import PlaylistSection from "@/components/PlaylistSection";
import SupportSection from "@/components/SupportSection";
import WhoAmISection from "@/components/WhoAmISection";

export default function Home() {
  return (
    <div className="w-full min-h-screen bg-white">
      <a href="#main-content" className="skip-to-content">
        Pular para o conteúdo principal
      </a>

      <Layout />

      <main id="main-content" className="w-full">
        <HeroSection />
        <AgendaSection />
        <WhoAmISection />
        <SupportSection />
        <PlaylistSection />
      </main>

      <Footer />
    </div>
  );
}
