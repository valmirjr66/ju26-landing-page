import previewVideo from "@/assets/background_media/loop_video.mp4";
import textureNature from "@/assets/background_media/texture_nature_yellow.svg";
import horizontalLogo from "@/assets/icons/horizontal_logo.png";
import playIcon from "@/assets/icons/play.svg";
import { DotLottieReact } from "@lottiefiles/dotlottie-react";
import { useState } from "react";

export default function HeroSection() {
  const [isVideoOpen, setIsVideoOpen] = useState(false);

  return (
    <>
      <section
        id="hero"
        className="relative flex h-screen min-h-screen w-full flex-col items-center justify-end overflow-hidden pb-15"
        aria-label="Hero section - JU 5037"
        style={{
          backgroundImage: `url(${textureNature})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundColor: "#ef7a1e",
        }}
      >
        {/* Preview video */}
        <video
          className="absolute inset-0 h-full w-full object-cover"
          src={previewVideo}
          autoPlay
          muted
          loop
          playsInline
          aria-hidden="true"
        />

        {/* Optional overlay to improve contrast */}
        <div
          className="absolute inset-0 bg-black/80"
          aria-hidden="true"
          onClick={() => setIsVideoOpen(true)}
        />

        <h1
          className="absolute top-5 m-0 w-full max-w-full leading-none text-[0]"
          onClick={() => setIsVideoOpen(true)}
        >
          <img
            src={horizontalLogo}
            alt="JU 5037"
            className="mx-auto h-auto max-h-[min(12svh,5rem)] w-auto max-w-[65%] object-contain drop-shadow-[3px_3px_4px_rgba(0,0,0,0.5)] sm:max-h-[min(14svh,6rem)] md:max-h-[min(16svh,7rem)] md:max-w-[32rem] lg:max-h-[min(18svh,8rem)] lg:max-w-[38rem]"
          />
        </h1>

        {/* Center play button */}
        <button
          type="button"
          onClick={() => setIsVideoOpen(true)}
          className="group absolute top-1/2 left-1/2 z-10 -translate-x-1/2 -translate-y-1/2 opacity-50 transition-transform duration-300 hover:scale-110 focus:ring-4 focus:ring-white/50 focus:outline-none"
          aria-label="Assistir ao vídeo"
        >
          <img
            src={playIcon}
            alt="play"
            aria-hidden="true"
            className="size-[clamp(3rem,11vw,6rem)] object-contain drop-shadow-[3px_3px_4px_rgba(0,0,0,0.5)] transition-transform duration-300 group-hover:scale-110"
          />
        </button>

        <button
          id="watch-now"
          type="button"
          onClick={() => setIsVideoOpen(true)}
          className="cta-button-pulse font-paper-crease relative z-10 rounded-xl border-3 px-5 py-2 text-[clamp(1.5rem,3.5vw,2.75rem)] transition-transform hover:scale-105 focus:ring-4 focus:ring-white/50 focus:outline-none"
          aria-label="Assistir ao vídeo"
          style={{
            color: "#e0b423",
            borderColor: "#e0b423",
            backgroundColor: "#4a2583",
          }}
        >
          Assistir agora
          <span
            className="absolute right-0 bottom-0 size-[clamp(4rem,15vw,7rem)] translate-x-[45%] translate-y-[55%]"
            aria-hidden="true"
          >
            <DotLottieReact
              src="/click.lottie"
              autoplay
              loop
              style={{
                width: "100%",
                height: "100%",
                filter: "drop-shadow(1px 1px 2px rgba(0, 0, 0, 0.4))",
              }}
            />
          </span>
        </button>
      </section>

      {/* YouTube overlay */}
      {isVideoOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 p-4"
          role="dialog"
          aria-modal="true"
          aria-label="Vídeo"
          onClick={() => setIsVideoOpen(false)}
        >
          <div
            className="relative aspect-video w-full max-w-6xl"
            onClick={event => event.stopPropagation()}
          >
            <iframe
              className="h-full w-full"
              src="https://www.youtube.com/embed/9JvN6de5qeU?autoplay=1"
              title="JU MC 037"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              referrerPolicy="strict-origin-when-cross-origin"
              allowFullScreen
              style={{ border: "none" }}
            />

            <button
              type="button"
              onClick={() => setIsVideoOpen(false)}
              className="absolute -top-12 -right-2 flex h-10 w-10 items-center justify-center rounded-full bg-black/70 text-2xl text-white hover:bg-black"
              aria-label="Fechar vídeo"
            >
              ×
            </button>
          </div>
        </div>
      )}
    </>
  );
}
