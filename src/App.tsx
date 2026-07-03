import React from "react";
import AppRoutes from "./routes";
import { BrowserRouter } from "react-router-dom";
import Loading from "./components/Loading";
import StackAlert from "./components/StackAlert";
import { useLanguage } from "./hooks/useLanguage";
import { CssBaseline } from "@mui/material";

const App: React.FC = () => {
  useLanguage();
  return (
    <BrowserRouter>
      <CssBaseline />
      <AppRoutes />
      <Loading  />
      <StackAlert />
    </BrowserRouter>
  );
};

export default App;
