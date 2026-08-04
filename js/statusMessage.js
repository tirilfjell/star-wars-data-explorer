/**
 * Controls the single status element that reports loading and error states.
 *
 * The element uses aria-live="polite" in the HTML, so screen readers announce
 * the change without the user having to look for it.
 */

/**
 * @param {HTMLElement} element The status container.
 */
export function createStatusMessage(element) {
  /**
   * Renders a heading and a body text inside the status element.
   * @param {string} title
   * @param {string} text
   * @param {boolean} isError
   */
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
    /**
     * Shows the loading state while the request is running.
     * @param {string} categoryLabel
     */
    showLoading(categoryLabel) {
      render("Loading", `Fetching ${categoryLabel.toLowerCase()} from the Star Wars API…`, false);
    },

    /**
     * Shows an error the user can act on.
     * @param {string} message
     */
    showError(message) {
      render("Something went wrong", message, true);
    },

    /** Hides the status element once the records are on the page. */
    hide() {
      element.hidden = true;
      element.replaceChildren();
    },
  };
}
