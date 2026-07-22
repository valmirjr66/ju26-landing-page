import backgroundImage from "@/assets/background_media/vaporwave_road.png";

export default function Playlist() {
  return (
    <section
      id="playlist-embed"
      className="relative w-full py-20 md:py-32 overflow-hidden"
      aria-label="Seção Playlist"
      style={{
        backgroundImage: `url(${backgroundImage})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div className="container mx-auto px-4 max-w-xl md:max-w-2xl">
        <h3 className="text-center mb-12 text-white">
          UMA PLAYLIST FALA MAIS QUE MIL PALAVRAS
        </h3>
        <iframe
          data-testid="embed-iframe"
          style={{ borderRadius: 12 }}
          src="https://open.spotify.com/embed/playlist/2yLDLpE5k5kt578B4e9iPd?utm_source=generator&theme=0&si=053c2d49c3014213"
          width="100%"
          height={352}
          allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
          loading="lazy"
        ></iframe>
      </div>
    </section>
  );
}
