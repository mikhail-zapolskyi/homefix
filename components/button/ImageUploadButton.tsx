import React, { ChangeEvent, useRef } from "react";
import { CustomButton } from "@/components";
import { styled } from "@mui/material";
import { toast } from "react-toastify";

const UplodInput = styled("input")(() => ({
    display: "none",
}));

interface ImageUploadButtonProps {
    handleCallback?: (file: File) => void;
}

const ImageUploadButton: React.FC<ImageUploadButtonProps> = ({
    handleCallback,
}) => {
    const fileInput = useRef<HTMLInputElement>(null);

    const handleClick = () => {
        if (fileInput.current) {
            fileInput.current.click();
        }
    };

    const handleSave = (e: ChangeEvent<HTMLInputElement>) => {
        e.preventDefault();

        if (!e.target.files) {
            return;
        }

        const uploadedFile = e.target.files[0];
        const type = uploadedFile.type;

        if (!type.startsWith("image/")) {
            toast.error("Please upload image only");
            return;
        }

        if (handleCallback && uploadedFile) {
            handleCallback(uploadedFile);
        }
    };

    return (
        <>
            <CustomButton
                text="Uplolad File"
                variant="text"
                onClick={handleClick}
            />
            <UplodInput ref={fileInput} type="file" onChange={handleSave} />
        </>
    );
};

export default ImageUploadButton;
