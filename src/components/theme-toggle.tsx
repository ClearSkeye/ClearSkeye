import { setTheme } from "@/app/theme-actions";
import { getServerTheme, type Theme } from "@/lib/theme";

const OPTIONS: ReadonlyArray<{ value: Theme; label: string }> = [
  { value: "light", label: "Light" },
  { value: "system", label: "System" },
  { value: "dark", label: "Dark" },
];

export async function ThemeToggle() {
  const current = await getServerTheme();

  return (
    <div
      role="radiogroup"
      aria-label="Colour theme"
      className="border-rule bg-paper-light inline-flex items-center gap-px border p-1"
    >
      {OPTIONS.map((option) => {
        const isActive = option.value === current;
        return (
          <form key={option.value} action={setTheme} className="contents">
            <input type="hidden" name="theme" value={option.value} />
            <button
              type="submit"
              role="radio"
              aria-checked={isActive}
              data-state={isActive ? "on" : "off"}
              className="text-small text-sightline data-[state=on]:bg-ink data-[state=on]:text-paper hover:text-ink px-3 py-1 font-semibold"
            >
              {option.label}
            </button>
          </form>
        );
      })}
    </div>
  );
}

export function ThemeToggleSkeleton() {
  return (
    <div aria-hidden className="border-rule bg-paper-light inline-flex h-8 w-[180px] border" />
  );
}
