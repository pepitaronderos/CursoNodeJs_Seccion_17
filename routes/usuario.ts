//Externo
import { Router } from "express";
import { check } from 'express-validator';

//Interno
import {
	deleteUsuario,
	getUsuario,
	getUsuarios,
	postUsuario,
	putUsuario
} from "../controller/usuarios";
import {
	emailExiste,
	usuarioActivo,
	usuarioExistePorID
} from "../helpers/db-validator";
import {
	validarCampos,
	validarJWT
} from "../middlewares";

const router = Router();

router.get("/", getUsuarios);

router.get("/:id", [
	check("id", "No es un ID valido").isMongoId(),
	check("id").custom(usuarioExistePorID),
	check("id").custom(usuarioActivo),
	validarCampos
], getUsuario);

router.post("/", [
	validarJWT,
	check("nombre", "El nombre es obligatorio.").not().isEmpty(),
	check("password", "El password debe tener mínimo 6 letras.").isLength({ min: 6 }),
	check("correo", "El correo no es válido.").isEmail(),
	check("correo").custom(emailExiste),
	validarCampos
], postUsuario);

router.put("/:id", [
	validarJWT,
	check("id", "No es un ID valido").isMongoId(),
	check("id").custom(usuarioExistePorID),
	check("id").custom(usuarioActivo),
	validarCampos
], putUsuario);

router.delete("/:id", [
	validarJWT,
	check("id", "No es un ID valido").isMongoId(),
	check("id").custom(usuarioExistePorID),
	check("id").custom(usuarioActivo),
	validarCampos
], deleteUsuario);

export {
	router
}