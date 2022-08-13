import { Typography, Container, Box, Grid, Stack } from "@mui/material";
import { useStoreState } from "easy-peasy";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import TaskForm from "../task/TaskForm";
import AddCard from "../ui/AddCard";
import TaskItemCard from "../task/TaskItemCard";

const ProjectItemPage = () => {
  const { projectId } = useParams();
  const { projects } = useStoreState((state) => state.project);
  let currentProject;
  projects.map((item) => {
    if (item.id === projectId) {
      currentProject = item;
    }
  });
  const { display } = useStoreState((state) => state.modal);
  const { tasks } = useStoreState((state) => state.task);

  return (
    <Container maxWidth={"lg"} sx={{ my: 5 }}>
      <Box>
        <Typography variant="h3" align="center">
          {currentProject.title}
        </Typography>
        <Typography variant="body1" align="center">
          {currentProject.description}
        </Typography>
      </Box>
      <Stack
        display={"flex"}
        justifyContent={"space-between"}
        flexDirection={"row"}
        my={7}
        alignItems={"start"}
      >
        <Box x={{ width: `${display ? "55%" : "100%"}`, height: "100%" }}>
          <Grid container spacing={2}>
            <Grid item>
              <AddCard text={"Add Task"} width={300} />
            </Grid>
            {tasks.length > 0 &&
              tasks.map((item) => (
                <Grid item key={item.id}>
                  <TaskItemCard
                    id={item.id}
                    title={item.taskTitle}
                    dueDate={item.dueDate}
                    assignee={item.assignee}
                    status={item.status}
                  />
                </Grid>
              ))}
          </Grid>
        </Box>
        {display && (
          <Box sx={{ width: "45%", height: "100%" }}>
            <TaskForm projectId={projectId} />
          </Box>
        )}
      </Stack>
    </Container>
  );
};

export default ProjectItemPage;
