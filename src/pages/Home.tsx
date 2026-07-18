import Hero from "@/components/Hero";
import Layout from "@/components/Layout";
import WhoAmI from "@/components/WhoAmI";
import Agenda from "@/components/Agenda";
import SupportForm from "@/components/SupportForm";
import Footer from "@/components/Footer";

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
