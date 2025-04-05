import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import {
    Avatar,
    Box,
    IconButton,
    Typography,
    useMediaQuery,
    useTheme,
} from "@mui/material";
import { styled } from "@mui/system";
import { ArrowBackIos, ArrowForwardIos, Close } from "@mui/icons-material";
import { APP_COLORS } from "../enums/Colors";
import { transformImagePath } from "../utils/image.utils";

const defaultStories = [
    { id: 1, username: "pinku_patel14", time: "2h", image: "/assets/fray-bekele-_BAaXJC2xKQ-unsplash.jpg" },
    { id: 2, username: "itzz__suzal", time: "3h", image: "/assets/mateus-campos-felipe-YYjyJJz2R9w-unsplash.jpg" },
    { id: 3, username: "patidar_piyush_10", time: "2h", image: "/assets/fray-bekele-_BAaXJC2xKQ-unsplash.jpg" },
    { id: 4, username: "asthapatidar14", time: "3h", image: "/assets/mateus-campos-felipe-YYjyJJz2R9w-unsplash.jpg" },
    { id: 5, username: "extra_story_1", time: "1h", image: "https://img.freepik.com/premium-photo/realistic-girl-ai-women_980716-3616.jpg" },
    { id: 6, username: "extra_story_2", time: "4h", image: "/assets/fray-bekele-_BAaXJC2xKQ-unsplash.jpg" },
];

// Styled Components
const Container = styled(Box)({
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    height: "calc(100vh - 64px)",
    backgroundColor: APP_COLORS.primary[800],
});

const StoryWrapper = styled(Box)(({ theme }) => ({
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    width: "60%",
    position: "relative",
    [theme.breakpoints.down("md")]: {
        width: "90%",
    },
    [theme.breakpoints.down("sm")]: {
        width: "100%",
        height: "100vh",
        flexDirection: "column",
        justifyContent: "center",
    },
}));

const StoryBox = styled(Box)(({ theme, active, position }) => ({
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
    opacity: active ? 1 : 0.3,
    filter: active ? "none" : "blur(5px)",
    borderRadius: 10,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    overflow: "hidden",
    backgroundColor: "rgba(0, 0, 0, 0.1)",
    zIndex: active ? 2 : 1,
    [theme.breakpoints.down("md")]: {
        width: active ? "350px" : "200px",
        height: active ? "600px" : "400px",
    },
    [theme.breakpoints.down("sm")]: {
        position: "relative",
        width: "100%",
        height: "calc(100vh - 64px)",
        left: "0",
        top: "0",
        transform: "none",
        filter: "none",
        opacity: 1,
        borderRadius: 0,
    },
}));

const OverlayText = styled(Typography)({
    position: "absolute",
    color: APP_COLORS.common.white,
    fontSize: "24px",
    fontWeight: "bold",
    textAlign: "center",
    padding: "10px",
    background: "rgba(0, 0, 0, 0.3)",
    borderRadius: "4px",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
});

const UserInfo = styled(Box)({
    position: "absolute",
    top: "10px",
    left: "10px",
    display: "flex",
    alignItems: "center",
    color: APP_COLORS.common.white,
});

const ProgressBar = styled(Box)({
    position: "absolute",
    top: "10px",
    left: "50%",
    transform: "translateX(-50%)",
    width: "80%",
    height: "4px",
    backgroundColor: "rgba(255, 255, 255, 0.3)",
});

const Progress = styled(Box)({
    height: "100%",
    backgroundColor: APP_COLORS.common.white,
    transition: "width 0.1s linear",
});

// Component
const StoriesPage = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

    const { stories: passedStories, selectedIndex } = location.state || { stories: [], selectedIndex: 0 };

    const storiesToUse = passedStories.length > 0 ? passedStories : defaultStories;
    const [currentIndex, setCurrentIndex] = useState(
        passedStories.length > 0 && selectedIndex !== undefined ? selectedIndex : 2
    );
    const [currentMediaIndex, setCurrentMediaIndex] = useState(0);
    const [progress, setProgress] = useState(0);

    useEffect(() => {
        setCurrentMediaIndex(0);
        setProgress(0);
    }, [currentIndex]);

    useEffect(() => {
        let timer;
        if (progress < 100) {
            timer = setInterval(() => {
                setProgress((prev) => {
                    if (prev >= 100) {
                        clearInterval(timer);
                        handleNextMedia();
                        return 0;
                    }
                    return prev + 2;
                });
            }, 100);
        }
        return () => clearInterval(timer);
    }, [progress, currentMediaIndex, currentIndex]);

    const handlePrev = () => {
        setCurrentIndex((prev) => (prev === 0 ? storiesToUse.length - 1 : prev - 1));
    };

    const handleNext = () => {
        setCurrentIndex((prev) => (prev === storiesToUse.length - 1 ? 0 : prev + 1));
    };

    const handleNextMedia = () => {
        const currentStory = storiesToUse[currentIndex];
        if (currentStory.media && currentMediaIndex < currentStory.media.length - 1) {
            setCurrentMediaIndex((prev) => prev + 1);
        } else {
            handleNext();
        }
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
                {!isMobile && (
                    <>
                        <IconButton onClick={handlePrev} sx={{ position: "absolute", left: 0, color: APP_COLORS.secondary[600] }}>
                            <ArrowBackIos />
                        </IconButton>
                        <IconButton onClick={handleNext} sx={{ position: "absolute", right: 0, color: APP_COLORS.secondary[600] }}>
                            <ArrowForwardIos />
                        </IconButton>
                    </>
                )}

                {storiesToUse.map((story, index) => {
                    const isActive = index === currentIndex;
                    const position = isActive
                        ? "center"
                        : index === (currentIndex - 2 + storiesToUse.length) % storiesToUse.length
                            ? "left-2"
                            : index === (currentIndex - 1 + storiesToUse.length) % storiesToUse.length
                                ? "left-1"
                                : index === (currentIndex + 1) % storiesToUse.length
                                    ? "right-1"
                                    : index === (currentIndex + 2) % storiesToUse.length
                                        ? "right-2"
                                        : "hidden";

                    const mediaItem = isActive
                        ? story.media?.[currentMediaIndex] || { mediaUrl: story.image, mediaType: "image", caption: "" }
                        : story.media?.[0] || { mediaUrl: story.image, mediaType: "image", caption: "" };

                    if (isMobile && !isActive) return null;

                    return (
                        <StoryBox key={story._id || story.id} active={isActive} position={position}>
                            <Box sx={{ position: "relative", width: "100%", height: "100%" }}>
                                {mediaItem.mediaType === "image" ? (
                                    <Avatar
                                        src={transformImagePath(mediaItem.mediaUrl || "https://via.placeholder.com/150")}
                                        sx={{ width: "100%", height: "100%", borderRadius: 0 }}
                                    />
                                ) : (
                                    <video
                                        src={transformImagePath(mediaItem.mediaUrl)}
                                        autoPlay
                                        muted
                                        loop
                                        style={{ width: "100%", height: "100%", objectFit: "cover", borderRadius: 0 }}
                                    />
                                )}

                                {isActive && mediaItem.caption && <OverlayText>{mediaItem.caption}</OverlayText>}

                                <UserInfo>
                                    <Avatar
                                        src={transformImagePath(story.userData?.profilePicture) || "https://via.placeholder.com/40"}
                                        sx={{ width: 40, height: 40, mr: 1 }}
                                    />
                                    <Box>
                                        <Typography variant="subtitle2" sx={{ fontWeight: "bold" }}>
                                            {story.name || story.username}
                                        </Typography>
                                        <Typography variant="caption">{story.time}</Typography>
                                    </Box>
                                </UserInfo>

                                {isActive && (
                                    <ProgressBar>
                                        <Progress sx={{ width: `${progress}%` }} />
                                    </ProgressBar>
                                )}

                                {isMobile && isActive && (
                                    <>
                                        <Box
                                            onClick={handlePrev}
                                            sx={{
                                                position: "absolute",
                                                top: 0,
                                                left: 0,
                                                width: "40%",
                                                height: "100%",
                                                zIndex: 3,
                                                cursor: "pointer",
                                            }}
                                        />
                                        <Box
                                            onClick={handleNext}
                                            sx={{
                                                position: "absolute",
                                                top: 0,
                                                right: 0,
                                                width: "40%",
                                                height: "100%",
                                                zIndex: 3,
                                                cursor: "pointer",
                                            }}
                                        />
                                    </>
                                )}
                            </Box>
                        </StoryBox>
                    );
                })}
            </StoryWrapper>
        </Container>
    );
};

export default StoriesPage;
