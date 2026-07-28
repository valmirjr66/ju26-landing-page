import backgroundVideo from "@/assets/background_media/loop_video_2.mp4";
import timelinePhoto1 from "@/assets/photos/timeline_1.jpg";
import timelinePhoto2 from "@/assets/photos/timeline_2.jpg";
import timelinePhoto3 from "@/assets/photos/timeline_3.jpg";
import timelinePhoto4 from "@/assets/photos/timeline_4.jpg";
import timelinePhoto5 from "@/assets/photos/timeline_5.jpg";
import timelinePhoto6 from "@/assets/photos/timeline_6.jpg";
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

export default function WhoAmISection() {
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
              Nasci e cresci em berço evangélico, onde aprendi sobre amor e
              coletividade. Apesar da contradição da instituição Igreja, ainda
              hoje o Jesus negro, amoroso, da periferia de Nazaré, permanece
              guiando meus passos. Já interpretando o mundo pela ótica do amor,
              tive referências intelectuais que me ensinaram a ser crítica sobre
              a realidade.
              <br />
              <br />
              Apesar disso, faltava movimento. Somente fazendo medicina na UIT,
              há quase 10 anos atrás, começo a me organizar em coletivos. Fiz
              parte da DENEM, do DALASS e dos coletivos de mulheres Nise da
              Silveira e LGBTQIAPN+ Indianara Siqueira.
              <br />
              <br />
              Mas foi um dos poucos mediciners negros da UIT que mudou o rumo da
              minha vida. Ele me convidou pra uma reunião do PSOL e me aplicou
              no rap. Assim, me encontrei politicamente no PSOL e na Juventude
              Manifesta, onde me forjo liderança na prática.
              <br />
              <br />
              Já amando o rap e querendo conhecer outros jovens na minha cidade,
              descobri o Culture, um bar que reunia todo tipo de galera.
              Inclusive as mina do hip hop. E foi assim, há 4 anos atrás, que me
              tornei artista e produtora cultural.
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
              imgAlt="Ju construindo com a DENEM (Direção Executiva Nacional dos Estudantes de Medicina)"
              text="Em 2019 iniciei minha caminhada na DENEM (Direção Executiva Nacional
              dos Estudantes de Medicina), no movimento estudantil,
              entidade que me fez entender meu lugar na medicina. Aprendi que saúde
              vai muito além de bem estar social, mental e físico. Aprendi que saúde
              é justiça social e que, para promovê-la, nosso povo necessita de políticas
              públicas fortalecidas. Aprendi que nossa atuação dentro do consultório
              é insuficiente, e, por isso, a mão que cuida também deve lutar."
            />

            <TimelineItem
              reverseOrder
              img={timelinePhoto2}
              imgAlt="Ju fazendo uma fala de máscara durante a pandemia"
              text="A pandemia foi um momento desafiador para nosso povo, principalmente
              com o desgoverno que promovia negacionismo, desinformação e irresponsabilidade.
              Foram, pelo menos, 400 mil mortes evitáveis. E, mesmo exaustas, fizemos o
              luto virar luta. Ocupamos as ruas pelo Fora Bolsonaro, junto com o movimento
              estudantil de medicina, utilizando máscaras, distanciamento social e álcool 70%."
            />

            <TimelineItem
              img={timelinePhoto3}
              imgAlt="Ju de beca em sua formatura da universidade"
              text="Foram 6 anos de muito estudo, luta e aprendizado na Universidade de Itaúna.
              Em 2023 finalmente me formei. Apesar do autoritarismo da reitoria, da ausência
              de escuta e construção conjunta com os alunos e dos aumentos abusivos de
              mensalidade, me formei médica. Apesar da falta de estágios e campos de prática,
              aprendi a cuidar. E hoje, no consultório, curo quando possível, geralmente alivio
              e acolho sempre. Na contramão do corporativismo, escolho ser humana."
            />

            <TimelineItem
              reverseOrder
              img={timelinePhoto4}
              imgAlt="Ju fazendo uma fala na câmara de vereadores de Itaúna"
              text="Quando meus caminhos se cruzam com a Juventude Manifesta e com o PSOL,
              me conecto com a cidade, pois nossa política exige que façamos luta em nosso
              território, para além dos muros da Universidade. Participei de audiências
              públicas sobre juventudes, reuniões sobre orçamento, posicionamentos em
              sessões ordinárias da câmara. Também estive na rua construindo o Fora Bolsonaro,
              o Tarifa Zero, atos pela democracia após o 08 de janeiro, contra a PEC da
              bandidagem e pelo fim da escala 6x1."
            />

            <TimelineItem
              img={timelinePhoto6}
              imgAlt="Ju photo 6"
              text="Após seis meses acompanhando a cena de batalhas da minha cidade, no
              início de 2023, Ahtay disse “Amiga, falta um MC pra fechar a chave. O Hip
              Hop tá precisando de você”. E até hoje respondo a esse chamado com disposição.
              Viajo as cidades do centro-oeste e região metropolitana batalhando, articulando
              e representando as mulheres da cena. Organizo batalhas em Itaúna, como
              a 1314RAP e a Manifesta Rap, dos poucos espaços de lazer acessível para
              a juventude periférica."
            />

            <TimelineItem
              reverseOrder
              img={timelinePhoto5}
              imgAlt='Ju em sua candidatura de 2024 defendendo o "Tarifa Zero Já"'
              text="Após dois anos de mobilizações antifascistas e vigilância democrática
              durante o período Bolsonaro e dois anos de reconstrução do país a partir de
              políticas públicas durante Lula 3, em 2024 o PSOL Itaúna tinha o desafio de
              apresentar nossos acúmulos nas eleições municipais. Apresentamos candidaturas
              que defenderam o tarifa zero, o fomento da cultura e o preparo da nossa cidade
              para receber a crise climática."
              suppressMarginBottom
            />
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}
