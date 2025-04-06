import { useState, useRef } from "react";
import { Box, Avatar, Typography, CircularProgress } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { APP_COLORS } from "../../../enums/Colors";
import ROUTES from "../../Global/Routes/CommonRoutes";
import AddIcon from "@mui/icons-material/Add";
import { selectUserData } from "@/store/slices/auth.slice";
import { useSelector } from "react-redux";
import { transformImagePath } from "../../../utils/image.utils";
import { styled } from "@mui/material/styles";
import StoryUploadModal from "./StoryUploadModal";
import { useGetAllStories } from "@services/api/main/stories.service";
import { timeShort } from "@/utils/time.utils";

const StoryAvatar = styled(Avatar)(({ hasStory }) => ({
  border: hasStory
    ? `3px solid transparent`
    : `3px solid ${APP_COLORS.grey[400]}`,
  background: hasStory
    ? `linear-gradient(45deg, ${APP_COLORS.primary[500]}, ${APP_COLORS.error[500]}) border-box`
    : "none",
  padding: hasStory ? "2px" : "0",
  transition: "transform 0.3s ease, opacity 0.3s ease-in-out",
  "&:hover": {
    transform: "scale(1.05)",
  },
  "&:focus": {
    outline: `2px solid ${APP_COLORS.primary[500]}`,
    outlineOffset: "2px",
  },
}));

const HomePostStory = () => {
  const navigate = useNavigate();
  const [imageLoading, setImageLoading] = useState([]);
  const userData = useSelector(selectUserData);
  const scrollRef = useRef(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const { data: storiesResponse, isPending } = useGetAllStories({});

  // Flatten the stories data to handle nested structure and debug time
  const stories = storiesResponse?.data?.flatMap((user) =>
    user.stories.map((story, storyIndex) => {
      const timeValue = timeShort(story.createdAt);
      const mediaIndex = storyIndex % story.media.length; // Cycle through media for multiple stories
      return {
        ...story,
        userId: user._id,
        userData: user.userData,
        name: user.userData
          ? `${user.userData.firstName || ""} ${user.userData.lastName || ""}`.trim() || "Unknown"
          : "Unknown",
        image: story.media.length > 0
          ? transformImagePath(story.media[mediaIndex].mediaUrl || "https://via.placeholder.com/150")
          : "https://via.placeholder.com/150",
        time: timeValue, // Explicitly assign the timeShort result
      };
    })
  ) || [];

  const handleStoryClick = (story, index) => {
    navigate(ROUTES.HOME.STORIES, {
      state: { story, stories, selectedIndex: index },
    });
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
    setIsModalOpen(true);
  };

  if (isPending) {
    return (
      <Box sx={{ display: "flex", justifyContent: "center", p: 2 }}>
        <CircularProgress size={30} color="primary" />
      </Box>
    );
  }

  return (
    <Box
      sx={{
        bgcolor: (theme) =>
          theme.palette.mode === "dark" ? APP_COLORS.grey[800] : APP_COLORS.grey[100],
        padding: { xs: 1, sm: 1.5 },
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        borderRadius: 2,
        boxShadow: "0 2px 10px rgba(0,0,0,0.05)",
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
              width: "100%",
              height: "100%",
              backgroundColor: APP_COLORS.grey[300],
              objectFit: "cover",
              cursor: "pointer",
            }}
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
                borderRadius: "50%",
              }}
            />
          </StoryAvatar>

          {/* Plus icon */}
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
              transition: "transform 0.3s ease",
              "&:hover": {
                transform: "scale(1.1)",
              },
            }}
          >
            <AddIcon
              sx={{
                fontSize: { xs: 14, sm: 16, md: 18 },
                color: APP_COLORS.common.white,
              }}
              onClick={handleAddStory}
            />
          </Box>
        </Box>

        <Typography
          variant="caption"
          sx={{
            color: (theme) =>
              theme.palette.mode === "dark"
                ? APP_COLORS.grey[200]
                : APP_COLORS.grey[700],
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
          Your Story
        </Typography>

        {/* Upload modal */}
        <StoryUploadModal open={isModalOpen} onClose={() => setIsModalOpen(false)} />
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
          "&::-webkit-scrollbar": {
            display: "none",
          },
          "scrollbar-width": "none",
          "-ms-overflow-style": "none",
          flexGrow: 1,
          py: 1,
        }}
      >
        {stories && stories.length > 0 ? (
          stories.map((story, index) => (
            <Box
              key={story._id}
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
                  onClick={() => handleStoryClick(story, index)}
                  aria-label={`View ${story.name}'s story`}
                >
                  <img
                    src={story.image}
                    alt={story.name}
                    style={{
                      width: "100%",
                      height: "100%",
                      objectFit: "cover",
                      borderRadius: "50%",
                    }}
                    onLoad={() => handleImageLoad(index)}
                    onError={() => handleImageError(index)}
                  />
                </StoryAvatar>

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
                  {story.time}
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
                {story.name}
              </Typography>
            </Box>
          ))
        ) : (
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              minHeight: 80,
              px: 2,
            }}
          >
            <Typography
              variant="body2"
              color="text.secondary"
              sx={{ textAlign: "center", fontSize: 13 }}
            >
              No stories available.
            </Typography>
          </Box>
        )}
      </Box>
    </Box>
  );
};

export default HomePostStory;