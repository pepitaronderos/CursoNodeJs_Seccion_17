"use strict";
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
Object.defineProperty(exports, "__esModule", { value: true });
exports.Usuario = void 0;
//Externo
const mongoose_1 = require("mongoose");
//Estamos defininedo que vamos a enviarle a la base de datos, que datos queremos que guarde del usuario, mongo se graba en colecciones de objetos
const usuarioSchema = new mongoose_1.Schema({
    //Dentro de las llaves podemos definir todo lo respecto a esa propiedad del objeto
    nombre: {
        type: String,
        required: [true, "El nombre es obligatorio"] //le podemos pasar un arreglo, lo segundo seria el mensaje de error
    },
    correo: {
        type: String,
        required: [true, "El correo es obligatorio"],
        unique: true //esto valida que no haya otro usuario con el mismo mail en la base de datos
    },
    password: {
        type: String,
        required: [true, "La contraseña es obligatoria"]
    },
    estado: {
        type: Boolean,
        default: true
    }
});
//Este metodo se ejecuta cuando devuelvo el request en un json en el archivo user.js dentro de controllers
usuarioSchema.methods.toJSON = function () {
    //Con esta linea lo que hacemos con desestructuracion guardar todos los valores en usuario menos password y __V, entonces asi retornamos solo los valores que queremos
    const _a = this.toObject(), { __v, password } = _a, usuario = __rest(_a, ["__v", "password"]);
    return usuario;
};
//Creamos una clase de nombre Usuario que va a contener el modelo de usuario creado en el usuarioSchema
const Usuario = (0, mongoose_1.model)('Usuario', usuarioSchema);
exports.Usuario = Usuario;
//# sourceMappingURL=usuario.js.map