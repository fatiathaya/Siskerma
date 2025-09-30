"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
class User extends Model {
    static associate(models) {
      // relasi kalau nanti ada
    }
}
User.init(
    {
    name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
        isEmail: true,
        },
    },
    phone: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    role: {
        type: DataTypes.ENUM("superadmin", "admin", "pengaju"),
        allowNull: false,
        defaultValue: "pengaju",
    },
    },
    {
    sequelize,
    modelName: "User",
    }
);
return User;
};
