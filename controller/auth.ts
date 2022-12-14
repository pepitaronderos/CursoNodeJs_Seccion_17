//Externo
import bcryptjs from "bcryptjs";

//Interno
import { Usuario } from "../models/usuario";
import { generarJWT } from "../helpers/generar-jwt";

const login = async (req: any, res: any) => {
	const { correo, password } = req.body;

	try {
		// Verificar si el email existe
		const usuario = await Usuario.findOne({ correo });

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
		const validPassword = bcryptjs.compareSync(password, usuario.password);

		if (!validPassword) {
			return res.status(400).json({
				msg: "El usuario/password no es correcto. -- password"
			});
		}

		// Generar el JWT (jSon Web Token)
		const token = await generarJWT(usuario.id);

		res.json({
			usuario,
			token
		});
	} catch (error) {
		console.log(error);

		res.status(500).json({
			msg: "Hable con el administrador"
		});
	}
}

export {
	login
}