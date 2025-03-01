import { useRef } from "react";
import { Box, Paper, Typography, Button } from "@mui/material";
import { PhotoLibrary } from "@mui/icons-material";
import { useFormik } from "formik";
import * as Yup from "yup";
import { APP_COLORS } from "../../../../enums/Colors";

const UploadStage = ({ goToEdit, setSelectedImages, selectedImages, setSelectedImagesFile }) => {
    const fileInputRef = useRef(null);

    const validationSchema = Yup.object({
        images: Yup.array()
            .min(1, "Please upload at least one image.")
            .required("Images are required."),
    });

    const formik = useFormik({
        initialValues: { images: [] },
        validationSchema,
        onSubmit: (values) => {
            goToEdit();
        },
    });

    const handleFileChange = (event) => {
        const files = Array.from(event.target.files);
        if (files.length) {
            const newImages = files.map((file) => URL.createObjectURL(file));
            setSelectedImagesFile(files);
            setSelectedImages((prev) => [...prev, ...newImages]);
            formik.setFieldValue("images", [...formik.values.images, ...files]);
        }
    };

    const handleDrop = (event) => {
        event.preventDefault();
        const files = Array.from(event.dataTransfer.files);
        if (files.length) {
            const newImages = files.map((file) => URL.createObjectURL(file));
            setSelectedImagesFile(files);
            setSelectedImages((prev) => [...prev, ...newImages]);
            formik.setFieldValue("images", [...formik.values.images, ...files]);
        }
    };

    return (
        <Box sx={{ maxWidth: "md", mx: "auto", p: 2, textAlign: "center" }}>
            <form onSubmit={formik.handleSubmit}>
                <Paper
                    sx={{
                        width: "100%",
                        height: 500,
                        display: "flex",
                        flexDirection: "column",
                        justifyContent: "center",
                        alignItems: "center",
                        borderRadius: 6,
                        border: `1px solid ${APP_COLORS.grey[400]}`,
                        position: "relative",
                        overflow: "hidden",
                        cursor: "pointer",
                    }}
                    onDrop={handleDrop}
                    onDragOver={(e) => e.preventDefault()}
                    onClick={() => fileInputRef.current.click()}
                >
                    {selectedImages.length === 0 ? (
                        <>
                            <Typography variant="h5" sx={{ mb: 3 }}>Create new post</Typography>
                            <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
                                <PhotoLibrary sx={{ mr: 1 }} />
                                <Typography variant="h6">Drag photos and videos here</Typography>
                            </Box>
                        </>
                    ) : (
                        <Box sx={{ position: "relative", width: 350, height: 350 }}>
                            {selectedImages.map((image, index) => (
                                <Box
                                    key={index}
                                    component="img"
                                    src={image}
                                    alt={`Uploaded ${index}`}
                                    sx={{
                                        position: "absolute",
                                        width: "100%",
                                        height: "100%",
                                        objectFit: "cover",
                                        borderRadius: 1,
                                        boxShadow: "0 4px 10px rgba(0,0,0,0.3)",
                                        top: 0,
                                        left: 0,
                                        transform: `rotate(${index * 3 - 6}deg) translateY(${index * -3}px)`,
                                        zIndex: index,
                                        transition: "transform 0.3s ease-in-out",
                                    }}
                                />
                            ))}
                        </Box>
                    )}
                    <input
                        ref={fileInputRef}
                        type="file"
                        accept="image/*"
                        multiple
                        onChange={handleFileChange}
                        style={{ display: "none" }}
                    />
                </Paper>

                {formik.touched.images && formik.errors.images && (
                    <Typography color="error" sx={{ mt: 1 }}>
                        {formik.errors.images}
                    </Typography>
                )}

                {selectedImages.length > 0 && (
                    <Button
                        type="submit"
                        variant="contained"
                        sx={{ mt: 2, backgroundColor: APP_COLORS.primary[600] }}
                    >
                        Next
                    </Button>
                )}
            </form>
        </Box>
    );
};

export default UploadStage;
