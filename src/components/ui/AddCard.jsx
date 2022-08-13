import Card from "@mui/material/Card";
import Typography from "@mui/material/Typography";
import AddIcon from "@mui/icons-material/Add";
import { CardActionArea } from "@mui/material";
import { useStoreActions } from "easy-peasy";

const AddCard = ({ text, width }) => {
  const { openModal } = useStoreActions((actions) => actions.modal);
  return (
    <Card>
      <CardActionArea
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          height: "100%",
          minWidth: width,
        }}
        onClick={() => openModal()}
      >
        <Typography my={2} variant={"h1"}>
          <AddIcon sx={{ fontSize: "70px", color: "gray" }} />
        </Typography>

        <Typography variant="h6" gutterBottom align="center" my={2}>
          {text}
        </Typography>
      </CardActionArea>
    </Card>
  );
};

export default AddCard;
