export default {
  up: (queryInterface, Sequelize) => queryInterface.sequelize
      .query('CREATE EXTENSION IF NOT EXISTS pgcrypto;')
      .then(() => queryInterface.sequelize.transaction(transaction => Promise.all([
          //////
          queryInterface.createTable('commentReactions', {
              id: {
                  allowNull: false,
                  autoIncrement: false,
                  primaryKey: true,
                  type: Sequelize.UUID,
                  defaultValue: Sequelize.literal('gen_random_uuid()')
              },
              isLike: {
                  allowNull: false,
                  type: Sequelize.BOOLEAN,
                  defaultValue: true
              },
              createdAt: Sequelize.DATE,
              updatedAt: Sequelize.DATE
          }, { transaction }),
          //////
      ]))),

  down: queryInterface => queryInterface.sequelize
      .transaction(transaction => Promise.all([
          queryInterface.dropTable('commentReactions', { transaction })
      ]))
};
