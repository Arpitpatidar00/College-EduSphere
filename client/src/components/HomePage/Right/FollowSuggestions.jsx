import { useState } from "react";
import {
  Box,
  Typography,
  List,
  ListItem,
  Card,
  CardMedia,
  Button,
  Chip,
  Stack,
} from "@mui/material";
import { APP_COLORS } from "../../../enums/Colors";
import { FOLLOW_STATUS } from "../../../enums/AuthConstants";
import { useDispatch, useSelector } from "react-redux";
import { useGetAllStudents } from "../../../services/api/Auth/student.service";
import { transformImagePath } from "../../../utils/image.utils";
import { useToggleFollow } from "../../../services/api/main/follow.service";
import {
  selectUserData,
  updateFollowState,
} from "../.../../../../store/slices/auth.slice";
import CloseIcon from "@mui/icons-material/Close";
import IconButton from "@mui/material/IconButton";


const WhoToFollow = ({ closeDrawer }) => {
  const dispatch = useDispatch();
  const user = useSelector(selectUserData);

  const [studentPagination, setStudentPagination] = useState({
    page: 0,
    pageSize: 20,
  });

  const {
    data: studentData,
    isFetching: fetchingStudents,
    refetch: refetchStudents,
  } = useGetAllStudents(
    { page: studentPagination.page, limit: studentPagination.pageSize },
    { data: [], totalCount: 0 }
  );

  const { mutateAsync: toggleFollow } = useToggleFollow();

  const isUserFollowing = (studentId) =>
    user?.follow?.following?.some((follow) => follow.user === studentId);

  const handleFollowToggle = async (studentId, isFollowing, visibility) => {
    let status = isFollowing
      ? null
      : visibility === "public"
        ? FOLLOW_STATUS.FOLLOWING
        : FOLLOW_STATUS.REQUESTED;
    try {
      const response = await toggleFollow({ userId: studentId, status });
      if (response?.result) {
        dispatch(updateFollowState(response?.result));
      }
    } catch (error) {
      console.error("Error toggling follow:", error);
    }
  };

  const handleRemove = (studentId) => {
    // Add your remove logic here
    console.log("Remove", studentId);
  };

  return (
    <Box
      sx={{
        width: "100%",
        maxHeight: { xs: "unset", md: "calc(100vh - 100px)" },
        bgcolor: APP_COLORS.secondary[200],
        borderRadius: 4,
        boxShadow: 3,
        display: "flex",
        flexDirection: "column",
        overflowY: "auto",
        m: { xs: 0, sm: 0, md: 1 },
      }}
    >
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          p: 2,
          position: "sticky",
          top: 0,
          zIndex: 1,
          bgcolor: APP_COLORS.secondary[200],
        }}
      >
        <Typography
          variant="h6"
          sx={{ fontWeight: 600, color: APP_COLORS.primary[600] }}
        >
          Students List
        </Typography>

        <IconButton onClick={closeDrawer} size="small">
          <CloseIcon />
        </IconButton>
      </Box>

      <List dense sx={{ p: 0, bgcolor: APP_COLORS.secondary[500] }}>
        {studentData?.data.map((student) => {
          const visibility = student?.privacySettings?.visibility || "private";
          const isFollowing = isUserFollowing(student._id);

          return (
            <ListItem
              key={student._id}
              alignItems="flex-start"
              sx={{ py: 1, px: 1 }}
            >
              <Card
                variant="outlined"
                sx={{
                  p: 2,
                  display: "flex",
                  flexDirection: "column",
                  width: "100%",
                  bgcolor: APP_COLORS.secondary[400],
                  gap: 2,
                }}
              >
                <Stack
                  direction="row"
                  spacing={2}
                  alignItems="center"
                  sx={{ flexWrap: "wrap" }}
                >
                  <CardMedia
                    component="img"
                    width="50"
                    height="50"
                    alt={student.firstName}
                    src={
                      transformImagePath(student.profilePicture) ||
                      "public/assets/default-profile.png"
                    }
                    sx={{
                      width: 50,
                      height: 50,
                      borderRadius: "20%",
                      objectFit: "cover",
                    }}
                  />

                  <Box sx={{ flex: 1, minWidth: "60%" }}>
                    <Typography
                      variant="body1"
                      fontWeight="600"
                      color={APP_COLORS.primary[600]}
                    >
                      {student.firstName} {student.lastName}
                    </Typography>

                    <Chip
                      label={visibility === "public" ? "Public" : "Private"}
                      size="small"
                      sx={{
                        mt: 1,
                        bgcolor:
                          visibility === "public"
                            ? APP_COLORS.primary[200]
                            : APP_COLORS.secondary[700],
                        color:
                          visibility === "public"
                            ? APP_COLORS.primary[800]
                            : "#fff",
                      }}
                    />
                  </Box>
                </Stack>

                {/* Action Buttons */}
                <Stack
                  direction={{ xs: "row", sm: "row" }}
                  spacing={1}
                  justifyContent="flex-start"
                  alignItems="stretch"
                >
                  <Button
                    fullWidth
                    size="small"
                    variant="outlined"
                    color="primary"
                    onClick={() =>
                      handleFollowToggle(student._id, isFollowing, visibility)
                    }
                  >
                    {isFollowing ? "Unfollow" : "Follow"}
                  </Button>

                  <Button
                    fullWidth
                    size="small"
                    variant="outlined"
                    color="error"
                    onClick={() => handleRemove(student._id)}
                  >
                    Remove
                  </Button>
                </Stack>
              </Card>
            </ListItem>
          );
        })}
      </List>
    </Box>
  );
};

export default WhoToFollow;
