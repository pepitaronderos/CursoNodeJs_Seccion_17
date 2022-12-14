"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.routerAuth = void 0;
//Externo
//Desestructuramos router del paquete de express
const express_1 = require("express");
const express_validator_1 = require("express-validator");
//Interno
const auth_1 = require("../controller/auth");
const validar_campos_1 = require("../middlewares/validar-campos");
const routerAuth = (0, express_1.Router)();
exports.routerAuth = routerAuth;
routerAuth.post("/login", [
    (0, express_validator_1.check)("correo", "El correo es obligatorio.").isEmail(),
    (0, express_validator_1.check)("password", "El password es obligatorio").not().isEmpty(),
    validar_campos_1.validarCampos
], auth_1.login);
//# sourceMappingURL=auth.js.map