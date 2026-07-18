import Agenda from "@/components/Agenda";
import Footer from "@/components/Footer";
import Hero from "@/components/Hero";
import Layout from "@/components/Layout";
import SupportForm from "@/components/SupportForm";
import WhoAmI from "@/components/WhoAmI";

export default function Home() {
  return (
    <div className="w-full min-h-screen bg-white">
      <Layout />

      <main id="main-content" className="w-full">
        <Hero />
        <WhoAmI />
        <Agenda />
        <SupportForm />
      </main>

      <Footer />
    </div>
  );
}
