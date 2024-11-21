"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Organo = void 0;
const typeorm_1 = require("typeorm");
const Usuario_1 = require("./Usuario");
let Organo = class Organo {
    constructor() {
        this.id = 0;
        this.tipo = "";
        this.donante = "";
        this.fechaDisponibilidad = new Date();
        this.verificado = false;
        this.proveedor = new Usuario_1.Usuario();
    }
};
exports.Organo = Organo;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], Organo.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ length: 50 }),
    __metadata("design:type", String)
], Organo.prototype, "tipo", void 0);
__decorate([
    (0, typeorm_1.Column)({ length: 100 }),
    __metadata("design:type", String)
], Organo.prototype, "donante", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "date" }),
    __metadata("design:type", Date)
], Organo.prototype, "fechaDisponibilidad", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: false }),
    __metadata("design:type", Boolean)
], Organo.prototype, "verificado", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => Usuario_1.Usuario, (usuario) => usuario.organos, { nullable: false, onDelete: "CASCADE" }),
    __metadata("design:type", Usuario_1.Usuario)
], Organo.prototype, "proveedor", void 0);
exports.Organo = Organo = __decorate([
    (0, typeorm_1.Entity)()
], Organo);
