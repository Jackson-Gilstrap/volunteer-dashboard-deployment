import { useState } from "react";
import { useFormik } from "formik";
import axios from "axios";
import "../styles/main.css";

const UpdateVolunteerModal = ({
  type,
  volunteer_code,
  first_name,
  last_name,
  color,
}) => {
  const [isOpen, setIsOpen] = useState(false);

  const openModal = () => {
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
  };

  //formik form
  const formik = useFormik({
    initialValues: {
      volunteer_code: volunteer_code,
      first_name: "",
      last_name: "",
    },
    onSubmit: async (values) => {
      try {
        const res = await axios.post(
          "https://volunteer-dashboard-deployment-server.vercel.app/updatevolunteer",
          values
        );
        console.log(res.status);
        closeModal();
      } catch (error) {
        console.error(
          error.message,
          "There has been an error updating the volunteer"
        );
      }
    },
  });
  return (
    <div>
      <button
        onClick={openModal}
        style={{
          margin: "auto",
          backgroundColor: `${color}`,
          fontWeight: "bold",
          padding: "5px",
          minWidth: "50px",
          maxWidth: "80px",
        }}
      >
        {type}
      </button>

      {isOpen && (
        <div className="modal-overlay">
          <div className="modal">
            <div className="modal-header">
              <h2>Update Volunteer</h2>
              <button
                onClick={closeModal}
                style={{
                  backgroundColor: "white",
                  border: "1px solid black",
                  borderRadius: "100px",
                  margin: "auto 10px auto auto",
                  textAlign: "right",
                  minWidth: "25px",
                  maxWidth: "30px",
                }}
              >
                X
              </button>
            </div>
            <div className="modal-body">
              <form onSubmit={formik.handleSubmit}>
                <div className="input-container">
                  <label htmlFor="volunteer_code">Code</label>
                  <input
                    id="volunteer_code"
                    name="volunteer_code"
                    type="text"
                    value={volunteer_code}
                    disabled
                  />
                </div>
                <div className="input-container" id="first_name-container">
                  <label htmlFor="first_name">First Name</label>
                  <input
                    id="first_name"
                    name="first_name"
                    placeholder={first_name}
                    type="text"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.first_name}
                  />
                </div>
                <div className="input-container" id="last_name-container">
                  <label htmlFor="last_name">Last Name</label>
                  <input
                    id="last_name"
                    name="last_name"
                    placeholder={last_name}
                    type="text"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.last_name}
                  />
                </div>
                <button
                  type="submit"
                  name="submit"
                  style={{
                    margin: "auto",
                    fontWeight: "bold",
                    padding: "5px",
                    minWidth: "50px",
                    maxWidth: "80px",
                    backgroundColor: `${color}`,
                  }}
                >
                  Update
                </button>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default UpdateVolunteerModal;
