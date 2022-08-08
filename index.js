const express = require("express");
const workoutsRoute = require("./v1/routes/workoutRoute");
const tasksRoute = require("./v1/routes/taskRoutes");
const usersRoute = require("./v1/routes/userRoutes");
const authRoutes = require("./v1/routes/authRoutes");
const authenticateJWT = require("./middlewares/authJWT");


const app = express();
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});


app.use(express.json()) // for parsing application/json
app.use("/api/v1/", authRoutes);
app.use("/api/v1/wotkouts",authenticateJWT, workoutsRoute);
app.use("/api/v1/tasks", authenticateJWT , tasksRoute);
app.use("/api/v1/users",authenticateJWT , usersRoute);

app.use((error ,req, res, next) => {
  console.log(error);
  res.status(500).json(error.message);
});
