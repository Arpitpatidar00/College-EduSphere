import { useState, useEffect } from "react";
import { Box } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import dragonVideo from "../../../../public/assets/vMY6m1pG3idVLmRR.mp4"; // Replace with your dragon video path
import "./adminLogin.css";

const DragonAnimation = () => {
  const [isBiting, setIsBiting] = useState(false);
  const theme = useTheme();

  useEffect(() => {
    const handleMouseMove = (e) => {
      const dragonElement = document.querySelector(".dragon");
      if (dragonElement) {
        const dragonRect = dragonElement.getBoundingClientRect();
        const mouseX = e.clientX;
        const mouseY = e.clientY;

        // Check if cursor is near the dragon's face (adjust these values based on your dragon's position and size in the video)
        const faceArea = {
          left: dragonRect.left + dragonRect.width * 0.3, // 30% from left
          right: dragonRect.right,
          top: dragonRect.top,
          bottom: dragonRect.bottom * 0.7, // 70% from top
        };

        const isNearFace =
          mouseX >= faceArea.left &&
          mouseX <= faceArea.right &&
          mouseY >= faceArea.top &&
          mouseY <= faceArea.bottom;

        setIsBiting(isNearFace);
      }
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return (
    <Box
      className="dragon-container"
      sx={{
        flex: 1,
        background: theme.palette.background.paper,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        position: "relative",
      }}
    >
      <video
        src={dragonVideo}
        alt="Dragon"
        className={`dragon ${isBiting ? "biting" : "normal"}`}
        autoPlay
        loop
        muted
        playsInline
      />
    </Box>
  );
};

export default DragonAnimation;