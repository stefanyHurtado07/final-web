import { Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { CustomRequest } from "../types/CustomRequest";

export const verificarToken = (req: CustomRequest, res: Response, next: NextFunction): void => {
  const token = req.header("auth-token");
  if (!token) {
    res.status(401).json({ mensaje: "Acceso denegado" });
    return;
  }

  try {
    const verified = jwt.verify(token, process.env.JWT_SECRET || "default_secret");
    req.user = verified;
    next();
  } catch (err) {
    res.status(400).json({ mensaje: "Token inválido" });
  }
};
