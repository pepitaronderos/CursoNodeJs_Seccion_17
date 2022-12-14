//Externo
import express, { Application } from "express";
import cors from "cors";

//Interno
import { dbConnection } from "../database/config";
import {
	router,
	routerAuth
} from "../routes";

//Creamos la clase server
class Server {
	//Definimos las propiedades que va a llama el constructor, typescript necesita que esten definidas antes del constructor
	private app: Application;
	private port: string;
	private apiPaths = {
		usuarios: "/api/usuarios",
		autenticacion: "/api/autenticacion",
	}

	//Creamos el constructor y llamamos las propiedades
	constructor() {
		this.app = express();
		this.port = process.env.PORT || "8000";
		this.conectarDB();
		this.middlewares();
		this.routes();
	}

	async conectarDB() {
		await dbConnection();
	}

	middlewares() {
		//Seteamos cors
		this.app.use(cors());

		//Parsear el body
		this.app.use(express.json());

		//Carpeta pública
		this.app.use(express.static("public"));
	}

	//Definimos las rutas
	routes() {
		this.app.use(this.apiPaths.usuarios, router);
		this.app.use(this.apiPaths.autenticacion, routerAuth);
	}

	//Levantamos el servidor
	listen() {
		this.app.listen(this.port, () => {
			console.log("Servidor corriendo en puerto " + this.port);
		});
	}
}

export {
	Server
}