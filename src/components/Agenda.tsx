import cultureBackground from "@/assets/background_media/agenda_culture.png";
import environmentBackground from "@/assets/background_media/agenda_environment.png";
import healthBackground from "@/assets/background_media/agenda_health.png";
import womenBackground from "@/assets/background_media/agenda_women.png";
import youthBackground from "@/assets/background_media/agenda_youth.png";
import backgroundVideo from "@/assets/background_media/loop_video_1.mp4";
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
  textColor: string;
  content: string;
}

const agendaItems: AgendaItem[] = [
  {
    id: "ambiente",
    title: "AMBIENTE",
    icon: environmentIcon,
    background: environmentBackground,
    bgColor: "#2A2A2A",
    textColor: "#FFFFFF",
    content:
      "Defender o meio ambiente é defender a vida. É defender quem perde a casa na enchente, quem sofre com o calor extremo, quem fica sem água, quem vive ao lado da mineração predatória e quem sempre paga a conta da destruição. Em Minas Gerais, conhecemos de perto o preço de colocar o lucro acima das pessoas. Mariana e Brumadinho não foram acidentes: foram consequências de escolhas políticas. Vamos enfrentar a crise climática com coragem, fortalecer a fiscalização ambiental, proteger nossos rios, serras e nascentes e investir em cidades mais verdes e preparadas para os desafios do futuro. Justiça ambiental também é justiça social. Não existe futuro possível sem enfrentar quem transforma a natureza em mercadoria.",
  },
  {
    id: "cultura",
    title: "CULTURA",
    icon: cultureIcon,
    background: cultureBackground,
    bgColor: "#2A2A2A",
    textColor: "#FFFFFF",
    content:
      "A cultura não é um privilégio, é um direito. Uma ferramenta de transformação e uma das maiores riquezas do nosso povo. Foi através da cultura que milhares de jovens encontraram voz, pertencimento e oportunidade. O Hip Hop nos ensinou que arte também é educação, organização, consciência e resistência. Defender a cultura é defender quem vive dela: artistas, produtores, coletivos, técnicos e trabalhadores que movimentam a economia criativa todos os dias. Buscamos mais investimento permanente, ocupação dos espaços públicos, fortalecimento dos coletivos e valorização de quem faz cultura nas periferias e no interior. Porque um povo que produz cultura também produz liberdade.",
  },
  {
    id: "saude",
    title: "SAÚDE",
    icon: healthIcon,
    background: healthBackground,
    bgColor: "#2A2A2A",
    textColor: "#FFFFFF",
    content:
      "Saúde não começa no hospital ou consultório. A saúde começa quando existe comida no prato, moradia digna, trabalho digno com direitos, cultura, lazer, transporte e um meio ambiente saudável. Vejo todos os dias que adoecer não é apenas uma questão individual: é consequência das desigualdades que atravessam a vida do nosso povo. Defender o SUS é defender uma das maiores conquistas da democracia brasileira. Vamos lutar para fortalecer a atenção básica, ampliar o acesso à saúde mental, garantir atendimento digno às mulheres e enfrentar as causas do adoecimento da nossa geração. Cuidar da saúde é cuidar das pessoas antes que elas precisem adoecer.",
  },
  {
    id: "mulheres",
    title: "MULHERES",
    icon: womenIcon,
    background: womenBackground,
    bgColor: "#FFFFFF",
    textColor: "#000000",
    content:
      "A democracia não existe enquanto as mulheres continuam ganhando menos, trabalhando mais e vivendo sob a ameaça da violência. Defender as mulheres é defender autonomia, dignidade e justiça. É garantir acesso à saúde, combate à violência de gênero, igualdade de oportunidades e participação nos espaços de decisão. Como médica, sei que muitas desigualdades começam antes mesmo de sair de casa. Como mulher, sei que nossos direitos nunca foram presentes, sempre foram conquistas. Vamos enfrentar o machismo estrutural e construir um país onde nenhuma mulher tenha medo de existir, ocupar espaços ou sonhar. A luta feminista é uma luta por uma sociedade mais justa para todas as pessoas.",
  },
  {
    id: "juventudes",
    title: "JUVENTUDES",
    icon: youthIcon,
    background: youthBackground,
    bgColor: "#FFFFFF",
    textColor: "#000000",
    content:
      "A juventude não é o futuro, é o presente. E já passou da hora de ocupar os espaços de decisão. Somos a geração que enfrenta a crise climática, a precarização do trabalho, o adoecimento mental e a falta de oportunidades, mas também somos a geração que produz cultura, organiza movimentos, cria soluções e transforma territórios. A política precisa deixar de falar sobre os jovens e começar a construir com os jovens. Queremos educação, cultura, trabalho digno, ciência, esporte, participação popular e direito de sonhar sem precisar abandonar nossas raízes. Quando a juventude ocupa a política, o futuro deixa de ser promessa e começa a ser construção coletiva.",
  },
];

export default function Agenda() {
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
        className="relative w-full py-20 md:py-32 overflow-hidden"
        aria-label="Seção Agenda"
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

        <div className="container mx-auto px-4">
          <h3 className="text-center mb-12 text-white drop-shadow-lg">
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

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 md:gap-6">
            {agendaItems.map(item => (
              <button
                key={item.id}
                onClick={() => handleCardClick(item.id)}
                className="group relative rounded-2xl overflow-hidden border-2 border-white transition-all duration-300 hover:scale-105 hover:shadow-2xl focus:outline-2 focus:outline-offset-2 focus:outline-yellow-300 cursor-pointer"
                style={{
                  backgroundColor: item.bgColor,
                  color: item.textColor,
                }}
                aria-label={`${item.title} - clique para mais informações`}
              >
                <div className="p-4 flex flex-col items-center justify-center min-h-64 md:min-h-56">
                  <img
                    src={item.icon}
                    alt={item.title}
                    className="w-20 h-20 md:w-24 md:h-24 mb-4 object-contain"
                  />

                  <h4 className="font-arcade text-lg md:text-base text-center font-bold">
                    {item.title}
                  </h4>
                </div>
                <div
                  className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center"
                  aria-hidden="true"
                >
                  <span className="text-white font-arcade font-bold">
                    SAIBA MAIS
                  </span>
                </div>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Modal */}
      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle className="font-arcade">
              {selectedAgenda?.title}
            </DialogTitle>
          </DialogHeader>
          <div className="py-4">
            <div
              className="w-full overflow-hidden rounded-t-lg mb-2"
              style={{
                height: "100px",
                backgroundImage: `url(${selectedAgenda?.background})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
              }}
            />
            <p className="font-retropix text-black text-justify max-h-64 overflow-y-auto">
              {selectedAgenda?.content}
            </p>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}
