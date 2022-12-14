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
Object.defineProperty(exports, "__esModule", { value: true });
exports.emailExiste = exports.usuarioActivo = exports.usuarioExistePorID = void 0;
const usuario_1 = require("../models/usuario");
//Chequeamos que el usuario exista en la base de datos
const usuarioExistePorID = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const existeUsuario = yield usuario_1.Usuario.findById(id); //esto va a buscar un correo que sea igual al que le estoy pasando
    if (!existeUsuario) {
        throw new Error(`El ID ${id} no existe.`);
    }
    return true;
});
exports.usuarioExistePorID = usuarioExistePorID;
const usuarioActivo = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const usuario = yield usuario_1.Usuario.findById(id); //esto va a buscar un correo que sea igual al que le estoy pasando
    if (usuario && !(usuario === null || usuario === void 0 ? void 0 : usuario.estado)) {
        throw new Error(`El ID ${id} no está activo`);
    }
    return true;
});
exports.usuarioActivo = usuarioActivo;
const emailExiste = (correo = "") => __awaiter(void 0, void 0, void 0, function* () {
    const existeEmail = yield usuario_1.Usuario.findOne({ correo }); //esto va a buscar un correo que sea igual al que le estoy pasando
    if (existeEmail) {
        throw new Error(`El correo ${correo} ya está registrado.`);
    }
    return true;
});
exports.emailExiste = emailExiste;
//# sourceMappingURL=db-validator.js.map