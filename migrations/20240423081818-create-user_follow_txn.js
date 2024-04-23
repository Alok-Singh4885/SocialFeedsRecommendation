'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('user_follow_txn', {
      id: {
        type: Sequelize.INTEGER(11),
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
      },
      user_id: {
        type: Sequelize.INTEGER(11),
        references: {
          model: 'users',
          key: 'id'
        },
        allowNull: false,
      },
      follower_id: {
        type: Sequelize.INTEGER(11),
        references: {
          model: 'users',
          key: 'id'
        },
        allowNull: true
      },
      status: {
        type: Sequelize.ENUM('0', '1'),
        allowNull: false,
        defaultValue: '1'
      },
      created: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.literal('NOW()')
      },
      updated: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP')
      }
    });

    // Add foreign key constraint for follower_id
    await queryInterface.addConstraint('user_follow_txn', {
      type: 'foreign key',
      name: 'fk_follower_id',
      fields: ['follower_id'],
      references: {
        table: 'users',
        field: 'id'
      },
      onDelete: 'cascade',
      onUpdate: 'cascade'
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('user_follow_txn');
  }
};
