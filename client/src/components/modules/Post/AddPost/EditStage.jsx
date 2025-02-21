import React from 'react';
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
    Grid,
    Slide,
    Select,
    MenuItem,
} from '@mui/material';
import {
    ArrowBack,
    InsertEmoticon,
    ExpandMore,
} from '@mui/icons-material';
import { APP_COLORS } from '../../../../enums/Colors';
import axios from 'axios';

const EditStage = ({ selectedImage, goBack, goToCrop }) => {
    const [showRightPanel, setShowRightPanel] = React.useState(false);
    const [hasRightPanelBeenShown, setHasRightPanelBeenShown] = React.useState(false);

    const [formData, setFormData] = React.useState({
        title: "",
        description: "",
        postType: "other",
        tags: "",
        location: "",
        category: "other",
        media: selectedImage || "",
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async () => {
        const postData = {
            ...formData,
            tags: formData.tags
                .split(',')
                .map((tag) => `#${tag.trim().replace(/\s+/g, '_')}`)
                .filter(Boolean)
                .join(' '),
        };

        try {
            const response = await axios.post("http://localhost:5000/api/posts", postData, {
                headers: { "Content-Type": "application/json" },
            });
            console.log("Post created successfully:", response.data);
            goToCrop();
        } catch (error) {
            console.error("Error creating post:", error.response?.data || error.message);
        }
    };

    const handleNextClick = () => {
        if (hasRightPanelBeenShown) {
            handleSubmit();
        } else {
            setShowRightPanel(true);
            setHasRightPanelBeenShown(true);
        }
    };

    return (
        <Box sx={{ display: 'flex', flexDirection: 'column', flexGrow: 1 }}>
            <AppBar position="static" color="transparent" elevation={0}>
                <Toolbar sx={{ display: 'flex', justifyContent: 'space-between' }}>
                    <IconButton edge="start" color="inherit" onClick={goBack}>
                        <ArrowBack />
                    </IconButton>
                    <Typography variant="h6" component="div" sx={{ flexGrow: 1, textAlign: 'center' }}>
                        Create new post
                    </Typography>
                    <Button color="primary" onClick={handleNextClick}>
                        {hasRightPanelBeenShown ? "Post" : "Next"}
                    </Button>
                </Toolbar>
            </AppBar>
            <Grid container sx={{ flexGrow: 1, overflow: 'hidden', borderRadius: 6 }}>
                <Grid item xs={12} md={showRightPanel ? 8 : 12} sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', bgcolor: '#000', position: 'relative', maxHeight: '70vh' }}>
                    {selectedImage && (
                        <Box
                            component="img"
                            src={selectedImage}
                            alt="Selected"
                            sx={{ maxWidth: '100%', maxHeight: '100%', objectFit: 'contain' }}
                        />
                    )}
                </Grid>
                <Grid item xs={12} md={4}>
                    <Slide direction="left" in={showRightPanel} mountOnEnter unmountOnExit>
                        <Paper sx={{ height: "70vh", p: 3, backgroundColor: "#fff", boxShadow: 3, borderRadius: 2, overflowY: "auto" }}>
                            <Box sx={{ display: "flex", alignItems: "center", mb: 3 }}>
                                <Avatar src="" alt="Profile" sx={{ mr: 2 }} />
                                <Typography>___its__arpit___</Typography>
                            </Box>
                            <TextField fullWidth label="Title" name="title" value={formData.title} onChange={handleInputChange} variant="outlined" sx={{ mb: 2 }} />
                            <TextField fullWidth label="Description" name="description" value={formData.description} onChange={handleInputChange} multiline rows={4} variant="outlined" sx={{ mb: 2 }} />
                            <Box sx={{ display: "flex", alignItems: "center", mb: 1 }}>
                                <InsertEmoticon color="action" />
                                <Typography color="textSecondary" sx={{ ml: 1 }}>
                                    {formData.description.length}/2,200
                                </Typography>
                            </Box>
                            <Select fullWidth name="postType" value={formData.postType} onChange={handleInputChange} variant="outlined" sx={{ mb: 2 }}>
                                <MenuItem value="hackathons">Hackathons</MenuItem>
                                <MenuItem value="achievement">Achievement</MenuItem>
                                <MenuItem value="project">Project</MenuItem>
                                <MenuItem value="other">Other</MenuItem>
                            </Select>
                            <TextField fullWidth label="Tags (comma separated)" name="tags" value={formData.tags} onChange={handleInputChange} variant="outlined" sx={{ mb: 2 }} />
                            <TextField fullWidth label="Location" name="location" value={formData.location} onChange={handleInputChange} variant="outlined" sx={{ mb: 2 }} />
                            <Select fullWidth name="category" value={formData.category} onChange={handleInputChange} variant="outlined" sx={{ mb: 2 }}>
                                <MenuItem value="education">Education</MenuItem>
                                <MenuItem value="career">Career</MenuItem>
                                <MenuItem value="technology">Technology</MenuItem>
                                <MenuItem value="personal">Personal</MenuItem>
                                <MenuItem value="other">Other</MenuItem>
                            </Select>
                            <Box sx={{ mt: 3 }}>
                                <Accordion elevation={1} sx={{ borderRadius: 1, mb: 1 }}>
                                    <AccordionSummary expandIcon={<ExpandMore />}>
                                        <Typography>Accessibility</Typography>
                                    </AccordionSummary>
                                </Accordion>
                                <Accordion elevation={1} sx={{ borderRadius: 1 }}>
                                    <AccordionSummary expandIcon={<ExpandMore />}>
                                        <Typography>Advanced settings</Typography>
                                    </AccordionSummary>
                                </Accordion>
                            </Box>
                        </Paper>
                    </Slide>
                </Grid>
            </Grid>
        </Box>
    );
};

export default EditStage;
