// Image loader utility for dynamic imports with Astro optimization
// Using eager: true to load all images at build time
const images = import.meta.glob('../assets/images/*.{jpg,jpeg,png,webp,avif}', { eager: true });

/**
 * Get an optimized image from the assets folder
 * @param {string} path - Path like "/images/hero.jpg"
 * @returns {ImageMetadata} - Astro image metadata
 */
export function getImage(path) {
  // Convert /images/hero.jpg to ../assets/images/hero.jpg
  const filename = path.replace(/^\/images\//, '');
  const imagePath = `../assets/images/${filename}`;
  
  const imageModule = images[imagePath];
  
  if (!imageModule) {
    console.warn(`Image not found: ${path} (looking for ${imagePath})`);
    console.warn('Available images:', Object.keys(images));
    return null;
  }
  
  // With eager: true, the module is already loaded
  return imageModule.default;
}

/**
 * Get all images matching a pattern
 * @param {string} pattern - Glob pattern like "*.jpg"
 * @returns {Object} - Map of image paths to metadata
 */
export function getImages(pattern = '*') {
  const filtered = {};
  
  for (const [path, module] of Object.entries(images)) {
    const filename = path.replace('../assets/images/', '');
    if (pattern === '*' || filename.match(new RegExp(pattern))) {
      filtered[`/images/${filename}`] = module.default;
    }
  }
  
  return filtered;
}
