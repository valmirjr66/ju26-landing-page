import backgroundImage from "@/assets/background_media/texture_paper.jpg";
import SupportForm from "./shared/SupportForm";

export default function SupportSection() {
  return (
    <section
      id="support-form"
      className="relative w-full overflow-hidden py-20 md:py-32"
      aria-label="Seção Formulário de Apoio"
      style={{
        backgroundImage: `url(${backgroundImage})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div className="container mx-auto max-w-xl px-4 md:max-w-2xl">
        <h2 className="mb-12 text-center text-black">COLA COM A GENTE!</h2>

        <div
          style={{
            backgroundColor: "var(--primary)",
            borderRadius: "1.5rem",
            padding: "2rem",
          }}
        >
          <SupportForm />
        </div>
      </div>
    </section>
  );
}
