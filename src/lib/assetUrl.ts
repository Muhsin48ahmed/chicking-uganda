/**
 * Prefixes a file in public/ with the site's base path, so the same build works
 * at a domain root (local dev, Vercel) and in a sub-folder (GitHub Pages).
 */
export function assetUrl(path: string): string {
  return `${import.meta.env.BASE_URL}${path.replace(/^\//, '')}`
}
