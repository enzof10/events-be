const express = require("express");
const workoutsRoute = require("./v1/routes/workoutRoute");
const tasksRoute = require("./v1/routes/taskRoutes");
const usersRoute = require("./v1/routes/userRoutes");
const loginRoute = require("./v1/routes/loginRoute");


const app = express();
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

const bodyParser = require('body-parser')


app.use(express.json()) // for parsing application/json
app.use("/api/v1/wotkouts", workoutsRoute);
app.use("/api/v1/tasks", tasksRoute);
app.use("/api/v1/users", usersRoute);
app.use("/api/v1/signin", loginRoute);

app.use((error ,req, res, next) => {
  console.log(error);
  res.status(500).json(error.message);
});
