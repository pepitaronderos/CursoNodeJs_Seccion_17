//Externo
import { Schema, model } from "mongoose";

interface usuarioTipos {
	nombre: string;
	correo: string;
	password: string;
	estado: boolean;
}

//Estamos defininedo que vamos a enviarle a la base de datos, que datos queremos que guarde del usuario, mongo se graba en colecciones de objetos
const usuarioSchema = new Schema<usuarioTipos>({
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
	const { __v, password, ...usuario } = this.toObject();
	return usuario;
};

//Creamos una clase de nombre Usuario que va a contener el modelo de usuario creado en el usuarioSchema
const Usuario = model('Usuario', usuarioSchema);

export {
	Usuario
} 