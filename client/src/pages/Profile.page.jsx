import {
    Box,
    Avatar,
    Typography,
    Paper,
    Button,
  } from '@mui/material';
  import { 
    Edit as EditIcon, // Import the Edit icon
  } from '@mui/icons-material';
  import { useNavigate } from 'react-router-dom'; 
  import Sidebar from '../components/HomePage/Sidebar/Sidebar';
  
  function UserProfile({toggleTheme}) {
    const navigate = useNavigate(); 

  
    return (
      <Box display="flex" padding={2}>
        <Box sx={{ width: 250 }}> 
          <Sidebar toggleTheme={toggleTheme}/>
        </Box>
        <Box sx={{ flexGrow: 1, paddingLeft: 2 }}>
          <Paper elevation={3} sx={{ padding: 2, display: 'flex', borderRadius: 2 }}>
            <Avatar
              src="https://randomuser.me/api/portraits/women/19.jpg" // User image
              alt="User"
              sx={{ width: 100, height: 100, marginRight: 2 }}
            />
            <Box sx={{ flexGrow: 1 }}>
              <Typography variant="h5">Sam Lanson</Typography>
              <Typography variant="subtitle1" color="text.secondary">
                Web Developer at Webestica
              </Typography>
              <Typography variant="body2" color="text.secondary" sx={{ marginTop: 1 }}>
                I did love to change the world, but they would not give me the source code.
              </Typography>
              <Box display="flex" justifyContent="space-between" marginTop={2}>
                <Typography variant="h6" sx={{ flexGrow: 0.5 }}>256 Posts</Typography>
                <Typography variant="h6" sx={{ flexGrow: 0.5 }}>2.5K Followers</Typography>
                <Typography variant="h6" sx={{ flexGrow: 0.5 }}>365 Following</Typography>
              </Box>
  
              <Box display="flex" justifyContent="flex-start" marginTop={2}>
                <Button variant="outlined" color="primary" sx={{ marginRight: 1 }}>
                  Follow
                </Button>
                <Button
                  variant="contained"
                  color="primary"
                  startIcon={<EditIcon />} // Add the Edit icon here
                  onClick={() => navigate('/edit-profile')} // Navigate to Edit Profile using useNavigate
                >
                  Edit Profile
                </Button>
                <Button variant="contained" color="primary" sx={{ marginLeft: 1 }}>
                  Message
                </Button>
              </Box>
            </Box>
          </Paper>
  
          {/* Recent Posts Section */}
          <Box marginTop={3}>
            <Typography variant="h6" align="center" marginBottom={1}>
              Recent Posts
            </Typography>
            <Box display="grid" gridTemplateColumns="repeat(3, 1fr)" gap={2}>
              {/* Sample post items */}
              {Array.from({ length: 6 }).map((_, index) => (
                <Paper key={index} elevation={2} sx={{ position: 'relative', cursor: 'pointer' }}>
                  <img
                    src="https://via.placeholder.com/150"
                    style={{
                      width: '100%',
                      height: '200px',
                      objectFit: 'cover',
                      borderRadius: 4,
                    }}
                  />
                  <Box sx={{
                    position: 'absolute',
                    bottom: 0,
                    left: 0,
                    right: 0,
                    backgroundColor: 'rgba(0, 0, 0, 0.6)',
                    color: 'white',
                    padding: '5px',
                    borderRadius: '0 0 4px 4px',
                  }}>
                    <Typography variant="body2">This is a caption for post {index + 1}</Typography>
                  </Box>
                </Paper>
              ))}
            </Box>
          </Box>
        </Box>
      </Box>
    );
  }
  
  export default UserProfile;
  