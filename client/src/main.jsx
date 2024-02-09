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
      <Route path="/clockIn" element={<VolunteerClockIn />} />
      <Route path="/clockOut" element={<VolunteerClockOut />} />
      <Route path="/records" element={<Records />} />
    </Route>
  )
);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
