// i18n utilities
import siteContent from "../data/site-content.yml";

// Helper function to extract locale-specific values from nested objects
function extractLocale(obj, locale) {
  if (!obj) return obj;
  
  if (typeof obj !== 'object') return obj;
  
  // If this object has locale keys (fr/en), return the specific locale
  if (obj.hasOwnProperty('fr') && obj.hasOwnProperty('en')) {
    return obj[locale] || obj['fr'];
  }
  
  // Otherwise, recursively process nested objects
  const result = {};
  for (const [key, value] of Object.entries(obj)) {
    result[key] = extractLocale(value, locale);
  }
  return result;
}

export function getTranslations(locale = "fr") {
  return extractLocale(siteContent, locale);
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
