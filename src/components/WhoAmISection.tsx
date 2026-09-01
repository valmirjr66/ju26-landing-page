import backgroundImage from "@/assets/background_media/texture_nature_green.svg";
import timelinePhoto1 from "@/assets/photos/timeline_1.jpg";
import timelinePhoto2 from "@/assets/photos/timeline_2.jpg";
import timelinePhoto3 from "@/assets/photos/timeline_3.jpg";
import timelinePhoto4 from "@/assets/photos/timeline_4.jpg";
import timelinePhoto5 from "@/assets/photos/timeline_5.jpg";
import timelinePhoto6 from "@/assets/photos/timeline_6.jpg";
import timelinePhoto7 from "@/assets/photos/timeline_7.jpg";
import timelinePhoto8 from "@/assets/photos/timeline_8.jpg";
import timelinePhoto9 from "@/assets/photos/timeline_9.jpg";
import {
  Dialog,
  DialogBody,
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
    <div
      className={`text-justify leading-relaxed ${reverseOrder ? "md:pl-8" : "md:pr-8"} ${!suppressMarginBottom ? "mb-10" : ""}`}
    >
      <img
        src={img}
        alt={imgAlt}
        className={`mb-2 h-36 w-36 rounded-sm object-cover ${reverseOrder ? "float-right ml-3 md:ml-4" : "float-left mr-3 md:mr-4"}`}
      />
      {text}
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
        className="relative w-full overflow-hidden py-20 md:py-32"
        aria-label="Seção Quem Sou Eu"
        style={{
          backgroundImage: `url(${backgroundImage})`,
          backgroundSize: "cover",
          backgroundColor: "#32776b",
        }}
      >
        <div className="container mx-auto max-w-2xl px-4">
          <div
            style={{
              backgroundColor: "#f1c325",
              opacity: 0.95,
              borderRadius: "1.5rem",
              padding: "2rem",
            }}
          >
            <h3 className="white-stroke-effect mb-6 text-center text-black">
              MAIS QUE O VULGO
            </h3>

            <p className="mb-8 text-justify leading-relaxed text-black">
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
                className="cta-button"
                aria-label="Saiba mais sobre JU 5037"
              >
                MEUS CORRES
              </button>
            </div>
          </div>
        </div>
      </section>

      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <DialogContent className="border-2 border-white bg-[#4a2583] text-white [&_[data-slot=dialog-close]]:text-white">
          <DialogHeader>
            <DialogTitle className="text-white">MEUS CORRES</DialogTitle>
          </DialogHeader>
          <DialogBody
            className="overflow-y-auto leading-relaxed"
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
              imgAlt="Ju em um protesto de máscara durante a pandemia"
              text="A pandemia foi um momento desafiador para nosso povo, principalmente
              com o desgoverno que promovia negacionismo, desinformação e irresponsabilidade.
              Foram, pelo menos, 400 mil mortes evitáveis. E, mesmo exaustas, fizemos o
              luto virar luta. Ocupamos as ruas pelo Fora Bolsonaro, junto com o movimento
              estudantil de medicina, utilizando máscaras, distanciamento social e álcool 70%."
            />

            <TimelineItem
              img={timelinePhoto3}
              imgAlt="Ju fazendo uma fala em um congresso estudantil"
              text="Participei de alguns congressos estudantis: dois CONUNEs, dois CONUEEs,
              dois CONUBES… Uns ainda como estudante, outros já formada, como dirigente.
              Nesses espaços temos a oportunidade de (re) encontrar a Juventude Manifesta
              que não para de lutar por todo o Brasil, nos reenergizando, trazendo sede de
              luta e sentido de vida. Nesses eventos, já fiz de tudo: cuidei da saúde das
              manifesters, articulei, agitei, representei, falei, dialoguei, gritei e voltei
              pra casa sem voz e com muita vontade."
            />

            <TimelineItem
              reverseOrder
              img={timelinePhoto4}
              imgAlt="Ju de beca em sua formatura da universidade"
              text="Foram 6 anos de muito estudo, luta e aprendizado na Universidade de Itaúna.
              Em 2023 finalmente me formei. Apesar do autoritarismo da reitoria, da ausência
              de escuta e construção conjunta com os alunos e dos aumentos abusivos de
              mensalidade, me formei médica. Apesar da falta de estágios e campos de prática,
              aprendi a cuidar. E hoje, no consultório, curo quando possível, geralmente alivio
              e acolho sempre. Na contramão do corporativismo, escolho ser humana."
            />

            <TimelineItem
              img={timelinePhoto5}
              imgAlt="Ju com outras militantes do PSOL segundo uma bandeira do partido"
              text="Quando meus caminhos se cruzam com a Juventude Manifesta e com o PSOL,
              me conecto com a cidade, pois nossa política exige que façamos luta em nosso
              território, para além dos muros da Universidade. Participei de audiências
              públicas sobre juventudes, reuniões sobre orçamento, posicionamentos em
              sessões ordinárias da câmara. Também estive na rua construindo o Fora Bolsonaro,
              o Tarifa Zero, atos pela democracia após o 08 de janeiro, contra a PEC da
              bandidagem e pelo fim da escala 6x1."
            />

            <TimelineItem
              reverseOrder
              img={timelinePhoto6}
              imgAlt='Ju em sua candidatura de 2024 defendendo o "Tarifa Zero Já"'
              text="Após dois anos de mobilizações antifascistas e vigilância democrática
              durante o período Bolsonaro e dois anos de reconstrução do país a partir de
              políticas públicas durante Lula 3, em 2024 o PSOL Itaúna tinha o desafio de
              apresentar nossos acúmulos nas eleições municipais. Apresentamos candidaturas
              que defenderam o tarifa zero, o fomento da cultura e o preparo da nossa cidade
              para receber a crise climática."
            />

            <TimelineItem
              img={timelinePhoto7}
              imgAlt="Ju em uma batalha de rap"
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
              img={timelinePhoto8}
              imgAlt="Registro de uma das primeiras edições da Manifesta Rap"
              text="Em 2025 a Juventude Manifesta seguiu firme e cada vez mais forte,
              construindo com o hip hop. Percebemos uma grande necessidade de conversas na cena,
              tanto sobre nossas relações, quanto sobre a sociedade; para melhorar nossa vida e
              nossa rima. Assim, nasce a Manifesta Rap em 2025, uma batalha de conhecimento, com
              temas escolhidos pela plateia, sempre precedida por um papo reto. Já conversamos
              sobre “o que é ser hip hop?”, “o papel dos homens no combate à violência”,
              “competitividade tóxica”, “o embranquecimento do Brasil” e
              “os desafios do povo latinoamericano”."
            />

            <TimelineItem
              img={timelinePhoto9}
              imgAlt="Registro da primeira edição da Manifesta 360º"
              text="A Manifesta iniciou o ano de 2026 com tudo, e em fevereiro já propôs
              formações políticas e rap. Como nossa juventude está precarizada na escala 6x1,
              percebemos que o domingo era o melhor dia pra nossa galera participar.
              E a partir dessa leitura da realidade, surge a Manifesta 360º, um evento
              produzido pela Juventude Manifesta que reúne todos os formatos que fazemos.
              Todo mês fazemos uma edição, um entardecer de lazer em praça pública com oficinas,
              formações e muito rap."
              suppressMarginBottom
            />
          </DialogBody>
        </DialogContent>
      </Dialog>
    </>
  );
}
