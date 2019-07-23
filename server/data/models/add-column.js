'use strict';
module.exports = (sequelize, DataTypes) => {
  const addcolumn = sequelize.define('add-column', {
    delete: DataTypes.BOOLEAN
  }, {});
  addcolumn.associate = function(models) {
    // associations can be defined here
  };
  return add - column;
};

