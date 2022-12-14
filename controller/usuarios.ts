//Externo
import {
	Request,
	Response
} from "express";
import bcryptjs from "bcryptjs"

//Interno
import { Usuario } from "../models/usuario";

const getUsuarios = async (req: Request, res: Response) => {
	//Buscamos todos los usuarios activos
	const usuarios = await Usuario.find({ estado: true });

	res.json({
		usuarios
	});
}

const getUsuario = async (req: Request, res: Response) => {
	const { id } = req.params;

	//Buscamos un usuario que tenga el id que viene como parametro
	const usuario = await Usuario.findById(id);

	res.json({
		usuario
	});
}

const postUsuario = async (req: Request, res: Response) => {
	try {
		const { nombre, correo, password } = req.body;
		const usuario = new Usuario({ nombre, correo, password });

		//Encriptar la contraseña
		const salt = bcryptjs.genSaltSync(); //el salt es el numero de vueltas para hacer mas complicado la desencriptacion, el default es 10 si no paso valor
		usuario.password = bcryptjs.hashSync(password, salt); //tomamos el password lo encriptamos y guardamos eso en el password que viene de usuario

		//Guardar en DB
		await usuario.save(); // con este comando le decimos a mongoose que guande ese usuario en la base de datos

		//Se regresa el usuario grabado en un json
		res.json(usuario);
	} catch (error) {
		console.log(error);

		res.status(500).json({
			msg: "Hable con el administrador"
		});
	}
}

const putUsuario = async (req: Request, res: Response) => {
	try {
		const { id } = req.params;
		const { _id, password, estado, ...resto } = req.body;

		//Validar contra base de datos
		if (password) {
			//Encriptar la contraseña
			const salt = bcryptjs.genSaltSync(); //el salt es el numero de vueltas para hacer mas complicado la desencriptacion, el default es 10 si no paso valor
			resto.password = bcryptjs.hashSync(password, salt); //tomamos el password lo encriptamos y guardamos eso en el password que viene de usuario
		}

		const usuario = await Usuario.findByIdAndUpdate(id, resto);

		res.json(usuario);
	} catch (error) {
		console.log(error);

		res.status(500).json({
			msg: "Hable con el administrador"
		});
	}
}

const deleteUsuario = async (req: Request, res: Response) => {
	const { id } = req.params;

	//Buscamos el usuario con el id que mandamos en la url y le ponemos el estado en false
	const usuario = await Usuario.findByIdAndUpdate(id, { estado: false });

	res.json(usuario);
}

export {
	getUsuarios,
	getUsuario,
	postUsuario,
	putUsuario,
	deleteUsuario
}