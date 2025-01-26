import { Card, CardContent, Typography, List, ListItem, ListItemAvatar, Avatar, ListItemText } from "@mui/material";

const Messages = () => {
  const messages = ["Message from Frances", "Message from Lori", "Message from Samuel"];

  return (
    <Card sx={{ mb: 1 }}>
      <CardContent>
        <Typography variant="h6" gutterBottom>
          Recent Messages
        </Typography>
        <List>
          {messages.map((message, index) => (
            <ListItem key={index}>
              <ListItemAvatar>
                <Avatar src="https://via.placeholder.com/150" />
              </ListItemAvatar>
              <ListItemText primary={message} />
            </ListItem>
          ))}
        </List>
      </CardContent>
    </Card>
  );
};

export default Messages;