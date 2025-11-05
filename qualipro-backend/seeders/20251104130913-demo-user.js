'use strict';

const bcrypt = require('bcrypt')

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */
    const saltRounds = 10;
    const passwordHash = await bcrypt.hash('password123', saltRounds);
    return queryInterface.bulkInsert('Users', [
      {
        first_name: 'John',
        last_name: 'Doe',
        email: 'example@example.com',
        phone: '1234567890',
        password: passwordHash,
        role_id: 1,
        date_of_hire: new Date('2020-01-15'),
        job: 'Software Engineer',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        first_name: 'Jane',
        last_name: 'Smith',
        email: 'jane.smith@example.com',
        phone: '0987654321',
        password: passwordHash,
        role_id: 2,
        date_of_hire: new Date('2020-01-15'),
        job: 'Software Engineer',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    await queryInterface.bulkDelete('Users', null, {});
  }
};
