import { Card, CardContent, Avatar, TextField, Box, IconButton } from "@mui/material";
import { Add, VideoCall, Event, EmojiEmotions, MoreVert } from "@mui/icons-material";

const ShareThoughts = () => {
  return (
    <Card sx={{ mb: 1 }}>
      <CardContent>
        <Box sx={{ display: "flex", alignItems: "center" }}>
          <Avatar src="https://via.placeholder.com/150" />
          <TextField
            fullWidth
            variant="outlined"
            placeholder="Share your thoughts..."
            sx={{ ml: 2 }}
          />
        </Box>
        <Box sx={{ display: "flex", justifyContent: "space-between", mt: 2 }}>
          <IconButton>
            <Add />
          </IconButton>
          <IconButton>
            <VideoCall />
          </IconButton>
          <IconButton>
            <Event />
          </IconButton>
          <IconButton>
            <EmojiEmotions />
          </IconButton>
          <IconButton>
            <MoreVert />
          </IconButton>
        </Box>
      </CardContent>
    </Card>
  );
}

export default ShareThoughts;