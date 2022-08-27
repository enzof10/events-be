const express = require("express");
const workoutsRoute = require("./v1/routes/workoutRoute");
const tasksRoute = require("./v1/routes/taskRoutes");
const usersRoute = require("./v1/routes/userRoutes");
const authRoutes = require("./v1/routes/authRoutes");
const boardRoutes = require("./v1/routes/boardRoutes");
const typeRoutes = require("./v1/routes/typeRoutes");
const authenticateJWT = require("./middlewares/authJWT");


const app = express();
const PORT = process.env.PORT || 3001;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

  // fix Cross-Origin Request Blocked issue
  app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "*");
    res.header("Access-Control-Allow-Methods", "*");
    if (req.method === "OPTIONS") {
       return res.status(200).end();
    }
    next();
});


app.use(express.json()) // for parsing application/json
app.use("/api/v1/", authRoutes);
// boards
app.use("/api/v1/wotkouts",authenticateJWT, workoutsRoute);
app.use("/api/v1/boards", authenticateJWT, boardRoutes );
app.use("/api/v1/tasks", authenticateJWT , tasksRoute);
app.use("/api/v1/users",authenticateJWT , usersRoute);


app.use((error ,req, res, next) => {
  console.log(error);
  res.status(500).json(error.message);
});
