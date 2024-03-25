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
      'users',
      [
        {
          email: 'johnlead@mail.com',
          username: 'johnlead',
          password: '$2b$10$tiWvKcz4hpVlouZa.xmbouo/3U/eJRzJb8J1JpeN/j4IeorFILEua',
          first_name: 'john',
          last_name: 'lead',
          phone: '081234567823',
          image_url: null,
          role: 'leader',
          address: null,
          birth_date: null,
          created_at: '2024-03-22 19:30:13.617+07',
          updated_at: '2024-03-22 19:30:13.617+07',
          deleted_at: null,
        },
        {
          email: 'johndoeh@mail.com',
          username: 'johndoe',
          password: '$2b$10$o0AtHI.D2vpskInD5Y23euWV46eXPB.3CZJofWIbp9C99WdUunvZC',
          first_name: 'john',
          last_name: 'doe',
          phone: '081234567891',
          image_url: null,
          role: 'supervisior',
          address: null,
          birth_date: null,
          created_at: '2024-03-17 21:38:56.285+07',
          updated_at: '2024-03-17 21:38:56.285+07',
          deleted_at: null,
        },
        {
          email: 'johnprod@mail.com',
          username: 'johnprod',
          password: '$2b$10$Ce7fnXFFP0QgLYYZv05EseZlkjXOPsF16METS6Wu4n/NRGV76aZSu',
          first_name: 'john',
          last_name: 'prod',
          phone: '081234567813',
          image_url: null,
          role: 'produksi',
          address: null,
          birth_date: null,
          created_at: '2024-03-22 19:29:43.019+07',
          updated_at: '2024-03-22 19:29:43.019+07',
          deleted_at: null,
        },
        {
          email: 'johntech@mail.com',
          username: 'johntech',
          password: '$2b$10$11Ru7dZUFlLhZYKx543EpOYQp0R4DIIl53udcQSjklSKbO7eSXsy2',
          first_name: 'john',
          last_name: 'tech',
          phone: '081234567893',
          image_url: null,
          role: 'teknisi',
          address: null,
          birth_date: null,
          created_at: '2024-03-17 21:46:14.77+07',
          updated_at: '2024-03-17 21:46:14.77+07',
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
    await queryInterface.bulkDelete('users', null, {});
  },
};
