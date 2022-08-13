import { useState } from "react";
import FormTemplate from "../ui/FormTemplate";
import { TextField, Button, Box, Stack } from "@mui/material";
import MenuItem from "@mui/material/MenuItem";
import { useStoreState, useStoreActions } from "easy-peasy";
import shortid from "shortid";
import { useEffect } from "react";

const TaskForm = ({ projectId }) => {
  const initState = {
    id: "",
    projectId: "",
    taskTitle: "",
    dueDate: "",
    status: "",
    assignee: "",
  };
  const [state, setState] = useState({ ...initState });
  const { closeModal } = useStoreActions((actions) => actions.modal);
  const { taskTitle, dueDate, status, assignee } = state;
  const { editData, isUpdate } = useStoreState((state) => state.task);

  const { addTask, updateTask } = useStoreActions((actions) => actions.task);

  useEffect(() => {
    console.log("EditDAta" + editData);
    if (Object.entries(editData).length > 0) {
      setState({ ...editData });
    }
  }, [editData]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (taskTitle && dueDate && status) {
      if (isUpdate) {
        updateTask(state);
        setState(initState);
        closeModal();
      } else {
        const taskObj = {
          id: shortid.generate(),
          projectId,
          taskTitle,
          dueDate,
          status,
          assignee,
        };
        addTask(taskObj);
        setState(initState);
        closeModal();
      }
    } else {
      alert("Invalid Title or Due Date or Status");
    }
  };

  const handleOnChange = (e) => {
    setState({
      ...state,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <FormTemplate closeModal={closeModal} title={"Create Task Form"}>
      <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 1 }}>
        <TextField
          margin="normal"
          required
          fullWidth
          id="taskTitle"
          label="Task Title"
          name="taskTitle"
          autoComplete="Tasktitle"
          autoFocus
          value={taskTitle}
          onChange={handleOnChange}
        />
        <TextField
          margin="normal"
          id="date"
          name="dueDate"
          label="Due Date"
          type="date"
          fullWidth
          InputLabelProps={{
            shrink: true,
          }}
          value={dueDate}
          onChange={handleOnChange}
        />

        <TextField
          margin="normal"
          select
          id="assignee"
          label="Asssignee"
          sx={{ width: "50%" }}
          name="assignee"
          value={assignee}
          onChange={handleOnChange}
        >
          <MenuItem value={""}>No One</MenuItem>
          <MenuItem value={"Jahid Hasan"}>Jahid Hasan</MenuItem>
        </TextField>
        <TextField
          margin="normal"
          select
          id="status"
          label="Status"
          sx={{ width: "50%" }}
          name="status"
          value={status}
          onChange={handleOnChange}
        >
          <MenuItem value={"todo"}>To Do</MenuItem>
          <MenuItem value={"inprogress"}>In Progress</MenuItem>
          <MenuItem value={"completed"}>Completed</MenuItem>
        </TextField>
        <Stack direction={"row"} justifyContent={"space-between"}>
          <Button
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
            color={"error"}
            onClick={() => closeModal()}
          >
            Cancel
          </Button>
          <Button type="submit" variant="contained" sx={{ mt: 3, mb: 2 }}>
            {isUpdate ? "Update" : "Add Task"}
          </Button>
        </Stack>
      </Box>
    </FormTemplate>
  );
};

export default TaskForm;
