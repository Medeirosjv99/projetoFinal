
const express = require("express");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());

const connection = require("./config/connection");

const cursoRoutes = require("./routes/cursoRoutes");
const professorRoutes = require("./routes/professorRoutes");
const disciplinaRoutes = require("./routes/disciplinaRoutes");

app.use(cursoRoutes);
app.use(professorRoutes);
app.use(disciplinaRoutes);

const PORT = 3000;

connection
    .getConnection()
    .then((conexao) => {
        console.log("Banco de dados conectado!");
        conexao.release();
    })
    .catch((erro) => {
        console.log("Erro ao conectar no banco:", erro.message);
    });

app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});
