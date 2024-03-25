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
      'machines',
      [
        {
          machine_name: 'Fresh World Vacuum Sealer FW-3150',
          status: 'perbaikan',
          image_url:
            'https://res.cloudinary.com/dhdujuupg/image/upload/v1711110691/machine/2ccbab5a-1a4c-4fe7-87bc-a8dc0ac0ddfe.png',
          description: 'lorem ipsum sir dolor amet',
          buy_date: '2024-03-20',
          category_id: 2,
          category_name: 'Sealer',
          created_at: '2024-03-22 19:31:32.824+07',
          updated_at: '2024-03-22 19:31:32.824+07',
          deleted_at: null,
        },
        {
          machine_name: 'Bonesaw KL-2029',
          status: 'ready',
          image_url:
            'https://res.cloudinary.com/dhdujuupg/image/upload/v1711110716/machine/3a934941-4914-4f2e-97e9-1da30bbdcdbf.png',
          description: 'lorem ipsum sir dolor amet',
          buy_date: '2024-03-20',
          category_id: 1,
          category_name: 'Bonesaw',
          created_at: '2024-03-22 19:31:57.185+07',
          updated_at: '2024-03-22 19:31:57.185+07',
          deleted_at: null,
        },
        {
          machine_name: 'Vacclear PL-2712',
          status: 'ready',
          image_url:
            'https://res.cloudinary.com/dhdujuupg/image/upload/v1711110752/machine/c3cdd226-df13-40c9-a47c-47a74c2209e1.png',
          description: 'lorem ipsum sir dolor amet',
          buy_date: '2024-03-23',
          category_id: 3,
          category_name: 'Vaccum',
          created_at: '2024-03-22 19:32:33.817+07',
          updated_at: '2024-03-22 19:32:33.817+07',
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
    await queryInterface.bulkDelete('machines', null, {});
  },
};
