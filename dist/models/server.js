"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Server = void 0;
//Externo
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
//Interno
const config_1 = require("../database/config");
const routes_1 = require("../routes");
//Creamos la clase server
class Server {
    //Creamos el constructor y llamamos las propiedades
    constructor() {
        this.apiPaths = {
            usuarios: "/api/usuarios",
            autenticacion: "/api/autenticacion",
        };
        this.app = (0, express_1.default)();
        this.port = process.env.PORT || "8000";
        this.conectarDB();
        this.middlewares();
        this.routes();
    }
    conectarDB() {
        return __awaiter(this, void 0, void 0, function* () {
            yield (0, config_1.dbConnection)();
        });
    }
    middlewares() {
        //Seteamos cors
        this.app.use((0, cors_1.default)());
        //Parsear el body
        this.app.use(express_1.default.json());
        //Carpeta pública
        this.app.use(express_1.default.static("public"));
    }
    //Definimos las rutas
    routes() {
        this.app.use(this.apiPaths.usuarios, routes_1.router);
        this.app.use(this.apiPaths.autenticacion, routes_1.routerAuth);
    }
    //Levantamos el servidor
    listen() {
        this.app.listen(this.port, () => {
            console.log("Servidor corriendo en puerto " + this.port);
        });
    }
}
exports.Server = Server;
//# sourceMappingURL=server.js.map