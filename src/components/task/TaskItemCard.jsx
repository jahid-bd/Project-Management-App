import { useStoreActions, useStoreState } from "easy-peasy";
import { styled } from "@mui/material/styles";
import { Link as RouterLink } from "react-router-dom";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import { Button, Box, Stack } from "@mui/material";
import VisibilityIcon from "@mui/icons-material/Visibility";
import MenuToggle from "../ui/MenuToggle";
import AddTask from "./AddTask";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { useState } from "react";
import { useEffect } from "react";
import TaskAltIcon from "@mui/icons-material/TaskAlt";
import AutorenewIcon from "@mui/icons-material/Autorenew";
import CheckBoxOutlineBlankIcon from "@mui/icons-material/CheckBoxOutlineBlank";
import SubTaskCard from "./SubTaskCard";
import SubtaskInput from "./SubtaskInput";
import shortid from "shortid";

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

const TaskItemCard = ({ id, title, dueDate, status, assignee }) => {
  const { deleteTask, getEditData, statusUpdate, addSubTask } = useStoreActions(
    (actions) => actions.task
  );
  const { tasks, subTasks } = useStoreState((state) => state.task);

  const { openModal } = useStoreActions((actions) => actions.modal);
  const [newStatus, setNewStatus] = useState(status);

  const [inputDisplay, setInputDisplay] = useState(false);
  const [inputState, setInputState] = useState("");

  const addTaskHandler = () => {
    setInputDisplay(true);
  };

  const filteredSubTasks = () => {
    const arr = [];
    subTasks.map((item) => {
      if (item.taskId === id) {
        arr.push(item);
      }
      return item;
    });
    return arr;
  };

  const submitTaskHandler = () => {
    if (inputState) {
      console.log(inputState);
      const taskObj = {
        id: shortid.generate(),
        taskId: id,
        text: inputState,
        status: "todo",
      };
      addSubTask({ ...taskObj });
      setInputState("");
      setInputDisplay(false);
    } else {
      alert("Invalid input field!");
    }
  };

  const subTaskInputHandler = (e) => {
    setInputState(e.target.value);
  };

  const deleteHandler = () => {
    deleteTask(id);
  };

  const editHandler = () => {
    openModal();
    tasks.map((item) => {
      if (item.id === id) {
        getEditData(item);
      }
    });
  };

  const handleChange = (e) => {
    setNewStatus(e.target.value);
  };

  useEffect(() => {
    statusUpdate({ status: newStatus, id });
  }, [newStatus]);

  const statusIcons = () => {
    const style = { marginLeft: "4px", marginBottom: "-5px", fontSize: "20px" };
    switch (newStatus) {
      case "todo":
        return <CheckBoxOutlineBlankIcon sx={style} color={"info"} />;
      case "inprogress":
        return <AutorenewIcon sx={style} color={"warning"} />;
      case "completed":
        return <TaskAltIcon sx={style} color={"success"} />;
      default:
        return "";
    }
  };

  return (
    <Card
      sx={{
        height: "100%",
        display: "flex",
        flexDirection: "column",
        margin: "1",
        minWidth: 300,
      }}
    >
      <CardHeader
        title={title}
        subheader={
          <Stack display={"flex"} flex={"column"} alignItems={"left"}>
            <Typography>
              <b>Due Date: </b>
              {dueDate}
            </Typography>
            <Typography>
              <b>Assignee: </b>
              {assignee}
            </Typography>
            <Typography>
              <b>Status: </b>
              {status} <span>{statusIcons()}</span>
            </Typography>
          </Stack>
        }
      />

      <CardContent>
        <Typography variant="body2" color="text.secondary">
          {subTasks.length > 0 &&
            filteredSubTasks().map((item) => (
              <SubTaskCard text={item.text} id={item.id} status={item.status} />
            ))}
          {inputDisplay && (
            <SubtaskInput
              submitTaskHandler={submitTaskHandler}
              subTaskInputHandler={subTaskInputHandler}
              value={inputState}
            />
          )}
          <AddTask addTaskHandler={addTaskHandler} />
        </Typography>
      </CardContent>
      <Box sx={{ flexGrow: 1 }}></Box>
      <CardActions disableSpacing>
        <FormControl sx={{ m: 1, minWidth: 100 }} size="small">
          <InputLabel id="statusUpdate">Status</InputLabel>
          <Select
            labelId="statusUpdate"
            id="statusUpdate"
            label="Status"
            value={newStatus}
            onChange={handleChange}
          >
            <MenuItem value={"todo"}>Todo</MenuItem>
            <MenuItem value={"inprogress"}>Inprogress</MenuItem>
            <MenuItem value={"completed"}>Completed</MenuItem>
          </Select>
        </FormControl>
        <ExpandMore aria-label="show more">
          <MenuToggle deleteHandler={deleteHandler} editHandler={editHandler} />
        </ExpandMore>
      </CardActions>
    </Card>
  );
};

export default TaskItemCard;
