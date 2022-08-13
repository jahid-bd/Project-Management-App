import { Card, Checkbox, IconButton, Typography } from "@mui/material";
import ClearIcon from "@mui/icons-material/Clear";
import React from "react";
import { useStoreActions } from "easy-peasy";
import { useState } from "react";

const SubTaskCard = ({ id, text, status }) => {
  const [checked, setChecked] = useState(false);
  const label = { inputProps: { "aria-label": "Checkbox demo" } };
  const { deleteSubTask, updateSubTaskStatus } = useStoreActions(
    (actions) => actions.task
  );
  const handleClear = () => {
    deleteSubTask(id);
  };
  const handleCheck = () => {
    if (checked) {
      setChecked(false);
      updateSubTaskStatus({ id, status: "todo" });
    } else {
      setChecked(true);
      updateSubTaskStatus({ id, status: "completed" });
    }
  };
  return (
    <Card
      sx={{
        height: "100%",
        display: "flex",
        flexDirection: "row",
        margin: "10px 0",
        alignItems: "center",
        justifyContent: "space-between",
      }}
    >
      <Checkbox {...label} onChange={handleCheck} />
      <Typography
        sx={status === "completed" ? { textDecoration: "line-through" } : ""}
      >
        {text}
      </Typography>
      <IconButton onClick={handleClear}>
        <ClearIcon />
      </IconButton>
    </Card>
  );
};

export default SubTaskCard;
