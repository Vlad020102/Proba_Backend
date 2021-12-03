'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    
    static associate({ Review }) {
      this.hasMany(Review, {
        foreignKey: {
          name: 'user_id',
          //allowNULL: false,
        }
      })
      
    }
    static associate({ Enrolment }) {
      this.hasMany(Enrolment, {
        foreignKey: {
          name: 'student_id',
          //allowNULL: false,
        }
      })
    }
  };
  User.init({
    id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      //allowNull: false,
      primaryKey: true,

    },
    lastname: {
      type: DataTypes.STRING(50),
      //allowNull:false,
    },
    firstname: {
      type: DataTypes.STRING(50),
      //allowNull: false,
    },
    email: {
      type: DataTypes.STRING(50),
      //allowNull: false,
      unique: true,
      validate: {
        isEmail: true
      }
    },
    password: {
      type: DataTypes.STRING(100),
      //allowNULL: false,
    },
    role: {
      type: DataTypes.ENUM('teacher', 'student'),
     // allowNULL: false,
    }
  }, {
    sequelize,
    tablename: 'users',
    modelName: 'User',
  });
  return User;
};