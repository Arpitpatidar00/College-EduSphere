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
} from "@mui/material";
import { APP_COLORS } from "../../../enums/Colors";
import { FOLLOW_STATUS } from "../../../enums/AuthConstants";
import { useDispatch } from "react-redux";

import { useGetAllStudents } from "../../../services/api/Auth/student.service";
import { transformImagePath } from "../../../utils/image.utils";
import { useToggleFollow } from "../../../services/api/main/follow.service";
import { useSelector } from "react-redux";
import { selectUserData, updateFollowState } from "../.../../../../store/slices/auth.slice";

const WhoToFollow = () => {
  const dispatch = useDispatch();

  const user = useSelector(selectUserData);

  const [studentPagination, setStudentPagination] = useState({
    page: 0,
    pageSize: 20,
  });

  // Fetch students
  const {
    data: studentData,
    isFetching: fetchingStudents,
    refetch: refetchStudents,
  } = useGetAllStudents(
    { page: studentPagination.page, limit: studentPagination.pageSize },
    { data: [], totalCount: 0 }
  );

  const { mutateAsync: toggleFollow } = useToggleFollow();

  const isUserFollowing = (studentId) => {
    return user?.follow?.following?.some(
      (follow) => follow.user === studentId
    );
  };

  const handleFollowToggle = async (studentId, isFollowing, visibility) => {
    let status = isFollowing ? null : (visibility === "public" ? FOLLOW_STATUS.FOLLOWING : FOLLOW_STATUS.REQUESTED);
    try {
      const response = await toggleFollow({ userId: studentId, status });

      if (response?.result) {
        dispatch(updateFollowState(response?.result));
      }
    } catch (error) {
      console.error("Error toggling follow:", error);
    }
  };


  return (
    <Box
      sx={{
        width: "100%",
        maxHeight: "calc(100vh - 100px)",
        bgcolor: APP_COLORS.secondary[200],
        borderRadius: 4,
        boxShadow: 3,
        display: "flex",
        flexDirection: "column",
        overflowY: "auto",
        m: 1,
      }}
    >
      <Typography
        variant="h6"
        gutterBottom
        sx={{
          p: 2,
          fontWeight: 600,
          position: "sticky",
          top: 0,
          zIndex: 1,
          color: APP_COLORS.primary[600],
        }}
      >
        Students List
      </Typography>

      <List dense sx={{ p: 0, bgcolor: APP_COLORS.secondary[500] }}>
        {studentData?.data.map((student) => {
          const visibility = student?.privacySettings?.visibility || "private";
          const isFollowing = isUserFollowing(student._id);

          return (
            <ListItem key={student._id} alignItems="flex-start" sx={{ py: 1, px: 1 }}>
              <Card
                variant="outlined"
                sx={{
                  p: 1,
                  display: "flex",
                  flexDirection: "column",
                  width: "100%",
                  bgcolor: APP_COLORS.secondary[400],
                }}
              >
                <Box sx={{ display: "flex", alignItems: "center", gap: 2, color: APP_COLORS.primary[600] }}>
                  <CardMedia
                    component="img"
                    width="50"
                    height="50"
                    alt={student.firstName}
                    src={transformImagePath(student.profilePicture) || "public/assets/default-profile.png"}
                    sx={{ width: 50, height: 50, borderRadius: "20%" }}
                  />

                  <Box sx={{ flex: 1, color: APP_COLORS.primary[600] }}>
                    <Typography variant="body1" fontWeight="600">
                      {student.firstName} {student.lastName}
                    </Typography>

                    <Chip
                      label={visibility === "public" ? "Public" : "Private"}
                      color={APP_COLORS.secondary[800]}
                      size="small"
                      sx={{ mt: 1 }}
                    />
                  </Box>
                </Box>

                {/* Action Buttons */}
                <Box sx={{ display: "flex", justifyContent: "space-around", mt: 2 }}>
                  <Button
                    size="small"
                    variant="outlined"
                    color={isFollowing ? "primary" : "primary"}
                    onClick={() => handleFollowToggle(student._id, isFollowing, visibility)}
                  >
                    {isFollowing ? "Unfollow" : "Follow"}
                  </Button>
                  <Button size="small" variant="outlined" color="error" onClick={() => handleRemove(student._id)}>
                    Remove
                  </Button>
                </Box>
              </Card>
            </ListItem>
          );
        })}
      </List>
    </Box>
  );
};

export default WhoToFollow;
