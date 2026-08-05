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
 * @returns {HTMLLIElement}
 */
export function createRecordCard(record, category) {
  const recordName = record[category.titleKey];

  const listItem = document.createElement("li");
  listItem.className = "record-grid__item";

  const card = document.createElement("article");
  card.className = "record-card";

  const image = document.createElement("img");
  image.className = "record-card__image";
  image.src = getArtworkPath(category.key, recordName);
  // The picture carries information the text does not, so it is given a
  // descriptive alternative text rather than being hidden from screen readers.
  image.alt = category.imageAlt(record);
  // Cards below the fold are only fetched once they are needed, and the
  // intrinsic size lets the browser reserve the space in advance so the
  // layout does not shift as the pictures arrive.
  image.loading = "lazy";
  image.decoding = "async";
  image.width = 640;
  image.height = 640;
  // A picture that fails to load would otherwise leave a broken icon; the
  // card falls back to the neutral placeholder instead.
  image.addEventListener("error", function handleMissingImage() {
    image.src = "assets/img/placeholder.svg";
  }, { once: true });

  const body = document.createElement("div");
  body.className = "record-card__body";

  const title = document.createElement("h2");
  title.className = "record-card__title";
  title.textContent = recordName;

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
