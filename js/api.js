/**
 * Data access layer for SWAPI (the Star Wars API).
 *
 * The official host swapi.dev has been unreliable, so the documented mirror
 * swapi.py4e.com is used as the primary host and swapi.dev as the fallback.
 * Both expose exactly the same endpoints and response shape.
 *
 * Documentation: https://swapi.py4e.com/documentation
 */

const API_HOSTS = ["https://swapi.py4e.com/api", "https://swapi.dev/api"];

/** Requests are given up on after this many milliseconds. */
const REQUEST_TIMEOUT_MS = 12000;

/**
 * Error type that carries a message safe to show to the user.
 */
export class ApiError extends Error {
  /**
   * @param {string} message Message shown in the interface.
   * @param {Error} [cause] The original error, kept for debugging.
   */
  constructor(message, cause) {
    super(message);
    this.name = "ApiError";
    this.cause = cause;
  }
}

/**
 * Requests a single endpoint from one host.
 * @param {string} host Base URL of the API.
 * @param {string} endpoint Endpoint name, for example "films".
 * @returns {Promise<object>} The parsed JSON response.
 */
async function requestFromHost(host, endpoint) {
  // AbortSignal.timeout stops a request that never resolves, so the user is
  // not left looking at the loading message indefinitely.
  const response = await fetch(`${host}/${endpoint}/`, {
    signal: AbortSignal.timeout(REQUEST_TIMEOUT_MS),
    headers: { Accept: "application/json" },
  });

  if (!response.ok) {
    throw new Error(`${host} responded with status ${response.status}.`);
  }

  return response.json();
}

/**
 * Fetches the records of one category.
 *
 * @param {string} endpoint Endpoint name, for example "planets".
 * @param {number} limit Maximum number of records to return.
 * @returns {Promise<object[]>} The records for the category.
 * @throws {ApiError} When every host fails or the response is unusable.
 */
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
