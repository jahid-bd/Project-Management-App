import { BrowserRouter, Routes, Route } from "react-router-dom";
import NavBar from "./components/navbar";
import { CssBaseline, Stack } from "@mui/material";
import HomePage from "./components/pages/HomePage";
import NotFound from "./components/pages/NotFound";
import ProjectItemPage from "./components/pages/ProjectItemPage";

const App = () => {
  return (
    <BrowserRouter>
      <CssBaseline />
      <Stack>
        <NavBar />
      </Stack>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/project/:projectId" element={<ProjectItemPage />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
