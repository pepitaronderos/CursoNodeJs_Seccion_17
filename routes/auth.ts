//Externo
//Desestructuramos router del paquete de express
import { Router } from 'express';
import { check } from 'express-validator';

//Interno
import { login } from '../controller/auth';
import { validarCampos } from '../middlewares/validar-campos';

const routerAuth = Router();

routerAuth.post("/login", [
	check("correo", "El correo es obligatorio.").isEmail(), //chequea que el email sea valido
	check("password", "El password es obligatorio").not().isEmpty(),
	validarCampos
], login);

export {
	routerAuth
}