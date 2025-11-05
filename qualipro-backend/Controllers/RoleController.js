const { Role } = require('../models');
module.exports = {
    async getRoles(req, res) {
        try {
            const roles = await Role.findAll();
            res.json({ success:true,roles:roles,message:'Rôles récupérés avec succès.' });
        } catch (error) {
            res.status(500).json({ success:false,message: 'Erreur interne du serveur.' });
        }
    },
};