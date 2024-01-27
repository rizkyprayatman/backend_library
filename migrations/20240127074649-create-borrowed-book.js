'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('borrowedBooks', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      memberCode: {
        type: Sequelize.STRING,
        references: {
          model: {
            tableName: "members",
          },
          key: "code",
        },
      },
      bookCode: {
        type: Sequelize.STRING,
        references: {
          model: {
            tableName: "books",
          },
          key: "code",
        },
      },
      borrowDate: {
        type: Sequelize.DATE
      },
      returnDate: {
        type: Sequelize.DATE
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('borrowedBooks');
  }
};