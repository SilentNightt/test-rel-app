import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { createBrowserRouter } from "react-router-dom";
import Layout from "./pages/Blog/components/Layout";
import EroorPage from "./pages/Blog/EroorPage";

// const route = createBrowserRouter([
//   {
//     path: "/",
//     element: <Layout />,
//     errorElement: <EroorPage />,
//     children: [],
//   },
// ]);
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<App />);
