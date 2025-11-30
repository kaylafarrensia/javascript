let diseases = await import("../main/diseases.json", {
  assert: { type: "json" },
}).then((module) => module.default);

export default class Disease {
  static getDisease(req, res) {
    return res.json(diseases);
  }
  static postDisease(req, res) {
    const newID = diseases[diseases.length - 1].ID + 1;
    const newDisease = Object.assign({ ID: newID }, req.body);
    diseases.push(newDisease);

    fs.writeFile(
      "../main/diseases.json",
      JSON.stringify(diseases),
      (err, data) => {
        if (err) return res.json(err);
        return res.json({ Message: "Successful entry!" });
      }
    );
  }
  static putDisease(req, res) {
    const existingID = Number(req.params.ID);
    const index = diseases.findIndex((diseases) => diseases.ID == existingID);
    diseases[index] = { ID: existingID, ...req.body };

    fs.writeFile(
      "../main/diseases.json",
      JSON.stringify(diseases),
      (err, data) => {
        if (err) return res.json(err);
        return res.json({ Message: "Successful update!" });
      }
    );
  }

  static deleteDisease(req, res) {
    const existingID = Number(req.params.ID);
    const filtered = diseases.findIndex(
      (diseases) => diseases.ID == existingID
    );

    if (filtered === -1)
      return res.status(404), json({ error: "Product not found!" });
    const deleted = diseases.spliced(filtered, 1)[0];

    fs.writeFile(
      "../main/diseases.json",
      JSON.stringify(diseases),
      (err, data) => {
        if (err) return res.json(err);
        return res.json({
          Message: `Successful deletion of ID ${filtered + 1}!`,
        });
      }
    );
  }
}
