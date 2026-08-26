import backgroundImage from "@/assets/background_media/texture_nature_purple.svg";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/shared/dialog";
import { useState } from "react";
import SupportForm from "./shared/SupportForm";

const MANIFESTO_SHORT = `Vivemos em um sistema movido pelo lucro, que estimula o individualismo,
  a exploração do trabalho e da natureza, e a cobrança por uma produtividade sem fim.
  O resultado é grave: uma população sobrecarregada, sem tempo e sem dinheiro,
  enquanto a crise climática avança. Para romper com essa lógica, a candidatura JU5037
  convoca as juventudes, os trabalhadores, as mulheres e a população periférica
  para assumir nossas três principais forças de transformação: Arte, Audácia e Afeto.`;

const MANIFESTO_FULL_PARAGRAPHS = [
  "A gente faz arte cheia de vida pra combater a morte e a destruição.",
  "A gente se recusa a herdar um planeta colapsado.",
  "Nós não vamos negociar aquilo que nos é de direito.",
  "Nossos corpos e corpas irão sacudir as estruturas.",
  "A gente se recusa a fazer política sem enfrentamento.",
  "A gente exige a revolução do agora, pra que o amanhã seja livre.",
  "Nós iremos resistir à destruição de hoje pra que o amanhã seja cheio de vida.",
  `Desde os primeiros passos da humanidade, a linha entre ferramenta e arma sempre foi
  tênue e definida pelo seu uso. A mesma pedra usada para preparar o alimento também podia
  ser usada na disputa por território. Com os séculos, as ferramentas e as armas se tornaram
  mais complexas — da lança e da pólvora até a tecnologia da informação —, transformando
  profundamente a sociedade. Hoje, enfrentamos desafios fundamentais de sobrevivência.
  Em vez de armas de destruição, precisamos de ferramentas de construção e libertação
  para transformar a nossa realidade.`,
  `Vivemos em um sistema movido pelo lucro, que estimula o individualismo, a exploração do
  trabalho e da natureza, e a cobrança por uma produtividade sem fim. No Brasil, o modelo
  agrofinanceiro transfere recursos públicos para o setor financeiro enquanto desvaloriza
  quem trabalha. O resultado é grave: uma população sobrecarregada, trabalhando até 48 horas
  semanais, sem tempo e sem dinheiro. Enquanto isso, a crise climática avança e atinge primeiro
  as periferias, as áreas de risco e quem trabalha sob o sol. Para romper com essa lógica,
  a candidatura JU5037 convoca as juventudes, os trabalhadores, as mulheres e a população periférica
  para assumir nossas três principais forças de transformação: Arte, Audácia e Afeto.`,
  `A nossa primeira força é a ARTE — cultura como ferramenta de transformação social.
  Cultura não é mero entretenimento ou mercadoria; é o terreno onde disputamos ideias e
  visões de mundo. Defenderemos a cultura popular e periférica contra a censura e a repressão,
  protegendo ritmos e expressões como o Funk, o Rap, o Trap e as Batalhas de Rima. Garantiremos
  equidade de gênero e raça na destinação de recursos, para que 50% das verbas e conselhos
  culturais sejam geridos diretamente por mulheres negras periféricas. Lutaremos pela
  transferência direta e permanente de recursos para produtores culturais negros e periféricos,
  além de criar uma Política Nacional da Cultura Hip-Hop para levar a cultura de rua para as
  escolas públicas e implantar Casas do Hip-Hop nas comunidades.`,
  `A nossa segunda força é a AUDÁCIA para priorizar as pessoas à frente do capital.
  Nenhuma atividade econômica pode colocar vidas em risco em nome do lucro. Em Minas Gerais,
  estado marcado pela mineração, exigimos fiscalização rigorosa, transparência e responsabilidade:
  nenhuma empresa pode continuar colocando cidades inteiras em risco. Defendemos uma reforma agrária
  consistente que combata a concentração de terras por meio da expropriação dos grandes latifúndios.
  Lutaremos pelo fim da autonomia do Banco Central — que mantém juros altos para favorecer grandes
  investidores — e pela revogação do Arcabouço Fiscal, garantindo investimentos públicos de no
  mínimo 10% do PIB para a Saúde e 10% para a Educação.`,
  `A nossa terceira força é o AFETO, que se materializa no cuidado, na saúde pública e
  na defesa do meio ambiente. Ter saúde é ter condições de combater aquilo que nos oprime.
  Por isso, fortaleceremos o SUS direcionando investimentos para a Atenção Primária, mais
  próxima da vida das pessoas. Lutaremos pela justiça climática com um Estatuto Nacional que
  priorize investimentos nas periferias, áreas de risco, comunidades quilombolas e povos indígenas.
  Enfrentaremos a lógica manicomial, retirando financiamento de Comunidades Terapêuticas privadas
  para fortalecer a rede pública de saúde mental (CAPS e CERSAMs). Defendemos cidades planejadas
  para as pessoas, transformando áreas abandonadas em parques urbanos, hortas comunitárias
  e espaços de convivência.`,
  `A geração que menos contribuiu para a crise climática é a que mais sofrerá as suas consequências.
  A juventude não quer apenas ser convidada para debates; quer decidir os rumos do país.
  Se você acredita na necessidade de enfrentar as desigualdades e usar a Arte, a Audácia
  e o Afeto para construir essa transformação, junte-se a nós e assine o manifesto.`,
];

export default function SupportSection() {
  const [isManifestoOpen, setIsManifestoOpen] = useState(false);

  return (
    <>
      <section
        id="support-form"
        className="relative w-full overflow-hidden py-20 md:py-32"
        aria-label="Seção Manifesto"
        style={{
          backgroundImage: `url(${backgroundImage})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundColor: "#cc037f",
        }}
      >
        <div className="container mx-auto max-w-xl px-4 lg:max-w-6xl">
          <h2
            className="mb-12 text-center text-white"
            style={{
              textShadow: `-3px -3px 0px rgb(0, 0, 0),
              3px -3px 0px rgb(0, 0, 0),
              -3px 3px 0px rgb(0, 0, 0),
              3px 3px 0px rgb(0, 0, 0)`,
            }}
          >
            COLA COM A GENTE!
          </h2>

          <div
            className="grid grid-cols-1 items-start gap-8 lg:grid-cols-2 lg:gap-12"
            style={{
              backgroundColor: "#f1c325",
              borderRadius: "1.5rem",
              padding: "2rem",
            }}
          >
            <div data-testid="support-manifesto">
              <h3 className="mb-4 text-center text-black lg:text-left">
                Manifesto das armas da revolução
              </h3>

              <p
                className="mb-6 text-justify leading-relaxed text-black"
                data-testid="support-manifesto-excerpt"
              >
                {MANIFESTO_SHORT}
              </p>

              <div className="mb-6 flex justify-center lg:justify-start">
                <button
                  type="button"
                  onClick={() => setIsManifestoOpen(true)}
                  className="cta-button"
                  aria-label="Ler o manifesto completo"
                  data-testid="support-manifesto-read-more"
                >
                  LER MANIFESTO
                </button>
              </div>

              <p className="text-center text-sm text-black lg:text-left">
                Ao enviar o formulário, você assina este manifesto.
              </p>
            </div>

            <div data-testid="support-form-column">
              <SupportForm />
            </div>
          </div>
        </div>
      </section>

      <Dialog open={isManifestoOpen} onOpenChange={setIsManifestoOpen}>
        <DialogContent className="max-w-xl">
          <DialogHeader>
            <DialogTitle>Manifesto</DialogTitle>
          </DialogHeader>
          <div
            className="space-y-4 overflow-y-auto py-4 text-justify leading-relaxed text-black"
            style={{ maxHeight: 400 }}
            data-testid="support-manifesto-full"
          >
            {MANIFESTO_FULL_PARAGRAPHS.map(paragraph => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}
