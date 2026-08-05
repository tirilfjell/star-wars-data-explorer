// Controls the single status element that reports loading and error states.
// The element carries aria-live="polite" in the HTML, so screen readers
// announce the change without the user having to look for it.

export function createStatusMessage(element) {
  function render(title, text, isError) {
    element.classList.toggle("status-message--error", isError);
    element.hidden = false;

    const heading = document.createElement("h2");
    heading.className = "status-message__title";
    heading.textContent = title;

    const paragraph = document.createElement("p");
    paragraph.className = "status-message__text";
    paragraph.textContent = text;

    element.replaceChildren(heading, paragraph);
  }

  return {
    showLoading(categoryLabel) {
      render("Loading", `Fetching ${categoryLabel.toLowerCase()} from the Star Wars API…`, false);
    },

    showError(message) {
      render("Something went wrong", message, true);
    },

    hide() {
      element.hidden = true;
      element.replaceChildren();
    },
  };
}
