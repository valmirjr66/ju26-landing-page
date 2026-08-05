import { RefObject } from "react";

export interface FormData {
  name: string;
  email: string;
  whatsapp: string;
  city: string;
  check_supportSocialMedia: boolean;
  check_supportStreets: boolean;
  check_supportArt: boolean;
  check_receiveMaterial: boolean;
}

export interface InputErrorMessageProps {
  errors: Record<string, string>;
  fieldName: string;
}

export interface FormInputProps {
  id: string;
  type: string;
  title: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  errors: Record<string, string>;
  ref?: RefObject<HTMLInputElement>;
}

export interface CheckboxInputProps {
  id: keyof FormData;
  label: string;
  checked: boolean;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}
