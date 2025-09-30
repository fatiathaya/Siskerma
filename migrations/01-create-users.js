"use strict";
module.exports = {
async up(queryInterface, Sequelize) {
    await queryInterface.createTable("Users", {
    id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
    },
    username: {
        // removed in favor of email; keep for backward-compat if table already exists
        type: Sequelize.STRING,
        allowNull: true,
        unique: false,
    },
    name: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    email: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true,
    },
    phone: {
        type: Sequelize.STRING,
        allowNull: true,
    },
    password: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    role: {
        type: Sequelize.ENUM("superadmin", "admin", "user"),
        allowNull: false,
        defaultValue: "user",
    },
    createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal("CURRENT_TIMESTAMP"),
    },
    updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal("CURRENT_TIMESTAMP"),
    },
    });
},

async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("Users");
},
};
