import { ApiError, fetchRecords } from "./api.js";
import { RECORDS_PER_CATEGORY, getCategory } from "./config.js";
import { createRecordCard } from "./recordCard.js";
import { createStatusMessage } from "./statusMessage.js";

// All four category pages load this module. Each page states which category it
// shows through the data-category attribute on its <main> element.

async function loadCategory(category, grid, status) {
  status.showLoading(category.label);

  // Lets the stylesheet size the picture frame to the shape this category's
  // pictures have.
  grid.classList.add(`record-grid--${category.key}`);

  try {
    const records = await fetchRecords(category.endpoint, RECORDS_PER_CATEGORY);

    // Collected in a fragment so the page is updated once rather than on
    // every card.
    const fragment = document.createDocumentFragment();

    records.forEach((record) => {
      fragment.append(createRecordCard(record, category));
    });

    grid.replaceChildren(fragment);
    status.hide();
  } catch (error) {
    console.error("Could not render the category:", error);

    status.showError(
      error instanceof ApiError
        ? error.message
        : "The data could not be displayed. Please reload the page and try again.",
    );
  }
}

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
