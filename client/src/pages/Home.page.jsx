import { Box, Grid, IconButton, Drawer, useMediaQuery, useTheme, BottomNavigation, BottomNavigationAction, Badge } from "@mui/material";
import { AccountCircle, Add, Home, Explore, VideoLibrary, Chat, Person } from "@mui/icons-material";
import HomeSidebar from "../components/HomePage/Sidebar/HomeSidebar";
import WhoToFollow from "../components/HomePage/Right/FollowSuggestions";
import { useState } from "react";
import { APP_COLORS } from '../enums/Colors';
import HomePostStory from '../components/modules/Stories/HomePostStory';
import PostList from '@/components/Common/PostCard/index';
import { useGetAllPosts } from '@services/api/main/post.service';
import { useNavigate } from "react-router-dom";
import { ROUTES } from '@/components/Global/Routes/CommonRoutes';
import AddPostModal from '../components/modules/Post/AddPost/AddPostModal';



const HomePage = ({ toggleTheme }) => {
  const [openSidebar, setOpenSidebar] = useState(false);
  const [openWhoToFollow, setOpenWhoToFollow] = useState(false);
  const [openAddPost, setOpenAddPost] = useState(false);
  const [bottomNavValue, setBottomNavValue] = useState(0);

  const theme = useTheme();
  const navigate = useNavigate();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm')); // xs to sm
  const isTablet = useMediaQuery(theme.breakpoints.between('sm', 'md')); // sm to md
  const { data: postData = { data: [], totalCount: 0 } } = useGetAllPosts(
    { page: 0, limit: 20 },
    { data: [], totalCount: 0 }
  );

  const handleScroll = (e) => {
    e.target.style.scrollBehavior = 'smooth';
  };

  const navItems = [
    { label: "Home", icon: <Home />, path: ROUTES.HOME.INDEX },
    { label: "Explore", icon: <Explore />, path: ROUTES.HOME.LOCATION },
    { label: "Reels", icon: <VideoLibrary />, path: ROUTES.REELS },
    { label: "Add", icon: <Add />, path: ROUTES.CREATE_POST },
    { label: "Messages", icon: <Chat />, path: ROUTES.HOME.MESSAGE, badge: 7 },
  ];

  const handleNavigation = (path) => {
    navigate(path);
  };

  return (
    <>

      <Box
        sx={{
          height: "calc(100vh - 64px)",
          display: "flex",
          flexDirection: "column",
          backgroundColor: theme.palette.mode === 'dark' ? APP_COLORS.grey[800] : APP_COLORS.common.white,
          overflow: "hidden",
          pt: 2,

        }}
      >
        <Grid container sx={{ flexGrow: 1, height: "100%" }}>
          {/* Sidebar */}
          <Grid
            item
            xs={0}
            sm={0}
            md={3}
            sx={{
              display: {
                xs: 'none',
                sm: 'none',
                md: 'block',
              },
              height: "100%",
              transition: 'width 0.3s ease',
            }}
          >
            <HomeSidebar toggleTheme={toggleTheme} />
          </Grid>

          <Grid
            item
            xs={12}
            sm={12}
            md={6}
            lg={6}
            sx={{
              height: "100%",
              display: "flex",
              flexDirection: "column",
              position: "relative",
              pb: (isMobile || isTablet) ? 8 : 0,
            }}
          >
            <HomePostStory />
            <Box
              sx={{
                flex: 1,
                overflowY: "auto",
                scrollBehavior: "smooth",
                // Hide scrollbar
                "&::-webkit-scrollbar": {
                  display: "none", // Hides the scrollbar in Webkit browsers (Chrome, Safari)
                },
                // Fallback for Firefox (optional, as Firefox uses a different syntax)
                "scrollbar-width": "none", // Firefox
                "-ms-overflow-style": "none", // IE and Edge
                p: { xs: 1, sm: 2, md: 2 },
                transition: "all 0.3s ease",
              }}
              onScroll={handleScroll}
            >
              <PostList postData={postData} />
            </Box>
          </Grid>
          {/* WhoToFollow Section */}
          <Grid
            item
            xs={0}
            sm={0}
            md={3}
            sx={{
              display: {
                xs: 'none',
                sm: 'none',
                md: 'block',
              },
              height: "100%",
              position: "relative",
              transition: 'width 0.3s ease',
            }}
          >
            <WhoToFollow />
          </Grid>
        </Grid>
      </Box>

      {/* Bottom Navigation for Mobile and Tablet */}
      {(isMobile || isTablet) && (
        <BottomNavigation
          value={bottomNavValue}
          onChange={(event, newValue) => {
            setBottomNavValue(newValue);
            handleNavigation(navItems[newValue].path);
          }}
          showLabels={false}
          sx={{
            position: "fixed",
            bottom: 0,
            left: 0,
            right: 0,
            bgcolor: theme.palette.mode === 'dark' ? APP_COLORS.grey[900] : APP_COLORS.grey[100],
            boxShadow: "0 -2px 10px rgba(0, 0, 0, 0.1)",
            height: 60,
            zIndex: 1000,
            borderTop: `1px solid ${theme.palette.mode === 'dark' ? APP_COLORS.grey[700] : APP_COLORS.grey[200]}`,
          }}
        >
          {navItems.map((item, index) => (
            <BottomNavigationAction
              key={index}
              icon={
                item.badge ? (
                  <Badge badgeContent={item.badge} color="error" overlap="circular">
                    {item.icon}
                  </Badge>
                ) : (
                  item.icon
                )
              }
              sx={{
                color: bottomNavValue === index ? APP_COLORS.primary[500] : APP_COLORS.grey[600],
                "& .Mui-selected": {
                  color: APP_COLORS.primary[500],
                },
                "&:hover": {
                  color: APP_COLORS.primary[400],
                  transform: "scale(1.1)",
                  transition: "all 0.2s ease",
                },
                minWidth: "auto",
                padding: "6px",
              }}
            />
          ))}
          <BottomNavigationAction
            icon={<Person />}
            onClick={() => handleNavigation(ROUTES.HOME.PROFILE)}
            sx={{
              color: bottomNavValue === navItems.length ? APP_COLORS.primary[500] : APP_COLORS.grey[600],
              "&:hover": {
                color: APP_COLORS.primary[400],
                transform: "scale(1.1)",
                transition: "all 0.2s ease",
              },
              minWidth: "auto",
              padding: "6px",
            }}
          />
        </BottomNavigation>
      )}

      {/* Mobile Sidebar Toggle */}
      {isMobile && (
        <IconButton
          onClick={() => setOpenSidebar(true)}
          sx={{
            position: 'fixed',
            top: 80,
            left: 16,
            zIndex: 1200,
            color: APP_COLORS.primary[500],
            transition: 'transform 0.3s ease',
            '&:hover': { transform: 'scale(1.1)' },
          }}
        >
          <AccountCircle sx={{ fontSize: 30 }} />
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
            backgroundColor: theme.palette.mode === 'dark' ? APP_COLORS.grey[900] : APP_COLORS.secondary[50],
            borderRight: `1px solid ${theme.palette.mode === 'dark' ? APP_COLORS.grey[700] : APP_COLORS.grey[200]}`,
          },
        }}
      >
        <HomeSidebar toggleTheme={toggleTheme} />
      </Drawer>

      {/* Mobile WhoToFollow Toggle */}
      {isMobile && (
        <IconButton
          onClick={() => setOpenWhoToFollow(true)}
          sx={{
            position: 'fixed',
            top: 140,
            right: 16,
            zIndex: 1200,
            color: APP_COLORS.primary[500],
            transition: 'transform 0.3s ease',
            '&:hover': { transform: 'scale(1.1)' },
          }}
        >
          <AccountCircle sx={{ fontSize: 30 }} />
        </IconButton>
      )}

      {/* WhoToFollow Drawer for Mobile */}
      <Drawer
        anchor="right"
        open={openWhoToFollow}
        onClose={() => setOpenWhoToFollow(false)}
        PaperProps={{
          sx: {
            width: { xs: "100%", sm: "250px" },
            background: theme.palette.mode === 'dark' ? APP_COLORS.grey[900] : 'transparent',
          },
        }}
      >
        <WhoToFollow closeDrawer={() => setOpenWhoToFollow(false)} />
      </Drawer>

      {/* Add Post Button/Floating Action Button */}
      <IconButton
        onClick={() => setOpenAddPost(true)}
        sx={{
          position: "fixed",
          bottom: { xs: 80, sm: 80, md: 20 }, // Adjust for bottom nav on mobile/tablet
          right: { xs: 16, sm: 20 },
          backgroundColor: APP_COLORS.primary[500],
          color: APP_COLORS.common.white,
          boxShadow: "0px 4px 15px rgba(0,0,0,0.3)",
          borderRadius: "50%",
          p: { xs: 0, sm: 0, md: 1.5 },
          zIndex: 1200,
          transition: 'all 0.3s ease',
          '&:hover': {
            backgroundColor: APP_COLORS.primary[700],
            transform: 'scale(1.1)',
          },
        }}
      >
        <Add sx={{ fontSize: { xs: 30, sm: 40 } }} />
      </IconButton>

      <AddPostModal
        open={openAddPost}
        onClose={() => setOpenAddPost(false)}
        aria-labelledby="add-post-modal"
        aria-describedby="modal-to-add-new-post"
      />
    </>
  );
};

export default HomePage;