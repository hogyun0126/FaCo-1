'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class reply extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  reply.init({
    body: DataTypes.STRING,
    userId: DataTypes.STRING,
    postId: DataTypes.STRING,
    postId: DataTypes.STRING,
    createdAt: DataTypes.STRING,
    updatedAt: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'reply',
  });
  return reply;
};