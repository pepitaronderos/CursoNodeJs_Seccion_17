"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
//Externo
const dotenv_1 = __importDefault(require("dotenv"));
//Interno
const server_1 = require("./models/server");
//Configurar dotenv
dotenv_1.default.config();
//Creamos una instancia de la clase server
const server = new server_1.Server();
//Levantamos server
server.listen();
//# sourceMappingURL=app.js.map