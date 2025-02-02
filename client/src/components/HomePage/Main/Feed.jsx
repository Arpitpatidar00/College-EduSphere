import React from "react";
import {
  Card,
  CardHeader,
  CardContent,
  Avatar,
  IconButton,
  Typography,
  CardMedia,
  CardActions,
  Button,
  Box,
} from "@mui/material";
import {
  MoreVert,
  FavoriteBorder,
  ChatBubbleOutline,
  Share,
} from "@mui/icons-material";
import { APP_COLORS } from "../../../enums/Colors";

const Posts = () => {
  const postData = [
    {
      id: 1,
      user: "Frances Guerrero",
      position: "Web Developer at Webestica",
      time: "2 hours ago",
      content:
        "I'm thrilled to share that I've completed a graduate certificate course in project management with the president's honor roll.",
      image:
        "https://www.piclumen.com/wp-content/uploads/2024/10/piclumen-marquee-04.webp",
      likes: 120,
      comments: 35,
      shares: 10,
    },
    {
      id: 2,
      user: "Frances Guerrero",
      position: "Web Developer at Webestica",
      time: "2 hours ago",
      content:
        "I'm thrilled to share that I've completed a graduate certificate course in project management with the president's honor roll.",
      image:
        "https://www.piclumen.com/wp-content/uploads/2024/10/piclumen-marquee-04.webp",
      likes: 120,
      comments: 35,
      shares: 10,
    },
    {
      id: 3,
      user: "Frances Guerrero",
      position: "Web Developer at Webestica",
      time: "2 hours ago",
      content:
        "I'm thrilled to share that I've completed a graduate certificate course in project management with the president's honor roll.",
      image:
        "https://www.piclumen.com/wp-content/uploads/2024/10/piclumen-marquee-04.webp",
      likes: 120,
      comments: 35,
      shares: 10,
    },
    {
      id: 4,
      user: "Frances Guerrero",
      position: "Web Developer at Webestica",
      time: "2 hours ago",
      content:
        "I'm thrilled to share that I've completed a graduate certificate course in project management with the president's honor roll.",
      image:
        "https://www.piclumen.com/wp-content/uploads/2024/10/piclumen-marquee-04.webp",
      likes: 120,
      comments: 35,
      shares: 10,
    },
    {
      id: 5,
      user: "Frances Guerrero",
      position: "Web Developer at Webestica",
      time: "2 hours ago",
      content:
        "I'm thrilled to share that I've completed a graduate certificate course in project management with the president's honor roll.",
      image:
        "https://www.piclumen.com/wp-content/uploads/2024/10/piclumen-marquee-04.webp",
      likes: 120,
      comments: 35,
      shares: 10,
    },
    {
      id: 6,
      user: "Frances Guerrero",
      position: "Web Developer at Webestica",
      time: "2 hours ago",
      content:
        "I'm thrilled to share that I've completed a graduate certificate course in project management with the president's honor roll.",
      image:
        "https://www.piclumen.com/wp-content/uploads/2024/10/piclumen-marquee-04.webp",
      likes: 120,
      comments: 35,
      shares: 10,
    },

  ];

  return postData.map((post) => (
    <Card
      sx={{
        mb: 2,
        borderRadius: 4,
        boxShadow: 3,
        bgcolor: APP_COLORS.common.white,
      }}
      key={post.id}
    >
      <CardHeader
        avatar={
          <Avatar
            src="https://ddg-assets.b-cdn.net/web/imgs/generate_thumbs/140.jpg"
            sx={{ width: 44, height: 44 }}
          />
        }
        action={
          <IconButton sx={{ color: APP_COLORS.grey[600] }}>
            <MoreVert />
          </IconButton>
        }
        title={
          <Typography sx={{ fontWeight: "bold", color: APP_COLORS.grey[900] }}>
            {post.user}
          </Typography>
        }
        subheader={
          <Typography sx={{ color: APP_COLORS.grey[600] }}>
            {post.position} • {post.time}
          </Typography>
        }
      />

      {post.image && (
        <CardMedia
          component="img"
          height="300"
          image={post.image}
          alt="Post image"
          sx={{ borderRadius: 2 }}
        />
      )}

      <CardContent>
        <Typography sx={{ color: APP_COLORS.grey[800] }}>
          {post.content}
        </Typography>
      </CardContent>

      <CardActions disableSpacing>
        <Box sx={{ display: "flex", justifyContent: "space-between", width: "100%" }}>
          <Button
            startIcon={<FavoriteBorder />}
            sx={{ textTransform: "none", color: APP_COLORS.primary[500] }}
          >
            {post.likes} Likes
          </Button>
          <Button
            startIcon={<ChatBubbleOutline />}
            sx={{ textTransform: "none", color: APP_COLORS.secondary[500] }}
          >
            {post.comments} Comments
          </Button>
          <Button
            startIcon={<Share />}
            sx={{ textTransform: "none", color: APP_COLORS.grey[700] }}
          >
            {post.shares} Shares
          </Button>
        </Box>
      </CardActions>
    </Card>
  ));
};

export default Posts;
