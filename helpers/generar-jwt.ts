//Externo
import jsonwebtoken from "jsonwebtoken";

//Esta funcion es para generar el token
const generarJWT = async (uid = "") => {
	return new Promise((resolve, reject) => {
		const payload = { uid };
		jsonwebtoken.sign(payload, process.env.SECREORPRIVATEKEY as string, { expiresIn: "4h" }, (error, token) => {
			if (error) {
				console.log(error);
				reject("No se pudo generar el token.");
			} else {
				resolve(token);
			}
		});
	});
}

export {
	generarJWT
}