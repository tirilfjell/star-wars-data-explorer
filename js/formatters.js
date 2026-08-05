// SWAPI returns every value as a string and uses "unknown" and "n/a" for
// missing data, so values are normalised before they reach the page.

const MISSING_VALUES = ["unknown", "n/a", "none", ""];

function isMissing(value) {
  if (value === undefined || value === null) {
    return true;
  }

  return MISSING_VALUES.includes(String(value).trim().toLowerCase());
}

export function formatText(value) {
  if (isMissing(value)) {
    return "Not known";
  }

  const text = String(value).trim();
  return text.charAt(0).toUpperCase() + text.slice(1);
}

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

export function formatCount(value, singular) {
  const count = Array.isArray(value) ? value.length : 0;
  return count === 1 ? `1 ${singular}` : `${count} ${singular}s`;
}
