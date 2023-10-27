const mongoose = require("mongoose");

require("dotenv").config();

const connection = mongoose
    .connect(process.env.BASE_URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    })
    .then(() => {
        console.log("Banco de dados conectado!");
    })
    .catch((error) => {
        console.error("Erro ao conectar com o banco de dados:", error);
    });

module.exports = connection;
