const path = require("path");
const mysql = require("mysql2/promise");

// Carrega as variáveis do arquivo backend/.env para dentro do process.env.
// O .env guarda a senha do banco e NÃO vai para o GitHub (está no .gitignore).
// Para configurar: copie o backend/.env.example para backend/.env e preencha.
require("dotenv").config({
  path: path.join(__dirname, "../../.env"),
  quiet: true,
});

const connection = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
});

module.exports = connection;
