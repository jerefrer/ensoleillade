/**
 * Sanitizes HTML to only allow safe inline formatting tags
 * Allowed tags: strong, b, i, u, em
 */
export function sanitizeHTML(html: string): string {
  if (!html) return '';
  
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
