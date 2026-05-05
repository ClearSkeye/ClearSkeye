import { LikeButton } from "@/components/like-button";
import { getLikes } from "@/lib/likes-store";

export async function LikeIsland() {
  const initial = await getLikes();
  return <LikeButton initial={initial} />;
}

export function LikeIslandSkeleton() {
  return (
    <div
      aria-hidden
      className="animate-shimmer border-foreground/10 from-foreground/5 via-foreground/15 to-foreground/5 inline-flex h-11 w-44 rounded-full border bg-gradient-to-r"
    />
  );
}
