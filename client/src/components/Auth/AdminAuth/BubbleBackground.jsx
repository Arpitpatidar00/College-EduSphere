import { useEffect, useRef } from "react";
import { Box } from "@mui/material";

export function BubbleBackground() {
    const canvasRef = useRef(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext("2d");
        if (!ctx) return;

        const resize = () => {
            canvas.width = canvas.offsetWidth;
            canvas.height = canvas.offsetHeight;
        };

        resize();
        window.addEventListener("resize", resize);

        const bubbles = [];
        const numBubbles = 200;
        const centerX = canvas.width / 2;
        const centerY = canvas.height / 2;
        const ovalWidth = canvas.width * 0.6;
        const ovalHeight = canvas.height * 0.4;

        for (let i = 0; i < numBubbles; i++) {
            const angle = Math.random() * Math.PI * 4;
            const radius = Math.random() * 40 + 20;
            const opacity = Math.random() * 0.5 + 0.3;
            const distanceFactor = Math.random() * 0.5 + 0.8;

            const darkThemeColors = [
                "rgba(255, 255, 255, OPACITY)",
                "rgba(200, 200, 200, OPACITY)",
                "rgba(150, 150, 150, OPACITY)",
                "rgba(100, 100, 100, OPACITY)",
            ];

            bubbles.push({
                x: centerX + Math.cos(angle) * ovalWidth * distanceFactor,
                y: centerY + Math.sin(angle) * ovalHeight * distanceFactor,
                radius,
                opacity,
                speed: Math.random() * 0.2 + 0.05,
                angle,
                distanceFactor,
                color: darkThemeColors[Math.floor(Math.random() * darkThemeColors.length)].replace("OPACITY", opacity),
            });
        }

        function animate() {
            ctx.clearRect(0, 0, canvas.width, canvas.height);

            const gradient = ctx.createLinearGradient(0, 0, canvas.width, canvas.height);
            gradient.addColorStop(0, "#1a1a1a");
            gradient.addColorStop(1, "#0d0d0d");
            ctx.fillStyle = gradient;
            ctx.fillRect(0, 0, canvas.width, canvas.height);

            bubbles.forEach((bubble) => {
                bubble.angle += 0.10 * bubble.speed;

                bubble.x = centerX + Math.cos(bubble.angle) * ovalWidth * bubble.distanceFactor;
                bubble.y = centerY + Math.sin(bubble.angle) * ovalHeight * bubble.distanceFactor;

                ctx.beginPath();
                ctx.arc(bubble.x, bubble.y, bubble.radius, 0, Math.PI * 2);
                ctx.fillStyle = bubble.color;
                ctx.shadowBlur = 15;
                ctx.shadowColor = "rgba(255, 255, 255, 0.3)";
                ctx.globalAlpha = bubble.opacity;
                ctx.fill();
                ctx.globalAlpha = 1;
            });

            requestAnimationFrame(animate);
        }

        animate();

        return () => {
            window.removeEventListener("resize", resize);
        };
    }, []);

    return (
        <Box position="absolute" top={0} left={0} width="100%" height="100%">
            <canvas ref={canvasRef} style={{ width: "100%", height: "100%" }} />
        </Box>
    );
}
