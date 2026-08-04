/**
 * Artwork lookup.
 *
 * SWAPI is a data-only API and does not serve images, and the image host that
 * is usually paired with it (starwars-visualguide.com) now refuses requests.
 * Each category therefore ships with six locally stored SVG illustrations in
 * assets/img/, and a record is paired with one of them by its position in the
 * result list.
 */

/** Number of illustrations available per category. */
const ARTWORK_PER_CATEGORY = 6;

/**
 * Builds the path to the illustration used for one record.
 * @param {string} categoryKey Category name, for example "vehicles".
 * @param {number} index Zero-based position of the record in the list.
 * @returns {string} Relative path to an SVG file.
 */
export function getArtworkPath(categoryKey, index) {
  // The modulo keeps the lookup inside the available range even if more
  // records than illustrations are ever rendered.
  const artworkNumber = (index % ARTWORK_PER_CATEGORY) + 1;
  return `assets/img/${categoryKey}/${artworkNumber}.svg`;
}
