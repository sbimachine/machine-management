'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('repairments', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      user_id: {
        type: Sequelize.INTEGER,
        allowNull: true,
        references: {
          key: 'id',
          model: 'users',
        },
        onDelete: 'no action',
      },
      repairment_date: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      machine_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          key: 'id',
          model: 'machines',
        },
        onDelete: 'no action',
      },
      status: {
        type: Sequelize.ENUM,
        values: [
          'Menunggu Konfirmasi',
          'Proses Perbaikan',
          'Indent Sparepart',
          'Tidak Bisa Diperbaiki',
          'Selesai Diperbaiki',
        ],
        allowNull: false,
        defaultValue: 'Menunggu Konfirmasi',
      },
      description: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      created_at: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updated_at: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      deleted_at: {
        allowNull: true,
        type: Sequelize.DATE,
      },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('repairments');
  },
};
