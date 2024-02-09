import ShowVolunteers from "../components/ShowVolunteers";
import ShowVolunteerWorkSession from "../components/ShowVolunteerWorkSession";
const Records = () => {
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
        <div className="records_flex">
          <ShowVolunteers />
          <ShowVolunteerWorkSession />
        </div>
      </div>
    </>
  );
};

export default Records;
