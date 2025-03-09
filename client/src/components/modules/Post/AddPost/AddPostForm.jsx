import { useState, useRef } from "react";
import UploadStage from "./UploadStage";
import EditStage from "./EditStage";

const AddPostForm = ({ onClose }) => {
    const [selectedImages, setSelectedImages] = useState([]);
    const [selectedImagesFile, setSelectedImagesFile] = useState([]);

    const [stage, setStage] = useState("upload");
    const [postData, setPostData] = useState({});


    const fileInputRef = useRef(null);

    const goToEdit = () => setStage("edit");


    return (
        <>
            {stage === "upload" && (
                <UploadStage
                    fileInputRef={fileInputRef}
                    setSelectedImages={setSelectedImages}
                    selectedImages={selectedImages}
                    goToEdit={goToEdit}
                    setSelectedImagesFile={setSelectedImagesFile}
                />
            )}
            {stage === "edit" && (
                <EditStage
                    onClose={onClose}
                    postData={postData}
                    setPostData={setPostData}
                    selectedImages={selectedImages}
                    selectedImagesFile={selectedImagesFile}
                />
            )}

        </>
    );
};

export default AddPostForm;
