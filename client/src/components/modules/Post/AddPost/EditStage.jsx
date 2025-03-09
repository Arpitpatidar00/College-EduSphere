import { useState } from "react";
import {
    AppBar,
    Toolbar,
    IconButton,
    Typography,
    Button,
    Box,
    Paper,
    Avatar,
    TextField,
    Accordion,
    AccordionSummary,
    AccordionDetails,
    Grid,
    Slide,
    Select,
    MenuItem,
    Chip,
    FormControlLabel,
    Checkbox,
    FormControl,
    FormHelperText,
} from "@mui/material";
import { ArrowBack, InsertEmoticon, ExpandMore } from "@mui/icons-material";
import ImageCarousel from "../../../Common/ImageCarousel/index";
import { Formik, Form } from "formik";
import { useCreatePost } from "../../../../services/api/main/post.service";
import validationSchema from './addPostValidation';

const EditStage = ({ selectedImages, goBack, onClose, selectedImagesFile }) => {
    const [showRightPanel, setShowRightPanel] = useState(false);
    const [hasRightPanelBeenShown, setHasRightPanelBeenShown] = useState(false);
    const [tags, setTags] = useState([]);

    const createPost = useCreatePost();

    // Handler for chip input tags
    const handleTagKeyDown = (event) => {
        if (event.key === "Enter" && event.target.value.trim() !== "") {
            event.preventDefault();
            setTags([...tags, `#${event.target.value.trim().replace(/\s+/g, "_")}`]);
            event.target.value = "";
        }
    };

    const handleDeleteTag = (tagToDelete) => {
        setTags(tags.filter((tag) => tag !== tagToDelete));
    };

    const initialValues = {
        title: "",
        description: "",
        postType: "project",
        location: "",
        category: "technology",
        accessibility: "public",
        hideComments: false,
        hideLikes: false,
        coverImage: selectedImagesFile?.length > 0 ? selectedImagesFile[0] : null,
        media: selectedImagesFile?.length > 1 ? selectedImagesFile.slice(1) : [],
    };

    const handleFormSubmit = async (values) => {
        const formData = new FormData();
        formData.append("title", values.title);
        formData.append("description", values.description);
        formData.append("postType", values.postType);
        formData.append("tags", tags.join(" "));
        formData.append("location", values.location);
        formData.append("category", values.category);
        formData.append("accessibility", values.accessibility);
        formData.append("hideComments", values.hideComments);
        formData.append("hideLikes", values.hideLikes);

        if (selectedImagesFile && selectedImagesFile.length > 0) {
            formData.append("coverImage", selectedImagesFile[0]);
        }
        if (selectedImagesFile && selectedImagesFile.length > 1) {
            for (let i = 1; i < selectedImagesFile.length; i++) {
                formData.append("media", selectedImagesFile[i]);
            }
        }

        try {
            const response = await createPost.mutateAsync(formData);
            console.log("Response:", response);
            console.log("Closing modal...");

            if (response) {
                console.log("Closing modal...");

                console.log("Response:", response);
                onClose();
            }
        } catch (error) {
            console.error("Error creating post:", error);
        }
    };

    return (
        <Formik
            initialValues={initialValues}
            validationSchema={showRightPanel ? validationSchema : undefined} // Apply validation only if showRightPanel is true

            onSubmit={(values) => {
                if (!hasRightPanelBeenShown) {
                    setShowRightPanel(true);
                    setHasRightPanelBeenShown(true);
                } else {
                    handleFormSubmit(values);
                }
            }}
        >
            {({ values, handleChange, handleSubmit, touched, errors }) => (
                <Form>
                    <Box sx={{ display: "flex", flexDirection: "column", flexGrow: 1 }}>
                        <AppBar position="static" color="transparent" elevation={0}>
                            <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
                                <IconButton edge="start" color="inherit" onClick={goBack}>
                                    <ArrowBack />
                                </IconButton>
                                <Typography
                                    variant="h6"
                                    component="div"
                                    sx={{ flexGrow: 1, textAlign: "center" }}
                                >
                                    Create new post
                                </Typography>
                                <Button color="primary" onClick={handleSubmit}>
                                    {hasRightPanelBeenShown ? "Post" : "Next"}
                                </Button>
                            </Toolbar>
                        </AppBar>
                        <Grid container sx={{ flexGrow: 1, overflow: "hidden", borderRadius: 6 }}>
                            <Grid
                                item
                                xs={12}
                                md={showRightPanel ? 8 : 12}
                                sx={{ bgcolor: "#000", position: "relative", maxHeight: "70vh" }}
                            >
                                {selectedImages && (
                                    <ImageCarousel
                                        images={selectedImages}
                                        width="100%"
                                        height="70vh"
                                    />
                                )}
                            </Grid>
                            <Grid item xs={12} md={4}>
                                <Slide direction="left" in={showRightPanel} mountOnEnter unmountOnExit>
                                    <Paper
                                        sx={{
                                            height: "70vh",
                                            p: 3,
                                            backgroundColor: "#fff",
                                            boxShadow: 3,
                                            borderRadius: 2,
                                            overflowY: "auto",
                                        }}
                                    >
                                        <Box sx={{ display: "flex", alignItems: "center", mb: 3 }}>
                                            <Avatar src="" alt="Profile" sx={{ mr: 2 }} />
                                            <Typography>___its__arpit___</Typography>
                                        </Box>
                                        <TextField
                                            fullWidth
                                            label="Title"
                                            name="title"
                                            value={values.title}
                                            onChange={handleChange}
                                            variant="outlined"
                                            sx={{ mb: 2 }}
                                            error={Boolean(touched.title && errors.title)}
                                            helperText={touched.title && errors.title}
                                        />
                                        <TextField
                                            fullWidth
                                            label="Description"
                                            name="description"
                                            value={values.description}
                                            onChange={handleChange}
                                            multiline
                                            rows={4}
                                            variant="outlined"
                                            sx={{ mb: 2 }}
                                            error={Boolean(touched.description && errors.description)}
                                            helperText={touched.description && errors.description}
                                        />
                                        <Box sx={{ display: "flex", alignItems: "center", mb: 1 }}>
                                            <InsertEmoticon color="action" />
                                            <Typography color="textSecondary" sx={{ ml: 1 }}>
                                                {values.description.length}/2,200
                                            </Typography>
                                        </Box>
                                        <FormControl
                                            fullWidth
                                            sx={{ mb: 2 }}
                                            error={Boolean(touched.postType && errors.postType)}
                                        >
                                            <Select
                                                label="Post Type"
                                                name="postType"
                                                value={values.postType}
                                                onChange={handleChange}
                                                variant="outlined"
                                            >
                                                <MenuItem value="hackathons">Hackathons</MenuItem>
                                                <MenuItem value="achievement">Achievement</MenuItem>
                                                <MenuItem value="project">Project</MenuItem>
                                                <MenuItem value="other">Other</MenuItem>
                                            </Select>
                                            {touched.postType && errors.postType && (
                                                <FormHelperText>{errors.postType}</FormHelperText>
                                            )}
                                        </FormControl>
                                        <TextField
                                            fullWidth
                                            label="Tags (press Enter to add)"
                                            variant="outlined"
                                            onKeyDown={handleTagKeyDown}
                                            sx={{ mb: 2 }}
                                        />
                                        <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1 }}>
                                            {tags.map((tag, index) => (
                                                <Chip
                                                    key={index}
                                                    label={tag}
                                                    onDelete={() => handleDeleteTag(tag)}
                                                    color="primary"
                                                    variant="outlined"
                                                />
                                            ))}
                                        </Box>
                                        <TextField
                                            fullWidth
                                            label="Location"
                                            name="location"
                                            value={values.location}
                                            onChange={handleChange}
                                            variant="outlined"
                                            sx={{ mb: 2 }}
                                            error={Boolean(touched.location && errors.location)}
                                            helperText={touched.location && errors.location}
                                        />
                                        <FormControl
                                            fullWidth
                                            sx={{ mb: 2 }}
                                            error={Boolean(touched.category && errors.category)}
                                        >
                                            <Select
                                                label="Category"
                                                name="category"
                                                value={values.category}
                                                onChange={handleChange}
                                                variant="outlined"
                                            >
                                                <MenuItem value="education">Education</MenuItem>
                                                <MenuItem value="career">Career</MenuItem>
                                                <MenuItem value="technology">Technology</MenuItem>
                                                <MenuItem value="personal">Personal</MenuItem>
                                                <MenuItem value="other">Other</MenuItem>
                                            </Select>
                                            {touched.category && errors.category && (
                                                <FormHelperText>{errors.category}</FormHelperText>
                                            )}
                                        </FormControl>
                                        <Box sx={{ mt: 3 }}>
                                            <Accordion elevation={1} sx={{ borderRadius: 1, mb: 1 }}>
                                                <AccordionSummary expandIcon={<ExpandMore />}>
                                                    <Typography>Accessibility</Typography>
                                                </AccordionSummary>
                                                <AccordionDetails>
                                                    <FormControl
                                                        fullWidth
                                                        error={Boolean(touched.accessibility && errors.accessibility)}
                                                    >
                                                        <Select
                                                            label="Accessibility"
                                                            name="accessibility"
                                                            value={values.accessibility}
                                                            onChange={handleChange}
                                                            variant="outlined"
                                                        >
                                                            <MenuItem value="public">Public</MenuItem>
                                                            <MenuItem value="private">Private</MenuItem>
                                                        </Select>
                                                        {touched.accessibility && errors.accessibility && (
                                                            <FormHelperText>{errors.accessibility}</FormHelperText>
                                                        )}
                                                    </FormControl>
                                                </AccordionDetails>
                                            </Accordion>
                                            <Accordion elevation={1} sx={{ borderRadius: 1 }}>
                                                <AccordionSummary expandIcon={<ExpandMore />}>
                                                    <Typography>Advanced settings</Typography>
                                                </AccordionSummary>
                                                <AccordionDetails>
                                                    <FormControlLabel
                                                        control={
                                                            <Checkbox
                                                                name="hideComments"
                                                                checked={values.hideComments}
                                                                onChange={handleChange}
                                                            />
                                                        }
                                                        label="Hide Comments"
                                                    />
                                                    <FormControlLabel
                                                        control={
                                                            <Checkbox
                                                                name="hideLikes"
                                                                checked={values.hideLikes}
                                                                onChange={handleChange}
                                                            />
                                                        }
                                                        label="Hide Likes"
                                                    />
                                                </AccordionDetails>
                                            </Accordion>
                                        </Box>
                                    </Paper>
                                </Slide>
                            </Grid>
                        </Grid>
                    </Box>
                </Form>
            )}
        </Formik>
    );
};

export default EditStage;
