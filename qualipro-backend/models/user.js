'use strict';

const bcrypt = require('bcrypt');

module.exports = (sequelize, DataTypes) => {
  const { Model } = sequelize.Sequelize || require('sequelize');

  class User extends Model {
    static associate(models) {
      User.belongsTo(models.Role, { foreignKey: 'role_id', as: 'role' });
    }

    async authenticate(plainPassword) {
      if (!this.password) return false;
      return bcrypt.compare(plainPassword, this.password);
    }
    toJSON() {
      const values = Object.assign({}, this.get());
      delete values.password;
      return values;
    }
    async getRole() {
      if (this.role) {
        return this.role;
      }

      if (!this.role_id) {
        return null;
      }
      const Role = sequelize.models.Role;
      return await Role.findByPk(this.role_id);
    }
  }

  User.init({
    first_name: DataTypes.STRING,
    last_name: DataTypes.STRING,
    phone: DataTypes.STRING,
    email: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false,
      validate: { isEmail: true }
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false
    },
    role_id: DataTypes.INTEGER,
    date_of_hire: DataTypes.DATE,
    job: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'User',
    tableName: 'Users',
    hooks: {
      beforeCreate: async (user, options) => {
        if (user.password) {
          const saltRounds = 10;
          const hash = await bcrypt.hash(user.password, saltRounds);
          user.password = hash;
        }
      },
      beforeUpdate: async (user, options) => {
        if (user.changed && typeof user.changed === 'function') {
          if (user.changed('password')) {
            const saltRounds = 10;
            const hash = await bcrypt.hash(user.password, saltRounds);
            user.password = hash;
          }
        } else if (user._previousDataValues && user.password !== user._previousDataValues.password) {
          const saltRounds = 10;
          const hash = await bcrypt.hash(user.password, saltRounds);
          user.password = hash;
        }
      }
    },
    defaultScope: {

    },
    scopes: {
      withPassword: { attributes: {} }
    }
  });

  return User;
};
