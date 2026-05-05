"use server";

import { cookies } from "next/headers";
import { revalidatePath } from "next/cache";

import { isTheme, THEME_COOKIE } from "@/lib/theme";

const ONE_YEAR_IN_SECONDS = 60 * 60 * 24 * 365;

export async function setTheme(formData: FormData) {
  const next = formData.get("theme");
  if (!isTheme(next)) return;

  const store = await cookies();
  store.set(THEME_COOKIE, next, {
    path: "/",
    maxAge: ONE_YEAR_IN_SECONDS,
    sameSite: "lax",
  });

  revalidatePath("/", "layout");
}
