import * as React from "react";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Fade from "@mui/material/Fade";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

const MenuToggle = ({ deleteHandler, editHandler }) => {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    editHandler();
    setAnchorEl(null);
  };

  return (
    <div>
      <MoreVertIcon
        id="fade-button"
        aria-controls={open ? "fade-menu" : undefined}
        aria-expanded={open ? "true" : undefined}
        onClick={handleClick}
      />

      <Menu
        id="fade-menu"
        MenuListProps={{
          "aria-labelledby": "fade-button",
        }}
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        TransitionComponent={Fade}
      >
        <MenuItem onClick={handleClose}>
          Edit{" "}
          <EditIcon
            sx={{ fontSize: "18px", marginLeft: "5px" }}
            color={"info"}
          />{" "}
        </MenuItem>
        <MenuItem onClick={() => deleteHandler()}>
          Delete{" "}
          <DeleteIcon
            sx={{ fontSize: "18px", marginLeft: "5px" }}
            color={"error"}
          />
        </MenuItem>
      </Menu>
    </div>
  );
};

export default MenuToggle;
