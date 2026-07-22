import psolIcon from "@/assets/icons/psol.png";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="w-full py-6 md:py-8" aria-label="Rodapé">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="flex-1 text-center md:text-left">
            <h4 className="font-arcade text-2xl text-black mb-2">JU MC 037</h4>
            <p className="font-retropix text-black mb-1">
              Pré-candidata a Deputada Federal
            </p>
            <p className="font-retropix text-black mb-1">contato@jumc037.org</p>
            <p className="font-retropix text-black">
              Copyright © {currentYear}
            </p>
          </div>

          <div className="flex-shrink-0">
            <img
              src={psolIcon}
              alt="PSOL - Partido Socialismo e Liberdade"
              className="w-20 h-20 md:w-28 md:h-28 object-contain"
            />
          </div>
        </div>

        <hr className="my-4 border-black/20" />

        <div className="text-center text-sm font-retropix text-black">
          <p>
            Desenvolvido com 🩷 para uma campanha artística, audaz e afetuosa
          </p>
        </div>
      </div>
    </footer>
  );
}
