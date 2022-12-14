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
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteUsuario = exports.putUsuario = exports.postUsuario = exports.getUsuario = exports.getUsuarios = void 0;
const bcryptjs_1 = __importDefault(require("bcryptjs"));
//Interno
const usuario_1 = require("../models/usuario");
const getUsuarios = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    //Buscamos todos los usuarios activos
    const usuarios = yield usuario_1.Usuario.find({ estado: true });
    res.json({
        usuarios
    });
});
exports.getUsuarios = getUsuarios;
const getUsuario = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    //Buscamos un usuario que tenga el id que viene como parametro
    const usuario = yield usuario_1.Usuario.findById(id);
    res.json({
        usuario
    });
});
exports.getUsuario = getUsuario;
const postUsuario = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { nombre, correo, password } = req.body;
        const usuario = new usuario_1.Usuario({ nombre, correo, password });
        //Encriptar la contraseña
        const salt = bcryptjs_1.default.genSaltSync(); //el salt es el numero de vueltas para hacer mas complicado la desencriptacion, el default es 10 si no paso valor
        usuario.password = bcryptjs_1.default.hashSync(password, salt); //tomamos el password lo encriptamos y guardamos eso en el password que viene de usuario
        //Guardar en DB
        yield usuario.save(); // con este comando le decimos a mongoose que guande ese usuario en la base de datos
        //Se regresa el usuario grabado en un json
        res.json(usuario);
    }
    catch (error) {
        console.log(error);
        res.status(500).json({
            msg: "Hable con el administrador"
        });
    }
});
exports.postUsuario = postUsuario;
const putUsuario = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const _a = req.body, { _id, password, estado } = _a, resto = __rest(_a, ["_id", "password", "estado"]);
        //Validar contra base de datos
        if (password) {
            //Encriptar la contraseña
            const salt = bcryptjs_1.default.genSaltSync(); //el salt es el numero de vueltas para hacer mas complicado la desencriptacion, el default es 10 si no paso valor
            resto.password = bcryptjs_1.default.hashSync(password, salt); //tomamos el password lo encriptamos y guardamos eso en el password que viene de usuario
        }
        const usuario = yield usuario_1.Usuario.findByIdAndUpdate(id, resto);
        res.json(usuario);
    }
    catch (error) {
        console.log(error);
        res.status(500).json({
            msg: "Hable con el administrador"
        });
    }
});
exports.putUsuario = putUsuario;
const deleteUsuario = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    //Buscamos el usuario con el id que mandamos en la url y le ponemos el estado en false
    const usuario = yield usuario_1.Usuario.findByIdAndUpdate(id, { estado: false });
    res.json(usuario);
});
exports.deleteUsuario = deleteUsuario;
//# sourceMappingURL=usuarios.js.map