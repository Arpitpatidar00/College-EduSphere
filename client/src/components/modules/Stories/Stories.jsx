import { useState } from "react";
import { Box, Avatar, Typography, CircularProgress } from "@mui/material";
import { APP_COLORS } from "../../../enums/Colors";
import { useNavigate } from "react-router-dom";
import ROUTES from "../../Global/Routes/CommonRoutes";

const data = [
  { name: "Cristano", image: "/assets/samantha-gades-fIHozNWfcvs-unsplash.jpg" },
  { name: "Brahim Diaz", image: "/assets/matt-ragland-02z1I7gv4ao-unsplash.jpg" },
  { name: "Robin", image: "/assets/swag-slayer-dd2EOQBycJY-unsplash.jpg" },
  { name: "Georgina", image: "/assets/danielle-claude-belanger-43eI1_Ug5SQ-unsplash.jpg" },
  { name: "Wick", image: "/assets/zetong-li-y8diuDh3M0s-unsplash.jpg" },
  { name: "Chris", image: "/assets/samantha-gades-fIHozNWfcvs-unsplash.jpg" },
  { name: "Amanda", image: "/assets/fray-bekele-_BAaXJC2xKQ-unsplash.jpg" },
  { name: "Jennifer", image: "https://imgv3.fotor.com/images/slider-image/A-clear-image-of-a-woman-wearing-red-sharpened-by-Fotors-image-sharpener.jpg" },
  { name: "Wick", image: "/assets/swag-slayer-dd2EOQBycJY-unsplash.jpg" },
  { name: "John Wick", image: "/assets/matt-ragland-02z1I7gv4ao-unsplash.jpg" },
];

const PostStory = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(data.map(() => true)); // Track loading state for each avatar

  const handleStoryClick = () => navigate(ROUTES.HOME.STORIES);

  // Handle image load
  const handleImageLoad = (index) => {
    setLoading((prev) => prev.map((item, i) => (i === index ? false : item)));
  };

  return (
    <Box
      sx={{
        bgcolor: APP_COLORS.secondary[400],
        padding: 1,
        overflowX: "auto",
        whiteSpace: "nowrap",
        display: "flex",
        flexDirection: "row",
      }}
    >
      {data.map((person, index) => (
        <Box key={index} sx={{ display: "inline-block", marginRight: 2 }}>
          <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
            <Box
              sx={{
                position: "relative",
                width: 100,
                height: 100,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              {/* Show loader while loading */}
              {loading[index] && (
                <CircularProgress
                  size={40}
                  sx={{
                    position: "absolute",
                    color: "#FFC107",
                  }}
                />
              )}

              {/* Avatar */}
              <Avatar
                src={person.image}
                alt={person.name}
                sx={{
                  width: 100,
                  height: 100,
                  border: "3px solid #FFC107",
                  objectFit: "cover",
                  cursor: "pointer",
                  opacity: loading[index] ? 0 : 1, // Hide Avatar while loading
                  transition: "opacity 0.3s ease-in-out",
                }}
                onLoad={() => handleImageLoad(index)}
                onClick={() => handleStoryClick(person)}
              />
            </Box>

            <Typography variant="body2" sx={{ color: "white" }}>
              {person.name}
            </Typography>
          </Box>
        </Box>
      ))}
    </Box>
  );
};

export default PostStory;
