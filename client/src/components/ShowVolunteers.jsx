import axios from "axios";
import { useState } from "react";
import UpdateVolunteerModal from "./UpdateVolunteerModal";
import "../styles/main.css";

const ShowVolunteers = () => {
  const [volunteerList, setVolunteerList] = useState([]);
  const getVolunteers = async () => {
    try {
      const res = await axios.get("http://localhost:3006/api/v1/volunteers");
      const promises = res.data.map(async (volunteer_obj) => {
        const { volunteer_id, volunteer_code, first_name, last_name } =
          volunteer_obj;
        const volunteer = {
          id: volunteer_id,
          code: volunteer_code,
          name: `${first_name} ${last_name}`,
          getFirstName: function () {
            return first_name;
          },
          getLastName: function () {
            return last_name;
          },
        };
        return volunteer;
      });

      const updatedVolunteerList = await Promise.all(promises);
      setVolunteerList(updatedVolunteerList);
      console.log("updated volunteer list successfully");
    } catch (error) {
      console.error("Connection to server failed");
    }
  };
  // const getFirstName = async (volunteer) => {
  //   vol_arr = volunteer.name.split(" ");
  //   return vol_arr[0];
  // };
  // const getLastName = async (volunteer) => {
  //   vol_arr = volunteer.name.split(" ");
  //   return vol_arr[1];
  // };
  return (
    <>
      <button className="table-load" onClick={getVolunteers}>
        View Volunteers
      </button>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Code</th>
            <th>Name</th>
            <th>Update</th>
            <th>Delete</th>
          </tr>
        </thead>
        <tbody>
          {volunteerList &&
            volunteerList.map((volunteer) => (
              <tr key={volunteer.id}>
                <td>{volunteer.id}</td>
                <td>{volunteer.code}</td>
                <td>{volunteer.name}</td>
                <td style={{ textAlign: "center" }}>
                  <UpdateVolunteerModal
                    type="Update"
                    volunteer_code={volunteer.code}
                    first_name={volunteer.getFirstName()}
                    last_name={volunteer.getLastName()}
                    color={"gold"}
                  />
                </td>

                <td style={{ textAlign: "center" }}>
                  <button
                    style={{
                      margin: "auto",
                      backgroundColor: "orangered",
                      fontWeight: "bold",
                      padding: "5px",
                      minWidth: "50px",
                      maxWidth: "80px",
                    }}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
        </tbody>
      </table>
    </>
  );
};

export default ShowVolunteers;
