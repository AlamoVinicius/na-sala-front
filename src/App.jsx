import React from "react";

import AppRoutes from "./AppRoutes";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";

function App() {
  return (
    <div>
      <AppRoutes />
      <ToastContainer autoClose={5000} closeOnClick={true} pauseOnFocusLoss={false} position="top-center" />
    </div>
  );
}

export default App;
