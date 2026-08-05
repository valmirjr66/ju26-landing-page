import { type CheckboxInputProps } from "@/types/SupportForm";

export default function CheckboxInput({
  id,
  label,
  checked,
  onChange,
}: CheckboxInputProps) {
  return (
    <label className="flex cursor-pointer items-start gap-3">
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
