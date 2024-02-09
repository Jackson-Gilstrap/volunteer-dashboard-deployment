import VolunteerTimeInForm from "../components/VolunteerTimeInForm";
import "../styles/pages.css";
import { useState, useEffect } from "react";
const VolunteerClockIn = () => {
  const [currentTime, setCurrentTime] = useState("");

  useEffect(() => {
    const interval = setInterval(() => {
      const time = new Date();
      const hours = String(time.getHours()).padStart(2, "0");
      const minutes = String(time.getMinutes()).padStart(2, "0");
      const seconds = String(time.getSeconds()).padStart(2, "0");
      const time_string = `${hours}:${minutes}:${seconds}`;
      setCurrentTime(time_string);
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const isClockIn = true;
  return (
    <>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          // position: "relative",
          // left: "10%",
          margin: "auto",
        }}
      >
        <header>
          <h1>Volunteer Clock In</h1>
        </header>

        <h2 style={{ textAlign: "center" }}>Current Time {currentTime}</h2>

        <VolunteerTimeInForm isClockIn={isClockIn} />
      </div>
    </>
  );
};

export default VolunteerClockIn;
