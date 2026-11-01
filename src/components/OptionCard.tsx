import type { Option } from "../data/questions";

interface OptionCardProps {
  name: string;
  option: Option;
  checked: boolean;
  onSelect: (optionId: string) => void;
}

/** One selectable answer. A real radio input drives keyboard and screen-reader behaviour. */
export function OptionCard({ name, option, checked, onSelect }: OptionCardProps) {
  const inputId = `${name}-${option.id}`;

  return (
    <div>
      <input
        type="radio"
        id={inputId}
        name={name}
        value={option.id}
        checked={checked}
        onChange={() => onSelect(option.id)}
        className="peer sr-only"
      />
      <label
        htmlFor={inputId}
        className="flex min-h-[4.25rem] cursor-pointer items-start gap-4 rounded-xl border border-line bg-surface px-4 py-4 transition duration-150 hover:border-edge-strong hover:bg-wash active:scale-[0.995] peer-checked:border-accent-teal peer-checked:bg-accent-teal/10 peer-focus-visible:outline-2 peer-focus-visible:outline-offset-2 peer-focus-visible:outline-accent-teal motion-reduce:transition-none motion-reduce:active:scale-100 sm:px-5"
      >
        <span
          aria-hidden
          className={`mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full border transition-colors duration-150 ${
            checked ? "border-accent-teal bg-accent-teal" : "border-edge-strong"
          }`}
        >
          {checked && (
            <svg viewBox="0 0 12 12" className="h-3 w-3 text-on-brand" fill="none">
              <path
                d="m2.5 6.2 2.3 2.3 4.7-5"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          )}
        </span>
        <span className="min-w-0">
          <span className="block text-base font-medium text-fg">{option.label}</span>
          {option.description && (
            <span className="mt-0.5 block text-sm text-subtle">{option.description}</span>
          )}
        </span>
      </label>
    </div>
  );
}
