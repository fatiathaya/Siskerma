"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    // Ubah ENUM role menjadi [superadmin, admin, pengaju] dan default pengaju
    // MySQL tidak mendukung ALTER ENUM mudah; strategi: ubah kolom menjadi STRING sementara lalu set ENUM baru
    await queryInterface.changeColumn("Users", "role", {
      type: Sequelize.STRING,
      allowNull: false,
      defaultValue: "pengaju",
    });

    await queryInterface.changeColumn("Users", "role", {
      type: Sequelize.ENUM("superadmin", "admin", "pengaju"),
      allowNull: false,
      defaultValue: "pengaju",
    });
  },

  async down(queryInterface, Sequelize) {
    // Kembalikan ke enum sebelumnya [superadmin, admin, user] default user
    await queryInterface.changeColumn("Users", "role", {
      type: Sequelize.STRING,
      allowNull: false,
      defaultValue: "user",
    });
    await queryInterface.changeColumn("Users", "role", {
      type: Sequelize.ENUM("superadmin", "admin", "user"),
      allowNull: false,
      defaultValue: "user",
    });
  },
};


