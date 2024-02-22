const express = require("express");
const mongoose = require("mongoose");
require("dotenv").config();
const cookiePraser = require("cookie-parser");
const userAuthRoutes = require("./routes/userRoutes");
const { userVerification } = require("./middleware/userMiddleware");
const reminderRoutes = require("./routes/reminderRoutes");
const memberRoutes = require("./routes/memberRoutes");
const agendaRoutes = require("./routes/agendaRoutes");
const PORT = process.env.PORT;
const dbURL = process.env.MONGODBURL;

mongoose.connect(dbURL).then(() => console.log("Mongodb connected"));

const app = express();
app.use(express.json());
app.use(cookiePraser());
app.use("/api/auth", userAuthRoutes);
app.use("/api", reminderRoutes);
app.use("/api", memberRoutes);
app.use("/api", agendaRoutes);

app.get("/", (req, res) => res.send("HOMEPAGE"));
app.get("/dashboard", userVerification, (req, res) => {
  res.send("DashboardPage");
});

app.listen(PORT, () =>
  console.log(`Server is listening on http://localhost:${PORT}`)
);
