import { useState, useRef } from "react";
import UploadStage from "./UploadStage";
import EditStage from "./EditStage";
import CropStage from "./CropStage";

const AddPostForm = () => {
    const [selectedImage, setSelectedImage] = useState(null);
    const [stage, setStage] = useState("upload");
    const fileInputRef = useRef(null);

    const handleFileChange = (event) => {
        if (event.target.files && event.target.files.length > 0) {
            const imageFiles = Array.from(event.target.files);
            const imageUrls = imageFiles.map((file) => URL.createObjectURL(file));

            setSelectedImage(imageUrls);
            // setStage("edit");
        }
    };


    const handleDrop = (event) => {
        event.preventDefault();
        if (event.dataTransfer.files && event.dataTransfer.files[0]) {
            const imageFile = event.dataTransfer.files[0];
            const imageUrl = URL.createObjectURL(imageFile);
            setSelectedImage(imageUrl);
            setStage("edit");
        }
    };

    const goToCrop = () => setStage("crop");
    const goBack = () => {
        if (stage === "crop") setStage("edit");
        else if (stage === "edit") {
            setStage("upload");
            setSelectedImage(null);
        }
    };

    return (
        <>

            {stage === "upload" && (
                <UploadStage
                    fileInputRef={fileInputRef}
                    handleFileChange={handleFileChange}
                    handleDrop={handleDrop}
                />
            )}
            {stage === "edit" && (
                <EditStage
                    selectedImage={selectedImage}
                    goToCrop={goToCrop}
                    goBack={goBack}
                />
            )}
            {stage === "crop" && (
                <CropStage selectedImage={selectedImage} goBack={goBack} />
            )}

        </>
    );
};

export default AddPostForm;
