import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";
import { QueryClient, QueryClientProvider, useQuery } from "react-query";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import RouteSearch from "./pages/route-search";
import Editor from "./pages/editor";

const queryClient = new QueryClient();
const router = createBrowserRouter([
  { path: "/", element: <App /> },
  {
    path: "route-search",
    element: <RouteSearch />,
  },
  { path: "editor", element: <Editor /> },
]);

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
    </QueryClientProvider>
  </React.StrictMode>
);
