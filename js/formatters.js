/**
 * Small formatting helpers.
 *
 * SWAPI returns every value as a string and uses the literal values
 * "unknown" and "n/a" for missing data, so each value is normalised before
 * it is written to the page.
 */

const MISSING_VALUES = ["unknown", "n/a", "none", ""];

/**
 * Returns true when the API value carries no real information.
 * @param {string|undefined|null} value
 * @returns {boolean}
 */
function isMissing(value) {
  if (value === undefined || value === null) {
    return true;
  }

  return MISSING_VALUES.includes(String(value).trim().toLowerCase());
}

/**
 * Formats a plain text value and capitalises the first letter.
 * @param {string} value
 * @returns {string}
 */
export function formatText(value) {
  if (isMissing(value)) {
    return "Not known";
  }

  const text = String(value).trim();
  return text.charAt(0).toUpperCase() + text.slice(1);
}

/**
 * Formats a numeric value with thousand separators and an optional unit.
 * @param {string} value
 * @param {string} [unit] Unit appended after the number, for example "cm".
 * @returns {string}
 */
export function formatNumber(value, unit = "") {
  if (isMissing(value)) {
    return "Not known";
  }

  // SWAPI writes large numbers with commas, for example "1,000,000".
  const numericValue = Number(String(value).replace(/,/g, ""));

  if (Number.isNaN(numericValue)) {
    return formatText(value);
  }

  const formattedNumber = numericValue.toLocaleString("en-GB");
  return unit ? `${formattedNumber} ${unit}` : formattedNumber;
}

/**
 * Formats an ISO 8601 date string as a readable date.
 * @param {string} value ISO 8601 date, for example "1977-05-25".
 * @returns {string}
 */
export function formatDate(value) {
  if (isMissing(value)) {
    return "Not known";
  }

  const date = new Date(value);

  if (Number.isNaN(date.getTime())) {
    return formatText(value);
  }

  return date.toLocaleDateString("en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

/**
 * Shortens a long text and appends an ellipsis when it is cut off.
 * @param {string} value
 * @param {number} [maxLength]
 * @returns {string}
 */
export function formatSummary(value, maxLength = 140) {
  if (isMissing(value)) {
    return "Not known";
  }

  // The opening crawl contains hard line breaks that are collapsed here.
  const text = String(value).replace(/\s+/g, " ").trim();

  if (text.length <= maxLength) {
    return text;
  }

  return `${text.slice(0, maxLength).trimEnd()}…`;
}

/**
 * Formats a list of related resource URLs as a simple count.
 * @param {string[]|undefined} value
 * @param {string} singular Noun used when the count is exactly one.
 * @returns {string}
 */
export function formatCount(value, singular) {
  const count = Array.isArray(value) ? value.length : 0;
  return count === 1 ? `1 ${singular}` : `${count} ${singular}s`;
}
