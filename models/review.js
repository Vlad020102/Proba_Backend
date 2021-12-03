'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Review extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({ User }) {
      this.belongsTo(User, {
        foreignKey: {
          name: 'user_id',
          allowNULL: false,
        }
      })
    }
  };
  Review.init({
    id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
    },
    message: {
      type: DataTypes.STRING(500),
      allowNULL: false,
    },
    user_id: {
      type: DataTypes.INTEGER,
      allowNULL: false,
      foreignKey: true,
    }

  }, {
    sequelize,
    tablename:'reviews',
    modelName: 'Review',
  });
  return Review;
};