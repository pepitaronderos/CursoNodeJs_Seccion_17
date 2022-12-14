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
exports.dbConnection = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
//Creamos una funcion asincrona para conectar nuestro proyecto a la base de datos
const dbConnection = () => __awaiter(void 0, void 0, void 0, function* () {
    //En el primer parametro pasamos los datos de conexion que tenemos guardados como variable de entorno en MONGODB_CNN, segundo pasamos las opciones en este caso es useNewUrlParser, y por ultimo pasamos un callback, paramanejar el error y el exito.
    mongoose_1.default.connect(process.env.MONGODB_CNN, {
        useNewUrlParser: true,
    }, (err) => {
        if (err)
            throw err;
        console.log("Base de datos online");
    });
});
exports.dbConnection = dbConnection;
//# sourceMappingURL=config.js.map