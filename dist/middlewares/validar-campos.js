"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validarCampos = void 0;
//Externo
const express_validator_1 = require("express-validator");
//Este middleware es para manejar los errores que vienen del response
const validarCampos = (req, res, next) => {
    const errors = (0, express_validator_1.validationResult)(req); //para validar los errores, esto ya viene con express-validator, va a tirar true o false
    if (!errors.isEmpty()) {
        return res.status(400).json(errors);
    }
    //Como es un middleware recibe un tercer parametro que es next, con esto indicamos que si esta todo ok siga con el siguiente middleware
    next();
};
exports.validarCampos = validarCampos;
//# sourceMappingURL=validar-campos.js.map