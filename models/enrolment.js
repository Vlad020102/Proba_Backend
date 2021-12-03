'use strict';
const {
  Model
} = require('sequelize');
const tutoringClass = require('./tutoringClass');
module.exports = (sequelize, DataTypes) => {
  class Enrolment extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    
     static associate({ TutoringClass }) {
      this.belongsTo(TutoringClass, {
        foreignKey: {
          name: 'tutoring_class_id',
          allowNULL: false,
        }
      })
      
     }
     static associate({ User }) {
      this.belongsTo(User, {
        foreignKey: {
          name: 'student_id',
          allowNULL: false,
        }
      })
      
    }
  };
  Enrolment.init({
    id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
    },
    student_id: {
      type: DataTypes.INTEGER,
      allowNULL: false,
    },
    tutoring_class_id: {
      type: DataTypes.INTEGER,
      allowNULL: false,
    },
  }, {
    sequelize,
    tablename: 'enrolments',
    modelName: 'Enrolment',
  });
  return Enrolment;
};