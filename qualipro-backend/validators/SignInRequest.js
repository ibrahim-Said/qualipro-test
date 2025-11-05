const { body } = require('express-validator');

exports.SignInRequest = [
  body('email')
    .notEmpty().withMessage('L’adresse e-mail est requise.')
    .isString().withMessage('L’adresse e-mail doit être une chaîne de caractères.')
    .isEmail().withMessage('L’adresse e-mail doit être valide.'),
  body('password')
    .notEmpty().withMessage('Le mot de passe est requis.')
    .isLength({ min: 6 }).withMessage('Le mot de passe doit contenir au moins 6 caractères.'),
];
