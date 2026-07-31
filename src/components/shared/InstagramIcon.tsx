import instagramIcon from "@/assets/icons/instagram.png";

export default function InstagramIcon() {
  return (
    <a
      href="https://instagram.com/jumc037"
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Seguir no Instagram"
      className="icon-button"
    >
      <img
        src={instagramIcon}
        alt="Instagram"
        className="h-10 w-10 transition-transform hover:scale-110"
      />
    </a>
  );
}
