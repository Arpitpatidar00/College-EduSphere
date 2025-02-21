/* eslint-disable no-restricted-syntax */
export function generateImageURL(index) {
  return `https://source.unsplash.com/random/?${index}`;
}

// Generates a random key
export function generateRandomKey(prefix = "key") {
  return `${prefix}-${Math.random().toString(36).substr(2, 9)}`;
}

export function generateSlug(mainSlug, subSlug) {
  // Base slug starts empty
  let slug = "";

  if (mainSlug) {
    slug += `/${mainSlug
      .toLowerCase()
      .replace(/[^\w\s-]/g, "")
      .trim()
      .replace(/[\s_-]+/g, "-")
      .replace(/^-+|-+$/g, "")}`;
  }

  if (subSlug) {
    slug += `/${subSlug
      .toLowerCase()
      .replace(/[^\w\s-]/g, "")
      .trim()
      .replace(/[\s_-]+/g, "-")
      .replace(/^-+|-+$/g, "")}`;
  }

  return slug;
}

export function processSubCategories(
  currentSubCategories,
  incomingSubCategories,
  slugLabel = "subTagSlug"
) {
  let isChanged = false;

  // Check for additions or total length changes
  if (currentSubCategories.length !== incomingSubCategories.length) {
    isChanged = true;
  }

  // Generate slugs for new names and detect any changes
  const processedSubCategories = incomingSubCategories.map((incomingSub) => {
    const { name, description } = incomingSub;
    const currentSub = currentSubCategories.find((sub) => sub.name === name);
    const hasNewBanner =
      incomingSub?.bannerFile instanceof File &&
      (incomingSub.bannerFile?.name !== currentSub?.banner?.name ||
        incomingSub.bannerFile?.size !== currentSub?.banner?.size);

    const hasNewThumbnail =
      incomingSub?.thumbnailFile instanceof File &&
      (incomingSub.thumbnailFile?.name !== currentSub?.thumbnail?.name ||
        incomingSub.thumbnailFile?.size !== currentSub?.thumbnail?.size);

    // If subcategory is new or any property has changed
    if (
      !currentSub ||
      currentSub?.description !== description ||
      hasNewBanner ||
      hasNewThumbnail
    ) {
      isChanged = true;
    }

    // Return new object with slug generated for name changes
    return {
      ...incomingSub,
      [slugLabel]: generateSlug(name), // Assuming your generateSlug function takes a name and returns a slug
    };
  });

  // Compare each item for name or description changes if not detected above
  if (!isChanged) {
    isChanged = processedSubCategories.some(
      (sub, index) =>
        sub.name !== currentSubCategories[index]?.name ||
        sub.description !== currentSubCategories[index]?.description
    );
  }

  // If changes detected, return the processed array, else return null
  return isChanged ? processedSubCategories : null;
}
