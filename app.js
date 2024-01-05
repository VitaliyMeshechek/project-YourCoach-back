const express = require("express");
const logger = require("morgan");
const cors = require("cors");

const authRouter = require("./routes/api/users");
const noticeRouter = require("./routes/api/notices");
const programRouter = require("./routes/api/programs");
const swaggerUi = require("swagger-ui-express");
const swaggerjsdoc = require("./swagger.json");
// const sponsorsRouter = require("./routes/api/sponsors");

const app = express();

const formatsLogger = app.get("env") === "development" ? "dev" : "short";

require("dotenv").config();

app.use(logger(formatsLogger));

// cors
app.use(cors());

// parse application/json
app.use(express.json());

app.use(express.static("public"));

app.use("/api/users", authRouter);
app.use("/api/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerjsdoc));
app.use("/api/notices", noticeRouter);
app.use("/api/programs", programRouter);

app.use((req, res) => {
  res.status(404).json({ message: "Not found" });
});

app.use((req, res) => {
  res.status(500).json({ message: "Server error" });
});

app.use((err, req, res, next) => {
  res
    .status(err.status || 500)
    .json({ status: err.status, message: err.message });
});

module.exports = app;
