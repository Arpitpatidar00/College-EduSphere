import { Card, CardContent, Button, Avatar } from "@mui/material";

const PostStory = () => {
  return (
    <Card sx={{ mb: 1 }}>
      <CardContent sx={{ display: "flex", alignItems: "center" }}>
        <Avatar src="https://via.placeholder.com/150" />
        <Button id="nav" variant="outlined" sx={{ ml: 2, flexGrow: 1 }}>
          Post a Story
        </Button>
      </CardContent>
    </Card>
  );
};

export default PostStory;