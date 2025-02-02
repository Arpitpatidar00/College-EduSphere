import { Box } from "@mui/material";

const HeroContainer = () => {
  return (
    <Box
      sx={{
        width: "100%",
        height: "100%",
        backgroundColor: "#2D2D2A",
        backgroundImage: "url('assets/AuthImage.webp')",
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
      }}
    />
  );
};

export default HeroContainer;
