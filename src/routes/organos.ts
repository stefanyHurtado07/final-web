import { Router, Response, NextFunction } from "express";
import { Organo } from "../entities/Organo";
import { AppDataSource } from "../datasource";
import { CustomRequest } from "../types/CustomRequest";
import { verificarToken } from "../middleware/auth";

const router = Router();

router.post(
  "/crear",
  verificarToken,
  async (req: CustomRequest, res: Response, next: NextFunction): Promise<void> => {
    try {
      const { tipo, donante, fechaDisponibilidad } = req.body;

      if (!tipo || !donante || !fechaDisponibilidad) {
        res.status(400).json({ mensaje: "Todos los campos son obligatorios" });
        return;
      }

      const nuevoOrgano = new Organo();
      nuevoOrgano.tipo = tipo;
      nuevoOrgano.donante = donante;
      nuevoOrgano.fechaDisponibilidad = new Date(fechaDisponibilidad);
      nuevoOrgano.verificado = false;

      const resultado = await AppDataSource.manager.save(nuevoOrgano);
      res.status(201).json(resultado);
    } catch (error) {
      console.error(error);
      next(error);
    }
  }
);

export default router;
