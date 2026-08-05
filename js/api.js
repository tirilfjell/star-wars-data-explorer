// The official host swapi.dev has been unreliable, so the documented mirror
// swapi.py4e.com is used first and swapi.dev is kept as a fallback.
// Both expose the same endpoints and response shape.

const API_HOSTS = ["https://swapi.py4e.com/api", "https://swapi.dev/api"];

const REQUEST_TIMEOUT_MS = 12000;

// Carries a message that is safe to show to the user.
export class ApiError extends Error {
  constructor(message, cause) {
    super(message);
    this.name = "ApiError";
    this.cause = cause;
  }
}

async function requestFromHost(host, endpoint) {
  // Stops a request that never resolves, so the loading message is not left
  // on screen indefinitely.
  const response = await fetch(`${host}/${endpoint}/`, {
    signal: AbortSignal.timeout(REQUEST_TIMEOUT_MS),
    headers: { Accept: "application/json" },
  });

  if (!response.ok) {
    throw new Error(`${host} responded with status ${response.status}.`);
  }

  return response.json();
}

export async function fetchRecords(endpoint, limit) {
  let lastError;

  for (const host of API_HOSTS) {
    try {
      const data = await requestFromHost(host, endpoint);

      if (!Array.isArray(data.results) || data.results.length === 0) {
        throw new Error(`${host} returned no records for "${endpoint}".`);
      }

      return data.results.slice(0, limit);
    } catch (error) {
      // Remember the failure and try the next host before giving up.
      lastError = error;
      console.warn(`Request to ${host} failed:`, error);
    }
  }

  throw new ApiError(
    "The Star Wars API could not be reached. Please check your internet connection and try again.",
    lastError,
  );
}
