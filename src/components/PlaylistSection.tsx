import backgroundImage from "@/assets/background_media/textura_leaves.svg";

export default function PlaylistSection() {
  return (
    <section
      id="playlist-embed"
      className="relative w-full overflow-hidden py-20 md:py-32"
      aria-label="Seção Playlist"
      style={{
        backgroundImage: `url(${backgroundImage})`,
        backgroundSize: "cover",
        backgroundPosition: "bottom",
        backgroundColor: "#32776b",
      }}
    >
      <div className="container mx-auto max-w-xl px-4 md:max-w-2xl">
        <h2 className="white-stroke-effect mb-12 text-center text-black">
          UMA PLAYLIST FALA MAIS QUE MIL PALAVRAS
        </h2>
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
