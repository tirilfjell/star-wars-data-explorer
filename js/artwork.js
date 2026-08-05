// SWAPI has no image field, and starwars-visualguide.com, the host normally
// paired with it, no longer serves images at all. The pictures are taken from
// Wookieepedia and stored locally so the page works without that host.
//
// Records are matched by name rather than by position, so the right picture is
// shown even if the API returns the records in a different order.

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

const PLACEHOLDER = "assets/img/placeholder.svg";

export function getArtworkPath(categoryKey, recordName) {
  const fileName = ARTWORK[categoryKey]?.[recordName];
  return fileName ? `assets/img/${categoryKey}/${fileName}` : PLACEHOLDER;
}
