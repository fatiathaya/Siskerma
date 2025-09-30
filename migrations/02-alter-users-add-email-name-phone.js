"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    // Tambah kolom jika belum ada
    const table = await queryInterface.describeTable("Users");

    if (!table.name) {
      await queryInterface.addColumn("Users", "name", {
        type: Sequelize.STRING,
        allowNull: false,
        after: "username",
      });
    }

    if (!table.email) {
      await queryInterface.addColumn("Users", "email", {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true,
        after: "name",
      });
      // Buat index unik jika belum ada
      try {
        await queryInterface.addIndex("Users", ["email"], {
          unique: true,
          name: "users_email_unique",
        });
      } catch (_) {}
    }

    if (!table.phone) {
      await queryInterface.addColumn("Users", "phone", {
        type: Sequelize.STRING,
        allowNull: true,
        after: "email",
      });
    }

    // Jika kolom username ada dan wajib, longgarkan (allowNull true)
    if (table.username && table.username.allowNull === false) {
      await queryInterface.changeColumn("Users", "username", {
        type: Sequelize.STRING,
        allowNull: true,
      });
    }
  },

  async down(queryInterface, Sequelize) {
    const table = await queryInterface.describeTable("Users");
    if (table.phone) {
      await queryInterface.removeColumn("Users", "phone");
    }
    try {
      await queryInterface.removeIndex("Users", "users_email_unique");
    } catch (_) {}
    if (table.email) {
      await queryInterface.removeColumn("Users", "email");
    }
    if (table.name) {
      await queryInterface.removeColumn("Users", "name");
    }
    if (table.username) {
      await queryInterface.changeColumn("Users", "username", {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true,
      });
    }
  },
};


