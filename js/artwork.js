/**
 * Artwork lookup.
 *
 * SWAPI is a data-only API: its responses carry no image field, so the
 * pictures have to come from elsewhere. The image host normally paired with
 * SWAPI, starwars-visualguide.com, no longer serves images at all - the domain
 * now redirects to an unrelated site - so it cannot be used.
 *
 * The pictures are instead taken from Wookieepedia, the Star Wars wiki, and
 * stored locally in assets/img/. Serving them from the project rather than
 * hotlinking the wiki keeps the page working if that host blocks external
 * requests, and means the pictures still render without a network connection.
 *
 * A record is matched to its picture by name rather than by its position in
 * the response, so the correct picture is shown even if the API ever returns
 * the records in a different order.
 */

/** Picture file name for each record, grouped by category. */
const ARTWORK = {
  films: {
    "A New Hope": "a-new-hope.webp",
    "The Empire Strikes Back": "the-empire-strikes-back.webp",
    "Return of the Jedi": "return-of-the-jedi.webp",
    "The Phantom Menace": "the-phantom-menace.webp",
    "Attack of the Clones": "attack-of-the-clones.webp",
    "Revenge of the Sith": "revenge-of-the-sith.webp",
  },
  people: {
    "Luke Skywalker": "luke-skywalker.webp",
    "C-3PO": "c-3po.webp",
    "R2-D2": "r2-d2.webp",
    "Darth Vader": "darth-vader.webp",
    "Leia Organa": "leia-organa.webp",
    "Owen Lars": "owen-lars.webp",
  },
  planets: {
    Tatooine: "tatooine.webp",
    Alderaan: "alderaan.webp",
    "Yavin IV": "yavin-4.webp",
    Hoth: "hoth.webp",
    Dagobah: "dagobah.webp",
    Bespin: "bespin.webp",
  },
  vehicles: {
    "Sand Crawler": "sand-crawler.webp",
    "T-16 skyhopper": "t-16-skyhopper.webp",
    "X-34 landspeeder": "x-34-landspeeder.webp",
    "TIE/LN starfighter": "tie-ln-starfighter.webp",
    Snowspeeder: "snowspeeder.webp",
    "TIE bomber": "tie-bomber.webp",
  },
};

/**
 * Used when a record has no picture of its own, so that a card is never left
 * with a broken image.
 */
const PLACEHOLDER = "assets/img/placeholder.svg";

/**
 * Finds the picture for one record.
 *
 * @param {string} categoryKey Category name, for example "vehicles".
 * @param {string} recordName Name or title of the record.
 * @returns {string} Relative path to the picture for that record.
 */
export function getArtworkPath(categoryKey, recordName) {
  const fileName = ARTWORK[categoryKey]?.[recordName];
  return fileName ? `assets/img/${categoryKey}/${fileName}` : PLACEHOLDER;
}
