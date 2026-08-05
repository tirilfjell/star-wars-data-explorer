/**
 * Entry point for the four category pages.
 *
 * Every category page loads this one module. The page tells the module which
 * category to show through the data-category attribute on the <main> element,
 * so no page needs its own script file.
 */

import { ApiError, fetchRecords } from "./api.js";
import { RECORDS_PER_CATEGORY, getCategory } from "./config.js";
import { createRecordCard } from "./recordCard.js";
import { createStatusMessage } from "./statusMessage.js";

/**
 * Loads the records for one category and renders them into the grid.
 * @param {object} category The category configuration.
 * @param {HTMLElement} grid The list element the cards are appended to.
 * @param {object} status The status message controller.
 */
async function loadCategory(category, grid, status) {
  status.showLoading(category.label);

  // Lets the stylesheet size the picture frame to the shape this category's
  // pictures actually have (portrait posters, square planets, wide vehicles).
  grid.classList.add(`record-grid--${category.key}`);

  try {
    const records = await fetchRecords(category.endpoint, RECORDS_PER_CATEGORY);

    // The cards are collected in a fragment first, so the page is only
    // updated once instead of on every single card.
    const fragment = document.createDocumentFragment();

    records.forEach((record) => {
      fragment.append(createRecordCard(record, category));
    });

    grid.replaceChildren(fragment);
    status.hide();
  } catch (error) {
    // A known API problem gets its own message, anything else falls back to a
    // generic one. The technical details stay in the console.
    console.error("Could not render the category:", error);

    status.showError(
      error instanceof ApiError
        ? error.message
        : "The data could not be displayed. Please reload the page and try again.",
    );
  }
}

/** Reads the configuration from the page and starts loading. */
function initialise() {
  const main = document.querySelector("[data-category]");
  const grid = document.querySelector("[data-record-grid]");
  const statusElement = document.querySelector("[data-status-message]");

  if (!main || !grid || !statusElement) {
    console.error("The page is missing one of the required elements.");
    return;
  }

  const status = createStatusMessage(statusElement);

  try {
    const category = getCategory(main.dataset.category);
    loadCategory(category, grid, status);
  } catch (error) {
    console.error(error);
    status.showError("This page is not configured correctly.");
  }
}

initialise();
