import {
  Box,
  Avatar,
  Typography,
  Paper,
  Button,
} from "@mui/material";
import { Edit as EditIcon } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import Sidebar from "../components/HomePage/Sidebar/Sidebar";
import { APP_COLORS } from "../enums/Colors";

function UserProfile({ toggleTheme }) {
  const navigate = useNavigate();

  return (
    <Box display="flex" padding={2}>
      <Sidebar toggleTheme={toggleTheme} />

      <Box sx={{ flexGrow: 1, paddingLeft: 2 }}>
        <Paper
          elevation={3}
          sx={{
            padding: 2,
            display: "flex",
            borderRadius: 4,
            backgroundColor: APP_COLORS.background,
            color: APP_COLORS.text,
          }}
        >
          <Avatar
            src="https://randomuser.me/api/portraits/women/19.jpg"
            alt="User"
            sx={{ width: 100, height: 100, marginRight: 2 }}
          />
          <Box sx={{ flexGrow: 1 }}>
            <Typography variant="h5" sx={{ color: APP_COLORS.primary[700] }}>
              Sam Lanson
            </Typography>
            <Typography variant="subtitle1" color="text.secondary">
              Web Developer at Webestica
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{ marginTop: 1 }}>
              I did love to change the world, but they would not give me the source code.
            </Typography>

            <Box display="flex" justifyContent="space-between" marginTop={2}>
              {["256 Posts", "2.5K Followers", "365 Following"].map((item, index) => (
                <Typography key={index} variant="h6" sx={{ flexGrow: 0.5, color: APP_COLORS.primary[500] }}>
                  {item}
                </Typography>
              ))}
            </Box>

            <Box display="flex" justifyContent="flex-start" marginTop={2}>
              <Button
                variant="outlined"
                sx={{
                  marginRight: 1,
                  borderColor: APP_COLORS.primary[500],
                  color: APP_COLORS.primary[500],
                  "&:hover": {
                    backgroundColor: APP_COLORS.primary[100],
                  },
                }}
              >
                Follow
              </Button>
              <Button
                variant="contained"
                startIcon={<EditIcon />}
                sx={{
                  backgroundColor: APP_COLORS.primary[500],
                  "&:hover": { backgroundColor: APP_COLORS.primary[700] },
                }}
                onClick={() => navigate("/edit-profile")}
              >
                Edit Profile
              </Button>
              <Button
                variant="contained"
                sx={{
                  marginLeft: 1,
                  backgroundColor: APP_COLORS.accent[500],
                  "&:hover": { backgroundColor: APP_COLORS.secondary[700] },
                }}
              >
                Message
              </Button>
            </Box>
          </Box>
        </Paper>

        <Box marginTop={3}>
          <Typography variant="h6" align="center" marginBottom={1} color={APP_COLORS.primary[700]}>
            Recent Posts
          </Typography>
          <Box
            display="grid"
            gridTemplateColumns="repeat(3, 1fr)"
            gap={2}
            sx={{
              maxHeight: "450px",
              overflowY: "auto",
            }}
          >
            {Array.from({ length: 10 }).map((_, index) => (
              <Paper
                key={index}
                elevation={2}
                sx={{
                  position: "relative",
                  cursor: "pointer",
                  borderRadius: 2,
                  overflow: "hidden",
                  "&:hover": {
                    boxShadow: "0px 4px 10px rgba(0,0,0,0.2)",
                  },
                }}
              >
                <img
                  src="https://ddg-assets.b-cdn.net/web/imgs/generate_thumbs/140.jpg"
                  alt={`Post ${index + 1}`}
                  style={{ width: "100%", height: "200px", objectFit: "cover" }}
                />
                <Box
                  sx={{
                    position: "absolute",
                    bottom: 0,
                    left: 0,
                    right: 0,
                    backgroundColor: "rgba(0, 0, 0, 0.6)",
                    color: "white",
                    padding: "5px",
                    textAlign: "center",
                  }}
                >
                  <Typography variant="body2">This is a caption for post {index + 1}</Typography>
                </Box>
              </Paper>
            ))}
          </Box>
        </Box>


      </Box>
    </Box >
  );
}

export default UserProfile;