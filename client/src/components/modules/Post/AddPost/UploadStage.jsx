// src/components/UploadStage.js
import { Box, Paper, Typography } from "@mui/material";
import { PhotoLibrary } from "@mui/icons-material";
import { APP_COLORS } from '../../../../enums/Colors';

const UploadStage = ({ fileInputRef, handleFileChange, handleDrop }) => (
    <Box
        sx={{
            maxWidth: "md",
            mx: "auto",
            p: 2,
        }}
        onClick={() => fileInputRef.current.click()}
    >
        <Paper
            sx={{
                width: "100%",
                height: 500,
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
                borderRadius: 6,
                border: `2px dashed ${APP_COLORS.primary[600]}`,
            }}
            onDrop={handleDrop}
            onDragOver={(e) => e.preventDefault()}
        >
            <Typography variant="h5" sx={{ mb: 3 }}>
                Create new post
            </Typography>
            <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
                <PhotoLibrary sx={{ mr: 1 }} />
                <Typography variant="h6">Drag photos and videos here</Typography>
            </Box>

            <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                multiple
                onChange={handleFileChange}
                style={{ display: "none" }}
            />
        </Paper>
    </Box>
);

export default UploadStage;
