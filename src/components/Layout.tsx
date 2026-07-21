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
        className={`fixed top-0 left-0 right-0 z-40 shadow-lg transition-all duration-300 ease-out ${
          isVisible
            ? "translate-y-0 opacity-100"
            : "-translate-y-full opacity-0"
        }`}
        style={{
          backgroundColor: "#97EFD5",
          pointerEvents: isVisible ? "auto" : "none",
        }}
        aria-label="Navegação fixa"
      >
        <div className="flex items-center justify-center h-22 px-4">
          <button
            onClick={scrollToTop}
            aria-label="Voltar ao topo"
            className="icon-button"
            title="Voltar ao topo"
          >
            <img
              src={stickerIcon}
              alt="Voltar ao topo"
              className="w-25 h-25 hover:scale-110 transition-transform"
            />
          </button>
        </div>
      </header>

      <a
        href="https://wa.me"
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Contato via WhatsApp"
        className={`fixed bottom-6 right-6 z-40 icon-button transition-all duration-300 ease-out ${isVisible ? "translate-y-0 opacity-100" : "-translate-y-full opacity-0"}`}
      >
        <img
          src={whatsappIcon}
          alt="WhatsApp"
          className="w-12 h-12 hover:scale-110 transition-transform drop-shadow-lg"
          style={{
            animation: "pulse 2s infinite",
          }}
        />
      </a>
    </>
  );
}
