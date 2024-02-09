import CreateVolunteerForm from "../components/CreateVolunteerForm";
import "../styles/pages.css";
const CreateVolunteer = () => {
  return (
    <>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          margin: "auto",
        }}
      >
        <header>
          <h1>Create Volunteer</h1>
        </header>

        <CreateVolunteerForm />
      </div>
    </>
  );
};

export default CreateVolunteer;
