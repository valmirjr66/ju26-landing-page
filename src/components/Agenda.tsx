import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/shared/dialog";
import environmentIcon from "@/assets/icons/environment.png";
import cultureIcon from "@/assets/icons/culture.png";
import healthIcon from "@/assets/icons/health.png";
import womenIcon from "@/assets/icons/women.png";
import youthIcon from "@/assets/icons/youth.png";
import backgroundVideo from "@/assets/background_media/loop_video_1.mp4";

interface AgendaItem {
  id: string;
  title: string;
  icon: string;
  bgColor: string;
  textColor: string;
  content: string;
}

const PLACEHOLDER_WITH_1073_CHARS: string = `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam fringilla, mi non semper placerat, elit libero bibendum est, laoreet ullamcorper sapien urna in urna. Phasellus efficitur eleifend erat eget varius. Fusce urna urna, varius fringilla dui non, cursus vehicula velit. Ut auctor pellentesque erat vel interdum. Aliquam mollis felis sem, vel consectetur orci tempus dapibus. Duis vel augue orci. Integer ut pharetra massa. Morbi vitae volutpat purus, sit amet consectetur lacus. Nullam pulvinar condimentum lacinia. Maecenas venenatis ut magna dictum consequat. Duis condimentum massa sit amet tincidunt eleifend. Nullam ut felis id odio viverra aliquam.

Nunc viverra eleifend mattis. Maecenas id massa ac eros ullamcorper euismod. In hac habitasse platea dictumst. Cras sed sapien in tellus congue viverra. Mauris venenatis nec eros ut ultrices. Mauris ut magna vehicula, lacinia justo lobortis, efficitur risus. Aliquam quis mauris id nisi sodales consequat. Nulla placerat, risus sed auctor maximus, nisl leo bibendum ipsum, vitae mollis lacus sem laoreet neque.`;

const agendaItems: AgendaItem[] = [
  {
    id: "ambiente",
    title: "AMBIENTE",
    icon: environmentIcon,
    bgColor: "#2A2A2A",
    textColor: "#FFFFFF",
    content: PLACEHOLDER_WITH_1073_CHARS,
  },
  {
    id: "cultura",
    title: "CULTURA",
    icon: cultureIcon,
    bgColor: "#2A2A2A",
    textColor: "#FFFFFF",
    content: PLACEHOLDER_WITH_1073_CHARS,
  },
  {
    id: "saude",
    title: "SAÚDE",
    icon: healthIcon,
    bgColor: "#2A2A2A",
    textColor: "#FFFFFF",
    content: PLACEHOLDER_WITH_1073_CHARS,
  },
  {
    id: "mulheres",
    title: "MULHERES",
    icon: womenIcon,
    bgColor: "#FFFFFF",
    textColor: "#000000",
    content: PLACEHOLDER_WITH_1073_CHARS,
  },
  {
    id: "juventudes",
    title: "JUVENTUDES",
    icon: youthIcon,
    bgColor: "#FFFFFF",
    textColor: "#000000",
    content: PLACEHOLDER_WITH_1073_CHARS,
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
            NOSSO PAPO
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
            <p className="font-retropix text-black">
              {selectedAgenda?.content}
            </p>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}
