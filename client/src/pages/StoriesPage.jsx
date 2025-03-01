
import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { Avatar, Box, IconButton } from "@mui/material";
import { styled } from "@mui/system";
import { ArrowBackIos, ArrowForwardIos, Close } from "@mui/icons-material";
import { APP_COLORS } from "../enums/Colors";

const stories = [
    { id: 1, username: "pinku_patel14", time: "2h", image: "/assets/fray-bekele-_BAaXJC2xKQ-unsplash.jpg" },
    { id: 2, username: "itzz__suzal", time: "3h", image: "/assets/mateus-campos-felipe-YYjyJJz2R9w-unsplash.jpg" },
    { id: 3, username: "patidar_piyush_10", time: "2h", image: "/assets/fray-bekele-_BAaXJC2xKQ-unsplash.jpg" },
    { id: 4, username: "asthapatidar14", time: "3h", image: "/assets/mateus-campos-felipe-YYjyJJz2R9w-unsplash.jpg" },
    { id: 5, username: "extra_story_1", time: "1h", image: "https://img.freepik.com/premium-photo/realistic-girl-ai-women_980716-3616.jpg" },
    { id: 6, username: "extra_story_2", time: "4h", image: "/assets/fray-bekele-_BAaXJC2xKQ-unsplash.jpg" },

];

const Container = styled(Box)({
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    height: "calc(100vh - 64px)",
    backgroundColor: APP_COLORS.primary[800],
});

const StoryWrapper = styled(Box)({
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    width: "60%",
    position: "relative",

});

const StoryBox = styled(Box)(({ active, position }) => ({
    width: active ? "450px" : "250px",
    height: active ? "800px" : "500px",
    transition: "all 0.5s ease-in-out",
    position: "absolute",
    top: "50%",
    left:
        position === "center"
            ? "50%"
            : position === "left-2"
                ? "-10%"
                : position === "left-1"
                    ? "15%"
                    : position === "right-1"
                        ? "85%"
                        : position === "right-2"
                            ? "110%"
                            : "-100%",
    transform:
        position === "center"
            ? "translate(-50%, -50%) scale(1)"
            : "translate(-50%, -50%) scale(0.8)",
    opacity: position === "center" ? 1.2 : 0.3,
    borderRadius: 4,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
}));

const InstagramStory = () => {
    const navigate = useNavigate();

    const [currentIndex, setCurrentIndex] = useState(2);

    const handlePrev = () => {
        setCurrentIndex((prev) => (prev === 0 ? stories.length - 1 : prev - 1));
    };

    const handleNext = () => {
        setCurrentIndex((prev) => (prev === stories.length - 1 ? 0 : prev + 1));
    };

    return (
        <Container>
            <IconButton
                onClick={() => navigate("/")}
                sx={{ position: "absolute", top: 70, right: 20, color: APP_COLORS.secondary[600] }}
            >
                <Close />
            </IconButton>
            <StoryWrapper>
                <IconButton onClick={handlePrev} sx={{ position: "absolute", left: 0, color: APP_COLORS.secondary[600] }}>
                    <ArrowBackIos />
                </IconButton>
                {stories.map((story, index) => {
                    let position = "hidden";
                    if (index === currentIndex) position = "center";
                    else if (index === (currentIndex - 2 + stories.length) % stories.length) position = "left-2";
                    else if (index === (currentIndex - 1 + stories.length) % stories.length) position = "left-1";
                    else if (index === (currentIndex + 1) % stories.length) position = "right-1";
                    else if (index === (currentIndex + 2) % stories.length) position = "right-2";

                    return (
                        <StoryBox key={story.id} active={index === currentIndex} position={position} sx={{ zIndex: index === currentIndex ? 2 : 1 }}>
                            <Avatar src={story.image} sx={{ width: "100%", height: "100%", borderRadius: 2 }} />
                        </StoryBox>
                    );
                })}
                <IconButton onClick={handleNext} sx={{ position: "absolute", right: 0, color: APP_COLORS.secondary[600] }}>
                    <ArrowForwardIos />
                </IconButton>
            </StoryWrapper>
        </Container>
    );
};

export default InstagramStory;