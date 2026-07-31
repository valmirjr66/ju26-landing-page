import backgroundImage from "@/assets/background_media/synthwave_landscape.jpg";
import SupportForm from "./shared/SupportForm";

export default function SupportSection() {
  return (
    <section
      id="support-form"
      className="relative w-full overflow-hidden py-20 md:py-32"
      aria-label="Seção Formulário de Apoio"
      style={{
        backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.1)), url(${backgroundImage})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div className="container mx-auto max-w-xl px-4 md:max-w-2xl">
        <h3 className="mb-12 text-center text-white">COLA COM A GENTE!</h3>

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
