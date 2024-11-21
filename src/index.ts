import * as dotenv from "dotenv";
dotenv.config();

import express from "express";
import { AppDataSource } from "./datasource";
import organosRouter from "./routes/organos";
import usuariosRouter from "./routes/usuarios";

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware para parsear JSON
app.use(express.json());

// Conexión a la base de datos
AppDataSource.initialize()
  .then(() => {
    console.log("Conexión exitosa a la base de datos");

    // Rutas
    app.use("/organos", organosRouter);
    app.use("/usuarios", usuariosRouter);

    // Iniciar servidor
    app.listen(PORT, () => {
      console.log(`Servidor corriendo en http://localhost:${PORT}`);
    });
  })
  .catch((error) => {
    console.error("Error al conectar a la base de datos:", error);
  });
