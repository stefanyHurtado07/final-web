import { Router, Response, Request, NextFunction } from "express";
import { Usuario } from "../entities/Usuario";
import { AppDataSource } from "../datasource";

const router = Router();

router.post(
  "/register",
  async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const { nombre, email, contraseña, rol } = req.body;

      if (!nombre || !email || !contraseña || !rol) {
        res.status(400).json({ mensaje: "Todos los campos son obligatorios" });
        return;
      }

      const nuevoUsuario = new Usuario();
      nuevoUsuario.nombre = nombre;
      nuevoUsuario.email = email;
      nuevoUsuario.contraseña = contraseña;
      nuevoUsuario.rol = rol;

      const resultado = await AppDataSource.manager.save(nuevoUsuario);
      res.status(201).json(resultado);
    } catch (error) {
      console.error(error);
      next(error);
    }
  }
);

router.post(
  "/login",
  async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const { email, contraseña } = req.body;

      if (!email || !contraseña) {
        res.status(400).json({ mensaje: "Email y contraseña son obligatorios" });
        return;
      }

      const usuario = await AppDataSource.manager.findOneBy(Usuario, { email });

      if (!usuario || usuario.contraseña !== contraseña) {
        res.status(401).json({ mensaje: "Credenciales incorrectas" });
        return;
      }

      res.status(200).json({ mensaje: "Inicio de sesión exitoso" });
    } catch (error) {
      console.error(error);
      next(error);
    }
  }
);

export default router;
