const book = require("../modules/book/controller/book.controller");

module.exports = async (app) => {
  app.get("/api/v1/book/:id", book.findOne),
    app.get("/api/v1/book", book.findAll),
    app.post("/api/v1/book", book.create),
    app.put("/api/v1/book/:id", book.updateById),
    app.delete("/api/v1/book/:id", book.deleteById);
};
