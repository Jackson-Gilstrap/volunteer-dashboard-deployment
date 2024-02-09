import axios from "axios";
import { useState, useEffect } from "react";
import "../styles/main.css";

const ShowVolunteerWorkSession = () => {
  const [workSessionList, setWorkSessionList] = useState([]);
  const [searchInput, setSearchInput] = useState("");
  const [filteredWorkSessions, setFilteredWorkSession] = useState([]);

  const handleSearchChange = (e) => {
    setSearchInput(e.target.value);
  };
  const calculateTimeDifference = (startTime, endTime) => {
    const startTimeStamp = new Date(startTime).getTime();
    const endTimeStamp = new Date(endTime).getTime();

    const timeDifference = (endTimeStamp - startTimeStamp) / (1000 * 60);
    const hours = Math.floor(timeDifference / 60);
    const minutes = Math.round(timeDifference % 60);

    const formattedTimeDifference = `${hours}:${
      minutes < 10 ? "0" : ""
    }${minutes}`;

    return formattedTimeDifference;
  };

  const calculateTotalMilage = (work_location) => {
    const hunt_to_wick = 1.1;
    const ghsBing_to_wick = 59.1;
    const ghsNorwich_to_wick = 31.5;
    const lauren_to_wick = 7.0;
    const tabernacle_to_wick = 57.5;
    const charlotte_to_wick = 13.5;
    let total_milage;

    if (work_location === "huntington-library") {
      total_milage = hunt_to_wick * 2;
    } else if (work_location === "ghs-binghamton") {
      total_milage = ghsBing_to_wick * 2;
    } else if (work_location === "ghs-norwich") {
      total_milage = ghsNorwich_to_wick * 2;
    } else if (work_location === "laurens-central-school") {
      total_milage = lauren_to_wick * 2;
    } else if (work_location === "tabernacle-baptist-church") {
      total_milage = tabernacle_to_wick * 2;
    } else if (work_location === "charlotte-valley-central-school") {
      total_milage = charlotte_to_wick * 2;
    } else {
      total_milage = 0;
    }

    return total_milage + " " + "miles";
  };

  const calculateDayWorked = (clock_in_time) => {
    let dateString = clock_in_time;
    let newDateStringArr = dateString.split("T");
    let date = newDateStringArr[0];
    let splitDate = date.split("-");
    let newDate = `${splitDate[1]}-${splitDate[2]}-${splitDate[0]}`;
    return newDate;
  };
  const calculateTimePunch = (timestamp) => {
    const date = new Date(timestamp);
    const hours = date.getHours();
    const minutes = date.getMinutes();
    const time = `${hours}:${minutes < 10 ? "0" : ""}${minutes}`;

    return time;
  };

  const getVolunteerWorkSessions = async () => {
    try {
      const res = await axios.get(
        "https://volunteer-dashboard-deployment-server.vercel.app/getvolunteerworksessions"
      );
      const promises = res.data.map(async (work_session_obj) => {
        const {
          work_session_id,
          volunteer_code,
          last_name,
          work_role,
          work_location,
          clock_in_time,
          clock_out_time,
        } = work_session_obj;

        const work_session = {
          session_id: work_session_id,
          code: volunteer_code,
          last_name: last_name,
          role: work_role,
          location: work_location,
          time_in: calculateTimePunch(clock_in_time),
          time_out: calculateTimePunch(clock_out_time),
          day_worked: calculateDayWorked(clock_in_time),
          total_time: calculateTimeDifference(clock_in_time, clock_out_time),
          total_milage: calculateTotalMilage(work_location),
        };
        return work_session;
      });

      //set the state of the work session list to hold work sessions as objects
      const updatedWorkSessionList = await Promise.all(promises);
      setWorkSessionList(updatedWorkSessionList);
      console.log("updated work session list successfully");

      // update filtered list here
      filterWorkSessions(searchInput);
    } catch (error) {
      console.error("failed to fetch work session from server", error.message);
    }
  };

  const filterWorkSessions = (input) => {
    const filteredSessions = workSessionList.filter((work_session) =>
      String(work_session.code).includes(input)
    );

    setFilteredWorkSession(filteredSessions);
  };

  useEffect(() => {
    getVolunteerWorkSessions();
  }, [searchInput]);

  return (
    <>
      <button className="table-load" onClick={getVolunteerWorkSessions}>
        View Work Sessions
      </button>
      <input
        className="search"
        type="text"
        placeholder="Volunteer Code"
        onChange={handleSearchChange}
      />
      <table>
        <thead>
          <tr>
            <th>Session Id</th>
            <th>Code</th>
            <th>Last name</th>
            <th>Role</th>
            <th>Location</th>
            <th>Date Worked</th>
            <th>Total time</th>
            <th>Total milage</th>
            <th>Time in</th>
            <th>Time out</th>
          </tr>
        </thead>
        <tbody>
          {filteredWorkSessions &&
            filteredWorkSessions.map((work_session) => (
              <tr key={work_session.session_id}>
                <td>{work_session.session_id}</td>
                <td>{work_session.code}</td>
                <td>{work_session.last_name}</td>
                <td>{work_session.role}</td>
                <td>{work_session.location}</td>
                <td>{work_session.day_worked}</td>
                <td>{work_session.total_time}</td>
                <td>{work_session.total_milage}</td>
                <td>{work_session.time_in}</td>
                <td>{work_session.time_out}</td>
              </tr>
            ))}
        </tbody>
      </table>
    </>
  );
};

export default ShowVolunteerWorkSession;
