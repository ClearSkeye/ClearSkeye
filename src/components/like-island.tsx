import { LikeButton } from "@/components/like-button";
import { getLikes } from "@/lib/likes-store";

export async function LikeIsland() {
  const initial = await getLikes();
  return <LikeButton initial={initial} />;
}

export function LikeIslandSkeleton() {
  return <div aria-hidden className="border-rule bg-paper-light inline-flex h-12 w-44 border" />;
}
