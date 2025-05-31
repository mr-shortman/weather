export const languages = [
  { value: "en", label: "English", flag: "🇺🇸" },
  { value: "de", label: "Deutsch", flag: "🇩🇪" },
  // { value: "it", label: "Italiano", flag: "🇮🇹" },
];

export const locales = languages.map((l) => l.value);

export const defaultLocale: Locale = "en";
export type Locale = (typeof locales)[number];
