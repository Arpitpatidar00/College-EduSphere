import { Box, Avatar, Typography, Chip, Switch } from "@mui/material";
import { transformImagePath } from "../../../../utils/image.utils";

export const CollegeColumn = (handleToggleAccredited) => {
    return [
        {
            field: "institutionName",
            headerName: "Institution Name",
            width: 250,
            renderCell: (params) => (
                <Box sx={{ display: "flex", alignItems: "center" }}>
                    <Avatar
                        sx={{ width: 40, height: 40, mr: 1 }}
                        src={transformImagePath(params.row.profilePicture)}
                        alt={params.row.institutionName}
                    />
                    <Typography variant="body1" fontWeight="bold">
                        {params.row.institutionName}
                    </Typography>
                </Box>
            ),
        },
        {
            field: "email",
            headerName: "Email",
            width: 300,
        },
        {
            field: "contactPhone",
            headerName: "Phone",
            width: 180,
        },
        {
            field: "location",
            headerName: "Location",
            width: 200,
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
            field: "accredited",
            headerName: "Accredited",
            width: 150,
            renderCell: (params) => (
                <Switch
                    checked={params.value}
                    onChange={() => handleToggleAccredited(params.row._id, !params.value)}
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
            field: "websiteURL",
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
    ];
};