const express = require("express");
const workoutsRoute = require("./v1/routes/workoutRoute");


const app = express();
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

app.use("/api/v1/wotkouts", workoutsRoute);
