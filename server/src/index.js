const express = require("express");
const cors = require("cors");
const routes = require("./routes");

// Biblioteca para utilização das variáveis de ambiente (.env)
require("dotenv").config();

// Conexão com o banco de dados
require("./config/dbConfig");

const app = express();

// Configuração para o CORS
const corsOption = {
    origin: "https://search-code-main.vercel.app/",
    credentials: true,
};

// Middlewares
app.use(cors(corsOption));
app.use(express.json());
app.use(routes);

app.listen(process.env.PORT, () => {
    console.log("Servidor rodando na porta:", process.env.PORT);
});
