import React from "react";
import AppRoutes from "./routes";
import { BrowserRouter } from "react-router-dom";
import Loading from "./components/Loading";

const App: React.FC = () => {
  return (
    <BrowserRouter>
      <AppRoutes />
      <Loading  />
    </BrowserRouter>
  );
};

export default App;
