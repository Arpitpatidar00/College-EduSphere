import { Box, Avatar, Typography, Chip, Switch } from "@mui/material";
import { transformImagePath } from "../../../../utils/image.utils";

export const StudentColumn = (handleToggleCollegeVerified) => {
  return [
    {
      field: "user",
      headerName: "User",
      width: 200,
      renderCell: (params) => (
        <Box sx={{ display: "flex", alignItems: "center" }}>
          <Avatar
            sx={{ width: 40, height: 40, mr: 1 }}
            src={transformImagePath(params.row.profilePicture)}
            alt={params.row.firstName}
          />
          <Typography variant="body1" fontWeight="bold">
            {params.row.firstName} {params.row.lastName}
          </Typography>
        </Box>
      ),
    },
    {
      field: "email",
      headerName: "Email",
      width: 350,
    },
    {
      field: "enrollmentId",
      headerName: "Enrollment ID",
      width: 200,
    },
    {
      field: "interest",
      headerName: "Interests",
      width: 250,
      renderCell: (params) => (
        <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}>
          {(params?.value ? params.value.split(",") : []).map((interest, index) => (
            <Chip key={index} label={interest} size="small" sx={{ bgcolor: "#E0E0E0" }} />
          ))}
        </Box>
      ),
    },
    {
      field: "location",
      headerName: "Location",
      width: 200,
    },
    {
      field: "role",
      headerName: "Role",
      width: 150,
      renderCell: (params) => (
        <Chip
          label={params.value}
          size="small"
          sx={{
            bgcolor: params.value === "student" ? "#4CAF50" : "#1976D2",
            color: "#fff",
            fontWeight: "bold",
          }}
        />
      ),
    },
    {
      field: "verified",
      headerName: "Verified",
      width: 120,
      renderCell: (params) => (
        <Chip
          label={params.value ? "Yes" : "No"}
          size="small"
          sx={{
            bgcolor: params.value ? "#388E3C" : "#D32F2F",
            color: "#fff",
          }}
        />
      ),
    },
    {
      field: "collegeVerified",
      headerName: "College Verified",
      width: 150,
      renderCell: (params) => (
        <Switch
          checked={params.value}
          onChange={() => handleToggleCollegeVerified(params.row._id, !params.value)}
          color="success"
        />
      ),
    },
    {
      field: "dateJoined",
      headerName: "Date Joined",
      width: 180,
      renderCell: (params) => (params.value ? new Date(params.value).toLocaleDateString() : "-"),
    },
    {
      field: "website",
      headerName: "Website",
      width: 250,
      renderCell: (params) =>
        params.value ? (
          <Typography
            variant="body2"
            sx={{ color: "#1976D2", textDecoration: "underline", cursor: "pointer" }}
            onClick={() => window.open(params.value, "_blank")}
          >
            {params.value}
          </Typography>
        ) : (
          "-"
        ),
    },
    {
      field: "phoneNumber",
      headerName: "Phone",
      width: 150,
      renderCell: (params) => params.value || "-",
    },
  ];
};
