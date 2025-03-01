// src/utils/imageUtility.js

/**
 * Transforms a database image path to a full URL.
 * @param {string} dbPath - The image path from the database.
 * @returns {string} The full URL or a default broken image URL.
 */
export function transformImagePath(dbPath) {
  if (dbPath) {
    return `http://localhost:4000/${dbPath}`;
  }
  return "/assets/images/errors/broken-image.png";
}

/**
 * Reverts a site image URL back to a database-compatible path.
 * @param {string} sitePath - The URL of the image.
 * @returns {string} The reverted database-compatible path.
 */
export function revertImagePath(sitePath) {
  const baseUrl = `${import.meta.env.VITE_BASE_URL}/`;
  const pathWithoutBase = sitePath.replace(baseUrl, "");
  return `public/${pathWithoutBase}`;
}

/**
 * Checks if a value is of the expected image type.
 * @param {any} value - The value to check.
 * @returns {boolean} True if the value is an object with "url" and "alt" properties.
 */
export function isImageType(value) {
  return (
    value &&
    typeof value === "object" &&
    "url" in value &&
    "alt" in value &&
    typeof value.url === "string" &&
    typeof value.alt === "string"
  );
}

/**
 * Validates if a URL points to an image file based on its extension.
 * @param {string} url - The URL to validate.
 * @returns {boolean} True if the URL has a valid image extension.
 */
export function isValidImageUrl(url) {
  const imageExtensions = ["jpg", "jpeg", "png", "gif", "webp", "bmp", "tiff"];
  const extension = url.split(".").pop()?.toLowerCase() || "";
  return imageExtensions.includes(extension);
}

/**
 * Generates a placeholder image URL based on dimensions.
 * @param {number} width - The width of the placeholder.
 * @param {number} height - The height of the placeholder.
 * @param {string} [text] - Optional text to display in the placeholder.
 * @returns {string} A URL for the placeholder image.
 */
export function generatePlaceholderImage(width, height, text) {
  return `https://via.placeholder.com/${width}x${height}${
    text ? `?text=${encodeURIComponent(text)}` : ""
  }`;
}

/**
 * Checks if an image URL is reachable by attempting to fetch it.
 * @param {string} url - The image URL to check.
 * @returns {Promise<boolean>} A promise that resolves to true if reachable, otherwise false.
 */
export async function isImageReachable(url) {
  try {
    const response = await fetch(url, { method: "HEAD" });
    return response.ok;
  } catch {
    return false;
  }
}

/**
 * Extracts the image file name from a URL.
 * @param {string} url - The URL of the image.
 * @returns {string} The file name.
 */
export function extractFileNameFromUrl(url) {
  return url.split("/").pop() || "unknown";
}

/**
 * Converts a File object to a URL for real-time preview.
 * @param {File} file - The file uploaded by the user.
 * @returns {string|null} A URL that can be used to preview the file.
 */
export function fileToUrl(file) {
  try {
    return URL.createObjectURL(file);
  } catch (error) {
    console.error("Error creating object URL:", error);
    return null;
  }
}

/**
 * Revokes a previously created object URL to free up memory.
 * @param {string} url - The URL to revoke.
 */
export function revokeUrl(url) {
  try {
    URL.revokeObjectURL(url);
  } catch (error) {
    console.error("Error revoking object URL:", error);
  }
}
