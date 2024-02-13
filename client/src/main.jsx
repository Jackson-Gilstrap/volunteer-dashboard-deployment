import React from "react";
import ReactDOM from "react-dom/client";
import {
  createBrowserRouter,
  RouterProvider,
  Route,
  createRoutesFromElements,
} from "react-router-dom";
import App from "./App";
import CreateVolunteer from "./pages/CreateVolunteer";
import VolunteerClockIn from "./pages/VolunteerClockIn";
import VolunteerClockOut from "./pages/VolunteerClockOut";
import Records from "./pages/Records";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route element={<App />}>
      <Route path="/" element={<CreateVolunteer />} />
      <Route path="/volunteertimein" element={<VolunteerClockIn />} />
      <Route path="/volunteertimeout" element={<VolunteerClockOut />} />
      <Route path="/records" element={<Records />} />
    </Route>
  )
);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
