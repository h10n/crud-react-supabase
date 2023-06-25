import * as React from "react";
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";

export default function AlertSnackbar(props) {
  const { message, isOpen, close } = props;

  const handleClose = (
    event?: React.SyntheticEvent | Event,
    reason?: string
  ) => {
    if (reason === "clickaway") {
      return;
    }

    close();
  };

  return (
    <div>
      <Snackbar
        open={isOpen}
        autoHideDuration={5000}
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
        onClose={handleClose}
        {...props}
      >
        <Alert
          onClose={handleClose}
          severity="success"
          sx={{ width: "100%" }}
          {...props}
        >
          {message}
        </Alert>
      </Snackbar>
    </div>
  );
}
