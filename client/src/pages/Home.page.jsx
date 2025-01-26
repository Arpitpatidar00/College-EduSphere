import { Box, Grid } from "@mui/material";
import Navbar from "../components/HomePage/Navbar/Navbar";
import Sidebar from "../components/HomePage/Sidebar/Sidebar";
import PostStory from "../components/HomePage/Main/Stories";
import ShareThoughts from "../components/HomePage/Main/SharePost";
import Posts from "../components/HomePage/Main/Feed";
import WhoToFollow from "../components/HomePage/Right/FollowSuggessions";
import Messages from "../components/HomePage/Right/Messages";

const HomePage = ({ toggleTheme }) => {

  return (    
    <>
      <Navbar />
    <Box sx={{pl: 1 , pr: 1}}>
      <Grid container spacing={2} sx={{ mt: 0 }}>
        <Grid item xs={3}>
          <Sidebar toggleTheme={toggleTheme}/>
        </Grid>

        <Grid item xs={6}>
          <PostStory />
          <ShareThoughts />
          <Posts />
        </Grid>

        <Grid item xs={3}>
          <WhoToFollow />
          <Messages />
        </Grid>
      </Grid>
    </Box>
    </>
  );
};

export default HomePage