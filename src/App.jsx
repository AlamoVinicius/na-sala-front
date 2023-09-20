import React from "react";

import AppRoutes from "./AppRoutes";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";

import { QueryClient, QueryClientProvider } from "react-query";
import { ReactQueryDevtools } from "react-query/devtools";

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <AppRoutes />
      <ToastContainer autoClose={5000} closeOnClick={true} pauseOnFocusLoss={false} position="top-center" />
      <ReactQueryDevtools />
    </QueryClientProvider>
  );
}

export default App;
