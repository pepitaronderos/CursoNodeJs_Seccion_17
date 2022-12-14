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
exports.generarJWT = void 0;
//Externo
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
//Esta funcion es para generar el token
const generarJWT = (uid = "") => __awaiter(void 0, void 0, void 0, function* () {
    return new Promise((resolve, reject) => {
        const payload = { uid };
        jsonwebtoken_1.default.sign(payload, process.env.SECREORPRIVATEKEY, { expiresIn: "4h" }, (error, token) => {
            if (error) {
                console.log(error);
                reject("No se pudo generar el token.");
            }
            else {
                resolve(token);
            }
        });
    });
});
exports.generarJWT = generarJWT;
//# sourceMappingURL=generar-jwt.js.map