import { useFormik } from "formik";
import axios from "axios";
import { useState, useEffect } from "react";
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

  if (!values.work_location) {
    errors.work_location = "Required";
  }

  if (!values.work_role) {
    errors.work_role = "Required";
  }

  return errors;
};
const VolunteerTimeInForm = ({ isClockIn }) => {
  const [successMessage, setSuccessMessage] = useState("");
  const formik = useFormik({
    initialValues: {
      volunteer_code: "",
      work_location: "",
      work_role: "",
    },
    validate,
    onSubmit: async (values, { setSubmitting, resetForm }) => {
      values.eventType = isClockIn ? "clockIn" : "clockOut";
      console.log(values);
      setSubmitting(true);
      try {
        const res = await axios.post(
          "https://volunteer-dashboard-deployment-server.vercel.app/volunteertimein",
          values
        );
        console.log(res.status);
        if (!res) {
          console.log(
            "There was no response from the server and the form has not been submitted"
          );
        } else {
          setSuccessMessage(`Successfully clocked in`);
          resetForm();
        }
      } catch (error) {
        console.error(
          "There has been an error submitting the form",
          error.message
        );
      }
      setSubmitting(false);
      console.log(JSON.stringify(values, null, 2));
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
            placeholder="123"
            type="text"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.volunteer_code}
          />
          {formik.touched.volunteer_code && formik.errors.volunteer_code ? (
            <span>{formik.errors.volunteer_code}</span>
          ) : null}
        </div>
        <div className="input-container" id="work_location-container">
          <label htmlFor="work_location">Work Location</label>
          <select
            id="work_location"
            name="work_location"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values._work_location}
          >
            {formik.touched.work_location && formik.errors.work_location ? (
              <option>{formik.errors.work_location}</option>
            ) : null}
            <option value="null">Select one</option>
            <option value="hartwick-college">Hartwick College</option>
            <option value="huntington-library">Huntington Library</option>
            <option value="ghs-binghamton">
              GHS Federal Credit Union @ Binghamton
            </option>
            <option value="ghs-norwich">
              GHS Federal Credit Union @ Norwich
            </option>
            <option value="laurens-central-school">
              Laurens Central School
            </option>
            <option value="tabernacle-baptist-church">
              Tabernacle Baptist Church
            </option>
            <option value="charlotte-valley-central-school">
              Charlotte Valley Central School
            </option>
          </select>
        </div>
        <div className="input-container" id="work_role-container">
          <label htmlFor="work_role">Work Role</label>
          <select
            id="work_role"
            name="work_role"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.work_role}
          >
            {formik.touched.work_role && formik.errors.work_role ? (
              <option>{formik.errors.work_role}</option>
            ) : null}
            <option value="null">Select one</option>
            <option value="client_supported">Client Supporter</option>
            <option value="tax_preparer">Tax Preparer</option>
            <option value="tax-quality-reviewer">Tax Quality Reviewer</option>
            <option value="marketing">Marketing</option>
            <option value="information-technology">IT</option>
          </select>
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
    </>
  );
};

export default VolunteerTimeInForm;
