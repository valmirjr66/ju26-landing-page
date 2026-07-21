import backgroundVideo from "@/assets/background_media/loop_video_2.mp4";
import timelinePhoto1 from "@/assets/photos/timeline_1.png";
import timelinePhoto2 from "@/assets/photos/timeline_2.png";
import timelinePhoto3 from "@/assets/photos/timeline_3.png";
import timelinePhoto4 from "@/assets/photos/timeline_4.png";
import timelinePhoto5 from "@/assets/photos/timeline_5.png";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/shared/dialog";
import { useState } from "react";

function TimelineItem({
  img,
  imgAlt,
  text,
  reverseOrder = false,
  suppressMarginBottom = false,
}: {
  img: string;
  imgAlt: string;
  text: string;
  reverseOrder?: boolean;
  suppressMarginBottom?: boolean;
}) {
  return (
    <div className={!suppressMarginBottom ? "mb-10" : ""}>
      <img
        src={img}
        alt={imgAlt}
        className={`
      w-36 h-36 object-cover
      ${reverseOrder ? "float-right" : "float-left mb-2 mr-3"}
    `}
      />

      <span className="text-justify">{text}</span>
      <div className="clear-both" />
    </div>
  );
}

export default function WhoAmI() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      <section
        id="who-am-i"
        className="relative w-full py-20 md:py-32 overflow-hidden"
        aria-label="Seção Quem Sou Eu"
      >
        <video
          className="absolute inset-0 w-full h-full object-cover"
          autoPlay
          muted
          loop
          aria-hidden="true"
        >
          <source src={backgroundVideo} type="video/mp4" />
        </video>

        <div className="container mx-auto px-4 max-w-2xl">
          <div
            style={{
              backgroundColor: "var(--primary)",
              opacity: 0.9,
              borderRadius: "1.5rem",
              padding: "2rem",
            }}
          >
            <h3 className="text-center mb-6 text-black">MAIS QUE O VULGO</h3>

            <p className="font-retropix text-black text-justify mb-8 leading-relaxed">
              Eu sou a Ju. Estou há 9 anos na luta coletiva, batalhando por
              justiça social e climática.
              <br />
              <br />
              Iniciei minha trajetória na igreja evangélica, onde aprendi sobre
              amor e coletividade. Apesar da contradição dessa instituição,
              ainda hoje o Jesus negro, da periferia de Nazaré, permanece
              guiando meus passos. Na escola tive professores referências que me
              ensinaram a ser crítica sobre a desigualdade brasileira.
              <br />
              <br />
              Mas foi na faculdade de medicina que iniciei minha trajetória como
              sujeito político. Fiz parte da DENEM, do Diretório Acadêmico e
              nessa jornada, também conheci a Juventude Manifesta, que me
              ensina, me transforma e me transborda ainda hoje.
              <br />
              <br />A partir da sede de mudança que a Manifesta me instigou e de
              mulheres que tornaram-se minhas referências, iniciei minha jornada
              no Hip Hop, movimento cultural que me trouxe o freestyle como
              ferramenta para mudar o mundo.
            </p>

            <div className="flex justify-end">
              <button
                onClick={() => setIsModalOpen(true)}
                className="vaporwave-button"
                aria-label="Saiba mais sobre MC Ju"
              >
                MEUS CORRES
              </button>
            </div>
          </div>
        </div>
      </section>

      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle className="font-arcade">MEUS CORRES</DialogTitle>
          </DialogHeader>
          <div
            className="py-4 overflow-y-auto font-retropix text-black"
            style={{ maxHeight: 400 }}
          >
            <TimelineItem
              img={timelinePhoto1}
              imgAlt="Ju photo 1"
              text="Em 2019 iniciei minha caminhada na DENEM, no movimento estudantil,
              entidade que me fez entender meu lugar na medicina. Aprendi que saúde
              vai muito além de bem estar social, mental e físico. Aprendi que saúde
              é justiça social e que para promovê-la, nosso povo necessita de políticas
              públicas fortalecidas. Aprendi que nossa atuação dentro do consultório
              é insuficiente, e, por isso, a mão que cuida, também deve lutar."
            />

            <TimelineItem
              reverseOrder
              img={timelinePhoto2}
              imgAlt="Ju photo 2"
              text="A pandemia foi um momento desafiador para nosso povo, principalmente
              com o desgoverno promove do negacionismo, desinformação e irresponsabilidade.
              Foram, pelo menos, 400 mil lutos evitáveis. E, mesmo exaustas, fizemos o
              luto virar luta. Ocupamos as ruas pelo Fora Bolsonaro, junto com o movimento
              estudantil de medicina, utilizando máscaras, distanciamento social e álcool 70%."
            />

            <TimelineItem
              img={timelinePhoto3}
              imgAlt="Ju photo 3"
              text="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
                enim ad minim veniam, quis nostrud exercitation ullamco laboris
                nisi ut aliquip ex ea commodo consequat. Lorem ipsum dolor sit
                amet, consectetur adipiscing elit."
            />

            <TimelineItem
              reverseOrder
              img={timelinePhoto4}
              imgAlt="Ju photo 4"
              text="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
                enim ad minim veniam, quis nostrud exercitation ullamco laboris
                nisi ut aliquip ex ea commodo consequat. Lorem ipsum dolor sit
                amet, consectetur adipiscing elit."
            />

            <TimelineItem
              suppressMarginBottom
              img={timelinePhoto5}
              imgAlt="Ju photo 5"
              text="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
                enim ad minim veniam, quis nostrud exercitation ullamco laboris
                nisi ut aliquip ex ea commodo consequat. Lorem ipsum dolor sit
                amet, consectetur adipiscing elit."
            />
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}
