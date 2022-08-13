import { Stack, Grid, Container } from "@mui/material";
import { Box } from "@mui/system";
import AddCard from "../ui/AddCard";
import ProjectCard from "../project/ProjectCard";
import ProjectForm from "../project/ProjectForm";
import { useStoreState } from "easy-peasy";
import { useEffect } from "react";

const HomePage = () => {
  const { display } = useStoreState((state) => state.modal);
  const { projects } = useStoreState((state) => state.project);

  return (
    <Container>
      <Stack
        display={"flex"}
        justifyContent={"space-between"}
        flexDirection={"row"}
        my={7}
        alignItems={"start"}
      >
        <Box sx={{ width: `${display ? "60%" : "100%"}`, height: "100%" }}>
          <Grid container spacing={2}>
            <Grid item>
              <AddCard text={"Add New Project"} width={250} />
            </Grid>
            {projects.length > 0 &&
              projects.map((item) => (
                <Grid item key={item.id}>
                  <ProjectCard
                    title={item.title}
                    description={item.description}
                    id={item.id}
                  />
                </Grid>
              ))}
          </Grid>
        </Box>
        {display && (
          <Box sx={{ width: "40%", height: "100%" }}>
            <ProjectForm />
          </Box>
        )}
      </Stack>
    </Container>
  );
};

export default HomePage;
