import { Box, Grid, IconButton, Modal, Drawer, useMediaQuery, useTheme } from "@mui/material";
import { AccountCircle } from "@mui/icons-material";
import Sidebar from "../components/HomePage/Sidebar/Sidebar";
import WhoToFollow from "../components/HomePage/Right/FollowSuggestions";
import AddPosts from '../components/HomePage/Posts/AddPosts';
import { useState } from "react";
import { APP_COLORS } from '../enums/Colors'; // Adjust the import path accordingly
import PostStory from '../components/modules/Stories/Stories';
import PostCard from '../components/modules/Post/PostCard/PostCard';

const HomePage = ({ toggleTheme }) => {
  const [openSidebar, setOpenSidebar] = useState(false);
  const [openWhoToFollow, setOpenWhoToFollow] = useState(false);
  const [open, setOpen] = useState(false);

  // Hook to detect the screen size
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm')); // Trigger drawer on small screens

  return (
    <>
      <Box
        sx={{
          pl: 1,
          pr: 1,
          height: "calc(100vh - 64px)",
          display: "flex",
          flexDirection: "column",
          backgroundColor: APP_COLORS.common.white,
          border: `1px solid ${APP_COLORS.common.black}`,

        }}
      >
        <Grid container spacing={2} sx={{ mt: 0, height: "100%" }}>
          <Grid item xs={12} sm={3} sx={{
            display: isMobile ? 'none' : 'block',
          }}>
            <Sidebar toggleTheme={toggleTheme} />
          </Grid>

          <Grid item xs={12} sm={6} sx={{ height: "100%", display: "flex", flexDirection: "column" }}>
            <PostStory />
            <Box sx={{
              flex: 1,
              overflowY: "auto",
            }}>
              <PostCard />
            </Box>
          </Grid>

          <Grid item xs={12} sm={3} sx={{ position: "relative", display: isMobile ? 'none' : 'block' }}>
            <WhoToFollow />
          </Grid>
        </Grid>
      </Box>

      {isMobile && (
        <IconButton onClick={() => setOpenSidebar(true)} sx={{ position: 'fixed', top: 16, left: 16, zIndex: 10 }}>
          <AccountCircle sx={{ fontSize: 30, color: APP_COLORS.primary[500] }} /> {/* Applied icon color */}
        </IconButton>
      )}

      <Drawer
        anchor="left"
        open={openSidebar}
        onClose={() => setOpenSidebar(false)}
        PaperProps={{
          sx: {
            width: "250px",
            backgroundColor: APP_COLORS.secondary[50],
          },
        }}
      >
        <Sidebar />
      </Drawer>

      {isMobile && (
        <IconButton onClick={() => setOpenWhoToFollow(true)} sx={{ position: 'fixed', top: 80, right: 16, zIndex: 10 }}>
          <AccountCircle sx={{ fontSize: 30, color: APP_COLORS.primary[500] }} /> {/* Applied icon color */}
        </IconButton>
      )}

      {/* Mobile WhoToFollow Drawer */}
      <Drawer
        anchor="right"
        open={openWhoToFollow}
        PaperProps={{
          sx: {
            background: "transparent",
            width: "250px",
          },
        }}
        onClose={() => setOpenWhoToFollow(false)}
      >
        <WhoToFollow />
      </Drawer>

      {/* Add Post Button */}
      <IconButton
        onClick={() => setOpen(true)}
        sx={{
          position: "fixed",
          bottom: "20px",
          left: "50%",
          transform: "translateX(-50%)",
          backgroundColor: APP_COLORS.common.white,
          boxShadow: "0px 4px 10px rgba(0,0,0,0.2)",
          borderRadius: "50%",
          p: 1,
          zIndex: 10,
        }}
      >
        <AccountCircle sx={{ fontSize: 50, color: APP_COLORS.primary[500] }} />
      </IconButton>

      <Modal open={open} onClose={() => setOpen(false)}>
        <Box
          sx={{
            position: "absolute",
            top: "80%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            bgcolor: "background.paper",
            boxShadow: 24,
            p: 2,
            borderRadius: 4,
          }}
        >
          <AddPosts />
        </Box>
      </Modal>

    </>
  );
};

export default HomePage;
