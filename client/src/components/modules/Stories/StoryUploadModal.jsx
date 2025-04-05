import { useRef, useState } from "react";
import {
    Box,
    Modal,
    Paper,
    Typography,
    Button,
    TextField,
    MenuItem,
    FormControl,
    Select,
    InputLabel,
} from "@mui/material";
import { PhotoLibrary } from "@mui/icons-material";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useCreateOrUpdateStory } from "@services/api/main/stories.service";
import { APP_COLORS } from '../../../enums/Colors';

const StoryUploadModal = ({ open, onClose }) => {
    const fileInputRef = useRef(null);
    const [selectedMedia, setSelectedMedia] = useState(null);
    const { mutateAsync: createOrUpdateStory, isLoading } = useCreateOrUpdateStory();

    // Validation schema
    const validationSchema = Yup.object({
        media: Yup.mixed().required("Media is required"),
        creatorType: Yup.string()
            .oneOf(["student", "college"], "Invalid creator type")
            .required("Creator type is required"),
        privacy: Yup.string()
            .oneOf(["public", "followers", "collegeOnly"], "Invalid privacy setting")
            .required("Privacy setting is required"),
        caption: Yup.string()
            .max(500, "Caption must be 500 characters or less")
            .trim(),
    });

    // Formik setup
    const formik = useFormik({
        initialValues: {
            media: null,
            creatorType: "student",
            privacy: "public",
            caption: "",
        },
        validationSchema,
        onSubmit: (values) => {
            const formData = new FormData();
            formData.append("media", values.media);
            formData.append("creatorType", values.creatorType);
            formData.append("privacy", values.privacy);
            formData.append("caption", values.caption);
            formData.append("mediaType", values.media.type.startsWith("image") ? "image" : "video");

            createOrUpdateStory(formData)
                .then((result) => {
                    if (result.code) {
                        onClose();
                        formik.resetForm();
                        setSelectedMedia(null);
                    }
                })
                .catch((error) => {
                    console.error("Error uploading story:", error);
                });
        },
    });

    // Handle file selection
    const handleFileChange = (event) => {
        const file = event.target.files[0];
        if (file) {
            const mediaUrl = URL.createObjectURL(file);
            setSelectedMedia(mediaUrl);
            formik.setFieldValue("media", file);
        }
    };

    // Handle drag and drop
    const handleDrop = (event) => {
        event.preventDefault();
        const file = event.dataTransfer.files[0];
        if (file) {
            const mediaUrl = URL.createObjectURL(file);
            setSelectedMedia(mediaUrl);
            formik.setFieldValue("media", file);
        }
    };

    return (
        <Modal
            open={open}
            onClose={onClose}
            aria-labelledby="story-upload-modal"
            aria-describedby="upload-story-media"
            sx={{
                borderRadius: 4,
                '&:focus': {
                    outline: 'none',
                },
            }}
        >
            <Box sx={{
                position: "absolute",
                top: "50%",
                left: "50%",
                transform: "translate(-50%, -50%)",
                width: { xs: "90vw", sm: 600, md: 800 },
                maxHeight: "90vh",
                p: { xs: 1, sm: 2 },
                outline: 'none',
                overflowY: "auto", // Enable scrolling on small screens
            }}>
                <form onSubmit={formik.handleSubmit}>
                    <Paper
                        elevation={0}
                        sx={{
                            display: "flex",
                            flexDirection: { xs: "column", sm: "row" }, // Stack on small screens
                            borderRadius: 2,
                            border: `1px solid ${APP_COLORS.grey[400]}`,
                            overflow: "hidden",
                            height: { xs: "auto", sm: 600 }, // Full height only on larger screens
                            '&:focus': {
                                outline: 'none',
                            },
                        }}
                    >
                        {/* Left Side: Media Preview */}
                        <Box
                            sx={{
                                width: { xs: "100%", sm: "50%" },
                                height: { xs: 300, sm: "100%" }, // Reduced height on mobile
                                display: "flex",
                                flexDirection: "column",
                                justifyContent: "center",
                                alignItems: "center",
                                backgroundColor: APP_COLORS.grey[100],
                                cursor: "pointer",
                                aspectRatio: "9/16", // Maintain 9:16 ratio
                                '&:focus': {
                                    outline: 'none',
                                },
                            }}
                            onDrop={handleDrop}
                            onDragOver={(e) => e.preventDefault()}
                            onClick={() => fileInputRef.current.click()}
                        >
                            {!selectedMedia ? (
                                <Box sx={{ textAlign: "center", p: 2 }}>
                                    <PhotoLibrary sx={{ mb: 1, color: APP_COLORS.grey[600] }} />
                                    <Typography variant="body1">
                                        Drag photo or video here
                                    </Typography>
                                    <Typography variant="body2" color="text.secondary">
                                        or click to select (9:16 recommended)
                                    </Typography>
                                </Box>
                            ) : (
                                <Box
                                    component={selectedMedia.includes("video") ? "video" : "img"}
                                    src={selectedMedia}
                                    controls={selectedMedia.includes("video")}
                                    sx={{
                                        width: "100%",
                                        height: "100%",
                                        objectFit: "cover",
                                        aspectRatio: "9/16",
                                        borderRadius: { xs: 0, sm: 1 },
                                    }}
                                />
                            )}
                            <input
                                ref={fileInputRef}
                                type="file"
                                accept="image/*,video/*"
                                onChange={handleFileChange}
                                style={{ display: "none" }}
                            />
                        </Box>

                        {/* Right Side: Form Controls */}
                        <Box
                            sx={{
                                width: { xs: "100%", sm: "50%" },
                                p: { xs: 2, sm: 3 },
                                display: "flex",
                                flexDirection: "column",
                                justifyContent: "space-between",
                                '&:focus': {
                                    outline: 'none',
                                },
                            }}
                        >
                            <Box>
                                <Typography variant={{ xs: "h6", sm: "h5" }} sx={{ mb: 2 }}>
                                    Create New Story
                                </Typography>

                                {/* Error Message for Media */}
                                {formik.touched.media && formik.errors.media && (
                                    <Typography color="error" variant="body2" sx={{ mb: 2 }}>
                                        {formik.errors.media}
                                    </Typography>
                                )}

                                {/* Creator Type Selection */}
                                <FormControl fullWidth sx={{ mb: 2 }}>
                                    <InputLabel sx={{
                                        fontSize: { xs: '0.75rem', sm: '0.85rem', md: '1rem' },
                                    }}>
                                        Creator Type
                                    </InputLabel>
                                    <Select
                                        name="creatorType"
                                        value={formik.values.creatorType}
                                        onChange={formik.handleChange}
                                        onBlur={formik.handleBlur}
                                        error={formik.touched.creatorType && Boolean(formik.errors.creatorType)}
                                        sx={{
                                            fontSize: { xs: '0.75rem', sm: '0.85rem', md: '1rem' },
                                            '& .MuiSelect-select': {
                                                padding: { xs: '8px', sm: '10px', md: '12px' },
                                            },
                                        }}
                                    >
                                        <MenuItem value="student">Student</MenuItem>
                                        <MenuItem value="college">College</MenuItem>
                                    </Select>
                                    {formik.touched.creatorType && formik.errors.creatorType && (
                                        <Typography color="error" variant="body2" sx={{ fontSize: { xs: '0.7rem', sm: '0.8rem' } }}>
                                            {formik.errors.creatorType}
                                        </Typography>
                                    )}
                                </FormControl>


                                {/* Privacy Selection */}
                                <FormControl fullWidth sx={{ mb: 2 }}>
                                    <InputLabel sx={{
                                        fontSize: { xs: '0.75rem', sm: '0.85rem', md: '1rem' },
                                    }}>
                                        Privacy
                                    </InputLabel>
                                    <Select
                                        name="privacy"
                                        value={formik.values.privacy}
                                        onChange={formik.handleChange}
                                        onBlur={formik.handleBlur}
                                        error={formik.touched.privacy && Boolean(formik.errors.privacy)}
                                        sx={{
                                            fontSize: { xs: '0.75rem', sm: '0.85rem', md: '1rem' },
                                            '& .MuiSelect-select': {
                                                padding: { xs: '8px', sm: '10px', md: '12px' },
                                            },
                                        }}
                                    >
                                        <MenuItem value="public">Public</MenuItem>
                                        <MenuItem value="followers">Followers</MenuItem>
                                        <MenuItem value="collegeOnly">College Only</MenuItem>
                                    </Select>
                                    {formik.touched.privacy && formik.errors.privacy && (
                                        <Typography color="error" variant="body2" sx={{ fontSize: { xs: '0.7rem', sm: '0.8rem' } }}>
                                            {formik.errors.privacy}
                                        </Typography>
                                    )}
                                </FormControl>


                                {/* Caption Input */}
                                <TextField
                                    name="caption"
                                    label="Caption (optional)"
                                    multiline
                                    rows={3}
                                    value={formik.values.caption}
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    error={formik.touched.caption && Boolean(formik.errors.caption)}
                                    helperText={formik.touched.caption && formik.errors.caption}
                                    fullWidth
                                    variant="outlined"
                                    sx={{
                                        mb: 2,
                                        '& .MuiInputBase-root': {
                                            fontSize: {
                                                xs: '0.75rem',  // phones
                                                sm: '0.85rem',  // tablets
                                                md: '1rem',     // desktops
                                            },
                                            padding: {
                                                xs: '8px',
                                                sm: '10px',
                                                md: '12px',
                                            },
                                        },
                                        '& .MuiInputLabel-root': {
                                            fontSize: {
                                                xs: '0.75rem',
                                                sm: '0.85rem',
                                                md: '1rem',
                                            },
                                        },
                                        '& .MuiFormHelperText-root': {
                                            fontSize: {
                                                xs: '0.7rem',
                                                sm: '0.8rem',
                                                md: '0.9rem',
                                            },
                                        },
                                        '&:focus': { outline: 'none' },
                                    }}
                                />

                            </Box>

                            {/* Submit Button */}
                            <Button
                                type="submit"
                                variant="contained"
                                disabled={isLoading || !formik.isValid || !formik.dirty}
                                sx={{
                                    backgroundColor: APP_COLORS.primary[600],
                                    "&:hover": { backgroundColor: APP_COLORS.primary[700] },
                                    alignSelf: "flex-end",
                                    '&:focus': {
                                        outline: 'none',
                                    },
                                    width: { xs: "100%", sm: "auto" }, // Full width on mobile
                                }}
                            >
                                {isLoading ? "Uploading..." : "Upload Story"}
                            </Button>
                        </Box>
                    </Paper>
                </form>
            </Box>
        </Modal>
    );
};

export default StoryUploadModal;