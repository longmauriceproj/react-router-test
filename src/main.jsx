import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Root, {
  loader as rootLoader,
  action as rootAction,
} from "./routes/root";
import ErrorPage from "./error-page";
import Application, {
  loader as applicationLoader,
  action as applicationAction,
} from "./routes/application";
import EditApplication, { action as editAction } from "./routes/edit";
import { action as destroyAction } from "./routes/destroy";
import Index, { loader as indexLoader } from "./routes/index";
import "./index.css";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    errorElement: <ErrorPage />,
    loader: rootLoader,
    action: rootAction,
    children: [
      {
        errorElement: <ErrorPage />,
        children: [
          { index: true, element: <Index />, loader: indexLoader },
          {
            path: "applications/:applicationId",
            element: <Application />,
            loader: applicationLoader,
            action: applicationAction,
          },
          {
            path: "applications/:applicationId/edit",
            element: <EditApplication />,
            loader: applicationLoader,
            action: editAction,
          },
          {
            path: "applications/:applicationId/destroy",
            action: destroyAction,
            errorElement: <ErrorPage />,
          },
        ],
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
