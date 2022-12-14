//Externo
import dotenv from "dotenv";

//Interno
import { Server } from "./models/server";

//Configurar dotenv
dotenv.config();

//Creamos una instancia de la clase server
const server = new Server();

//Levantamos server
server.listen();