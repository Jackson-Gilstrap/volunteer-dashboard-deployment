const express = require("express");
const cors = require("cors");
const pool = require("./databases");
const app = express();
const { getCurrentDate, getCurrentTime } = require("./utility");

//middleware
const corsOptions = {
  origin: "https://volunteer-dashboard-deployment-client.vercel.app",
};
app.use(cors());
app.use(express.json());

//ROUTES
//create volunteer
app.post("/createvolunteer", async (req, res) => {
  try {
    //destructing the form values
    const { volunteer_code, first_name, last_name } = req.body;

    //creating volunteer query
    const create_volunteer = await pool.query(
      "INSERT INTO Volunteers(volunteer_code, first_name, last_name) VALUES($1,$2,$3)",
      [volunteer_code, first_name, last_name]
    );
    //success message
    res.status(200).json({ message: "Volunteer added successfully" });
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
});
//show all volunteers
app.get("/viewvolunteers", async (req, res) => {
  try {
    const volunteers = await pool.query(
      "SELECT * FROM volunteers ORDER BY volunteer_code"
    );
    res.json(volunteers.rows);
  } catch (err) {
    console.error(err.message);
  }
});
// post volunteer clock in or clock out based on event type in form.
app.post("/volunteertimein", async (req, res) => {
  try {
    console.log("successfully connected api");
    const { volunteer_code, work_location, work_role } = req.body;
    const date = getCurrentDate();
    const time = getCurrentTime();
    const date_time_string = `${date}` + " " + `${time}`;
    console.log("pre query");
    //INSERT QUERY TO ADD THE CLOCK IN TIME TO THE DATABASE THE ONLY COLUMN OMITTED IS CLOCK_OUT_TIME
    const volunteer_clock_in = await pool.query(
      "INSERT INTO Worksession (volunteer_code, work_location, work_role, clock_in_time) VALUES($1,$2,$3,$4) RETURNING *",
      [volunteer_code, work_location, work_role, date_time_string]
    );
    console.log("post query successfully clocked in");
  } catch (error) {
    console.error("connection to api failed ", error);
  }
});

app.post("/volunteertimeout", async (req, res) => {
  try {
    const { volunteer_code } = req.body;
    const date = getCurrentDate();
    const time = getCurrentTime();
    const date_time_string = `${date}` + " " + `${time}`;
    // an UPDATE QUERY TO ADD THE CLOCK OUT TIME TO THE SPECIFIC CLOCK IN TIME BASED ON VOLUNTEER CODE
    const volunteer_clock_out = await pool.query(
      `UPDATE Worksession SET clock_out_time = ($1) WHERE volunteer_code = ($2) AND clock_out_time IS NULL`,
      [date_time_string, volunteer_code]
    );
    console.log("post query successfully clocked out");
  } catch (error) {
    console.error("connection to api failed ", error);
  }
});

//update volunteer

app.post("/updatevolunteer", async (req) => {
  try {
    const { volunteer_code, first_name, last_name } = req.body;
    console.log("recieved data");
    //update query for volunteer_first name
    if (first_name) {
      const update_volunteer_first_name = await pool.query(
        `UPDATE volunteers SET first_name = ($1) WHERE volunteer_code = ($2)`,
        [first_name, volunteer_code]
      );
      console.log("updated first name");
    }
    if (last_name) {
      const update_volunteer_last_name = await pool.query(
        `UPDATE volunteers SET last_name = ($1) WHERE volunteer_code =($2)`,
        [last_name, volunteer_code]
      );
      console.log("updated last name");
    }
  } catch (error) {
    console.error(error.message);
  }
});
// get all work sessions

app.get("/getvolunteerworksessions", async (req, res) => {
  try {
    const work_sessions = await pool.query(
      "SELECT * FROM Volunteers JOIN Worksession ON Volunteers.volunteer_code = Worksession.volunteer_code"
    );
    res.json(work_sessions.rows);
  } catch (error) {
    console.error(error.message);
  }
});

const port = 5000;
app.listen(port, () => console.log(`server has started on port ${port}`));
