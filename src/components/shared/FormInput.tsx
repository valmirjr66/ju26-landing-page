import {
  type FormInputProps,
  type InputErrorMessageProps,
} from "@/types/SupportForm";

export function InputErrorMessage({
  errors,
  fieldName,
  htmlId,
  dataTestId,
}: InputErrorMessageProps) {
  return (
    errors[fieldName] && (
      <p
        id={`${htmlId ?? fieldName}-error`}
        className="mt-1 text-sm text-red-600"
        data-testid={dataTestId}
      >
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
  htmlId,
  dataTestId,
}: FormInputProps) {
  const elementId = htmlId ?? id;

  return (
    <>
      <label htmlFor={elementId} className="sr-only">
        {title}
      </label>
      <input
        id={elementId}
        type={type}
        name={id}
        placeholder={title.toUpperCase()}
        value={value}
        onChange={onChange}
        className="font-paper-crease w-full rounded-lg border-2 border-black bg-white px-4 py-3 text-black focus:outline-2 focus:outline-offset-2 focus:outline-pink-500"
        aria-label={title}
        aria-invalid={!!errors[id]}
        aria-describedby={errors[id] ? `${elementId}-error` : undefined}
        data-testid={dataTestId}
        ref={ref}
      />
    </>
  );
}
