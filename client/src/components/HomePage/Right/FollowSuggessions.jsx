import { Card, CardContent, Typography, List, ListItem, ListItemAvatar, Avatar, ListItemText, ListItemSecondaryAction, Button } from "@mui/material";

const WhoToFollow = () => {
  const people = ["Frances Guerrero", "Lori Ferguson", "Samuel Bishop", "Dennis Barrett", "Judy Nguyen"];

  return (
    <Card sx={{ mb: 1 }}>
      <CardContent>
        <Typography variant="h6" gutterBottom>
          Who to follow
        </Typography>
        <List>
          {people.map((person, index) => (
            <ListItem key={index}>
              <ListItemAvatar>
                <Avatar src="https://via.placeholder.com/150" />
              </ListItemAvatar>
              <ListItemText primary={person} />
              <ListItemSecondaryAction>
                <Button variant="contained">Follow</Button>
              </ListItemSecondaryAction>
            </ListItem>
          ))}
        </List>
      </CardContent>
    </Card>
  );
};

export default WhoToFollow;