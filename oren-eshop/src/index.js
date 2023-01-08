import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import Main from "./Main";
import { BrowserRouter } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "react-query";

const root = ReactDOM.createRoot(document.getElementById("root"));
const queryClient = new QueryClient();

root.render(
  <React.StrictMode>
    <BrowserRouter>
      <QueryClientProvider client={queryClient}>
        <Main />
      </QueryClientProvider>
    </BrowserRouter>
  </React.StrictMode>
);
