'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
      return queryInterface.sequelize.transaction((t) => {
          return Promise.all([
              queryInterface.addColumn('posts', 'delete', {
                allowNull: false,
                type: Sequelize.BOOLEAN,
                defaultValue: false
              }, { transaction: t }),
              queryInterface.addColumn('comments', 'delete', {
                allowNull: false,
                type: Sequelize.BOOLEAN,
                defaultValue: false
            }, { transaction: t })
          ])
      })
  },

  down: (queryInterface, Sequelize) => {
      return queryInterface.sequelize.transaction((t) => {
          return Promise.all([
              queryInterface.removeColumn('posts', 'delete', { transaction: t }),
              queryInterface.removeColumn('comments', 'delete', { transaction: t })
          ])
      })
  }
};