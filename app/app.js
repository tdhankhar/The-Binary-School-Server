require("dotenv").config();

const express = require("express");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const authRoutes = require("./routes/auth");

const app = express();

app.use(bodyParser.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(cors());

app.use("/api/v1", authRoutes);

const port = process.env.PORT || 5000;

app.listen(port, () => {
  console.log(`SERVER IS RUNNING ON PORT ${port}`);
});
