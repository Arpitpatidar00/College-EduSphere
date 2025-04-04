import { Box, Grid, IconButton, Modal, Drawer, useMediaQuery, useTheme } from "@mui/material";
import { AccountCircle } from "@mui/icons-material";
import Sidebar from "../components/HomePage/Sidebar/Sidebar";
import WhoToFollow from "../components/HomePage/Right/FollowSuggestions";
import AddPosts from '../components/HomePage/Posts/AddPosts';
import { useState } from "react";
import { APP_COLORS } from '../enums/Colors'; // Adjust the import path accordingly
import HomePostStory from '../components/modules/Stories/Stories';
import PostList from '@/components/Common/PostCard/index';
import { useGetAllPosts } from '@services/api/main/post.service';

const HomePage = ({ toggleTheme }) => {
  const [openSidebar, setOpenSidebar] = useState(false);
  const [openWhoToFollow, setOpenWhoToFollow] = useState(false);
  const [open, setOpen] = useState(false);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm')); // Small screens (e.g., phones)
  const isTablet = useMediaQuery(theme.breakpoints.between('sm', 'md')); // Tablet screens
  const isDesktop = useMediaQuery(theme.breakpoints.up('md')); // Medium and up (desktop)
  const { data: postData } = useGetAllPosts(
    { page: 0, limit: 20 },
    { data: [], totalCount: 0 }
  );

  return (
    <>
      <Box
        sx={{
          pl: { xs: 1, sm: 2 },
          pr: { xs: 1, sm: 2 },
          height: "calc(100vh - 64px)",
          display: "flex",
          flexDirection: "column",
          backgroundColor: APP_COLORS.common.white,
          border: `1px solid ${APP_COLORS.common.black}`,
          overflow: "hidden",
        }}
      >
        <Grid container spacing={{ xs: 1, sm: 2 }} sx={{ flexGrow: 1, height: "100%" }}>
          {/* Sidebar */}
          <Grid
            item
            xs={12}
            sm={3}
            sx={{
              display: {
                xs: isMobile ? 'none' : 'block',
                sm: isTablet || isDesktop ? 'block' : 'none',
              },
              height: "100%",
            }}
          >
            <Sidebar toggleTheme={toggleTheme} />
          </Grid>

          {/* Main Content */}
          <Grid
            item
            xs={12}
            sm={isTablet ? 9 : 6}
            md={6}
            sx={{ height: "100%", display: "flex", flexDirection: "column" }}
          >
            <HomePostStory />
            <Box
              sx={{
                flex: 1,
                overflowY: "auto",
                "-ms-overflow-style": "none",
                "scrollbar-width": "none",
                "&::-webkit-scrollbar": { display: "none" },
                p: { xs: 1, sm: 2 },
              }}
            >
              <PostList postData={postData} />
            </Box>
          </Grid>

          {/* WhoToFollow Section */}
          <Grid
            item
            xs={12}
            sm={isTablet ? 3 : 3}
            md={3}
            sx={{
              display: {
                xs: isMobile ? 'none' : 'block',
                sm: isTablet || isDesktop ? 'block' : 'none',
              },
              height: "100%",
              position: "relative",
            }}
          >
            <WhoToFollow />
          </Grid>
        </Grid>
      </Box>

      {/* Mobile Sidebar Toggle */}
      {isMobile && (
        <IconButton
          onClick={() => setOpenSidebar(true)}
          sx={{ position: 'fixed', top: 16, left: 16, zIndex: 10 }}
        >
          <AccountCircle sx={{ fontSize: 30, color: APP_COLORS.primary[500] }} />
        </IconButton>
      )}

      {/* Sidebar Drawer for Mobile */}
      <Drawer
        anchor="left"
        open={openSidebar}
        onClose={() => setOpenSidebar(false)}
        PaperProps={{
          sx: {
            width: { xs: "70%", sm: "250px" },
            backgroundColor: APP_COLORS.secondary[50],
          },
        }}
      >
        <Sidebar toggleTheme={toggleTheme} />
      </Drawer>

      {/* Mobile WhoToFollow Toggle */}
      {isMobile && (
        <IconButton
          onClick={() => setOpenWhoToFollow(true)}
          sx={{ position: 'fixed', top: 80, right: 16, zIndex: 10 }}
        >
          <AccountCircle sx={{ fontSize: 30, color: APP_COLORS.primary[500] }} />
        </IconButton>
      )}

      {/* WhoToFollow Drawer for Mobile */}
      <Drawer
        anchor="right"
        open={openWhoToFollow}
        onClose={() => setOpenWhoToFollow(false)}
        PaperProps={{
          sx: {
            width: { xs: "70%", sm: "250px" },
            background: "transparent",
          },
        }}
      >
        <WhoToFollow />
      </Drawer>

      {/* Add Post Button */}
      <IconButton
        onClick={() => setOpen(true)}
        sx={{
          position: "fixed",
          bottom: { xs: 16, sm: 20 },
          left: "50%",
          transform: "translateX(-50%)",
          backgroundColor: APP_COLORS.common.white,
          boxShadow: "0px 4px 10px rgba(0,0,0,0.2)",
          borderRadius: "50%",
          p: 1,
          zIndex: 10,
        }}
      >
        <AccountCircle sx={{ fontSize: { xs: 40, sm: 50 }, color: APP_COLORS.primary[500] }} />
      </IconButton>

      {/* Add Post Modal */}
      <Modal open={open} onClose={() => setOpen(false)}>
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            bgcolor: "background.paper",
            boxShadow: 24,
            p: { xs: 1, sm: 2 },
            borderRadius: 4,
            width: { xs: "90%", sm: "500px" },
            maxHeight: "80vh",
            overflowY: "auto",
          }}
        >
          <AddPosts />
        </Box>
      </Modal>
    </>
  );
};

export default HomePage;