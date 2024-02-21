require("dotenv").config();
const express = require("express");
const morgan = require("morgan");
const db = require("./db/index.js");
const app = express();

const cors = require("cors");
// const pool = require("./databases");
const { getCurrentDate, getCurrentTime } = require("./utility");

//middleware
app.use(morgan("dev"));
app.use(express.json());

//ROUTES

//GET A ALL VOLUNTEERS
app.get("/api/v1/volunteers", async (req, res) => {
  try {
    const results = await db.query("SELECT * FROM volunteers");
    console.log(results.rows);
    res.status(200).json({
      status: "success",
      results: results.rows.length,
      data: {
        volunteers: results.rows,
      },
    });
  } catch (error) {
    console.error(error.message);
  }
});
//GET A VOLUNTEER
app.get("/api/v1/volunteers/:volunteer_code", async (req, res) => {
  // console.log(req.params.volunteer_code);
  try {
    const results = await db.query(
      "SELECT * FROM volunteers WHERE volunteer_code = ($1)",
      [req.params.volunteer_code]
    );
    res.status(200).json({
      status: "success",
      data: {
        volunteer: results.rows[0],
      },
    });
    console.log(results);
  } catch (err) {
    console.error(err.message);
  }
});

//CREATE VOLUNTEER
app.post("/api/v1/volunteers", async (req, res) => {
  const { volunteer_code, first_name, last_name } = req.body;

  try {
    const results = await db.query(
      "INSERT INTO volunteers (volunteer_code, first_name, last_name) VALUES($1,$2,$3) RETURNING *",
      [volunteer_code, first_name, last_name]
    );
    res.status(201).json({
      status: "success",
      data: {
        results: results.rows[0],
      },
    });
  } catch (err) {
    console.error(err.message);
  }
});

//UPDATE VOLUNTEER
app.put("/api/v1/volunteers/:volunteer_code", async (req, res) => {
  console.log(req.params);
  const { first_name, last_name } = req.body;
  try {
    const results = await db.query(
      "UPDATE volunteers SET first_name = $2, last_name = $3 WHERE volunteer_code = $1 RETURNING *",
      [req.params.volunteer_code, first_name, last_name]
    );
    res.status(201).json({
      status: "success",
      results: results.rows[0],
    });
  } catch (err) {
    console.error(err.message);
  }
});

//DELETE VOLUNTEER
app.delete("/api/v1/volunteers/:volunteer_code", async (req, res) => {
  const results = await db.query(
    "DELETE FROM volunteers WHERE volunteer_code = $1",
    [req.params.volunteer_code]
  );
  res.status(204).json({
    status: "success",
  });
});

//GET ALL WORKSESSIONS FOR A VOLUNTEER

app.get("/api/v1/worksessions/:volunteer_code", async (req, res) => {
  try {
    const results = db.query(
      "SELECT * FROM worksession WHERE volunteer_code = $1 RETURNING *",
      [req.params.volunteer_code]
    );

    res.status(200).json({
      status: "success",
      data: {
        results: results.rows,
      },
    });
  } catch (err) {
    console.log(err.message);
  }
});

//CREATE A WORKSESSION

const port = process.env.PORT || 3001;
app.listen(port, () => console.log(`server has started on port ${port}`));

// // post volunteer clock in or clock out based on event type in form.
// app.post("/volunteertimein", async (req, res) => {
//   try {
//     console.log("successfully connected api");
//     const { volunteer_code, work_location, work_role } = req.body;
//     const date = getCurrentDate();
//     const time = getCurrentTime();
//     const date_time_string = `${date}` + " " + `${time}`;
//     console.log("pre query");
//     //INSERT QUERY TO ADD THE CLOCK IN TIME TO THE DATABASE THE ONLY COLUMN OMITTED IS CLOCK_OUT_TIME
//     const volunteer_clock_in = await pool.query(
//       "INSERT INTO Worksession (volunteer_code, work_location, work_role, clock_in_time) VALUES($1,$2,$3,$4) RETURNING *",
//       [volunteer_code, work_location, work_role, date_time_string]
//     );
//     console.log("post query successfully clocked in");
//   } catch (error) {
//     console.error("connection to api failed ", error);
//   }
// });

// app.post("/volunteertimeout", async (req, res) => {
//   try {
//     const { volunteer_code } = req.body;
//     const date = getCurrentDate();
//     const time = getCurrentTime();
//     const date_time_string = `${date}` + " " + `${time}`;
//     // an UPDATE QUERY TO ADD THE CLOCK OUT TIME TO THE SPECIFIC CLOCK IN TIME BASED ON VOLUNTEER CODE
//     const volunteer_clock_out = await pool.query(
//       `UPDATE Worksession SET clock_out_time = ($1) WHERE volunteer_code = ($2) AND clock_out_time IS NULL`,
//       [date_time_string, volunteer_code]
//     );
//     console.log("post query successfully clocked out");
//   } catch (error) {
//     console.error("connection to api failed ", error);
//   }
// });

// //update volunteer

// app.post("/updatevolunteer", async (req) => {
//   try {
//     const { volunteer_code, first_name, last_name } = req.body;
//     console.log("recieved data");
//     //update query for volunteer_first name
//     if (first_name) {
//       const update_volunteer_first_name = await pool.query(
//         `UPDATE volunteers SET first_name = ($1) WHERE volunteer_code = ($2)`,
//         [first_name, volunteer_code]
//       );
//       console.log("updated first name");
//     }
//     if (last_name) {
//       const update_volunteer_last_name = await pool.query(
//         `UPDATE volunteers SET last_name = ($1) WHERE volunteer_code =($2)`,
//         [last_name, volunteer_code]
//       );
//       console.log("updated last name");
//     }
//   } catch (error) {
//     console.error(error.message);
//   }
// });
// // get all work sessions

// app.get("/getvolunteerworksessions", async (req, res) => {
//   try {
//     const work_sessions = await pool.query(
//       "SELECT * FROM Volunteers JOIN Worksession ON Volunteers.volunteer_code = Worksession.volunteer_code"
//     );
//     res.json(work_sessions.rows);
//   } catch (error) {
//     console.error(error.message);
//   }
// });
