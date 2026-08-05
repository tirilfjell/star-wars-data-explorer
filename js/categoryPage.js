import { ApiError, fetchRecords } from "./api.js";
import { RECORDS_PER_CATEGORY, getCategory } from "./config.js";
import { createRecordCard } from "./recordCard.js";
import { createSortControl } from "./sortControl.js";
import { createStatusMessage } from "./statusMessage.js";
import { sortRecords } from "./sortRecords.js";

// All four category pages load this module. Each page states which category it
// shows through the data-category attribute on its <main> element.

function renderRecords(records, category, grid) {
  const fragment = document.createDocumentFragment();

  records.forEach((record) => {
    fragment.append(createRecordCard(record, category));
  });

  grid.replaceChildren(fragment);
}

async function loadCategory(category, elements, status) {
  const { grid, sortContainer } = elements;

  status.showLoading(category.label);
  sortContainer.replaceChildren();
  grid.classList.add(`record-grid--${category.key}`);

  try {
    const records = await fetchRecords(category.endpoint, RECORDS_PER_CATEGORY);

    renderRecords(records, category, grid);
    status.hide();

    // The fetched records are kept, so changing the order never refetches.
    createSortControl(sortContainer, category, (option) => {
      renderRecords(sortRecords(records, option), category, grid);
    });
  } catch (error) {
    console.error("Could not render the category:", error);

    status.showError(
      error instanceof ApiError
        ? error.message
        : "The data could not be displayed. Please try again.",
      () => loadCategory(category, elements, status),
    );
  }
}

function initialise() {
  const main = document.querySelector("[data-category]");
  const grid = document.querySelector("[data-record-grid]");
  const statusElement = document.querySelector("[data-status-message]");
  const sortContainer = document.querySelector("[data-sort-control]");

  if (!main || !grid || !statusElement || !sortContainer) {
    console.error("The page is missing one of the required elements.");
    return;
  }

  const status = createStatusMessage(statusElement);

  try {
    const category = getCategory(main.dataset.category);
    loadCategory(category, { grid, sortContainer }, status);
  } catch (error) {
    console.error(error);
    status.showError("This page is not configured correctly.");
  }
}

initialise();
