// i18n utilities
import enTranslations from "../i18n/en.json";
import frTranslations from "../i18n/fr.json";

const translations = {
  fr: frTranslations,
  en: enTranslations,
};

export function getTranslations(locale = "fr") {
  return translations[locale] || translations["fr"];
}

export function t(key, locale = "fr") {
  const trans = getTranslations(locale);
  return key.split(".").reduce((obj, k) => obj && obj[k], trans) || key;
}

export function getLocaleFromUrl(url) {
  const pathname = new URL(url).pathname;
  if (pathname.startsWith("/en")) return "en";
  return "fr";
}

export function getAlternateUrls(currentPath, currentLocale) {
  if (currentLocale === "fr") {
    return {
      en: currentPath === "/" ? "/en/" : `/en${currentPath}`,
    };
  } else {
    return {
      fr: currentPath.replace("/en", "") || "/",
    };
  }
}
