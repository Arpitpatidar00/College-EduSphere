import { useState, useEffect } from "react";
import { Box, Avatar, Typography, CircularProgress, IconButton } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { APP_COLORS } from "../../../enums/Colors";
import ROUTES from "../../Global/Routes/CommonRoutes";
import AddIcon from "@mui/icons-material/Add"; // Import the Add icon
import { selectUserData } from '@/store/slices/auth.slice';
import { useSelector } from 'react-redux';
import { transformImagePath } from '../../../utils/image.utils';

const HomePostStory = () => {
  const navigate = useNavigate();
  const [stories, setStories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [imageLoading, setImageLoading] = useState([]); // Track loading state for each avatar
  const [error, setError] = useState(null);
  const userData = useSelector(selectUserData);

  useEffect(() => {
    const fetchStories = async () => {
      try {
        setLoading(true);
        await new Promise((resolve) => setTimeout(resolve, 1000)); // 1-second delay
        const data = [
          {
            id: "1",
            name: "Cristano",
            username: "cristano_7",
            image: "https://photoroomai.com/images/ai-4.webp", // Valid test image
            time: "2h",
          },
          {
            id: "2",
            name: "Brahim Diaz",
            username: "brahim_diaz",
            image: "https://img.freepik.com/premium-photo/realistic-girl-ai-women_980716-3616.jpg",
            time: "3h",
          },
          {
            id: "3",
            name: "Robin",
            username: "robin_123",
            image: "https://photoroomai.com/images/ai-4.webp",
            time: "1h",
          },
          {
            id: "4",
            name: "Georgina",
            username: "georgina_g",
            image: "/assets/fray-bekele-_BAaXJC2xKQ-unsplash.jpg",
            time: "4h",
          },
          {
            id: "5",
            name: "Wick",
            username: "wick_john",
            image: "https://img.pikbest.com/origin/10/03/27/75npIkbEsTeuQ.jpg!f305cw",
            time: "5h",
          },
          {
            id: "6",
            name: "Chris",
            username: "chris_p",
            image: "https://photoroomai.com/images/ai-4.webp",
            time: "2h",
          },
          {
            id: "7",
            name: "Amanda",
            username: "amanda_lee",
            image: "https://img.freepik.com/premium-photo/realistic-girl-ai-women_980716-3616.jpg",
            time: "3h",
          },
          {
            id: "8",
            name: "Jennifer",
            username: "jennifer_s",
            image: "https://cdn.pixabay.com/photo/2024/04/10/16/23/ai-generated-8688331_960_720.png",
            time: "1h",
          },
          {
            id: "9",
            name: "Wick",
            username: "wick_john_2",
            image: "https://img.freepik.com/free-photo/portrait-futuristic-female-humanoid-with-advanced-technology_23-2151666392.jpg?semt=ais_hybrid",
            time: "6h",
          },
          {
            id: "10",
            name: "John Wick",
            username: "john_wick",
            image: "/assets/mateus-campos-felipe-YYjyJJz2R9w-unsplash.jpg",
            time: "7h",
          },
        ];
        setStories(data);
        setImageLoading(new Array(data.length).fill(true)); // Initialize with true for each story
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchStories();
  }, []);

  const handleStoryClick = (person, index) => {
    navigate(ROUTES.HOME.STORIES, { state: { story: person, stories, selectedIndex: index } });
  };

  const handleImageLoad = (index) => {
    console.log(`Image loaded for index: ${index}`);
    setImageLoading((prev) => {
      const newLoading = [...prev];
      newLoading[index] = false;
      console.log("Updated imageLoading:", newLoading);
      return newLoading;
    });
  };

  const handleImageError = (index) => {
    console.log(`Image failed to load for index: ${index}`);
    setImageLoading((prev) => {
      const newLoading = [...prev];
      newLoading[index] = false;
      console.log("Updated imageLoading on error:", newLoading);
      return newLoading;
    });
  };

  const handleAddStory = () => {
    // Navigate to a story creation page or open a modal (implement as needed)
    console.log("Add story clicked");
    // Example: navigate(ROUTES.CREATE_STORY); // Define this route if needed
  };

  if (loading) {
    return (
      <Box sx={{ display: "flex", justifyContent: "center", p: 2 }}>
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Box sx={{ display: "flex", justifyContent: "center", p: 2 }}>
        <Typography color="error">{error}</Typography>
      </Box>
    );
  }

  if (!stories.length) {
    return (
      <Box sx={{ display: "flex", justifyContent: "center", p: 2 }}>
        <Typography>No stories available.</Typography>
      </Box>
    );
  }

  return (
    <Box
      sx={{
        bgcolor: APP_COLORS.secondary[400],
        padding: { xs: 0.5, sm: 1 },
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
      }}
    >
      {/* Fixed "Add Story" Avatar */}
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          marginRight: { xs: 0.5, sm: 1 },
          position: "relative",
          flexShrink: 0, // Prevent shrinking
        }}
      >


        <Box
          sx={{
            position: "relative",
            width: { xs: 60, sm: 80, md: 100 },
            height: { xs: 60, sm: 80, md: 100 },
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Avatar
            sx={{
              width: { xs: 60, sm: 80, md: 100 },
              height: { xs: 60, sm: 80, md: 100 },
              border: "3px solid #FFC107",
              backgroundColor: APP_COLORS.primary[500], // Custom background for "Add Story"
              objectFit: "cover",
              cursor: "pointer",
            }}
            onClick={handleAddStory}
          >
            <img
              src={
                userData?.profilePicture
                  ? transformImagePath(userData.profilePicture)
                  : "https://via.placeholder.com/150"
              }
              alt={userData.name}
              style={{
                width: "100%",
                height: "100%",
                objectFit: "cover",
              }}
            />
          </Avatar>

          {/* Add "+" icon */}
          <Box
            sx={{
              position: "absolute",
              bottom: 5,
              right: 5,
              width: { xs: 20, sm: 25, md: 30 },
              height: { xs: 20, sm: 25, md: 30 },
              backgroundColor: "#FFC107",
              borderRadius: "50%",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              boxShadow: 2,
            }}
          >
            <AddIcon sx={{ fontSize: { xs: 14, sm: 18, md: 22 }, color: "#FFF" }} />
          </Box>
        </Box>

        <Typography
          variant="body2"
          sx={{
            color: "white",
            fontSize: { xs: 10, sm: 12, md: 14 },
            textAlign: "center",
            mt: 0.5,
          }}
        >
          Add Story
        </Typography>
      </Box>

      {/* Scrollable Stories */}
      <Box
        sx={{
          overflowX: "auto",
          whiteSpace: "nowrap",
          display: "flex",
          flexDirection: "row",
          "-ms-overflow-style": "none",
          "scrollbar-width": "none",
          "&::-webkit-scrollbar": { display: "none" },
          flexGrow: 1, // Allow the scrollable area to take remaining space
        }}
      >
        {stories.map((person, index) => (
          <Box
            key={person.id}
            sx={{
              display: "inline-block",
              marginRight: { xs: 0.5, sm: 1 },
              cursor: "pointer",
            }}
          >
            <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
              <Box
                sx={{
                  position: "relative",
                  width: { xs: 60, sm: 80, md: 100 },
                  height: { xs: 60, sm: 80, md: 100 },
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                {imageLoading[index] && (
                  <CircularProgress
                    size={20}
                    sx={{
                      position: "absolute",
                      color: "#FFC107",
                    }}
                  />
                )}

                <Avatar
                  sx={{
                    width: { xs: 60, sm: 80, md: 100 },
                    height: { xs: 60, sm: 80, md: 100 },
                    border: "3px solid #FFC107",
                    objectFit: "cover",
                    opacity: imageLoading[index] ? 0 : 1,
                    transition: "opacity 0.3s ease-in-out",
                  }}
                  onClick={() => handleStoryClick(person, index)}
                >
                  <img
                    src={person.image}
                    alt={person.name}
                    style={{
                      width: "100%",
                      height: "100%",
                      objectFit: "cover",
                    }}
                    onLoad={() => handleImageLoad(index)}
                    onError={() => handleImageError(index)}
                  />
                </Avatar>
              </Box>

              <Typography
                variant="body2"
                sx={{
                  color: "white",
                  fontSize: { xs: 10, sm: 12, md: 14 },
                  textAlign: "center",
                  mt: 0.5,
                }}
              >
                {person.name}
              </Typography>
            </Box>
          </Box>
        ))}
      </Box>
    </Box>
  );
};

export default HomePostStory;