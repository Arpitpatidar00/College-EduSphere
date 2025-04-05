import { useState, useEffect, useRef } from "react";
import { Box, Avatar, Typography, CircularProgress } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { APP_COLORS } from "../../../enums/Colors";
import ROUTES from "../../Global/Routes/CommonRoutes";
import AddIcon from "@mui/icons-material/Add";
import { selectUserData } from '@/store/slices/auth.slice';
import { useSelector } from 'react-redux';
import { transformImagePath } from '../../../utils/image.utils';
import { styled } from '@mui/material/styles';

const StoryAvatar = styled(Avatar)(({ hasStory }) => ({
  border: hasStory
    ? `3px solid transparent`
    : `3px solid ${APP_COLORS.grey[400]}`,
  background: hasStory
    ? `linear-gradient(45deg, ${APP_COLORS.primary[500]}, ${APP_COLORS.error[500]})`
    : 'none',
  padding: hasStory ? '2px' : '0',
  transition: 'transform 0.3s ease, opacity 0.3s ease-in-out',
  '&:hover': {
    transform: 'scale(1.05)',
  },
  '&:focus': {
    outline: `2px solid ${APP_COLORS.primary[500]}`,
    outlineOffset: '2px',
  },
}));

const HomePostStory = () => {
  const navigate = useNavigate();
  const [stories, setStories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [imageLoading, setImageLoading] = useState([]);
  const [error, setError] = useState(null);
  const userData = useSelector(selectUserData);
  const scrollRef = useRef(null);

  useEffect(() => {
    const fetchStories = async () => {
      try {
        setLoading(true);
        await new Promise((resolve) => setTimeout(resolve, 1000));
        const data = [
          {
            id: "1",
            name: "Cristano",
            username: "cristano_7",
            image: "https://photoroomai.com/images/ai-4.webp",
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
        setImageLoading(new Array(data.length).fill(true));
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
    setImageLoading((prev) => {
      const newLoading = [...prev];
      newLoading[index] = false;
      return newLoading;
    });
  };

  const handleImageError = (index) => {
    setImageLoading((prev) => {
      const newLoading = [...prev];
      newLoading[index] = false;
      return newLoading;
    });
  };

  const handleAddStory = () => {
    navigate(ROUTES.CREATE_STORY);
  };

  if (loading) {
    return (
      <Box sx={{ display: "flex", justifyContent: "center", p: 2 }}>
        <CircularProgress size={30} color="primary" />
      </Box>
    );
  }

  if (error) {
    return (
      <Box sx={{ display: "flex", justifyContent: "center", p: 2 }}>
        <Typography color="error" variant="body2">
          {error}
        </Typography>
      </Box>
    );
  }

  if (!stories.length) {
    return (
      <Box sx={{ display: "flex", justifyContent: "center", p: 2 }}>
        <Typography variant="body2" color="text.secondary">
          No stories available.
        </Typography>
      </Box>
    );
  }

  return (
    <Box
      sx={{
        bgcolor: (theme) => theme.palette.mode === 'dark' ? APP_COLORS.grey[800] : APP_COLORS.grey[100],
        padding: { xs: 1, sm: 1.5 },
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        borderRadius: 2,
        boxShadow: '0 2px 10px rgba(0,0,0,0.05)',
        mb: 1,
      }}
    >
      {/* Fixed "Add Story" Avatar */}
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          marginRight: { xs: 1, sm: 1.5 },
          flexShrink: 0,
        }}
      >
        <Box
          sx={{
            position: "relative",
            width: { xs: 60, sm: 70, md: 80 },
            height: { xs: 60, sm: 70, md: 80 },
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <StoryAvatar
            hasStory={false}
            sx={{
              width: '100%',
              height: '100%',
              backgroundColor: APP_COLORS.grey[300],
              objectFit: "cover",
              cursor: "pointer",
            }}
            onClick={handleAddStory}
            aria-label="Add a new story"
          >
            <img
              src={
                userData?.profilePicture
                  ? transformImagePath(userData.profilePicture)
                  : "https://via.placeholder.com/150"
              }
              alt={userData?.name || "User"}
              style={{
                width: "100%",
                height: "100%",
                objectFit: "cover",
              }}
            />
          </StoryAvatar>

          {/* Add "+" icon */}
          <Box
            sx={{
              position: "absolute",
              bottom: 0,
              right: 0,
              width: { xs: 20, sm: 24, md: 28 },
              height: { xs: 20, sm: 24, md: 28 },
              backgroundColor: APP_COLORS.primary[500],
              borderRadius: "50%",
              border: `2px solid ${APP_COLORS.common.white}`,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              boxShadow: 1,
              transition: 'transform 0.3s ease',
              '&:hover': {
                transform: 'scale(1.1)',
              },
            }}
          >
            <AddIcon sx={{ fontSize: { xs: 14, sm: 16, md: 18 }, color: APP_COLORS.common.white }} />
          </Box>
        </Box>

        <Typography
          variant="caption"
          sx={{
            color: (theme) => theme.palette.mode === 'dark' ? APP_COLORS.grey[200] : APP_COLORS.grey[700],
            fontSize: { xs: 10, sm: 11, md: 12 },
            fontWeight: 500,
            textAlign: "center",
            mt: 0.5,
            maxWidth: { xs: 60, sm: 70, md: 80 },
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            whiteSpace: 'nowrap',
          }}
        >
          Your Story
        </Typography>
      </Box>

      {/* Scrollable Stories */}
      <Box
        ref={scrollRef}
        sx={{
          overflowX: "auto",
          whiteSpace: "nowrap",
          display: "flex",
          flexDirection: "row",
          scrollBehavior: "smooth",
          // Hide scrollbar
          "&::-webkit-scrollbar": {
            display: "none", // Hides the scrollbar in Webkit browsers (Chrome, Safari)
          },
          // Fallback for Firefox
          "scrollbar-width": "none", // Firefox
          "-ms-overflow-style": "none", // IE and Edge
          flexGrow: 1,
          py: 1,
        }}
      >
        {stories.map((person, index) => (
          <Box
            key={person.id}
            sx={{
              display: "inline-flex",
              flexDirection: "column",
              alignItems: "center",
              marginRight: { xs: 1, sm: 1.5 },
              cursor: "pointer",
            }}
          >
            <Box
              sx={{
                position: "relative",
                width: { xs: 60, sm: 70, md: 80 },
                height: { xs: 60, sm: 70, md: 80 },
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
                    color: APP_COLORS.primary[500],
                  }}
                />
              )}

              <StoryAvatar
                hasStory={true}
                sx={{
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                  opacity: imageLoading[index] ? 0 : 1,
                }}
                onClick={() => handleStoryClick(person, index)}
                aria-label={`View ${person.name}'s story`}
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
              </StoryAvatar>

              {/* Time Indicator */}
              <Typography
                variant="caption"
                sx={{
                  position: "absolute",
                  bottom: 0,
                  right: 0,
                  backgroundColor: "rgba(0,0,0,0.6)",
                  color: APP_COLORS.common.white,
                  fontSize: { xs: 8, sm: 9, md: 10 },
                  px: 0.5,
                  borderRadius: 1,
                }}
              >
                {person.time}
              </Typography>
            </Box>

            <Typography
              variant="caption"
              sx={{
                color: (theme) =>
                  theme.palette.mode === "dark" ? APP_COLORS.grey[200] : APP_COLORS.grey[700],
                fontSize: { xs: 10, sm: 11, md: 12 },
                fontWeight: 500,
                textAlign: "center",
                mt: 0.5,
                maxWidth: { xs: 60, sm: 70, md: 80 },
                overflow: "hidden",
                textOverflow: "ellipsis",
                whiteSpace: "nowrap",
              }}
            >
              {person.name}
            </Typography>
          </Box>
        ))}
      </Box>
    </Box>
  );
};

export default HomePostStory;