/**
 * Get an image path for Astro's Image component
 * Images are stored in /public/images/ and referenced as /images/filename.jpg
 * Astro's Image component can optimize images from public folder at build time
 * 
 * @param {string} path - Path like "/images/hero.jpg"
 * @returns {string} - The same path (for use with Astro Image component)
 */
export function getImage(path) {
  if (!path) {
    console.warn('No image path provided');
    return null;
  }
  
  // Return the path as-is - Astro's Image component handles public folder images
  return path;
}
