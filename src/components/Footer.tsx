import whatsappIcon from "@/assets/icons/whatsapp.svg";
import InstagramIcon from "./shared/InstagramIcon";

export default function Footer() {
  return (
    <footer
      className="w-full py-6 md:py-8"
      aria-label="Rodapé"
      style={{ backgroundColor: "#4d2a64" }}
    >
      <div className="container mx-auto px-12 md:px-14">
        <div className="flex flex-col items-center justify-between gap-8 md:flex-row">
          <div className="flex-1 text-center md:text-left">
            <div className="mb-2 flex items-center justify-center gap-4 md:justify-start">
              <h4 className="text-2xl text-white">JU 5037</h4>

              <div className="flex items-center gap-4">
                <InstagramIcon />

                <a
                  href="https://chat.whatsapp.com/FkJKTafjgb67w1chNIN8wE?s=sw&p=i&mlu=4&amv=1"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Contato via WhatsApp"
                  className="icon-button"
                >
                  <img
                    src={whatsappIcon}
                    alt="WhatsApp"
                    className="h-5 w-5 transition-transform hover:scale-110 md:h-6 md:w-6"
                  />
                </a>
              </div>
            </div>

            <p className="text-white">Candidata a Deputada Federal</p>
            <p className="text-white">contato@ju5037.com</p>
          </div>

          <div className="flex-shrink-0 text-white">FEDERAÇÃO PSOL-REDE</div>
        </div>

        <hr className="my-2 border-white/20" />

        <div className="text-center text-sm text-white">
          <p>
            Desenvolvido com ❤️ para uma campanha cheia de ARTE, AUDÁCIA E
            AFETO.
          </p>
        </div>
      </div>
    </footer>
  );
}
