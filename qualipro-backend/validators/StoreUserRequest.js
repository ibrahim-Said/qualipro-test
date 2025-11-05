const { body } = require('express-validator');

exports.StoreUserRequest = [
  body('first_name')
    .notEmpty().withMessage('Le prénom est requis.')
    .isString().withMessage('Le prénom doit être une chaîne de caractères.'),

  body('last_name')
    .notEmpty().withMessage('Le nom est requis.')
    .isString().withMessage('Le nom doit être une chaîne de caractères.'),

  body('phone')
    .notEmpty().withMessage('Le numéro de téléphone est requis.')
    .isString().withMessage('Le numéro de téléphone doit être une chaîne de caractères.'),

  body('role_id')
    .notEmpty().withMessage('Le rôle est requis.')
    .isNumeric().withMessage('Le rôle doit être un nombre.'),

  body('email')
    .notEmpty().withMessage('L’adresse e-mail est requise.')
    .isEmail().withMessage('L’adresse e-mail doit être valide.'),

  body('password')
    .custom((value, { req }) => {
      // Requis uniquement lors de la création
      if (!req.params.id && (!value || value.trim() === '')) {
        throw new Error('Le mot de passe est requis.');
      }

      // Vérifie la longueur minimale
      if (value && value.length < 6) {
        throw new Error('Le mot de passe doit contenir au moins 6 caractères.');
      }

      return true;
    }),
];
