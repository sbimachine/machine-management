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
      'repairments',
      [
        {
          user_id: 2,
          machine_id: 1,
          status: 'Selesai Diperbaiki',
          description: 'loerm ipsum',
          created_at: '2024-03-22 19:34:04.512874+07',
          updated_at: '2024-03-25 10:11:04.494+07',
          deleted_at: null,
        },
        {
          user_id: 2,
          machine_id: 2,
          status: 'Menunggu Konfirmasi',
          description: 'lorem',
          created_at: '2024-03-22 19:34:36.880066+07',
          updated_at: '2024-03-22 19:34:36.880066+07',
          deleted_at: null,
        },
        {
          user_id: 2,
          machine_id: 1,
          status: 'Menunggu Konfirmasi',
          description: 'lorem',
          created_at: '2024-03-24 13:14:12.015751+07',
          updated_at: '2024-03-25 13:14:12.015751+07',
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
    await queryInterface.bulkDelete('repairments', null, {});
  },
};
