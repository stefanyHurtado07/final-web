"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const Usuario_1 = require("../entities/Usuario");
const datasource_1 = require("../datasource");
const router = (0, express_1.Router)();
router.post("/register", async (req, res, next) => {
    try {
        const { nombre, email, contraseña, rol } = req.body;
        if (!nombre || !email || !contraseña || !rol) {
            res.status(400).json({ mensaje: "Todos los campos son obligatorios" });
            return;
        }
        const nuevoUsuario = new Usuario_1.Usuario();
        nuevoUsuario.nombre = nombre;
        nuevoUsuario.email = email;
        nuevoUsuario.contraseña = contraseña;
        nuevoUsuario.rol = rol;
        const resultado = await datasource_1.AppDataSource.manager.save(nuevoUsuario);
        res.status(201).json(resultado);
    }
    catch (error) {
        console.error(error);
        next(error);
    }
});
router.post("/login", async (req, res, next) => {
    try {
        const { email, contraseña } = req.body;
        if (!email || !contraseña) {
            res.status(400).json({ mensaje: "Email y contraseña son obligatorios" });
            return;
        }
        const usuario = await datasource_1.AppDataSource.manager.findOneBy(Usuario_1.Usuario, { email });
        if (!usuario || usuario.contraseña !== contraseña) {
            res.status(401).json({ mensaje: "Credenciales incorrectas" });
            return;
        }
        res.status(200).json({ mensaje: "Inicio de sesión exitoso" });
    }
    catch (error) {
        console.error(error);
        next(error);
    }
});
exports.default = router;
