"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const datasource_1 = require("./datasource");
const organos_1 = __importDefault(require("./routes/organos"));
const usuarios_1 = __importDefault(require("./routes/usuarios"));
const app = (0, express_1.default)();
const PORT = process.env.PORT || 3000;
// Middleware para parsear JSON
app.use(express_1.default.json());
// Conexión a la base de datos
datasource_1.AppDataSource.initialize()
    .then(() => {
    console.log("Conexión exitosa a la base de datos");
    // Rutas
    app.use("/organos", organos_1.default);
    app.use("/usuarios", usuarios_1.default);
    // Iniciar servidor
    app.listen(PORT, () => {
        console.log(`Servidor corriendo en http://localhost:${PORT}`);
    });
})
    .catch((error) => {
    console.error("Error al conectar a la base de datos:", error);
});
