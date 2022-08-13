import { Button, Stack, TextField } from "@mui/material";
import React from "react";

const SubtaskInput = ({ submitTaskHandler, subTaskInputHandler, value }) => {
  return (
    <Stack
      display={"flex"}
      alignItems={"center"}
      justifyContent={"space-between"}
      flexDirection={"row"}
      my={2}
    >
      <TextField
        label={"Task Title"}
        size={"small"}
        value={value}
        onChange={subTaskInputHandler}
      />
      <Button variant="outlined" onClick={submitTaskHandler}>
        Add
      </Button>
    </Stack>
  );
};

export default SubtaskInput;
