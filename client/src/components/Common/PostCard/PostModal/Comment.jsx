import { Box, Avatar, Typography, IconButton } from "@mui/material";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import FavoriteIcon from "@mui/icons-material/Favorite";
import { useState } from "react";
import { APP_COLORS } from "../../../../enums/Colors";
import { transformImagePath } from '../../../../utils/image.utils';
import { timeAgo } from '../../../../utils/time.utils';


const Comment = ({ comment }) => {
    const [liked, setLiked] = useState(false);
    return (
        <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
            <Avatar src={transformImagePath(comment.user.profilePicture)} sx={{ width: 30, height: 30 }} />
            <Box sx={{ ml: 2, flex: 1 }}>
                <Typography sx={{ fontWeight: "bold", fontSize: "14px" }}>{comment.user.firstName || comment.user.institutionName} {comment.user.lastName}</Typography>
                <Typography sx={{ fontSize: "14px" }}>{comment.comment}</Typography>
                <Typography sx={{ fontSize: "12px", color: APP_COLORS.secondary[100] }}>{timeAgo(comment.createdAt)} • {comment.likes} likes • Reply</Typography>
            </Box>
            <IconButton onClick={() => setLiked(!liked)} sx={{ color: liked ? "red" : "white" }}>
                {liked ? <FavoriteIcon /> : <FavoriteBorderIcon />}
            </IconButton>
        </Box>
    );
};
export default Comment;