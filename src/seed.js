"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const datasource_1 = require("./datasource");
const Usuario_1 = require("./entities/Usuario");
const Organo_1 = require("./entities/Organo");
async function seed() {
    await datasource_1.AppDataSource.initialize();
    // Crear usuarios
    const usuarios = [
        { nombre: "Juan Pérez", email: "juan.perez@example.com", contraseña: "123456", rol: "admin" },
        { nombre: "María López", email: "maria.lopez@example.com", contraseña: "password123", rol: "user" },
        { nombre: "Carlos García", email: "carlos.garcia@example.com", contraseña: "qwerty123", rol: "user" },
        { nombre: "Ana Rodríguez", email: "ana.rodriguez@example.com", contraseña: "securePass", rol: "admin" },
        { nombre: "Jorge Díaz", email: "jorge.diaz@example.com", contraseña: "jorge2024", rol: "user" }
    ];
    // Guardar usuarios en la base de datos
    for (const usuarioData of usuarios) {
        const usuario = new Usuario_1.Usuario();
        Object.assign(usuario, usuarioData);
        await datasource_1.AppDataSource.manager.save(usuario);
    }
    // Crear órganos
    const organos = [
        { tipo: "Hígado", donante: "Hospital ABC", fechaDisponibilidad: new Date('2024-11-20'), verificado: true, proveedor: 1 },
        { tipo: "Riñón", donante: "Clínica Central", fechaDisponibilidad: new Date('2024-11-21'), verificado: true, proveedor: 2 },
        { tipo: "Corazón", donante: "Hospital General", fechaDisponibilidad: new Date('2024-11-22'), verificado: true, proveedor: 3 },
        { tipo: "Pulmón", donante: "Hospital del Norte", fechaDisponibilidad: new Date('2024-11-23'), verificado: false, proveedor: 4 },
        { tipo: "Hígado", donante: "Clínica Sur", fechaDisponibilidad: new Date('2024-11-24'), verificado: true, proveedor: 5 }
    ];
    // Guardar órganos en la base de datos
    for (const organoData of organos) {
        const organo = new Organo_1.Organo();
        Object.assign(organo, organoData);
        await datasource_1.AppDataSource.manager.save(organo);
    }
    console.log("Datos iniciales insertados correctamente.");
    process.exit(0);
}
seed().catch((error) => {
    console.error("Error al insertar datos:", error);
    process.exit(1);
});
