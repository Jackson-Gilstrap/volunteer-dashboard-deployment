import { useFormik } from "formik";
import { useState } from "react";
import axios from "axios";
import "../styles/main.css";

const validate = (values) => {
  const errors = {};
  if (!values.volunteer_code) {
    errors.volunteer_code = "Required";
  } else if (values.volunteer_code.length < 3) {
    errors.volunteer_code = "Code should be at least 3 characters long";
  } else if (!/^[0-9]+$/.test(values.volunteer_code)) {
    errors.volunteer_code = "Code should be numbers";
  }

  return errors;
};

function VolunteerTimeOutForm({ isClockIn }) {
  const [successMessage, setSuccessMessage] = useState("");
  const formik = useFormik({
    initialValues: {
      volunteer_code: "",
    },
    validate,
    onSubmit: async (values, { setSubmitting, resetForm }) => {
      values.eventType = isClockIn ? "clockIn" : "clockOut";
      console.log(values);
      setSubmitting(true);
      try {
        const res = await axios.post(
          "https://volunteer-dashboard-deployment-server.vercel.app/volunteertimeout",
          values
        );
        alert("Form submitted successfully", res.data);
        console.log("Form submitted successfully", res.data);
      } catch (error) {
        setSuccessMessage(`Successfully clocked out ${values.volunteer_code}`);
        console.error(
          "There has been an error submitting the form",
          error.message
        );

        resetForm();
      }

      console.log(JSON.stringify(values, null, 2));
      setSubmitting(false);
    },
  });
  return (
    <>
      <form onSubmit={formik.handleSubmit}>
        <div className="input-container" id="volunteer_code-container">
          <label htmlFor="volunteer_code">Volunteer Code</label>
          <input
            id="volunteer_code"
            name="volunteer_code"
            placeholder="3 digit volunteer code"
            type="text"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.volunteer_code}
          />
          {formik.touched.volunteer_code && formik.errors.volunteer_code ? (
            <span>{formik.errors.volunteer_code}</span>
          ) : null}
        </div>
        <input
          type="hidden"
          name="eventType"
          value={isClockIn ? "clockIn" : "clockOut"}
        />
        <button type="submit" name="submit">
          {isClockIn ? "Clock in" : "Clock Out"}
        </button>
      </form>
      {successMessage && (
        <p style={{ textAlign: "center", color: "limegreen" }}>
          {successMessage}
        </p>
      )}
      <div>
        <ul>
          <li>
            PLease enter your volunteer code that you used to clock in with
          </li>
          <li>
            Once you hit clock out, in ~10 seconds a confirmation will pop up
          </li>
        </ul>
      </div>
    </>
  );
}

export default VolunteerTimeOutForm;
