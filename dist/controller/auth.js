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
exports.login = void 0;
//Externo
const bcryptjs_1 = __importDefault(require("bcryptjs"));
//Interno
const usuario_1 = require("../models/usuario");
const generar_jwt_1 = require("../helpers/generar-jwt");
const login = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { correo, password } = req.body;
    try {
        // Verificar si el email existe
        const usuario = yield usuario_1.Usuario.findOne({ correo });
        if (!usuario) {
            return res.status(400).json({
                msg: "El usuario/password no es correcto. -- Correo"
            });
        }
        // Verificar si el usuario esta activo en la DB
        if (!usuario.estado) {
            return res.status(400).json({
                msg: "El usuario/password no es correcto. -- Estado: false"
            });
        }
        // Verificar la contraseña
        //con esto estamos comparando la password que tenemos del req y la comparamos con la que esta en la base de datos
        const validPassword = bcryptjs_1.default.compareSync(password, usuario.password);
        if (!validPassword) {
            return res.status(400).json({
                msg: "El usuario/password no es correcto. -- password"
            });
        }
        // Generar el JWT (jSon Web Token)
        const token = yield (0, generar_jwt_1.generarJWT)(usuario.id);
        res.json({
            usuario,
            token
        });
    }
    catch (error) {
        console.log(error);
        res.status(500).json({
            msg: "Hable con el administrador"
        });
    }
});
exports.login = login;
//# sourceMappingURL=auth.js.map