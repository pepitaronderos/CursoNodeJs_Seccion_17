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
exports.validarJWT = void 0;
//Externo
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
//Interno
const usuario_1 = require("../models/usuario");
const validarJWT = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    //Tomamos el token del header
    const token = req.header("x-token");
    //Si no hay token entonces devolvemos un error
    if (!token) {
        return res.status(401).json({
            msg: "No hay token en la petición."
        });
    }
    //Validamos el JWT
    try {
        const { uid } = jsonwebtoken_1.default.verify(token, process.env.SECREORPRIVATEKEY);
        const usuario = yield usuario_1.Usuario.findById(uid);
        if (!usuario) {
            return res.status(401).json({
                msg: "El usuario no existe en la DB."
            });
        }
        if (!usuario.estado) {
            return res.status(401).json({
                msg: "El usuario tiene estado: false."
            });
        }
        req.usuario = usuario;
        next();
    }
    catch (error) {
        console.log(error);
        return res.status(401).json({
            msg: "Token no válido"
        });
    }
});
exports.validarJWT = validarJWT;
//# sourceMappingURL=validar-jwt.js.map