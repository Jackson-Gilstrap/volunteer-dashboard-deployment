//current date function

const getCurrentDate = () => {
  const today = new Date();
  const year = today.getFullYear();
  const month = String(today.getMonth() + 1).padStart(2, "0");
  const day = String(today.getDate()).padStart(2, "0");

  const current_date_string = `${year}-${month}-${day}`;
  return current_date_string;
};

//current time function

const getCurrentTime = () => {
  const time = new Date();
  const hours = String(time.getHours()).padStart(2, "0");
  const minutes = String(time.getMinutes()).padStart(2, "0");
  time.get;
  const current_time_string = `${hours}:${minutes}`;
  return current_time_string;
};

module.exports = {
  getCurrentDate,
  getCurrentTime,
};
