import {
  type FormInputProps,
  type InputErrorMessageProps,
} from "@/types/SupportForm";

export function InputErrorMessage({
  errors,
  fieldName,
}: InputErrorMessageProps) {
  return (
    errors[fieldName] && (
      <p id={`${fieldName}-error`} className="mt-1 text-sm text-red-600">
        {errors[fieldName]}
      </p>
    )
  );
}

export default function FormInput({
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
        className="font-arcade w-full rounded-lg border-2 border-black bg-white px-4 py-3 text-black focus:outline-2 focus:outline-offset-2 focus:outline-pink-500"
        aria-label={title}
        aria-invalid={!!errors[id]}
        aria-describedby={errors[id] ? `${id}-error` : undefined}
        ref={ref}
      />
    </>
  );
}
