import { Card, CardActionArea, Button } from "@mui/material";
import React from "react";

const AddTask = ({ addTaskHandler }) => {
  return (
    <Card align={"center"} py={2} onClick={addTaskHandler}>
      <CardActionArea>
        <Button>Add Tak +</Button>
      </CardActionArea>
    </Card>
  );
};

export default AddTask;
