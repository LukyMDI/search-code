const express = require("express");
const routes = express.Router();

// Inserção dos Controllers
const productController = require("./controllers/productController");

routes.get("/", (req, res) => {
    res.send("<h1>Está funcionando!</h1>");
});

routes.post("/api/products/create", productController.create);
routes.get("/api/products/view", productController.read);
routes.post("/api/products/delete", productController.delete);

module.exports = routes;
