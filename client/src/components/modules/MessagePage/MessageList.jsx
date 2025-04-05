import { useState, useEffect, useRef } from "react";
import { Box, Typography, Avatar, Stack, CircularProgress } from "@mui/material";
import { APP_COLORS } from "../../../enums/Colors";
import { useGetAllStudents } from "../../../services/api/Auth/student.service";
import { transformImagePath } from "../../../utils/image.utils";
import { createSocketService } from "../../../services/socket";
import { useSelector } from "react-redux";
import { selectUserData } from "../../../store/slices/auth.slice";

const MessageList = ({ sx, onSelectConversation, ...props }) => {
    const [activeStudents, setActiveStudents] = useState(new Set());
    const currentUser = useSelector(selectUserData);
    const currentUserId = currentUser?._id;
    const socketServiceRef = useRef(null);

    const { data: studentData, isFetching } = useGetAllStudents(
        { page: 0, limit: 20 },
        { data: [], totalCount: 0 }
    );

    useEffect(() => {
        if (!currentUserId) return;

        if (!socketServiceRef.current) {
            socketServiceRef.current = createSocketService(currentUserId);
        }
        const socket = socketServiceRef.current;

        const handleActiveUsers = (activeUserIds) => {
            setActiveStudents(new Set(activeUserIds));
        };
        socket.getActiveUsers(handleActiveUsers);

        const handleUserStatus = ({ userId, isOnline }) => {
            setActiveStudents((prev) => {
                const newSet = new Set(prev);
                isOnline ? newSet.add(userId) : newSet.delete(userId);
                return newSet;
            });
        };
        socket.listenToUserStatus(handleUserStatus);

        return () => {
            console.log("🔌 Cleaning up socket listeners...");
            socket.disconnect();
        };
    }, [currentUserId]);

    if (isFetching) {
        return (
            <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100%", ...sx }}>
                <CircularProgress />
            </Box>
        );
    }

    return (
        <Box
            sx={{
                p: { xs: 1, md: 3 },
                height: "100%",
                backgroundColor: APP_COLORS.common.white,
                borderRadius: "12px",
                boxShadow: `0px 2px 5px ${APP_COLORS.primary[100]}`,
                overflowY: "auto",
                ...sx,
            }}
            {...props}
        >
            <Typography variant="h6" sx={{ mb: 1, fontSize: { xs: "1rem", md: "1.25rem" } }}>
                Messages
            </Typography>
            {studentData?.data?.map((user) => (
                <Stack
                    key={user._id}
                    direction="row"
                    alignItems="center"
                    spacing={2}
                    sx={{
                        p: 1,
                        borderBottom: `1px solid ${APP_COLORS.grey[200]}`,
                        cursor: "pointer",
                        "&:hover": { backgroundColor: APP_COLORS.grey[100] },
                    }}
                    onClick={() => onSelectConversation(user)}
                >
                    <Box sx={{ position: "relative" }}>
                        <Avatar
                            src={transformImagePath(user?.profilePicture)}
                            alt={user?.firstName || user.institutionName}
                            sx={{ width: { xs: 32, md: 40 }, height: { xs: 32, md: 40 } }}
                        />
                        <Box
                            sx={{
                                position: "absolute",
                                bottom: 0,
                                right: 0,
                                width: 12,
                                height: 12,
                                borderRadius: "50%",
                                backgroundColor: activeStudents.has(user._id) ? "green" : "red",
                                border: `2px solid ${APP_COLORS.common.white}`,
                            }}
                        />
                    </Box>
                    <Box>
                        <Typography
                            variant="subtitle2"
                            sx={{ fontWeight: 600, fontSize: { xs: "0.9rem", md: "1rem" } }}
                        >
                            {user.username || user.institutionName || `${user.firstName || user.institutionName} ${user.lastName || ""}`}
                        </Typography>
                        <Typography variant="body2" color="textSecondary" sx={{ fontSize: { xs: "0.8rem", md: "0.875rem" } }}>
                            {user.message || "Start a conversation"}
                        </Typography>
                    </Box>
                </Stack>
            ))}
        </Box>
    );
};

export default MessageList;