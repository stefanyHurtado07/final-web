"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const Organo_1 = require("../entities/Organo");
const datasource_1 = require("../datasource");
const auth_1 = require("../middleware/auth");
const router = (0, express_1.Router)();
router.post("/crear", auth_1.verificarToken, async (req, res, next) => {
    try {
        const { tipo, donante, fechaDisponibilidad } = req.body;
        if (!tipo || !donante || !fechaDisponibilidad) {
            res.status(400).json({ mensaje: "Todos los campos son obligatorios" });
            return;
        }
        const nuevoOrgano = new Organo_1.Organo();
        nuevoOrgano.tipo = tipo;
        nuevoOrgano.donante = donante;
        nuevoOrgano.fechaDisponibilidad = new Date(fechaDisponibilidad);
        nuevoOrgano.verificado = false;
        const resultado = await datasource_1.AppDataSource.manager.save(nuevoOrgano);
        res.status(201).json(resultado);
    }
    catch (error) {
        console.error(error);
        next(error);
    }
});
exports.default = router;
