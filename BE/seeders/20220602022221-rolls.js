'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    return queryInterface.bulkInsert('rolls', [{
      name: 'User',
      createdAt: new Date(),
      updatedAt: new Date()
    },{
      name: 'Owner',
      createdAt: new Date(),
      updatedAt: new Date()
    }]);
  },

  async down (queryInterface, Sequelize) {
    return queryInterface.bulkDelete('rolls', null, {});
  }
};
