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
      aria-label="Color theme"
      className="border-foreground/15 bg-background/60 inline-flex items-center gap-1 rounded-full border p-1 backdrop-blur"
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
              className="text-foreground/70 data-[state=on]:bg-foreground data-[state=on]:text-background hover:text-foreground rounded-full px-3 py-1 text-xs font-medium transition"
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
    <div
      aria-hidden
      className="animate-shimmer border-foreground/10 from-foreground/5 via-foreground/15 to-foreground/5 inline-flex h-8 w-[180px] rounded-full border bg-gradient-to-r"
    />
  );
}
