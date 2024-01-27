'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Penalty extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Penalty.init({
    memberCode: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    penaltyDate: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    penaltyDuration: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  }, {
    sequelize,
    modelName: 'Penalty',
    tableName: 'penalties',
  });
  return Penalty;
};