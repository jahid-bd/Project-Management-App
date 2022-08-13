import { useStoreActions, useStoreState } from "easy-peasy";
import { styled } from "@mui/material/styles";
import { Link as RouterLink } from "react-router-dom";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import { Button, Box } from "@mui/material";
import VisibilityIcon from "@mui/icons-material/Visibility";
import MenuToggle from "../ui/MenuToggle";

const ExpandMore = styled((props) => {
  const { expand, ...other } = props;
  return <IconButton {...other} />;
})(({ theme, expand }) => ({
  transform: !expand ? "rotate(0deg)" : "rotate(180deg)",
  marginLeft: "auto",
  transition: theme.transitions.create("transform", {
    duration: theme.transitions.duration.shortest,
  }),
}));

const ProjectCard = ({ id, title, description }) => {
  const { deleteProject, getEditData } = useStoreActions(
    (actions) => actions.project
  );
  const { projects } = useStoreState((state) => state.project);
  const { openModal } = useStoreActions((actions) => actions.modal);

  const deleteHandler = () => {
    deleteProject(id);
  };

  const editHandler = () => {
    openModal();
    projects.map((item) => {
      if (item.id === id) {
        console.log(item);
        getEditData(item);
      }
    });
  };

  return (
    <Card
      sx={{
        height: "100%",
        display: "flex",
        flexDirection: "column",
        margin: "1",
        minWidth: 250,
        maxWidth: 250,
      }}
    >
      <CardHeader title={title} subheader="Tasks: 0" />
      <CardContent>
        <Typography variant="body2" color="text.secondary">
          {`${
            description.length > 100
              ? description.substr(0, 100) + "..."
              : description
          }`}
        </Typography>
      </CardContent>
      <Box sx={{ flexGrow: 1 }}></Box>
      <CardActions disableSpacing>
        <Button variant="outlined" component={RouterLink} to={`/project/${id}`}>
          View
          <VisibilityIcon sx={{ marginLeft: "3px" }} />
        </Button>
        <ExpandMore aria-label="show more">
          <MenuToggle deleteHandler={deleteHandler} editHandler={editHandler} />
        </ExpandMore>
      </CardActions>
    </Card>
  );
};

export default ProjectCard;
