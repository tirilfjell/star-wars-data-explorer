import { getArtworkPath } from "./artwork.js";

// Cards are built with createElement and textContent, so text from the API is
// inserted as text and can never be parsed as markup.

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

export function createRecordCard(record, category) {
  const recordName = record[category.titleKey];

  const listItem = document.createElement("li");
  listItem.className = "record-grid__item";

  const card = document.createElement("article");
  card.className = "record-card";

  const image = document.createElement("img");
  image.className = "record-card__image";
  image.src = getArtworkPath(category.key, recordName);
  image.alt = category.imageAlt(record);
  image.loading = "lazy";
  image.decoding = "async";
  // The intrinsic size lets the browser reserve the space in advance, so the
  // layout does not shift as the pictures arrive.
  image.width = 640;
  image.height = 640;
  image.addEventListener(
    "error",
    () => {
      image.src = "assets/img/placeholder.svg";
    },
    { once: true },
  );

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
