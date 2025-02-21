import { useState } from 'react';
import {
  Box,
  Typography,
  List,
  ListItem,
  Card,
  CardMedia,
  Chip,
  Button,
} from '@mui/material';
import InfoRounded from '@mui/icons-material/InfoRounded';
import { APP_COLORS } from '../../../enums/Colors';

const initialFollowers = [
  {
    name: 'George Jose',
    avatar: 'https://tse1.mm.bing.net/th/id/OET.7252da000e8341b2ba1fb61c275c1f30?w=594&h=594&c=7&rs=1&o=5&pid=1.9',
    followTime: '',
    score: 85,
    isFollowing: false,
  },
  {
    name: 'Michel',
    avatar: 'https://letsenhance.io/static/03620c83508fc72c6d2b218c7e304ba5/11499/UpscalerAfter.jpg',
    followTime: '',
    score: 78,
    isFollowing: false,
  },
  {
    name: 'George Jose',
    avatar: 'https://tse1.mm.bing.net/th/id/OET.7252da000e8341b2ba1fb61c275c1f30?w=594&h=594&c=7&rs=1&o=5&pid=1.9',
    followTime: '',
    score: 85,
    isFollowing: false,
  },
  {
    name: 'Michel',
    avatar: 'https://letsenhance.io/static/03620c83508fc72c6d2b218c7e304ba5/11499/UpscalerAfter.jpg',
    followTime: '',
    score: 78,
    isFollowing: false,
  },
  {
    name: 'George Jose',
    avatar: 'https://tse1.mm.bing.net/th/id/OET.7252da000e8341b2ba1fb61c275c1f30?w=594&h=594&c=7&rs=1&o=5&pid=1.9',
    followTime: '',
    score: 85,
    isFollowing: false,
  },
  {
    name: 'Michel',
    avatar: 'https://letsenhance.io/static/03620c83508fc72c6d2b218c7e304ba5/11499/UpscalerAfter.jpg',
    followTime: '',
    score: 78,
    isFollowing: false,
  },
];

const WhoToFollow = () => {
  const [followers, setFollowers] = useState(initialFollowers);

  const toggleFollow = (index) => {
    setFollowers((prevFollowers) =>
      prevFollowers.map((follower, i) =>
        i === index ? { ...follower, isFollowing: !follower.isFollowing } : follower
      )
    );
  };

  const removeFollower = (index) => {
    setFollowers((prevFollowers) => prevFollowers.filter((_, i) => i !== index));
  };

  return (
    <Box
      sx={{
        width: '100%',
        maxHeight: 'calc(100vh - 100px)',
        bgcolor: APP_COLORS.primary,
        borderRadius: 4,
        boxShadow: 3,
        display: 'flex',
        flexDirection: 'column',
        overflowY: 'auto',
      }}
    >
      <Typography
        variant="h6"
        gutterBottom
        sx={{ p: 2, fontWeight: 600, position: 'sticky', top: 0, zIndex: 1 }}
      >
        Who to Follow
      </Typography>
      <List dense sx={{ p: 0, bgcolor: APP_COLORS.secondary, }}>
        {followers.map((follower, index) => (
          <ListItem key={index} alignItems="flex-start" sx={{ py: 1, px: 1, }}>
            <Card variant="outlined" sx={{ p: 1, display: 'flex', flexDirection: 'column', width: '100%', bgcolor: APP_COLORS.primary, }}>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                <CardMedia
                  component="img"
                  width="50"
                  height="50"
                  alt={follower.name}
                  src={follower.avatar}
                  sx={{ width: 50, height: 50 }}
                />
                <Box sx={{ flex: 1 }}>
                  <Typography variant="body1" fontWeight="600">
                    {follower.name}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {follower.followTime}
                  </Typography>
                  <Chip
                    size="small"
                    variant="outlined"
                    icon={<InfoRounded />}
                    label={`Score: ${follower.score}%`}
                  />
                </Box>
              </Box>
              {/* Buttons at the bottom */}
              <Box sx={{ display: 'flex', justifyContent: 'space-around', mt: 2 }}>
                <Button
                  size="small"
                  variant={follower.isFollowing ? 'contained' : 'outlined'}
                  color={follower.isFollowing ? 'success' : 'primary'}
                  onClick={() => toggleFollow(index)}
                >
                  {follower.isFollowing ? 'Following' : 'Follow'}
                </Button>
                <Button size="small" variant="outlined" color="error" onClick={() => removeFollower(index)}>
                  Remove
                </Button>
              </Box>
            </Card>
          </ListItem>

        ))}
      </List>
    </Box>
  );
};

export default WhoToFollow;