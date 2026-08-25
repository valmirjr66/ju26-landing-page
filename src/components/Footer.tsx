import backgroundImage from "@/assets/background_media/texture_grunge.png";
import psolIcon from "@/assets/icons/psol.svg";

export default function Footer() {
  return (
    <footer
      className="w-full py-6 md:py-8"
      aria-label="Rodapé"
      style={{
        backgroundColor: "#4d2a64",
        backgroundImage: `url(${backgroundImage})`,
        backgroundSize: "cover",
      }}
    >
      <div className="container mx-auto px-12 md:px-14">
        <div className="flex flex-col items-center justify-between gap-8 md:flex-row">
          <div className="flex-1 text-center md:text-left">
            <h4 className="mb-2 text-2xl text-white">JU 5037</h4>
            <p className="text-white">Candidata a Deputada Federal</p>
            <p className="text-white">contato@ju5037.com</p>
          </div>

          <div className="flex-shrink-0">
            <img
              src={psolIcon}
              alt="PSOL - Partido Socialismo e Liberdade"
              className="h-20 w-20 object-contain md:h-28 md:w-28"
            />
          </div>
        </div>

        <hr className="my-2 border-white/20" />

        <div className="text-center text-sm text-white">
          <p>
            Desenvolvido com ❤️ para uma campanha cheia de arte, audácia e afeto.
          </p>
        </div>
      </div>
    </footer>
  );
}
