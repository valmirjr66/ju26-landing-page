import cultureBackground from "@/assets/background_media/agenda_culture.jpg";
import environmentBackground from "@/assets/background_media/agenda_environment.jpg";
import healthBackground from "@/assets/background_media/agenda_health.jpg";
import womenBackground from "@/assets/background_media/agenda_women.jpg";
import youthBackground from "@/assets/background_media/agenda_youth.jpg";
import backgroundImage from "@/assets/background_media/texture_grunge.png";
import cultureIcon from "@/assets/icons/culture.png";
import environmentIcon from "@/assets/icons/environment.png";
import healthIcon from "@/assets/icons/health.png";
import womenIcon from "@/assets/icons/women.png";
import youthIcon from "@/assets/icons/youth.png";
import {
  Dialog,
  DialogBody,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/shared/dialog";
import { useState } from "react";
import { TypeAnimation } from "react-type-animation";

interface AgendaItem {
  id: string;
  title: string;
  icon: string;
  background: string;
  bgColor: string;
  content: string;
}

const agendaItems: AgendaItem[] = [
  {
    id: "ambiente",
    title: "AMBIENTE",
    icon: environmentIcon,
    background: environmentBackground,
    bgColor: "#32776B",
    content:
      "Defender o meio ambiente é defender a vida. É defender quem perde a casa na enchente, quem sofre com o calor extremo, quem fica sem água, quem vive ao lado da mineração predatória, quem protege solos e florestas e quem sempre paga a conta da destruição. Em Minas Gerais, conhecemos de perto o preço de colocar o lucro acima das pessoas. Mariana e Brumadinho não foram acidentes: foram consequências de escolhas políticas. Vamos lutar pela elaboração do Estatuto Nacional de Justiça Climática para determinar prioridade de investimentos e de planejamentos emergentes para periferias, áreas de risco, municípios vulneráveis; elaboração de Planos de Adaptação Climática; pela regulamentação de projetos para reutilizar áreas públicas degradadas e transformar espaços abandonados em espaços de convivência e cuidado mútuo para manutenção constante do meio ambiente.",
  },
  {
    id: "cultura",
    title: "CULTURA",
    icon: cultureIcon,
    background: cultureBackground,
    bgColor: "#4D2A64",
    content:
      "A cultura não é um privilégio, é um direito. Uma ferramenta de transformação e uma das maiores riquezas do nosso povo. Foi através da cultura que milhares de jovens encontraram voz, pertencimento e oportunidade. O Hip Hop nos ensinou que arte também é educação, organização, consciência e resistência. Defender a cultura é defender quem vive dela: artistas, produtores, coletivos, técnicos e trabalhadores que movimentam a economia criativa todos os dias. Vamos lutar pela elaboração do Fundo Nacional da Cultura Negra (FNCN) com recursos desvinculados do Orçamento Geral da União (OGU) sujeitos a contingenciamento; pela reserva de pelo menos 30% da grade de programação das emissoras públicas de rádio e TV (EBC e redes estaduais) para produções independentes financiadas pelo FNCN.",
  },
  {
    id: "saude",
    title: "SAÚDE",
    icon: healthIcon,
    background: healthBackground,
    bgColor: "#4A2583",
    content:
      "Saúde não começa no hospital ou consultório. A saúde começa quando existe comida no prato, moradia digna, trabalho digno com direitos, cultura, lazer, transporte e um meio ambiente saudável. Vejo todos os dias que adoecer não é apenas uma questão individual: é consequência das desigualdades que atravessam a vida do nosso povo. Defender o SUS é defender uma das maiores conquistas da democracia brasileira. Vamos lutar pela revogação do Arcabouço Fiscal que limita investir em Saúde Pública; pelo investimento mínimo de 10% do PIB brasileiro tanto para a Saúde, quanto para a Educação; pela implementação de serviços de saúde mental, com a contratação de novos profissionais da área, em toda rede de atenção à saúde.",
  },
  {
    id: "mulheres",
    title: "MULHERES",
    icon: womenIcon,
    background: womenBackground,
    bgColor: "#243A3B",
    content:
      "A democracia não existe enquanto as mulheres continuam ganhando menos, trabalhando mais e vivendo sob a ameaça da violência. Defender as mulheres é defender autonomia, dignidade e justiça. É garantir acesso à saúde, combate à violência de gênero, igualdade de oportunidades e participação nos espaços de decisão. Como médica, sei que muitas desigualdades começam antes mesmo de sair de casa. Como mulher, sei que nossos direitos nunca foram presentes, sempre foram conquistas. Vamos enfrentar o machismo estrutural e construir um país onde nenhuma mulher tenha medo de existir, ocupar espaços ou sonhar. A luta feminista é uma luta por uma sociedade mais justa para todas as pessoas.",
  },
  {
    id: "juventudes",
    title: "JUVENTUDES",
    icon: youthIcon,
    background: youthBackground,
    bgColor: "#CC037F",
    content:
      "A juventude não é o futuro, é o presente. E já passou da hora de ocupar os espaços de decisão. Somos a geração que enfrenta a crise climática, a precarização do trabalho, o adoecimento mental e a falta de oportunidades, mas também somos a geração que produz cultura, organiza movimentos, cria soluções e transforma territórios. A política precisa deixar de falar sobre os jovens e começar a construir com os jovens. Queremos educação, cultura, trabalho digno, ciência, esporte, participação popular e direito de sonhar sem precisar abandonar nossas raízes. Quando a juventude ocupa a política, o futuro deixa de ser promessa e começa a ser construção coletiva.",
  },
];

export default function AgendaSection() {
  const [selectedItem, setSelectedItem] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleCardClick = (itemId: string) => {
    setSelectedItem(itemId);
    setIsModalOpen(true);
  };

  const selectedAgenda = agendaItems.find(item => item.id === selectedItem);

  return (
    <>
      <section
        id="agenda"
        className="relative w-full overflow-hidden py-20 md:py-32"
        aria-label="Seção Agenda"
        style={{
          backgroundImage: `url(${backgroundImage})`,
          backgroundSize: "cover",
          backgroundColor: "#f1c325",
        }}
      >
        <div className="container mx-auto px-4">
          <h3 className="white-stroke-effect mb-12 text-center text-black">
            <TypeAnimation
              sequence={[
                "NOSSO PAPO",
                3000,
                "NOSSAS IDEIAS",
                3000,
                "NOSSA VOZ",
                3000,
              ]}
              wrapper="span"
              speed={50}
              repeat={Infinity}
            />
          </h3>

          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:gap-6 lg:grid-cols-5">
            {agendaItems.map(item => (
              <button
                key={item.id}
                onClick={() => handleCardClick(item.id)}
                className="group @container relative aspect-square w-full cursor-pointer overflow-hidden rounded-2xl border-2 transition-all duration-300 hover:scale-105 hover:shadow-2xl focus:outline-2 focus:outline-offset-2 focus:outline-yellow-300"
                style={{
                  backgroundColor: item.bgColor,
                  color: "#FFFFFF",
                  borderColor: "#FFFFFF",
                }}
                aria-label={`${item.title} - clique para mais informações`}
              >
                <div className="flex h-full flex-col items-center justify-center gap-[5%] px-[6%] py-[10%]">
                  <img
                    src={item.icon}
                    alt={item.title}
                    className="h-[48%] w-[48%] object-contain"
                  />

                  <h4 className="max-w-full text-center text-[length:12cqw] leading-none font-bold tracking-widest whitespace-nowrap">
                    {item.title}
                  </h4>
                </div>
                <div
                  className="absolute inset-0 flex items-center justify-center bg-black/20 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                  aria-hidden="true"
                >
                  <span className="font-brush-up font-bold text-white">
                    SAIBA MAIS
                  </span>
                </div>
              </button>
            ))}
          </div>
        </div>
      </section>

      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <DialogContent
          className="max-w-2xl border-2 border-white text-white [&_[data-slot=dialog-close]]:text-white"
          style={{ backgroundColor: selectedAgenda?.bgColor }}
        >
          <DialogHeader>
            <DialogTitle className="text-white">
              {selectedAgenda?.title}
            </DialogTitle>
          </DialogHeader>
          <DialogBody>
            <div
              className="mb-2 w-full overflow-hidden rounded-lg border-1 border-white"
              style={{
                height: "100px",
                backgroundImage: `url(${selectedAgenda?.background})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
              }}
            />
            <p className="max-h-64 overflow-y-auto p-4 text-justify leading-relaxed">
              {selectedAgenda?.content}
            </p>
          </DialogBody>
        </DialogContent>
      </Dialog>
    </>
  );
}
