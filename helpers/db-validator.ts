import { Usuario } from "../models/usuario";

//Chequeamos que el usuario exista en la base de datos
const usuarioExistePorID = async (id: any) => {
	const existeUsuario = await Usuario.findById(id); //esto va a buscar un correo que sea igual al que le estoy pasando

	if (!existeUsuario) {
		throw new Error(`El ID ${id} no existe.`);
	}

	return true;
}

const usuarioActivo = async (id: any) => {
	const usuario = await Usuario.findById(id); //esto va a buscar un correo que sea igual al que le estoy pasando

	if (usuario && !usuario?.estado) {
		throw new Error(`El ID ${id} no está activo`);
	}

	return true;
}

const emailExiste = async (correo = "") => {
	const existeEmail = await Usuario.findOne({ correo }); //esto va a buscar un correo que sea igual al que le estoy pasando

	if (existeEmail) {
		throw new Error(`El correo ${correo} ya está registrado.`);
	}

	return true;
}

export {
	usuarioExistePorID,
	usuarioActivo,
	emailExiste
}