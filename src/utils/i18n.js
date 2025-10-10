// i18n utilities
import siteContent from "../data/site-content.yml";

/**
 * Sanitizes HTML to only allow safe inline formatting tags
 * Allowed tags: strong, b, i, u, em
 */
function sanitizeHTML(html) {
  if (!html || typeof html !== 'string') return html;
  
  // Remove all HTML tags except the allowed ones
  const allowedTags = ['strong', 'b', 'i', 'u', 'em'];
  
  // First, escape all HTML
  let sanitized = html
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
  
  // Then, restore only the allowed tags
  allowedTags.forEach(tag => {
    const openTagRegex = new RegExp(`&lt;${tag}&gt;`, 'gi');
    const closeTagRegex = new RegExp(`&lt;/${tag}&gt;`, 'gi');
    sanitized = sanitized
      .replace(openTagRegex, `<${tag}>`)
      .replace(closeTagRegex, `</${tag}>`);
  });
  
  return sanitized;
}

// Helper function to extract locale-specific values from nested objects
function extractLocale(obj, locale) {
  if (!obj) return obj;
  
  if (typeof obj !== 'object') {
    // Sanitize string values
    return typeof obj === 'string' ? sanitizeHTML(obj) : obj;
  }
  
  // If this object has locale keys (fr/en), return the specific locale
  if (obj.hasOwnProperty('fr') && obj.hasOwnProperty('en')) {
    const value = obj[locale] || obj['fr'];
    return typeof value === 'string' ? sanitizeHTML(value) : value;
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
