'use strict';

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

    await queryInterface.bulkInsert(
      'attendances',
      [
        {
          user_id: 2,
          status: 'present',
          clock_out: null,
          created_at: '2024-03-25 13:15:13.506+07',
          updated_at: '2024-03-25 13:15:13.506+07',
          deleted_at: null,
        },
        {
          user_id: 2,
          status: 'present',
          clock_out: null,
          created_at: '2024-03-24 13:15:13.506+07',
          updated_at: '2024-03-25 13:15:13.506+07',
          deleted_at: null,
        },
        {
          user_id: 2,
          status: 'present',
          clock_out: null,
          created_at: '2024-03-23 13:15:13.506+07',
          updated_at: '2024-03-25 13:15:13.506+07',
          deleted_at: null,
        },
      ],
      {}
    );
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    await queryInterface.bulkDelete('attendances', null, {});
  },
};
