import React, { StrictMode } from "react";
import ReactDOM from "react-dom/client";
import {
  Outlet,
  RouterProvider,
  Link,
  Router,
  Route,
  RootRoute,
} from "@tanstack/react-router";
// import { TanStackRouterDevtools } from "@tanstack/router-devtools";
import App from "./App.jsx";
import "./index.css";

const TanStackRouterDevtools =
  process.env.NODE_ENV === "production"
    ? () => null // Render nothing in production
    : React.lazy(() =>
        // Lazy load in development
        import("@tanstack/router-devtools").then((res) => ({
          default: res.TanStackRouterDevtools,
          // For Embedded Mode
          // default: res.TanStackRouterDevtoolsPanel
        }))
      );

// create a root route
const rootRoute = new RootRoute({
  component: Root,
});

function Root() {
  return (
    <>
      <div>
        <Link to="/">Home</Link> <Link to="/about">About</Link>{" "}
        <Link to="/template">Template</Link>
      </div>
      <hr />
      <Outlet />
      <TanStackRouterDevtools />
    </>
  );
}

// create an index route

const indexRoute = new Route({
  getParentRoute: () => rootRoute,
  path: "/",
  component: Index,
});

function Index() {
  return (
    <div>
      <h3>Welcome Home!</h3>
    </div>
  );
}

// create an about route

const aboutRoute = new Route({
  getParentRoute: () => rootRoute,
  path: "/about",
  component: About,
});

function About() {
  return <div>Hello from About!</div>;
}

const templateRoute = new Route({
  getParentRoute: () => rootRoute,
  path: "/template",
  component: App,
});

// Create the route tree using your routes
const routeTree = rootRoute.addChildren([
  indexRoute,
  aboutRoute,
  templateRoute,
]);

// Create the router using your route tree
const router = new Router({ routeTree });

// Register your router for maximum type safety
// declare module '@tanstack/react-router' {
//   interface Register {
//     router: typeof router
//   }
// }

// Render app
const rootElement = document.getElementById("root");
if (!rootElement.innerHTML) {
  const root = ReactDOM.createRoot(rootElement);
  root.render(
    <StrictMode>
      <RouterProvider router={router} />
    </StrictMode>
  );
}
