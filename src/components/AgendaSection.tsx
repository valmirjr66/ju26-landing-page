import cultureBackground from "@/assets/background_media/agenda_culture.jpg";
import environmentBackground from "@/assets/background_media/agenda_environment.jpg";
import healthBackground from "@/assets/background_media/agenda_health.jpg";
import womenBackground from "@/assets/background_media/agenda_women.jpg";
import youthBackground from "@/assets/background_media/agenda_youth.jpg";
import backgroundImage from "@/assets/background_media/vaporwave_landscape.jpg";
import cultureIcon from "@/assets/icons/culture.png";
import environmentIcon from "@/assets/icons/environment.png";
import healthIcon from "@/assets/icons/health.png";
import womenIcon from "@/assets/icons/women.png";
import youthIcon from "@/assets/icons/youth.png";
import {
  Dialog,
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
  contrastColor: string;
  content: string;
}

const agendaItems: AgendaItem[] = [
  {
    id: "ambiente",
    title: "AMBIENTE",
    icon: environmentIcon,
    background: environmentBackground,
    bgColor: "#2A2A2A",
    contrastColor: "#FFFFFF",
    content:
      "Defender o meio ambiente é defender a vida. É defender quem perde a casa na enchente, quem sofre com o calor extremo, quem fica sem água, quem vive ao lado da mineração predatória e quem sempre paga a conta da destruição. Em Minas Gerais, conhecemos de perto o preço de colocar o lucro acima das pessoas. Mariana e Brumadinho não foram acidentes: foram consequências de escolhas políticas. Vamos enfrentar a crise climática com coragem, fortalecer a fiscalização ambiental, proteger nossos rios, serras e nascentes e investir em cidades mais verdes e preparadas para os desafios do futuro. Justiça ambiental também é justiça social. Não existe futuro possível sem enfrentar quem transforma a natureza em mercadoria.",
  },
  {
    id: "cultura",
    title: "CULTURA",
    icon: cultureIcon,
    background: cultureBackground,
    bgColor: "#2A2A2A",
    contrastColor: "#FFFFFF",
    content:
      "A cultura não é um privilégio, é um direito. Uma ferramenta de transformação e uma das maiores riquezas do nosso povo. Foi através da cultura que milhares de jovens encontraram voz, pertencimento e oportunidade. O Hip Hop nos ensinou que arte também é educação, organização, consciência e resistência. Defender a cultura é defender quem vive dela: artistas, produtores, coletivos, técnicos e trabalhadores que movimentam a economia criativa todos os dias. Buscamos mais investimento permanente, ocupação dos espaços públicos, fortalecimento dos coletivos e valorização de quem faz cultura nas periferias e no interior. Porque um povo que produz cultura também produz liberdade.",
  },
  {
    id: "saude",
    title: "SAÚDE",
    icon: healthIcon,
    background: healthBackground,
    bgColor: "#2A2A2A",
    contrastColor: "#FFFFFF",
    content:
      "Saúde não começa no hospital ou consultório. A saúde começa quando existe comida no prato, moradia digna, trabalho digno com direitos, cultura, lazer, transporte e um meio ambiente saudável. Vejo todos os dias que adoecer não é apenas uma questão individual: é consequência das desigualdades que atravessam a vida do nosso povo. Defender o SUS é defender uma das maiores conquistas da democracia brasileira. Vamos lutar para fortalecer a atenção básica, ampliar o acesso à saúde mental, garantir atendimento digno às mulheres e enfrentar as causas do adoecimento da nossa geração. Cuidar da saúde é cuidar das pessoas antes que elas precisem adoecer.",
  },
  {
    id: "mulheres",
    title: "MULHERES",
    icon: womenIcon,
    background: womenBackground,
    bgColor: "#FFFFFF",
    contrastColor: "#F51357",
    content:
      "A democracia não existe enquanto as mulheres continuam ganhando menos, trabalhando mais e vivendo sob a ameaça da violência. Defender as mulheres é defender autonomia, dignidade e justiça. É garantir acesso à saúde, combate à violência de gênero, igualdade de oportunidades e participação nos espaços de decisão. Como médica, sei que muitas desigualdades começam antes mesmo de sair de casa. Como mulher, sei que nossos direitos nunca foram presentes, sempre foram conquistas. Vamos enfrentar o machismo estrutural e construir um país onde nenhuma mulher tenha medo de existir, ocupar espaços ou sonhar. A luta feminista é uma luta por uma sociedade mais justa para todas as pessoas.",
  },
  {
    id: "juventudes",
    title: "JUVENTUDES",
    icon: youthIcon,
    background: youthBackground,
    bgColor: "#FFFFFF",
    contrastColor: "#F51357",
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
          backgroundPosition: "center",
        }}
      >
        <div className="container mx-auto px-4">
          <h3 className="mb-12 text-center text-white drop-shadow-lg">
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
                className="group relative cursor-pointer overflow-hidden rounded-2xl border-2 transition-all duration-300 hover:scale-105 hover:shadow-2xl focus:outline-2 focus:outline-offset-2 focus:outline-yellow-300"
                style={{
                  backgroundColor: item.bgColor,
                  color: item.contrastColor,
                  borderColor: item.contrastColor,
                }}
                aria-label={`${item.title} - clique para mais informações`}
              >
                <div className="flex min-h-54 flex-col items-center justify-center p-2 md:min-h-56">
                  <img
                    src={item.icon}
                    alt={item.title}
                    className="mb-4 h-20 w-20 object-contain"
                  />

                  <h4 className="font-arcade text-center text-lg font-bold md:text-base">
                    {item.title}
                  </h4>
                </div>
                <div
                  className="absolute inset-0 flex items-center justify-center bg-black/20 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                  aria-hidden="true"
                >
                  <span className="font-arcade font-bold text-white">
                    SAIBA MAIS
                  </span>
                </div>
              </button>
            ))}
          </div>
        </div>
      </section>

      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle className="font-arcade">
              {selectedAgenda?.title}
            </DialogTitle>
          </DialogHeader>
          <div className="py-4">
            <div
              className="mb-2 w-full overflow-hidden rounded-t-lg"
              style={{
                height: "100px",
                backgroundImage: `url(${selectedAgenda?.background})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
              }}
            />
            <p
              className="font-retropix max-h-64 overflow-y-auto rounded-b-sm p-2 text-justify text-black"
              style={{ border: "1px solid #dbdbdb" }}
            >
              {selectedAgenda?.content}
            </p>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}
