import { Box, Typography, IconButton, Avatar } from "@mui/material";
import { Call, VideoCall } from "@mui/icons-material";
import { transformImagePath } from "../../../../utils/image.utils";

const ChatHeader = ({ conversationUser, handleCall }) => {
    const initiateCall = (type) => {
        if (handleCall) {
            handleCall(type);
        }
    };

    return (
        <Box
            sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                borderBottom: "1px solid lightgray",
                paddingBottom: 1,
                paddingX: 2,
            }}
        >
            <Box display="flex" alignItems="center">
                <Avatar
                    sx={{ width: 40, height: 40 }}
                    src={transformImagePath(conversationUser.profilePicture) || "/default-profile.png"}
                    alt={`${conversationUser.firstName || user.institutionName} ${conversationUser.lastName}`}
                />
                <Typography variant="h6" sx={{ marginLeft: 1 }}>
                    {conversationUser.firstName} {conversationUser.lastName}
                </Typography>
            </Box>
            <Box>
                <IconButton onClick={() => initiateCall("audio")} aria-label="Audio Call">
                    <Call />
                </IconButton>
                <IconButton onClick={() => initiateCall("video")} aria-label="Video Call">
                    <VideoCall />
                </IconButton>
            </Box>
        </Box>
    );
};

export default ChatHeader;
