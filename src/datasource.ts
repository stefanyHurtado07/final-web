import { DataSource } from "typeorm";
import { Usuario } from "./entities/Usuario"; 
import { Organo } from "./entities/Organo";
import { Proveedor } from "./entities/Proveedor"; 
import { Cliente } from "./entities/Cliente";

export const AppDataSource = new DataSource({
  type: "postgres",
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT),
  username: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  synchronize: true, 
  logging: true,
  entities: [Usuario, Organo, Proveedor, Cliente], 
});
