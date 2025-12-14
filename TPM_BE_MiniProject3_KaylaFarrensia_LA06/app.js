const express = require("express");
const app = express();
const { globalErrorHandler } = require("./src/middlewares/errorHandler");
const authRoutes = require("./src/routes/auth/authRoutes");

app.use(express.json());
app.use("/api/auth", authRoutes);
app.use(globalErrorHandler);

const mainRouter = require("./src/routes/index");
const { globalErrorHandler } = require("./src/middlewares/errorHandler");

app.use(express.json());
app.use("/api/v1", mainRouter);
app.use(globalErrorHandler);
