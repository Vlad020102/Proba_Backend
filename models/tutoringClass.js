'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class TutoringClass extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     /** */
    static associate({ Enrolment }) {
      this.hasMany(Enrolment, {
        foreignKey: {
          name: 'tutoring_class_id',
          allowNULL: false,
        }
      })
    }
     
    static associate({ User }) {
      this.belongsTo(User, {
        foreignKey: {
          name: 'teacher_id',
          allowNULL: false,
        }

      })
    }
  
    
  };
  TutoringClass.init({
    id: {
      autoIncrement: true,
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
      },
      description: {
          type: DataTypes.STRING(50),
          allowNULL: false,
    },
    teacher_id: {
      type: DataTypes.INTEGER,
      allowNULL: false,
      foreignKey: true,
      },
      subject: {
        type: DataTypes.STRING(80),
        allowNULL: false,
    },
      
      
  }, {
    sequelize,
    tablename: 'tutoring_classes',
    modelName: 'TutoringClass',
  });
  return TutoringClass;
};