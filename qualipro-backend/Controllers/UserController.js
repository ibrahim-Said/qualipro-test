const { User, Role } = require('../models');

module.exports = {
  async getUsers(req, res) {
    try {
      const page = parseInt(req.query.page) || 1;
      const limit = parseInt(req.query.per_page) || 10;
      const offset = (page - 1) * limit;

      const { count, rows: users } = await User.findAndCountAll({
        limit,
        offset,
        order: [
          [req.query.sortBy || 'createdAt', req.query.direction ? req.query.direction.toUpperCase() : 'DESC']
        ],
        include: [
          {
            model: Role,
            as: 'role'
          }
        ]
      });

      const totalPages = Math.ceil(count / limit);
      res.json({
        success: true,
        message: 'Utilisateurs récupérés avec succès.',
        pagination: {
          totalItems: count,
          currentPage: page,
          totalPages,
          perPage: limit,
        },
        users,
      });
    } catch (error) {
      console.error('Erreur lors de la récupération des utilisateurs :', error);
      res.status(500).json({
        success: false,
        message: 'Erreur interne du serveur.',
      });
    }
  },

  async getUserById(req, res) {
    try {
      const user = await User.findByPk(req.params.id, {
        include: [
          {
            model: Role,
            as: 'role'
          }
        ]
      });

      if (!user) {
        return res.status(404).json({ success: false, message: 'Utilisateur introuvable.' });
      }

      res.json({ success: true, user, message: 'Utilisateur récupéré avec succès.' });
    } catch (error) {
      console.error('Erreur lors de la récupération de l\'utilisateur :', error);
      res.status(500).json({ success: false, message: 'Erreur interne du serveur.' });
    }
  },

  async createUser(req, res) {
    try {
      const newUser = await User.create(req.body);
      res.status(201).json({ success: true, user: newUser, message: 'Utilisateur créé avec succès.' });
    } catch (error) {
      console.error('Erreur lors de la création de l\'utilisateur :', error);
      res.status(500).json({ success: false, message: 'Erreur interne du serveur.' });
    }
  },

  async updateUser(req, res) {
    try {
      const user = await User.findByPk(req.params.id);
      if (!user) {
        return res.status(404).json({ success: false, message: 'Utilisateur introuvable.' });
      }

      await user.update(req.body);
      res.json({ success: true, user, message: 'Utilisateur mis à jour avec succès.' });
    } catch (error) {
      console.error('Erreur lors de la mise à jour de l\'utilisateur :', error);
      res.status(500).json({ success: false, message: 'Erreur interne du serveur.' });
    }
  },

  async deleteUser(req, res) {
    try {
      const user = await User.findByPk(req.params.id);
      if (!user) {
        return res.status(404).json({ success: false, message: 'Utilisateur introuvable.' });
      }

      await user.destroy();
      res.status(200).json({ success: true, message: 'Utilisateur supprimé avec succès.' });
    } catch (error) {
      console.error('Erreur lors de la suppression de l\'utilisateur :', error);
      res.status(500).json({ success: false, message: 'Erreur interne du serveur.' });
    }
  }
};
