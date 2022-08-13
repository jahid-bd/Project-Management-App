import { IconButton, Typography, Divider } from "@mui/material";
import Paper from "@mui/material/Paper";
import { Box } from "@mui/system";
import React from "react";
import CloseIcon from "@mui/icons-material/Close";

const FormTemplate = ({ title, closeModal, children }) => {
  return (
    <Box
      component={Paper}
      elevation={6}
      square
      py={2}
      sx={{ position: "relative" }}
    >
      <Box
        sx={{
          mx: 4,
        }}
      >
        <IconButton
          onClick={() => closeModal()}
          aria-label="close"
          component="label"
          sx={{
            position: "absolute",
            top: "10px",
            right: "10px",
            color: "black",
          }}
        >
          <CloseIcon />
        </IconButton>
        <Typography component="h1" variant="h5" my={2}>
          {title}
        </Typography>
        <Divider />
        {children}
      </Box>
    </Box>
  );
};

export default FormTemplate;
