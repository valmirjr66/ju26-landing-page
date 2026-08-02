import backgroundImage from "@/assets/background_media/cloudy_sky.jpg";
import stickerIcon from "@/assets/icons/sticker.png";
import whatsappIcon from "@/assets/icons/whatsapp.png";
import { useEffect, useState } from "react";

export default function Layout() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      // Show header after scrolling past hero
      const heroHeight = window.innerHeight;
      setIsVisible(window.scrollY > heroHeight * 0.8);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <>
      <header
        className={`fixed top-0 right-0 left-0 z-40 transition-all duration-300 ease-out ${
          isVisible
            ? "translate-y-0 opacity-100"
            : "-translate-y-full opacity-0"
        }`}
        style={{
          backgroundImage: `url(${backgroundImage})`,
          backgroundSize: "cover",
          animation: "header-background-pan 8s ease-in-out infinite",
          pointerEvents: isVisible ? "auto" : "none",
          boxShadow: "0px 0px 20px black",
        }}
      >
        <div className="relative h-20">
          <button
            onClick={scrollToTop}
            aria-label="Voltar ao topo"
            title="Voltar ao topo"
            className="absolute top-0 left-1/2 -translate-x-1/2"
          >
            <img
              id="header-sticker"
              src={stickerIcon}
              alt="Voltar ao topo"
              className="h-24 w-24 origin-top transition-transform hover:scale-110"
            />
          </button>
        </div>
      </header>

      <a
        href="https://chat.whatsapp.com/FkJKTafjgb67w1chNIN8wE?s=sw&p=i&mlu=4&amv=1"
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Contato via WhatsApp"
        className={`icon-button fixed right-6 bottom-6 z-40 transition-all duration-300 ease-out ${isVisible ? "translate-y-0 opacity-100" : "-translate-y-full opacity-0"}`}
      >
        <img
          src={whatsappIcon}
          alt="WhatsApp"
          className="h-12 w-12 drop-shadow-lg transition-transform hover:scale-110"
          style={{
            animation: "pulse 2s infinite",
          }}
        />
      </a>
    </>
  );
}
