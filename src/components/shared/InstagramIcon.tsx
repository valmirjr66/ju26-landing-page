import instagramIcon from "@/assets/icons/instagram.svg";

export default function InstagramIcon() {
  return (
    <a
      href="https://instagram.com/jumc5037"
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Seguir no Instagram"
      className="icon-button"
    >
      <img
        src={instagramIcon}
        alt="Instagram"
        className="h-5 w-5 transition-transform hover:scale-110 md:h-6 md:w-6"
      />
    </a>
  );
}
