import { useRef, useState } from "react";
import {
  Box,
  Button,
  FormHelperText,
  IconButton,
  Modal,
  Typography,
  styled,
} from "@mui/material";
import { CloudUpload, Delete } from "@mui/icons-material";
import { trimFileName } from "@/utils";
import { IMAGE_MIME_TYPES } from "@/constants";

const FileUpload = (props) => {
  const { name = "File", filePath = "" } = props;

  const VisuallyHiddenInput = styled("input")({
    clip: "rect(0 0 0 0)",
    clipPath: "inset(50%)",
    height: 1,
    overflow: "hidden",
    position: "absolute",
    bottom: 0,
    left: 0,
    whiteSpace: "nowrap",
    width: 1,
  });

  const uploadFileRef = useRef(null);

  const [blobFile, setBlobFile] = useState(null);
  const [isFileImage, setIsFileImage] = useState(false);
  const [fileName, setFileName] = useState(null);
  const [isShowPreview, setIsShowPreview] = useState(false);

  const cleanup = () => {
    URL.revokeObjectURL(blobFile);
    uploadFileRef.current.value = null;
  };

  const setFile = (file) => {
    if (blobFile) {
      cleanup();
    }
    setBlobFile(file);
  };

  const handleOnChange = (event) => {
    const file = event.target?.files?.[0];

    if (file) {
      const fileType = file.type;

      setIsFileImage(IMAGE_MIME_TYPES.includes(fileType));
      setFileName(file?.name);
      setFile(URL.createObjectURL(file));
    }
  };

  const handleDeleteFile = (event) => {
    if (blobFile) {
      event.preventDefault();
      setFile(null);
      setFileName(null);
    }
  };

  const handleOpenPreview = () => setIsShowPreview(true);
  const handleClosePreview = () => setIsShowPreview(false);

  const handleClickUpload = () => {
    if (filePath) {
      uploadFileRef.current.click();
    }
  };

  return (
    <>
      <Button
        component="label"
        variant="contained"
        startIcon={<CloudUpload />}
        onClick={handleClickUpload}
      >
        Upload {name}
        <VisuallyHiddenInput
          type="file"
          ref={uploadFileRef}
          onChange={handleOnChange}
        />
      </Button>

      {blobFile && (
        <IconButton
          aria-label="Delete"
          color="error"
          size="small"
          onClick={handleDeleteFile}
          sx={{ ml: 1 }}
        >
          <Delete fontSize="inherit" />
        </IconButton>
      )}

      {fileName && (
        <FormHelperText
          onClick={handleOpenPreview}
          sx={{ cursor: "pointer", color: "primary.main" }}
        >
          {trimFileName(fileName)}
        </FormHelperText>
      )}

      {!fileName && <FormHelperText>No Files Found</FormHelperText>}

      <Modal
        keepMounted
        open={isShowPreview}
        onClose={handleClosePreview}
        aria-labelledby="keep-mounted-modal-title"
        aria-describedby="keep-mounted-modal-description"
      >
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            bgcolor: "background.paper",
            boxShadow: 24,
            p: 4,
            outline: "none",
          }}
        >
          {blobFile && isFileImage ? (
            <img
              srcSet={blobFile}
              src={blobFile}
              alt={"photo"}
              loading="lazy"
              style={{ maxHeight: "500px", height: "100%", width: "auto" }}
            />
          ) : (
            <Typography
              id="keep-mounted-modal-title"
              variant="h6"
              component="h2"
              align="center"
            >
              No Preview Available
            </Typography>
          )}
        </Box>
      </Modal>
    </>
  );
};

export default FileUpload;
