import React from 'react';
import {
  Box,
  Typography,
  List,
  ListItem,
  ListItemAvatar,
  Avatar,
  ListItemText,
  ListItemSecondaryAction,
  Button,
  IconButton,
  Divider,
} from '@mui/material';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import { APP_COLORS } from '../../../enums/Colors';

const followers = [
  {
    name: 'George Jose',
    avatar:
      'https://tse1.mm.bing.net/th/id/OET.7252da000e8341b2ba1fb61c275c1f30?w=594&h=594&c=7&rs=1&o=5&pid=1.9',
  },
  {
    name: 'Michel',
    avatar:
      'https://letsenhance.io/static/03620c83508fc72c6d2b218c7e304ba5/11499/UpscalerAfter.jpg',
  },
  {
    name: 'Cristano',
    avatar:
      'https://cdn.pixabay.com/photo/2024/08/27/20/44/ai-generated-9002448_1280.jpg',
  },
  {
    name: 'Brahim Diaz',
    avatar:
      'https://cdn.pixabay.com/photo/2023/09/09/08/00/ai-generated-8242654_960_720.png',
  },
  {
    name: 'John Wick',
    avatar:
      'https://cdn.pixabay.com/photo/2024/05/03/17/45/ai-generated-8737620_640.png',
  },
  {
    name: 'Abhilash Jose',
    avatar:
      'https://gratisography.com/wp-content/uploads/2024/01/gratisography-cyber-kitty-800x525.jpg',
  },
  {
    name: 'Cristano',
    avatar:
      'https://cdn.pixabay.com/photo/2024/08/27/20/44/ai-generated-9002448_1280.jpg',
  },
  {
    name: 'Brahim Diaz',
    avatar:
      'https://cdn.pixabay.com/photo/2023/09/09/08/00/ai-generated-8242654_960_720.png',
  },
  {
    name: 'John Wick',
    avatar:
      'https://cdn.pixabay.com/photo/2024/05/03/17/45/ai-generated-8737620_640.png',
  },
  {
    name: 'Abhilash Jose',
    avatar:
      'https://gratisography.com/wp-content/uploads/2024/01/gratisography-cyber-kitty-800x525.jpg',
  },
];

const WhoToFollow = () => {
  return (
    <Box
      sx={{
        width: '100%',
        maxWidth: 360,
        maxHeight: 'calc(100vh - 100px)',
        bgcolor: APP_COLORS.common.white, // Using global white color
        borderRadius: 4,
        boxShadow: 3,
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      {/* Sticky Header */}
      <Typography
        variant="h6"
        gutterBottom
        sx={{
          p: 2,
          fontWeight: 600,
          position: 'sticky',
          top: 0,
          bgcolor: APP_COLORS.common.white, // Consistent background using global color
          zIndex: 1,
        }}
      >
        Recent Activity
      </Typography>
      <Divider />
      {/* Scrollable List */}
      <Box sx={{ flexGrow: 1, overflowY: 'auto' }}>
        <List dense sx={{ p: 0 }}>
          {followers.map((follower, index) => (
            <React.Fragment key={index}>
              <ListItem alignItems="center" sx={{ py: 1, px: 2 }}>
                <ListItemAvatar>
                  <Avatar alt={follower.name} src={follower.avatar} />
                </ListItemAvatar>
                <ListItemText
                  primary={follower.name}
                  secondary="Followed you 3 min ago"
                  sx={{ color: APP_COLORS.primary[500] }}
                />
                <ListItemSecondaryAction>
                  <Button
                    variant="contained"
                    color="primary"
                    size="small"
                    sx={{ mr: 1, padding: '4px 8px', fontSize: '0.5rem' }}
                  >
                    Follow Back
                  </Button>
                  <IconButton edge="end" aria-label="remove">
                    <CheckCircleIcon />
                  </IconButton>
                </ListItemSecondaryAction>
              </ListItem>
              {index < followers.length - 1 && <Divider />}
            </React.Fragment>
          ))}
        </List>
      </Box>
    </Box>
  );
};

export default WhoToFollow;
