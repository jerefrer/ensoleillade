// i18n utilities
import siteContentFr from "../cms-content/fr/tout-le-contenu.json";
import siteContentEn from "../cms-content/en/tout-le-contenu.json";

const siteContent = {
  fr: siteContentFr,
  en: siteContentEn
};

/**
 * Sanitizes HTML to only allow safe inline formatting tags
 * Allowed tags: strong, b, i, u, em
 * Only sanitizes if the string contains HTML tags
 */
function sanitizeHTML(html) {
  if (!html || typeof html !== 'string') return html;
  
  // Check if the string contains any HTML tags
  if (!/<[^>]+>/.test(html)) {
    // No HTML tags found, return as-is
    return html;
  }
  
  // Remove all HTML tags except the allowed ones
  const allowedTags = ['strong', 'b', 'i', 'u', 'em'];
  
  // First, escape all HTML
  let sanitized = html
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
  
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

// Helper function to sanitize all string values in nested objects
function sanitizeContent(obj) {
  if (!obj) return obj;
  
  if (typeof obj !== 'object') {
    // Sanitize string values
    return typeof obj === 'string' ? sanitizeHTML(obj) : obj;
  }
  
  // Recursively process nested objects and arrays
  if (Array.isArray(obj)) {
    return obj.map(item => sanitizeContent(item));
  }
  
  const result = {};
  for (const [key, value] of Object.entries(obj)) {
    result[key] = sanitizeContent(value);
  }
  return result;
}

export function getTranslations(locale = "fr") {
  const content = siteContent[locale] || siteContent.fr;
  // Apply sanitization to all string values
  return sanitizeContent(content);
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
