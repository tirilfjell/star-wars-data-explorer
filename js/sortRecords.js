// SWAPI returns every value as a string, writes large numbers with commas and
// uses "unknown" for missing data, so values are converted before comparing.

const MISSING = ["unknown", "n/a", "none", ""];

function isMissing(value) {
  if (value === undefined || value === null) {
    return true;
  }

  return MISSING.includes(String(value).trim().toLowerCase());
}

function compare(a, b, option) {
  if (option.type === "number") {
    const first = Number(String(a).replace(/,/g, ""));
    const second = Number(String(b).replace(/,/g, ""));

    if (Number.isNaN(first) || Number.isNaN(second)) {
      return String(a).localeCompare(String(b), "en");
    }

    return first - second;
  }

  if (option.type === "date") {
    return new Date(a).getTime() - new Date(b).getTime();
  }

  return String(a).localeCompare(String(b), "en", { sensitivity: "base" });
}

export function sortRecords(records, option) {
  return [...records].sort((recordA, recordB) => {
    const a = recordA[option.key];
    const b = recordB[option.key];

    // Records with no usable value always sit last, whichever way the rest
    // is ordered.
    const aMissing = isMissing(a);
    const bMissing = isMissing(b);

    if (aMissing || bMissing) {
      return aMissing && bMissing ? 0 : aMissing ? 1 : -1;
    }

    const result = compare(a, b, option);
    return option.descending ? -result : result;
  });
}
