const express = require("express");
const mongoose = require("mongoose");
require("dotenv").config();
const cors = require("cors");
const cookiePraser = require("cookie-parser");
const userAuthRoutes = require("./routes/userRoutes");
const reminderRoutes = require("./routes/reminderRoutes");
const memberRoutes = require("./routes/memberRoutes");
const agendaRoutes = require("./routes/agendaRoutes");
const PORT = process.env.PORT;
const dbURL = process.env.MONGODBURL;

mongoose.connect(dbURL).then(() => console.log("Mongodb connected"));

const app = express();
app.use(cors());
app.use(express.json({ limit: "10mb" }));
app.use(cookiePraser());
app.use("/api", userAuthRoutes);
app.use("/api", reminderRoutes);
app.use("/api", memberRoutes);
app.use("/api", agendaRoutes);

app.get("/", (req, res) => res.send("HOMEPAGE"));
app.get("/dashboard", (req, res) => {
  res.send("DashboardPage");
});

app.listen(PORT, () =>
  console.log(`Server is listening on http://localhost:${PORT}`)
);
