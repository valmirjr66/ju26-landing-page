import textureNature from "@/assets/background_media/texture_nature_yellow.svg";
import horizontalLogo from "@/assets/icons/horizontal_logo.png";
import whatsappIcon from "@/assets/icons/whatsapp.svg";
import juPortrait1 from "@/assets/photos/ju_portrait_1.png";
import juPortrait2 from "@/assets/photos/ju_portrait_2.png";
import { useEffect, useState } from "react";
import InstagramIcon from "./shared/InstagramIcon";

const PORTRAITS = [juPortrait1, juPortrait2] as const;
const SWAP_INTERVAL_MS = 3000;

export default function HeroSection() {
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const id = window.setInterval(() => {
      setActiveIndex(prev => (prev + 1) % PORTRAITS.length);
    }, SWAP_INTERVAL_MS);

    return () => window.clearInterval(id);
  }, []);

  return (
    <section
      id="hero"
      className="relative flex h-screen min-h-screen w-full flex-col items-center justify-center overflow-hidden"
      aria-label="Hero section - JU 5037"
      style={{
        backgroundImage: `url(${textureNature})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundColor: "#ef7a1e",
      }}
    >
      {PORTRAITS.map((src, index) => (
        <img
          key={src}
          src={src}
          id={"hero-ju-portrait"}
          alt="JU 5037 - Candidata a Deputada Federal"
          aria-hidden={index !== activeIndex}
          className="absolute inset-0 m-auto h-full object-cover transition-opacity duration-700 ease-in-out"
          style={{
            opacity: index === activeIndex ? 1 : 0,
          }}
        />
      ))}

      <div
        id="header-collection"
        className="absolute bottom-8 z-10 flex w-full flex-col items-center justify-center px-4 text-center md:bottom-12"
      >
        <h1 className="m-0 w-full max-w-full leading-none text-[0]">
          <img
            src={horizontalLogo}
            alt="JU 5037"
            width={1080}
            height={426}
            className="mx-auto h-auto max-h-[min(17.6svh,8rem)] w-auto max-w-[80%] object-contain drop-shadow-[5px_5px_5px_rgba(0,0,0,0.5)] sm:max-h-[min(20.8svh,9.6rem)] md:max-h-[min(24svh,12.8rem)] md:max-w-[44.8rem] lg:max-h-[min(25.6svh,14.4rem)] lg:max-w-[51.2rem]"
          />
        </h1>
        <h3
          className="mb-2 font-normal text-white md:mb-3"
          style={{ textShadow: "5px 5px 3px rgba(0, 0, 0, 0.8)" }}
        >
          Candidata a Deputada Federal
        </h3>
        <div className="mb-1 flex items-center px-4 py-2">
          <InstagramIcon />
          <a
            href="https://chat.whatsapp.com/FkJKTafjgb67w1chNIN8wE?s=sw&p=i&mlu=4&amv=1"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Contato via WhatsApp"
            className="icon-button ml-6"
          >
            <img
              src={whatsappIcon}
              alt="WhatsApp"
              className="h-10 w-10 transition-transform hover:scale-110 md:h-12 md:w-12"
            />
          </a>
        </div>
        <svg
          className="h-6 w-6 animate-bounce text-white"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          aria-hidden="true"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M19 14l-7 7m0 0l-7-7m7 7V3"
          />
        </svg>
      </div>
    </section>
  );
}
