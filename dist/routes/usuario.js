"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.router = void 0;
//Externo
const express_1 = require("express");
const express_validator_1 = require("express-validator");
//Interno
const usuarios_1 = require("../controller/usuarios");
const db_validator_1 = require("../helpers/db-validator");
const middlewares_1 = require("../middlewares");
const router = (0, express_1.Router)();
exports.router = router;
router.get("/", usuarios_1.getUsuarios);
router.get("/:id", [
    (0, express_validator_1.check)("id", "No es un ID valido").isMongoId(),
    (0, express_validator_1.check)("id").custom(db_validator_1.usuarioExistePorID),
    (0, express_validator_1.check)("id").custom(db_validator_1.usuarioActivo),
    middlewares_1.validarCampos
], usuarios_1.getUsuario);
router.post("/", [
    middlewares_1.validarJWT,
    (0, express_validator_1.check)("nombre", "El nombre es obligatorio.").not().isEmpty(),
    (0, express_validator_1.check)("password", "El password debe tener mínimo 6 letras.").isLength({ min: 6 }),
    (0, express_validator_1.check)("correo", "El correo no es válido.").isEmail(),
    (0, express_validator_1.check)("correo").custom(db_validator_1.emailExiste),
    middlewares_1.validarCampos
], usuarios_1.postUsuario);
router.put("/:id", [
    middlewares_1.validarJWT,
    (0, express_validator_1.check)("id", "No es un ID valido").isMongoId(),
    (0, express_validator_1.check)("id").custom(db_validator_1.usuarioExistePorID),
    (0, express_validator_1.check)("id").custom(db_validator_1.usuarioActivo),
    middlewares_1.validarCampos
], usuarios_1.putUsuario);
router.delete("/:id", [
    middlewares_1.validarJWT,
    (0, express_validator_1.check)("id", "No es un ID valido").isMongoId(),
    (0, express_validator_1.check)("id").custom(db_validator_1.usuarioExistePorID),
    (0, express_validator_1.check)("id").custom(db_validator_1.usuarioActivo),
    middlewares_1.validarCampos
], usuarios_1.deleteUsuario);
//# sourceMappingURL=usuario.js.map