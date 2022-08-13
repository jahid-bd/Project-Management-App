import * as React from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import { Stack } from "@mui/material";
import { useStoreActions, useStoreState } from "easy-peasy";
import { useState } from "react";
import shortid from "shortid";
import { useEffect } from "react";
import FormTemplate from "../ui/FormTemplate";

const ProjectForm = () => {
  const initState = {
    id: shortid.generate(),
    title: "",
    description: "",
  };
  const [state, setState] = useState({ ...initState });
  const { editData, isUpdate } = useStoreState((state) => state.project);
  const actions = useStoreActions((actions) => actions);

  const { addProject, updateProject } = actions.project;
  const { closeModal } = actions.modal;

  useEffect(() => {
    if (Object.entries(editData).length > 0) {
      setState({ ...editData });
    }
  }, [editData]);

  const handleSubmit = (event) => {
    event.preventDefault();
    if (state.title && state.description) {
      if (isUpdate) {
        updateProject(state);
        setState(initState);
        closeModal();
      } else {
        setState({ ...state, id: shortid.generate() });
        addProject(state);
        setState(initState);
        closeModal();
      }
    } else {
      alert("Invalid Title or Description!");
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setState({
      ...state,
      [name]: value,
    });
  };

  return (
    <FormTemplate title={"Create Project Form"} closeModal={closeModal}>
      <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 1 }}>
        <TextField
          margin="normal"
          required
          fullWidth
          id="title"
          label="Project Name"
          name="title"
          autoComplete="title"
          autoFocus
          onChange={handleChange}
          value={state.title}
        />
        <TextField
          margin="normal"
          required
          fullWidth
          id="description"
          label="Description..."
          name="description"
          autoComplete="description"
          multiline
          rows={10}
          onChange={handleChange}
          value={state.description}
        />
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
            {isUpdate ? "Update" : "Add Project"}
          </Button>
        </Stack>
      </Box>
    </FormTemplate>
  );
};

export default ProjectForm;
