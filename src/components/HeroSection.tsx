import backgroundVideo from "@/assets/background_media/loop_video_1.mp4";
import juPhoto from "@/assets/photos/ju_portrait_1.png";
import InstagramIcon from "./shared/InstagramIcon";

export default function HeroSection() {
  return (
    <section
      id="hero"
      className="relative w-full h-screen min-h-screen flex flex-col items-center justify-center overflow-hidden"
      aria-label="Hero section - Ju MC 037"
    >
      <video
        className="absolute inset-0 w-full h-full object-cover"
        autoPlay
        playsInline
        muted
        loop
        aria-hidden="true"
      >
        <source src={backgroundVideo} type="video/mp4" />
      </video>

      <img
        src={juPhoto}
        id="hero-main-photo"
        alt="Ju MC - Pré-candidata a Deputada Federal"
        className="absolute inset-0 h-full object-cover m-auto"
      />

      {/* Dark Overlay for Text Contrast */}
      <div className="absolute inset-0 bg-black/30" aria-hidden="true" />

      <div className="absolute bottom-2 z-10 flex flex-col items-center justify-center w-full px-4 text-center">
        <h1
          className="text-white mb-1 md:mb-1.5"
          style={{ textShadow: "5px 5px 5px rgba(0, 0, 0, 0.5)" }}
        >
          @jumc037
        </h1>

        <h2
          className="text-white mb-2 md:mb-3 font-normal"
          style={{ textShadow: "5px 5px 5px rgba(0, 0, 0, 0.5)" }}
        >
          Candidata a Deputada Federal
        </h2>

        {/* 
        TODO: uncomment this
        <div
          className="px-2 md:px-4 py-1 md:py-2 mb-1 md:mb-2 shadow-lg"
          style={{ backgroundColor: "rgb(253, 224, 71)" }}
        >
          <p className="font-retropix text-base md:text-lg font-bold text-black">
            Arte, Audácia e Afeto
          </p>
        </div> */}

        <div className="flex mb-1">
          <InstagramIcon />
          {/* TODO: uncomment snippet bellow
          <a
            href="https://wa.me"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Contato via WhatsApp"
            className="icon-button ml-6"
          >
            <img
              src={whatsappIcon}
              alt="WhatsApp"
              className="w-10 h-10 md:w-12 md:h-12 hover:scale-110 transition-transform"
            />
          </a> */}
        </div>

        <svg
          className="w-6 h-6 text-white animate-bounce"
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
