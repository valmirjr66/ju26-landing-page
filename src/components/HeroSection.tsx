import artInstrument1 from "@/assets/art_instruments/art_instrument_1.png";
import artInstrument10 from "@/assets/art_instruments/art_instrument_10.png";
import artInstrument11 from "@/assets/art_instruments/art_instrument_11.png";
import artInstrument12 from "@/assets/art_instruments/art_instrument_12.png";
import artInstrument13 from "@/assets/art_instruments/art_instrument_13.png";
import artInstrument2 from "@/assets/art_instruments/art_instrument_2.png";
import artInstrument3 from "@/assets/art_instruments/art_instrument_3.png";
import artInstrument4 from "@/assets/art_instruments/art_instrument_4.png";
import artInstrument5 from "@/assets/art_instruments/art_instrument_5.png";
import artInstrument6 from "@/assets/art_instruments/art_instrument_6.png";
import artInstrument7 from "@/assets/art_instruments/art_instrument_7.png";
import artInstrument8 from "@/assets/art_instruments/art_instrument_8.png";
import artInstrument9 from "@/assets/art_instruments/art_instrument_9.png";
import textureNature from "@/assets/background_media/texture_nature_yellow.svg";
import horizontalLogo from "@/assets/icons/horizontal_logo.png";
import whatsappIcon from "@/assets/icons/whatsapp.svg";
import juPortrait1 from "@/assets/photos/ju_portrait_1.png";
import juPortrait2 from "@/assets/photos/ju_portrait_2.png";
import { useEffect, useState } from "react";
import InstagramIcon from "./shared/InstagramIcon";

const PORTRAITS = [juPortrait1, juPortrait2] as const;
const SWAP_INTERVAL_MS = 3000;

const ART_INSTRUMENTS = [
  {
    src: artInstrument1,
    className:
      "-left-[10%] top-[4%] w-[28vw] -rotate-[20deg] md:left-[4%] md:top-[8%] md:w-[18vw] lg:left-[6%] lg:w-[15vw]",
  },
  {
    src: artInstrument2,
    className:
      "-right-[12%] top-[2%] w-[26vw] rotate-[16deg] md:right-[4%] md:top-[6%] md:w-[17vw] lg:right-[6%] lg:w-[14vw]",
  },
  {
    src: artInstrument3,
    className:
      "-left-[14%] top-[30%] w-[22vw] rotate-[32deg] md:left-[6%] md:top-[28%] md:w-[12vw] lg:left-[8%] lg:w-[10vw]",
  },
  {
    src: artInstrument4,
    className:
      "-right-[10%] top-[28%] w-[20vw] -rotate-[12deg] md:right-[6%] md:top-[26%] md:w-[12vw] lg:right-[8%] lg:w-[10vw]",
  },
  {
    src: artInstrument5,
    className:
      "left-[16%] top-[-8%] w-[22vw] rotate-[50deg] md:left-[20%] md:top-[2%] md:w-[13vw] lg:left-[22%] lg:w-[11vw]",
  },
  {
    src: artInstrument6,
    className:
      "-left-[10%] bottom-[20%] w-[24vw] -rotate-[10deg] md:left-[4%] md:bottom-[20%] md:w-[15vw] lg:left-[6%] lg:w-[13vw]",
  },
  {
    src: artInstrument7,
    className:
      "-right-[12%] bottom-[18%] w-[26vw] rotate-[8deg] md:right-[4%] md:bottom-[18%] md:w-[16vw] lg:right-[6%] lg:w-[14vw]",
  },
  {
    src: artInstrument8,
    className:
      "-left-[8%] top-[52%] w-[24vw] rotate-[22deg] md:left-[8%] md:top-[48%] md:w-[14vw] lg:left-[10%] lg:w-[12vw]",
  },
  {
    src: artInstrument9,
    className:
      "-right-[8%] top-[50%] w-[22vw] -rotate-[18deg] md:right-[8%] md:top-[46%] md:w-[13vw] lg:right-[10%] lg:w-[11vw]",
  },
  {
    src: artInstrument10,
    className:
      "left-[4%] bottom-[-6%] w-[26vw] -rotate-[6deg] md:left-[14%] md:bottom-[2%] md:w-[15vw] lg:left-[16%] lg:w-[13vw]",
  },
  {
    src: artInstrument11,
    className:
      "left-[50%] top-[-10%] w-[22vw] rotate-[12deg] md:left-[52%] md:top-[2%] md:w-[13vw] lg:left-[50%] lg:w-[11vw]",
  },
  {
    src: artInstrument12,
    className:
      "right-[6%] bottom-[-4%] w-[24vw] rotate-[6deg] md:right-[14%] md:bottom-[2%] md:w-[14vw] lg:right-[16%] lg:w-[12vw]",
  },
  {
    src: artInstrument13,
    className:
      "left-[6%] top-[62%] w-[20vw] -rotate-[28deg] md:left-[12%] md:top-[58%] md:w-[11vw] lg:left-[14%] lg:w-[10vw]",
  },
] as const;

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
      <div
        className="pointer-events-none absolute inset-0 z-0 overflow-hidden"
        aria-hidden="true"
      >
        <div className="relative mx-auto h-full w-full max-w-[44rem] lg:max-w-[50rem] xl:max-w-[54rem] 2xl:max-w-[58rem]">
          {ART_INSTRUMENTS.map(({ src, className }, index) => (
            <div
              key={src}
              className={`absolute max-w-[8.5rem] md:max-w-[14rem] ${className}`}
            >
              <img
                src={src}
                alt=""
                draggable={false}
                className="art-instrument-sway h-auto w-full object-contain select-none"
                style={{
                  animationDelay: `${-index * 0.23}s`,
                  animationDirection:
                    index % 2 === 0 ? "alternate" : "alternate-reverse",
                }}
              />
            </div>
          ))}
        </div>
      </div>

      {PORTRAITS.map((src, index) => (
        <img
          key={src}
          src={src}
          id={"hero-ju-portrait"}
          alt="JU 5037 - Candidata a Deputada Federal"
          aria-hidden={index !== activeIndex}
          className="absolute inset-0 z-[1] m-auto h-full object-cover transition-opacity duration-700 ease-in-out"
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
