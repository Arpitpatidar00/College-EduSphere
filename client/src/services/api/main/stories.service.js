// services/api/stories.service.js

// Mock API call (replace with your actual API endpoint)
export const useGetAllStories = async () => {
  try {
    // Simulate API call with dummy data
    const response = await new Promise((resolve) =>
      setTimeout(() => {
        resolve({
          data: [
            {
              id: "1",
              name: "Cristano",
              username: "cristano_7",
              image: "https://example.com/images/cristano.jpg",
              time: "2h",
            },
            {
              id: "2",
              name: "Brahim Diaz",
              username: "brahim_diaz",
              image: "https://example.com/images/brahim.jpg",
              time: "3h",
            },
            {
              id: "3",
              name: "Robin",
              username: "robin_123",
              image: "https://example.com/images/robin.jpg",
              time: "1h",
            },
            {
              id: "4",
              name: "Georgina",
              username: "georgina_g",
              image: "https://example.com/images/georgina.jpg",
              time: "4h",
            },
            {
              id: "5",
              name: "Wick",
              username: "wick_john",
              image: "https://example.com/images/wick.jpg",
              time: "5h",
            },
            {
              id: "6",
              name: "Chris",
              username: "chris_p",
              image: "https://example.com/images/chris.jpg",
              time: "2h",
            },
            {
              id: "7",
              name: "Amanda",
              username: "amanda_lee",
              image: "https://example.com/images/amanda.jpg",
              time: "3h",
            },
            {
              id: "8",
              name: "Jennifer",
              username: "jennifer_s",
              image: "https://example.com/images/jennifer.jpg",
              time: "1h",
            },
            {
              id: "9",
              name: "Wick",
              username: "wick_john_2",
              image: "https://example.com/images/wick2.jpg",
              time: "6h",
            },
            {
              id: "10",
              name: "John Wick",
              username: "john_wick",
              image: "https://example.com/images/johnwick.jpg",
              time: "7h",
            },
          ],
        });
      }, 1000)
    );
    return response.data;
  } catch (error) {
    throw new Error("Failed to fetch stories: " + error.message);
  }
};

// Replace the above with your actual API call, e.g.:
// export const useGetAllStories = async () => {
//   const response = await axios.get("https://your-api-endpoint/stories");
//   return response.data;
// };
