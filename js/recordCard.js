/**
 * Builds the DOM for a single record card.
 *
 * The card is created with DOM methods rather than an HTML string, so text
 * coming from the API is inserted as text and can never be parsed as markup.
 */

import { getArtworkPath } from "./artwork.js";

/**
 * Creates one property row (a name and its value) inside the card.
 * @param {{label: string, key: string, format: Function}} property
 * @param {object} record A record as returned by the API.
 * @returns {DocumentFragment}
 */
function createPropertyRow(property, record) {
  const fragment = document.createDocumentFragment();

  const name = document.createElement("dt");
  name.className = "record-card__property-name";
  name.textContent = property.label;

  const value = document.createElement("dd");
  value.className = "record-card__property-value";
  value.textContent = property.format(record[property.key]);

  fragment.append(name, value);
  return fragment;
}

/**
 * Creates a complete list item holding one record card.
 * @param {object} record A record as returned by the API.
 * @param {object} category The category configuration for the record.
 * @param {number} index Zero-based position of the record in the list.
 * @returns {HTMLLIElement}
 */
export function createRecordCard(record, category, index) {
  const listItem = document.createElement("li");
  listItem.className = "record-grid__item";

  const card = document.createElement("article");
  card.className = "record-card";

  const image = document.createElement("img");
  image.className = "record-card__image";
  image.src = getArtworkPath(category.key, index);
  image.alt = category.imageAlt(record);
  // The illustrations are decorative for layout purposes but still describe
  // the record, so they keep a descriptive alternative text.
  image.loading = "lazy";
  image.width = 400;
  image.height = 300;

  const body = document.createElement("div");
  body.className = "record-card__body";

  const title = document.createElement("h2");
  title.className = "record-card__title";
  title.textContent = record[category.titleKey];

  const properties = document.createElement("dl");
  properties.className = "record-card__properties";

  category.properties.forEach((property) => {
    properties.append(createPropertyRow(property, record));
  });

  body.append(title, properties);
  card.append(image, body);
  listItem.append(card);

  return listItem;
}
