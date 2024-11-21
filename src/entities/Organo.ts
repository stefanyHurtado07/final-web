
  import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    ManyToOne,
  } from "typeorm";
  import { Cliente } from "./Cliente";
  import { Proveedor } from "./Proveedor";
  
  @Entity()
  export class Organo {
    @PrimaryGeneratedColumn()
    id: number;
  
    @Column()
    tipo: string;
  
    @Column()
    fechaDisponibilidad: Date;
  
    @Column({ default: false })
    verificado: boolean;
  
    @Column({ nullable: true })
    donante: string; // Agregamos esta columna
  
    // Relación con Cliente
    @ManyToOne(() => Cliente, (cliente) => cliente.organos)
    cliente: Cliente;
  
    // Relación con Proveedor
    @ManyToOne(() => Proveedor, (proveedor) => proveedor.organos)
    proveedor: Proveedor;
  }
  
  
