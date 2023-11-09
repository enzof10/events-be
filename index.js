const express = require("express");
const eventRoutes = require("./v1/routes/eventRoutes");
const authRoutes = require("./v1/routes/authRoutes");
const usersRoutes = require("./v1/routes/userRoutes");

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
app.use("/api/v1/auth", authRoutes);
// boards
app.use("/api/v1/events", authenticateJWT, eventRoutes);
app.use("/api/v1/users",authenticateJWT , usersRoutes);



app.use((error, req, res, next) => {
  console.log(error);
  res.status(500).json(error.message);
});
