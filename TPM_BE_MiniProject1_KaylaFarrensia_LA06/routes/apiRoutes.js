import Disease from "../controllers/apiController.js";
let diseases = await import("../main/diseases.json", {
  assert: { type: "json" },
}).then((module) => module.default);

// Upload New Disease
app.post("/diseases", Disease.postDisease);

// Retrieve Disease List
app.get("/diseases", Disease.getDisease);

// Update Disease
app.put("/diseases/:ID", Disease.putDisease);

// Delete Disease
app.delete("/diseases/:ID", Disease.deleteDisease);
