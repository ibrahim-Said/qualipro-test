const { User, Role } = require("../models");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const authConfig = require("../config/auth.config");

module.exports = {
  signIn: async (req, res) => {
    try {
      const { email, password } = req.body;

      const user = await User.findOne({
        where: { email },
        include: { model: Role, as: "role" },
      });

      if (!user) {
        return res.status(401).json({
          success: false,
          message: "Utilisateur non trouvé.",
        });
      }

      const passwordIsValid = await bcrypt.compare(password, user.password);
      console.log("Password valid:", passwordIsValid);

      if (!passwordIsValid) {
        return res.status(401).json({
          success: false,
          accessToken: null,
          message: "Mot de passe incorrect.",
        });
      }

      const token = jwt.sign({ id: user.id }, authConfig.secret, {
        expiresIn: 86400, // 24 heures
      });

      const authorities = user.role;

      res.status(200).json({
        success: true,
        message: "Connexion réussie.",
        user: {
          id: user.id,
          email: user.email,
          role: user.role,
          accessToken: token,
        },
      });
    } catch (error) {
      console.error("Erreur lors de la tentative de connexion :", error);
      res.status(500).json({
        success: false,
        message: "Erreur interne du serveur.",
      });
    }
  },
};
