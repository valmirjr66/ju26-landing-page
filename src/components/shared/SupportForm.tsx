import { type FormData } from "@/types/SupportForm";
import { DotLottieReact } from "@lottiefiles/dotlottie-react";
import { useMask } from "@react-input/mask";
import { useState } from "react";
import { toast } from "sonner";
import CheckboxInput from "./CheckboxInput";
import FormInput, { InputErrorMessage } from "./FormInput";

const API_URL = import.meta.env.VITE_API_URL;
const API_KEY = import.meta.env.VITE_API_KEY;
const ENVIRONMENT = import.meta.env.VITE_ENVIRONMENT;
const TERM_URL = import.meta.env.VITE_TERM_URL;
const ENABLE_ART_UPLOAD = import.meta.env.VITE_ENABLE_ART_UPLOAD === "true";

export default function SupportForm() {
  const phoneNumberInputRef = useMask({
    mask: "(__) _____-____",
    replacement: { _: /\d/ },
  });

  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    whatsapp: "",
    city: "",
    check_supportSocialMedia: false,
    check_supportStreets: false,
    check_supportArt: false,
    check_receiveMaterial: false,
  });

  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [artFile, setArtFile] = useState<File | null>(null);

  const ALLOWED_FILE_TYPES = [
    "image/png",
    "image/jpeg",
    "image/webp",
    "video/mp4",
    "video/webm",
  ];

  const MAX_IMAGE_SIZE_BYTES = 10 * 1024 * 1024; // 10 MB
  const MAX_VIDEO_SIZE_BYTES = 25 * 1024 * 1024; // 25 MB

  const validateEmail = (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const validateWhatsApp = (phone: string): boolean => {
    const cleaned = phone.replace(/\D/g, "");
    const phoneRegex =
      /^(?:(?:\+|00)?(55)\s?)?(?:\(?([1-9][0-9])\)?\s?)?(?:((?:9\d|[2-9])\d{3})\-?(\d{4}))$/;
    return phoneRegex.test(cleaned);
  };

  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {};

    if (!formData.name.trim()) {
      newErrors.name = "Nome é obrigatório";
    }

    const hasEmail = formData.email.trim() !== "";
    const hasWhatsapp = formData.whatsapp.trim() !== "";

    if (!hasEmail && !hasWhatsapp) {
      newErrors.email = "Informe um e-mail ou WhatsApp";
      newErrors.whatsapp = "Informe um e-mail ou WhatsApp";
    }

    if (hasEmail && !validateEmail(formData.email)) {
      newErrors.email = "E-mail inválido";
    }

    if (hasWhatsapp && !validateWhatsApp(formData.whatsapp)) {
      newErrors.whatsapp = "WhatsApp inválido";
    }

    if (!formData.city.trim()) {
      newErrors.city = "Cidade é obrigatória";
    }

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked, files } = e.target;

    if (type === "file") {
      const file = files?.[0] ?? null;

      if (file && !ALLOWED_FILE_TYPES.includes(file.type)) {
        toast.error("Formato de arquivo não suportado.");
        e.target.value = "";
        return;
      }

      if (file) {
        const isVideo = file.type.startsWith("video/");
        const maxSize = isVideo ? MAX_VIDEO_SIZE_BYTES : MAX_IMAGE_SIZE_BYTES;

        if (file.size > maxSize) {
          toast.error(
            isVideo
              ? "O vídeo deve ter no máximo 25 MB."
              : "A imagem deve ter no máximo 10 MB."
          );
          e.target.value = "";
          return;
        }
      }

      setArtFile(file);
      return;
    }

    setFormData(prev => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));

    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: "",
      }));
    }

    if (name === "check_supportArt" && !checked) {
      setArtFile(null);
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!validateForm()) {
      toast.error("Por favor, preencha todos os campos corretamente");
      return;
    }

    setIsLoading(true);

    try {
      const body = new FormData();

      body.append("name", formData.name);
      body.append("email", formData.email);
      body.append("whatsapp", formData.whatsapp);
      body.append("city", formData.city);

      body.append(
        "check_supportSocialMedia",
        String(formData.check_supportSocialMedia)
      );
      body.append(
        "check_supportStreets",
        String(formData.check_supportStreets)
      );
      body.append("check_supportArt", String(formData.check_supportArt));
      body.append(
        "check_receiveMaterial",
        String(formData.check_receiveMaterial)
      );

      body.append("source", ENVIRONMENT);

      if (artFile) {
        body.append("artFile", artFile);
      }

      const response = await fetch(`${API_URL}/supporters`, {
        method: "POST",
        headers: {
          "x-api-key": API_KEY,
        },
        body,
      });

      if (response.ok) {
        setIsSubmitted(true);
        toast.success("Obrigada pelo apoio! Entraremos em contato em breve.");
        setFormData({
          name: "",
          email: "",
          whatsapp: "",
          city: "",
          check_supportSocialMedia: false,
          check_supportStreets: false,
          check_supportArt: false,
          check_receiveMaterial: false,
        });
        setArtFile(null);
      } else {
        toast.error("Erro ao enviar formulário. Tente novamente.");
      }
    } catch (error) {
      toast.error("Algo deu errado. Tente novamente mais tarde.");
    } finally {
      setIsLoading(false);
    }
  };

  return isSubmitted ? (
    <div className="py-8 text-center">
      <DotLottieReact
        src="/ok.lottie"
        autoplay
        style={{
          filter: "drop-shadow(1px 1px 2px rgba(0, 0, 0, 0.4))",
        }}
      />
      <p className="font-retropix text-black">
        Obrigada pelo seu apoio! Entraremos em contato em breve.
      </p>
    </div>
  ) : (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <FormInput
          id="name"
          type="text"
          title="Nome"
          value={formData.name}
          onChange={handleChange}
          errors={errors}
        />
        <InputErrorMessage errors={errors} fieldName="name" />
      </div>

      <div>
        <FormInput
          id="email"
          type="email"
          title="E-mail"
          value={formData.email}
          onChange={handleChange}
          errors={errors}
        />
        <InputErrorMessage errors={errors} fieldName="email" />
      </div>

      <div>
        <FormInput
          id="whatsapp"
          type="tel"
          title="WhatsApp"
          value={formData.whatsapp}
          onChange={handleChange}
          errors={errors}
          ref={phoneNumberInputRef}
        />
        <InputErrorMessage errors={errors} fieldName="whatsapp" />
      </div>

      <p className="text-center text-xs text-gray-600">
        Informe pelo menos um meio de contato: e-mail ou WhatsApp.
      </p>

      <div>
        <FormInput
          id="city"
          type="text"
          title="Cidade"
          value={formData.city}
          onChange={handleChange}
          errors={errors}
        />
        <InputErrorMessage errors={errors} fieldName="city" />
      </div>

      <div className="space-y-3 pt-2">
        <CheckboxInput
          id="check_supportSocialMedia"
          checked={formData.check_supportSocialMedia}
          onChange={handleChange}
          label="Quero apoiar nas redes"
        />

        <CheckboxInput
          id="check_supportStreets"
          checked={formData.check_supportStreets}
          onChange={handleChange}
          label="Quero apoiar nas ruas"
        />

        <CheckboxInput
          id="check_supportArt"
          checked={formData.check_supportArt}
          onChange={handleChange}
          label="Quero contribuir com a minha arte"
        />

        {ENABLE_ART_UPLOAD && formData.check_supportArt && (
          <div className="mx-2 mt-3 space-y-2 rounded-lg border border-yellow-400 bg-pink-100 p-4">
            <p className="font-retropix text-xs text-black">
              Você pode enviar uma obra (imagem ou vídeo) agora ou, se preferir,
              finalizar o cadastro e nos enviar depois. Entraremos em contato
              para combinar os detalhes.
            </p>

            <input
              type="file"
              name="artFile"
              accept=".png,.jpg,.jpeg,.webp,.mp4,.mov,.webm"
              onChange={handleChange}
              className="file:font-retropix block w-full text-sm text-black file:mr-4 file:rounded-lg file:border-0 file:bg-pink-500 file:px-4 file:py-2 file:text-white hover:file:bg-pink-600"
            />

            <p className="text-xs text-gray-600">
              Formatos aceitos:{" "}
              {ALLOWED_FILE_TYPES.map(type => type.split("/")[1]).join(", ")}.
              Limite: 10 MB para imagens e 25 MB para vídeos.
            </p>
          </div>
        )}

        <CheckboxInput
          id="check_receiveMaterial"
          checked={formData.check_receiveMaterial}
          onChange={handleChange}
          label="Gostaria de receber material de campanha"
        />

        <div className="border-t-1 border-b-1 border-yellow-500 p-2">
          <span className="font-retropix text-justify text-xs text-black">
            Ao enviar as informações, você autoriza o uso dos seus dados para
            comunicação da pré-campanha de Júlia Soares, conforme o{" "}
            <a href={TERM_URL} className="text-blue-800 underline">
              Termo de Consentimento
            </a>
            . Seus dados serão protegidos e utilizados exclusivamente para
            comunicações relacionadas à pré-campanha, sem compartilhamento
            indevido com terceiros.
          </span>
        </div>
      </div>

      <div className="flex justify-end pt-4">
        <button
          type="submit"
          disabled={
            !formData.name.trim() ||
            (!formData.email.trim() && !formData.whatsapp.trim()) ||
            !formData.city.trim() ||
            isLoading
          }
          className="vaporwave-button disabled:cursor-not-allowed disabled:opacity-50"
          aria-label="Enviar formulário de apoio"
        >
          {isLoading ? "ENVIANDO..." : "ENVIAR"}
        </button>
      </div>
    </form>
  );
}
