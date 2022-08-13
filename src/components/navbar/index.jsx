import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import { Stack, Container } from "@mui/material";
import { Link as RouterLink } from "react-router-dom";
import Link from "@mui/material/Link";

const NavBar = () => {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar color="default" sx={{ py: 1, position: "static" }}>
        <Container maxWidth={"lg"}>
          <Toolbar>
            <Stack sx={{ flexGrow: 1 }}>
              <Link
                to={"/"}
                component={RouterLink}
                sx={{ textDecoration: "none", color: "black" }}
              >
                <Typography variant="h4" component="div">
                  Project Management
                </Typography>
              </Link>
              <Typography variant="body1">By Stack Learner</Typography>
            </Stack>
          </Toolbar>
        </Container>
      </AppBar>
    </Box>
  );
};

export default NavBar;
