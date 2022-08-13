import { Stack, Typography, Container } from "@mui/material";

const NotFound = () => {
  return (
    <Stack>
      <Container maxWidth={"lg"} sx={{ my: 16 }}>
        <Typography variant="h2" align="center">
          404 Not Found
        </Typography>
      </Container>
    </Stack>
  );
};

export default NotFound;
