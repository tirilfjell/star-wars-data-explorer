/**
 * Configuration for the four categories.
 *
 * Every category declares its API endpoint and the properties that are shown
 * on a card. Keeping this in one place means a category page only needs to
 * know its own key - the rest of the application is generic.
 */

import {
  formatCount,
  formatDate,
  formatNumber,
  formatSummary,
  formatText,
} from "./formatters.js";

/** Number of records rendered per category (the exam requires at least 6). */
export const RECORDS_PER_CATEGORY = 6;

export const categories = {
  films: {
    key: "films",
    label: "Films",
    endpoint: "films",
    description: "Release details and credits for the Star Wars films.",
    /** Property used as the card heading. */
    titleKey: "title",
    /**
     * Alternative text for the picture on the card. It names what the picture
     * actually shows, so a screen reader user is told the same thing a sighted
     * user sees rather than simply being given the record name again.
     */
    imageAlt: (record) => `Theatrical release poster for the film ${record.title}`,
    properties: [
      { label: "Episode", key: "episode_id", format: (value) => formatNumber(value) },
      { label: "Director", key: "director", format: formatText },
      { label: "Producer", key: "producer", format: formatText },
      { label: "Released", key: "release_date", format: formatDate },
      { label: "Characters", key: "characters", format: (value) => formatCount(value, "character") },
      { label: "Opening", key: "opening_crawl", format: (value) => formatSummary(value, 110) },
    ],
  },

  people: {
    key: "people",
    label: "People",
    endpoint: "people",
    description: "Height, mass and other details about the characters.",
    titleKey: "name",
    imageAlt: (record) => `Portrait of the character ${record.name}`,
    properties: [
      { label: "Height", key: "height", format: (value) => formatNumber(value, "cm") },
      { label: "Mass", key: "mass", format: (value) => formatNumber(value, "kg") },
      { label: "Born", key: "birth_year", format: formatText },
      { label: "Gender", key: "gender", format: formatText },
      { label: "Eye colour", key: "eye_color", format: formatText },
      { label: "Hair colour", key: "hair_color", format: formatText },
    ],
  },

  planets: {
    key: "planets",
    label: "Planets",
    endpoint: "planets",
    description: "Climate, terrain and population of the known planets.",
    titleKey: "name",
    imageAlt: (record) => `View of the planet ${record.name} seen from space`,
    properties: [
      { label: "Climate", key: "climate", format: formatText },
      { label: "Terrain", key: "terrain", format: formatText },
      { label: "Population", key: "population", format: (value) => formatNumber(value) },
      { label: "Diameter", key: "diameter", format: (value) => formatNumber(value, "km") },
      { label: "Gravity", key: "gravity", format: formatText },
      { label: "Day length", key: "rotation_period", format: (value) => formatNumber(value, "hours") },
    ],
  },

  vehicles: {
    key: "vehicles",
    label: "Vehicles",
    endpoint: "vehicles",
    description: "Models, manufacturers and capacity of the vehicles.",
    titleKey: "name",
    imageAlt: (record) => `The ${record.name} vehicle shown from the side`,
    properties: [
      { label: "Model", key: "model", format: formatText },
      { label: "Manufacturer", key: "manufacturer", format: formatText },
      { label: "Class", key: "vehicle_class", format: formatText },
      { label: "Cost", key: "cost_in_credits", format: (value) => formatNumber(value, "credits") },
      { label: "Top speed", key: "max_atmosphering_speed", format: (value) => formatNumber(value, "km/h") },
      { label: "Crew", key: "crew", format: (value) => formatNumber(value) },
    ],
  },
};

/**
 * Looks up a category configuration and fails loudly on an unknown key,
 * which makes a typo in the HTML easy to spot during development.
 * @param {string} categoryKey
 * @returns {object}
 */
export function getCategory(categoryKey) {
  const category = categories[categoryKey];

  if (!category) {
    throw new Error(`Unknown category: "${categoryKey}".`);
  }

  return category;
}
