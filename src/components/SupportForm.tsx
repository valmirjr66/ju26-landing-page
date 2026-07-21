import backgroundImage from "@/assets/background_media/static_image_1.png";
import { useState } from "react";
import { toast } from "sonner";
import { DotLottieReact } from '@lottiefiles/dotlottie-react';

interface FormData {
  name: string;
  email: string;
  whatsapp: string;
  city: string;
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
      />
    </>
  );
}

export default function SupportForm() {
  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    whatsapp: "",
    city: "",
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

    if (!formData.email.trim()) {
      newErrors.email = "E-mail é obrigatório";
    } else if (!validateEmail(formData.email)) {
      newErrors.email = "E-mail inválido";
    }

    if (!formData.whatsapp.trim()) {
      newErrors.whatsapp = "WhatsApp é obrigatório";
    } else if (!validateWhatsApp(formData.whatsapp)) {
      newErrors.whatsapp = "WhatsApp inválido";
    }

    if (!formData.city.trim()) {
      newErrors.city = "Cidade é obrigatória";
    }

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value,
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
      const response = await fetch("https://mockurl.com/send", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setIsSubmitted(true);
        toast.success("Obrigada pelo apoio! Entraremos em contato em breve.");
        setFormData({ name: "", email: "", whatsapp: "", city: "" });
      } else {
        toast.error("Erro ao enviar formulário. Tente novamente.");
      }
    } catch (error) {
      toast.error("Algo deu errado. Tente novamente mais tarde.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section
      id="support-form"
      className="relative w-full py-20 md:py-32 overflow-hidden"
      aria-label="Seção Formulário de Apoio"
      style={{
        backgroundImage: `url(${backgroundImage})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div className="container mx-auto px-4 max-w-xl md:max-w-2xl">
        <h3 className="text-center mb-12 text-white">COLA COM A GENTE!</h3>

        <div
          style={{
            backgroundColor: "var(--primary)",
            borderRadius: "1.5rem",
            padding: "2rem",
          }}
        >
          {isSubmitted ? (
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
                />
                <InputErrorMessage errors={errors} fieldName="whatsapp" />
              </div>

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

              <div className="flex justify-end pt-4">
                <button
                  type="submit"
                  disabled={isLoading}
                  className="vaporwave-button disabled:opacity-50 disabled:cursor-not-allowed"
                  aria-label="Enviar formulário de apoio"
                >
                  {isLoading ? "ENVIANDO..." : "ENVIAR"}
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </section>
  );
}
