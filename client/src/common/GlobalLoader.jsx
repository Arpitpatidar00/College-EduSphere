import { Box, Typography, keyframes } from "@mui/material";
import { motion } from "framer-motion";
import { APP_COLORS } from '../enums/Colors';

// Bouncing ball animation
const bounce = keyframes`
  0% { transform: scale(1, 0.7); }
  40% { transform: scale(0.8, 1.2); }
  60% { transform: scale(1, 1); }
  100% { bottom: 140px; }
`;

// Steps animation
const step = keyframes`
  0% {
    box-shadow: 0 10px 0 rgba(0,0,0,0),
                0 10px 0 white,
                -35px 50px 0 white,
                -70px 90px 0 white;
  }
  100% {
    box-shadow: 0 10px 0 white,
                -35px 50px 0 white,
                -70px 90px 0 white,
                -70px 90px 0 rgba(0,0,0,0);
  }
`;

const GlobalLoader = () => {
    return (
        <Box
            sx={{
                position: "fixed",
                top: 0,
                left: 0,
                width: "100%",
                height: "100vh",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                backgroundColor: APP_COLORS.common.black,
                zIndex: 9999,
            }}
        >
            {/* Loader Animation */}
            <Box
                sx={{
                    position: "relative",
                    width: "120px",
                    height: "90px",
                    marginBottom: "10px",
                }}
            >
                {/* Bouncing Ball */}
                <Box
                    sx={{
                        position: "absolute",
                        bottom: "30px",
                        left: "50px",
                        height: "30px",
                        width: "30px",
                        borderRadius: "50%",
                        backgroundColor: APP_COLORS.accent[400],
                        animation: `${bounce} 0.5s ease-in-out infinite alternate`,
                    }}
                />
                {/* Steps */}
                <Box
                    sx={{
                        content: '""',
                        position: "absolute",
                        right: 0,
                        top: 0,
                        height: "7px",
                        width: "45px",
                        borderRadius: "4px",
                        boxShadow: "0 5px 0 white, -35px 50px 0 white, -70px 95px 0 white",
                        animation: `${step} 1s ease-in-out infinite`,
                    }}
                />
            </Box>

            {/* Animated Loader Text */}
            <motion.div
                initial={{ opacity: 0, scale: 0.5, y: -30 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                transition={{ duration: 1.5, ease: "easeOut", type: "spring", stiffness: 100, damping: 12 }}
                whileHover={{ scale: 1.1, rotate: 2 }}
                whileTap={{ scale: 0.95, rotate: -2 }}
                whileInView={{
                    y: [0, -5, 0],
                    transition: { duration: 3, repeat: Infinity, ease: "easeInOut" }
                }}
            >
                <Typography
                    variant="h2"
                    fontWeight="bold"
                    color={APP_COLORS.accent[200]}
                    sx={{
                        textTransform: "uppercase",
                        letterSpacing: "2px",
                        position: "relative",
                        display: "inline-block",
                        overflow: "hidden",
                        mt: 10,
                        fontFamily: "Georgia, serif",

                    }}
                >
                    <motion.span
                        initial={{ x: "-100%" }}
                        animate={{ x: "0%" }}
                        transition={{ duration: 1.2, ease: "easeOut" }}
                        style={{ display: "inline-block" }}
                    >
                        EduSphere
                    </motion.span>
                </Typography>
            </motion.div>


        </Box>
    );
};

export default GlobalLoader;
