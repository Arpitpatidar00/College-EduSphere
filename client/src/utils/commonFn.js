/* eslint-disable indent */
/* eslint-disable no-nested-ternary */
/* eslint-disable no-param-reassign */
/* eslint-disable no-unreachable-loop */
import _ from "lodash";
import moment from "moment";
import "moment-timezone";

/* eslint-disable no-restricted-syntax */
export function transformImagePath(url) {
  if (!url) {
    return "/assets/errors/broken-image.png";
  }

  return url;
  // Normalize path to use forward slashes
}

export function revertImagePath(sitePath) {
  const baseUrl = `${process.env.NEXT_PUBLIC_BASE_URL}/`;

  const path = sitePath.replace(baseUrl, "");

  const modifiedUrl = `public/${path}`;

  return modifiedUrl;
}

export function formatQueryParamsToHeading(queryParam) {
  if (!queryParam) {
    return null;
  }
  // Split the query parameter by hyphens to get individual words
  const words = queryParam.split("-");

  // Capitalize the first letter of each word and join them back with a space
  const formattedHeading = words
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");

  return formattedHeading;
}

export const capitalize = (s = "") => {
  try {
    if (s) {
      const wordArrays = s.split(" ");
      if (wordArrays.length > 1) {
        return wordArrays
          .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
          .join(" ");
      }
      return s.charAt(0).toUpperCase() + s.slice(1);
    }
    return "";
  } catch (error) {
    return s;
  }
};
export const toTitleCase = (str = "") =>
  str
    .toLowerCase()
    .split(" ")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");

export const formatPrice = (price) => {
  const intPrice = parseInt(price, 10);
  if (!intPrice) {
    return null;
  }
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    // Optional: Control the display of the currency symbol and the number of decimal places.
    // currencyDisplay: 'symbol',
    minimumFractionDigits: 0, // To avoid showing decimal places
  }).format(price);
};

export function hasArrayOfObjectsChanged(existingArr, incomingArr) {
  if (existingArr.length !== incomingArr.length) {
    return true;
  }

  const existingMap = new Map(existingArr.map((item) => [item._id, item]));
  const incomingMap = new Map(incomingArr.map((item) => [item._id, item]));

  for (const { _id } of existingArr) {
    if (
      !incomingMap.has(_id) ||
      !_.isEqual(existingMap.get(_id), incomingMap.get(_id))
    ) {
      return true; // Item was removed, added, or modified
    }
  }

  // No changes detected
  return false;
}

export function haveArraysChanged(existingArr, incomingArr) {
  if (!existingArr || !incomingArr) {
    return false;
  }
  // Convert both arrays to Set for efficient lookup
  const existingSet = new Set(existingArr);
  const incomingSet = new Set(incomingArr);

  // Check if lengths are different, which means items were added or removed
  if (existingSet.size !== incomingSet.size) {
    return true;
  }

  // Check for differences in elements
  for (const item of existingSet) {
    if (!incomingSet.has(item)) {
      return true; // Item in existing array is not found in incoming array
    }
  }

  // No differences found
  return false;
}

export function findNonCommonItems(array1, array2) {
  const set1 = new Set(array1);
  const set2 = new Set(array2);

  const uniqueToSet1 = Array.from(set1).filter((item) => !set2.has(item));

  const uniqueToSet2 = Array.from(set2).filter((item) => !set1.has(item));

  const nonCommonItems = uniqueToSet1.concat(uniqueToSet2);

  return nonCommonItems;
}

export function isFormDataEmpty(formData) {
  for (const entry of formData.entries()) {
    return false;
  }
  return true; // If no entries were found, return true (empty)
}

export function mapAnswersToQuestions(questionsArray = [], answersArray = []) {
  // Clone the questions array to avoid mutating the original data
  let questionsWithAnswers = JSON.parse(JSON.stringify(questionsArray));

  // Iterate through the questions and match answers
  questionsWithAnswers = questionsWithAnswers.map((question) => {
    const matchedAnswer = answersArray.find(
      (answer) => answer.questionId === question._id
    );

    if (matchedAnswer) {
      // Found a matching answer for this question
      question.answer = matchedAnswer.answer;

      // For radio and checkbox types, mark the selected options
      if (
        question.answerType === "radio" ||
        question.answerType === "checkbox"
      ) {
        question.options = question.options.map((option) => ({
          ...option,
          isSelected: option.value === matchedAnswer.answer,
        }));
      }
    } else {
      question.answer = question.answerType === "checkbox" ? [] : "";
    }

    return question;
  });

  return questionsWithAnswers;
}

export const filterOutVendorPortfolio = (data) => {
  // @ Group Images by Album Name
  if (!data?.length) {
    return {
      allPhotos: [],
      photosByAlbum: {},
      videos: [],
    };
  }
  const imagesByAlbum = data.reduce((acc, item) => {
    if (item.album && item.assetType !== "video") {
      if (!acc[item.album]) {
        acc[item.album] = [];
      }
      acc[item.album].push(item);
    }
    return acc;
  }, {});

  // @ Filter Out Entries with AssetType "Video"
  const videoEntries = data.filter((item) => item.assetType === "video");

  const photoEntries = data.filter((item) => item.assetType.includes("image"));

  return {
    allAssets: data || [],
    allPhotos: photoEntries,
    photosByAlbum: imagesByAlbum,
    videos: videoEntries,
  };
};

export function formatNumber(num) {
  if (num >= 1e9) {
    return `${(num / 1e9).toFixed(0)}B`;
  }
  if (num >= 1e6) {
    return `${(num / 1e6).toFixed(0)}M`;
  }
  if (num >= 1e3) {
    return `${(num / 1e3).toFixed(0)}K`;
  }
  return num.toString();
}

export function removeQueryParamsFromRelativeUrl(relativeUrl) {
  const [baseUrl] = relativeUrl.split("?", 1);
  return baseUrl;
}

export function getAns(questionsWithAns, placeholderToSearch, returnAsArray) {
  let excludePrice = false;
  let basePattern = placeholderToSearch.replace(/{d}/g, "(\\d+)");
  if (!basePattern.includes("-price")) {
    excludePrice = true;
    basePattern += "(?!-price)";
  }

  const regex = new RegExp(basePattern, "i");

  const matchingQuestions = questionsWithAns.filter((question) => {
    const match = question.questionLabel.match(regex);
    if (!match) return false;
    if (excludePrice) {
      return !question.questionLabel.includes(`${match[1]}-price`);
    }
    return true;
  });

  const answers = matchingQuestions.map((question) => ({
    label: question.questionLabel,
    answer: question.answer,
    id: question._id,
  }));

  return returnAsArray ? answers : answers.length > 0 ? answers[0] || {} : {};
}

export function extractDigitAndSuffix(str) {
  if (!str) {
    return {
      digit: null,
      suffix: "",
    };
  }

  if (typeof str === "string") {
    const match = str.match(/^(\d+)(.*)$/);
    if (match) {
      return {
        digit: parseInt(match[1], 10),
        suffix: match[2],
      };
    }
  }

  if (typeof str === "number") {
    return {
      digit: str,
      suffix: "",
    };
  }

  return {
    digit: null,
    suffix: "",
  };
}

export function parseJwt(token) {
  try {
    const base64Url = token.split(".")[1];
    const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
    const jsonPayload = decodeURIComponent(
      atob(base64)
        .split("")
        .map((c) => `%${`00${c.charCodeAt(0).toString(16)}`.slice(-2)}`)
        .join("")
    );

    return JSON.parse(jsonPayload);
  } catch (e) {
    return null;
  }
}

export function replaceH2WithH3(htmlString) {
  // Create a new DOMParser instance
  const parser = new DOMParser();

  // Parse the HTML string into a document
  const doc = parser.parseFromString(htmlString, "text/html");

  // Find all h2 elements
  const h2Elements = doc.querySelectorAll("h2");

  // Iterate over all h2 elements
  h2Elements.forEach((h2) => {
    // Check if the only child is a <br> element and there's no other text content
    if (
      h2.childNodes.length === 1 &&
      (h2.childNodes[0].nodeName === "BR" ||
        h2.childNodes[0].nodeName === "IMG")
    ) {
      // Create a new h3 element
      const h3 = document.createElement("h3");

      // Copy all children of h2 to h3 (in this case, just the <br> tag)
      while (h2.firstChild) {
        h3.appendChild(h2.firstChild);
      }

      // Replace h2 with h3 in the document
      h2.parentNode.replaceChild(h3, h2);
    }
  });

  // Serialize the document back to an HTML string
  return doc.body.innerHTML;
}

// Function to remove Razorpay overlay
export function removeRazorpayOverlay() {
  setTimeout(() => {
    // Get all Razorpay overlay elements
    const overlays = document.querySelectorAll(
      ".razorpay-container, .razorpay-overlay, .razorpay-checkout-frame"
    );
    overlays.forEach((overlay) => {
      if (overlay) {
        overlay.style.display = "none";
      }
    });
  }, 500); // Adjust the delay as necessary
}

// Function to convert UTC date to IST
export const convertToIST = (utcDate) => {
  // Convert the date to IST and format it
  const istDate = moment(utcDate)
    .tz("Asia/Kolkata")
    .format("YYYY-MM-DD HH:mm:ss");
  return istDate;
};

export const extractServiceName = (label) => {
  if (!label) return "";
  const regex = /\[(.*?)\]/;
  const match = label.match(regex);
  return match && match[1] ? match[1].trim() : "";
};

export const extractSubCategoryFromCategory = (categories) => {
  if (categories.length > 0) {
    return categories
      .flatMap((category) => {
        const mainCategory = {
          categoryName: category.categoryName,
          categorySlug: category.categorySlug,
          description: category.description,
          isPrimary: category.isPrimary,
          isFeatured: category.isFeatured,
          thumbnail: category.thumbnail,
          banner: category.banner,
          isActive: category.isActive,
          createdAt: category.createdAt,
          updatedAt: category.updatedAt,
          __v: category.__v,
          _id: category._id,
        };

        const subCategories = Array.isArray(category.subCategory)
          ? category.subCategory
              .map((subCategory) => {
                if (
                  subCategory.subCategoryName.toLowerCase() !==
                  category.categoryName.toLowerCase()
                ) {
                  return {
                    subCategoryName: subCategory.subCategoryName,
                    subCategorySlug: subCategory.subCategorySlug,
                    subCategoryDescription: subCategory.subCategoryDescription,
                    subCategoryThumbnail: subCategory.subCategoryThumbnail,
                    subCategoryBanner: subCategory.subCategoryBanner,
                    _id: subCategory._id,
                  };
                }
                return null;
              })
              .filter((subCategory) => subCategory !== null)
          : [];

        return [mainCategory, ...subCategories];
      })
      .filter((value) => value !== null);
  }
  return [];
};
