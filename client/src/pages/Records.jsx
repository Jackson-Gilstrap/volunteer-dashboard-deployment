import ShowVolunteers from "../components/ShowVolunteers";
import ShowVolunteerWorkSession from "../components/ShowVolunteerWorkSession";
import { useState } from "react";
import "../styles/main.css";
const Records = () => {
  const [accessCode, setAccessCode] = useState("");
  const [authStatus, setAuthStatus] = useState(false);

  const adminCode = "sc2024";

  const handleChange = (e) => {
    setAccessCode(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (accessCode.toLowerCase() === adminCode.toLowerCase()) {
      setAuthStatus(true);
    } else {
      alert("Access denied wrong code");
    }
    setAccessCode("");
  };

  return (
    <>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          margin: "auto",
        }}
      >
        {authStatus ? (
          <div className="records_flex">
            <ShowVolunteers />
            <ShowVolunteerWorkSession />
          </div>
        ) : (
          <form onSubmit={handleSubmit}>
            <label htmlFor="authCode">
              Admin Code:{" "}
              <input
                type="password"
                name="authCode"
                value={accessCode}
                onChange={handleChange}
              />
            </label>

            <button type="submit">Submit</button>
          </form>
        )}
      </div>
    </>
  );
};

export default Records;
