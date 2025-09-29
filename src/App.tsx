import React from "react";
import AppRoutes from "./routes";
import { BrowserRouter } from "react-router-dom";
import Loading from "./components/Loading";
import StackAlert from "./components/StackAlert";

const App: React.FC = () => {
  return (
    <BrowserRouter>
      <AppRoutes />
      <Loading  />
      <StackAlert />
    </BrowserRouter>
  );
};

export default App;
