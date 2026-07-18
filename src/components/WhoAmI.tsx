import backgroundVideo from "@/assets/background_media/loop_video_2.mp4";
import juPhoto from "@/assets/photos/ju_2.png";
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
    <div
      className={`${suppressMarginBottom || "mb-10"} flex ${reverseOrder ? "flex-row-reverse" : "flex-row"}`}
    >
      <img
        src={img}
        alt={imgAlt}
        style={{ width: 150 }}
        className={reverseOrder ? "ml-5" : "mr-5"}
      />
      <span className="text-justify">{text}</span>
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
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
              enim ad minim veniam, quis nostrud exercitation ullamco laboris
              nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in
              reprehenderit in voluptate velit esse cillum dolore eu fugiat
              nulla pariatur.
              <br />
              <br />
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
              enim ad minim veniam, quis nostrud exercitation ullamco laboris
              nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in
              reprehenderit in voluptate velit esse cillum dolore eu fugiat
              nulla pariatur.
            </p>

            <div className="flex justify-end">
              <button
                onClick={() => setIsModalOpen(true)}
                className="vaporwave-button"
                aria-label="Saiba mais sobre MC Ju"
              >
                SAIBA MAIS
              </button>
            </div>
          </div>
        </div>
      </section>

      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle className="font-arcade">SAIBA MAIS</DialogTitle>
          </DialogHeader>
          <div
            className="py-4 overflow-y-auto font-retropix text-black"
            style={{ maxHeight: 400 }}
          >
            <TimelineItem
              img={juPhoto}
              imgAlt="Ju photo 1"
              text="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
                enim ad minim veniam, quis nostrud exercitation ullamco laboris
                nisi ut aliquip ex ea commodo consequat. Lorem ipsum dolor sit
                amet, consectetur adipiscing elit."
            />

            <TimelineItem
              reverseOrder
              img={juPhoto}
              imgAlt="Ju photo 2"
              text="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
                enim ad minim veniam, quis nostrud exercitation ullamco laboris
                nisi ut aliquip ex ea commodo consequat. Lorem ipsum dolor sit
                amet, consectetur adipiscing elit."
            />

            <TimelineItem
              img={juPhoto}
              imgAlt="Ju photo 3"
              text="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
                enim ad minim veniam, quis nostrud exercitation ullamco laboris
                nisi ut aliquip ex ea commodo consequat. Lorem ipsum dolor sit
                amet, consectetur adipiscing elit."
            />

            <TimelineItem
              reverseOrder
              suppressMarginBottom
              img={juPhoto}
              imgAlt="Ju photo 4"
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
