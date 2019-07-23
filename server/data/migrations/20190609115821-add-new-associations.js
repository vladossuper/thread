export default {
  up: (queryInterface, Sequelize) => queryInterface.sequelize
      .transaction(transaction => Promise.all([
          //////
          queryInterface.addColumn('commentReactions', 'userId', {
              type: Sequelize.UUID,
              references: {
                  model: 'users',
                  key: 'id',
              },
              onUpdate: 'CASCADE',
              onDelete: 'SET NULL',
          }, { transaction }),
          queryInterface.addColumn('commentReactions', 'commentId', {
              type: Sequelize.UUID,
              references: {
                  model: 'comments',
                  key: 'id',
              },
              onUpdate: 'CASCADE',
              onDelete: 'SET NULL',
          }, { transaction }),
          //////
      ])),

  down: queryInterface => queryInterface.sequelize
      .transaction(transaction => Promise.all([
          queryInterface.removeColumn('commentReactions', 'userId', { transaction }),
          queryInterface.removeColumn('commentReactions', 'commentId', { transaction })
      ]))
};
