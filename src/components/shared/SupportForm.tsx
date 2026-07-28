import { DotLottieReact } from "@lottiefiles/dotlottie-react";
import { useMask } from "@react-input/mask";
import { RefObject, useState } from "react";
import { toast } from "sonner";

const API_URL = import.meta.env.VITE_API_URL;
const API_KEY = import.meta.env.VITE_API_KEY;
const ENVIRONMENT = import.meta.env.VITE_ENVIRONMENT;
const TERM_URL = import.meta.env.VITE_TERM_URL;

interface FormData {
  name: string;
  email: string;
  whatsapp: string;
  city: string;
  check_supportSocialMedia: boolean;
  check_supportStreets: boolean;
  check_supportArt: boolean;
  check_receiveMaterial: boolean;
}

interface InputErrorMessageProps {
  errors: Record<string, string>;
  fieldName: string;
}

interface FormInputProps {
  id: string;
  type: string;
  title: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  errors: Record<string, string>;
  ref?: RefObject<HTMLInputElement>;
}

interface CheckboxInputProps {
  id: keyof FormData;
  label: string;
  checked: boolean;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

function CheckboxInput({ id, label, checked, onChange }: CheckboxInputProps) {
  return (
    <label className="flex items-start gap-3 cursor-pointer">
      <input
        id={id}
        name={id}
        type="checkbox"
        checked={checked}
        onChange={onChange}
        className="h-5 w-5 shrink-0 accent-pink-500"
      />
      <span className="font-retropix text-black">{label}</span>
    </label>
  );
}

function InputErrorMessage({ errors, fieldName }: InputErrorMessageProps) {
  return (
    errors[fieldName] && (
      <p id={`${fieldName}-error`} className="text-red-600 text-sm mt-1">
        {errors[fieldName]}
      </p>
    )
  );
}

function FormInput({
  id,
  type,
  title,
  value,
  onChange,
  errors,
  ref,
}: FormInputProps) {
  return (
    <>
      <label htmlFor={id} className="sr-only">
        {title}
      </label>
      <input
        id={id}
        type={type}
        name={id}
        placeholder={title.toUpperCase()}
        value={value}
        onChange={onChange}
        className="w-full px-4 py-3 font-arcade text-black bg-white border-2 border-black rounded-lg focus:outline-2 focus:outline-offset-2 focus:outline-pink-500"
        aria-label={title}
        aria-invalid={!!errors[id]}
        aria-describedby={errors[id] ? `${id}-error` : undefined}
        ref={ref}
      />
    </>
  );
}

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
    const { name, value, type, checked } = e.target;

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
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!validateForm()) {
      toast.error("Por favor, preencha todos os campos corretamente");
      return;
    }

    setIsLoading(true);

    try {
      const response = await fetch(`${API_URL}/supporters`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-api-key": API_KEY,
        },
        body: JSON.stringify({ ...formData, source: ENVIRONMENT }),
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
    <div className="text-center py-8">
      <DotLottieReact src="/ok.lottie" autoplay />
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

      <p className="text-xs text-center text-gray-600">
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

        <CheckboxInput
          id="check_receiveMaterial"
          checked={formData.check_receiveMaterial}
          onChange={handleChange}
          label="Gostaria de receber material de campanha"
        />

        <div className="border-t-1 border-b-1 border-yellow-500 p-2">
          <span className="font-retropix text-black text-justify text-xs">
            Ao enviar as informações, você autoriza o uso dos seus dados para
            comunicação da pré-campanha de Áurea Carolina, conforme o{" "}
            <a href={TERM_URL} className="underline text-blue-800">
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
          className="vaporwave-button disabled:opacity-50 disabled:cursor-not-allowed"
          aria-label="Enviar formulário de apoio"
        >
          {isLoading ? "ENVIANDO..." : "ENVIAR"}
        </button>
      </div>
    </form>
  );
}
