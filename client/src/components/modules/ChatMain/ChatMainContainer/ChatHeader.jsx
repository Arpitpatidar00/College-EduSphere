// ChatHeader.jsx
import { Box, Typography, IconButton, Avatar } from "@mui/material";
import { Call, VideoCall } from "@mui/icons-material";
import { transformImagePath } from "../../../../utils/image.utils";

const ChatHeader = ({ conversationUser, handleCall }) => (
    <Box
        sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            borderBottom: "1px solid lightgray",
            paddingBottom: 1,
        }}
    >
        <Box display="flex" alignItems="center">
            <Avatar
                sx={{ width: 40, height: 40 }}
                src={transformImagePath(conversationUser.profilePicture) || "/default-profile.png"}
            />
            <Typography variant="h6" sx={{ marginLeft: 1 }}>
                {conversationUser.firstName} {conversationUser.lastName}
            </Typography>
        </Box>
        <Box>
            <IconButton onClick={() => handleCall("audio")}>
                <Call />
            </IconButton>
            <IconButton onClick={() => handleCall("video")}>
                <VideoCall />
            </IconButton>
        </Box>
    </Box>
);

export default ChatHeader;
