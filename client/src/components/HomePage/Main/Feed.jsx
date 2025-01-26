import { Card, CardHeader, CardContent, Avatar, IconButton, Typography } from "@mui/material";
import { MoreVert } from "@mui/icons-material";

const Posts = () => {
  const postData = [
    {
      id: 1,
      user: "Frances Guerrero",
      position: "Web Developer at Webestica",
      time: "2 hours ago",
      content: "I'm thrilled to share that I've completed a graduate certificate course in project management with the president's honor roll."
    }
  ];

  return postData.map((post) => (
    <Card sx={{ mb: 1 }} key={post.id}>
      <CardHeader
        avatar={<Avatar src="https://via.placeholder.com/150" />}
        action={<IconButton><MoreVert /></IconButton>}
        title={post.user}
        subheader={`${post.position} - ${post.time}`}
      />
      <CardContent>
        <Typography paragraph>{post.content}</Typography>
      </CardContent>
    </Card>
  ));
};

export default Posts;