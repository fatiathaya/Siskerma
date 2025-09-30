"use strict";
const bcrypt = require("bcrypt");

module.exports = {
  async up(queryInterface, Sequelize) {
    const hashedSuperadmin = await bcrypt.hash("super123", 10);
    const hashedAdmin = await bcrypt.hash("admin123", 10);
    const hashedUser = await bcrypt.hash("user123", 10);

    await queryInterface.bulkInsert("Users", [
      {
        name: "Super Admin",
        email: "superadmin@example.com",
        phone: "0800000001",
        password: hashedSuperadmin,
        role: "superadmin",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "Admin",
        email: "admin@example.com",
        phone: "0800000002",
        password: hashedAdmin,
        role: "admin",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "User",
        email: "user@example.com",
        phone: "0800000003",
        password: hashedUser,
        role: "user",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("Users", null, {});
  },
};


