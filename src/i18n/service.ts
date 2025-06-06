"use server";

import { cookies } from "next/headers";
import { defaultLocale } from "./config";

// In this example the locale is read from a cookie. You could alternatively
// also read it from a database, backend service, or any other source.
export const getLocaleCookieName = async () => "NEXT_LOCALE";

export async function getUserLocale() {
  const cookieName = await getLocaleCookieName();
  return (await cookies()).get(cookieName)?.value || defaultLocale;
}
