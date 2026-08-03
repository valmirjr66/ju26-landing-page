import psolIcon from "@/assets/icons/psol.svg";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="w-full py-6 md:py-8" aria-label="Rodapé">
      <div className="container mx-auto px-4">
        <div className="flex flex-col items-center justify-between gap-8 md:flex-row">
          <div className="flex-1 text-center md:text-left">
            <h4 className="font-arcade mb-2 text-2xl text-black">JU MC 037</h4>
            <p className="font-retropix text-black">
              Candidata a Deputada Federal
            </p>
            <p className="font-retropix text-black">contato@jumc037.com</p>
            <p className="font-retropix text-black">
              Copyright © {currentYear}
            </p>
          </div>

          <div className="flex-shrink-0">
            <img
              src={psolIcon}
              alt="PSOL - Partido Socialismo e Liberdade"
              className="h-20 w-20 object-contain md:h-28 md:w-28"
            />
          </div>
        </div>

        <hr className="my-2 border-black/20" />

        <div className="font-retropix text-center text-sm text-black">
          <p>
            Desenvolvido com 🩷 para uma campanha cheia de arte, audácia e afeto
          </p>
        </div>
      </div>
    </footer>
  );
}
