import express from "express";
import fs from "fs";
import apiRoutes from "../routes/apiRoutes.js";

const app = express();
const PORT = process.env.PORT || 3000;
let diseases = await import("./diseases.json", {
  assert: { type: "json" },
}).then((module) => module.default);

app.use(express.json());
app.use("/api/v1", apiRoutes);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
