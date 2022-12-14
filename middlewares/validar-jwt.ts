//Externo
import jsonwebtoken from "jsonwebtoken";

//Interno
import { Usuario } from "../models/usuario";

const validarJWT = async (req: any, res: any, next: any) => {
	//Tomamos el token del header
	const token = req.header("x-token");

	//Si no hay token entonces devolvemos un error
	if (!token) {
		return res.status(401).json({
			msg: "No hay token en la petición."
		});
	}

	//Validamos el JWT
	try {
		interface JwtPayload {
			uid: string
		}

		const { uid } = jsonwebtoken.verify(token, process.env.SECREORPRIVATEKEY as string) as JwtPayload;
		const usuario = await Usuario.findById(uid);

		if (!usuario) {
			return res.status(401).json({
				msg: "El usuario no existe en la DB."
			});
		}

		if (!usuario.estado) {
			return res.status(401).json({
				msg: "El usuario tiene estado: false."
			});
		}

		req.usuario = usuario;
		next();
	} catch (error) {
		console.log(error);

		return res.status(401).json({
			msg: "Token no válido"
		});
	}
}

export {
	validarJWT
}