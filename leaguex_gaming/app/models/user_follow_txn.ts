import * as Sequelize from 'sequelize';
import { DataTypes, Model, Optional } from 'sequelize';
import type { users, usersId } from './userModel';

export interface user_follow_txnAttributes {
  id: number;
  user_id: number;
  follower_id?: number;
  status: '0' | '1';
  created: Date;
  updated: Date;
}


export const userFollowTxnColumns = {
  ID: 'id',
  USER_ID: 'user_id',
  FOLLOWER_ID: 'follower_id'
}

export type user_follow_txnPk = "id";
export type user_follow_txnId = user_follow_txn[user_follow_txnPk];
export type user_follow_txnOptionalAttributes = "id" | "follower_id" | "status" | "created" | "updated";
export type user_follow_txnCreationAttributes = Optional<user_follow_txnAttributes, user_follow_txnOptionalAttributes>;

export class user_follow_txn extends Model<user_follow_txnAttributes, user_follow_txnCreationAttributes> implements user_follow_txnAttributes {
  id!: number;
  user_id!: number;
  follower_id?: number;
  status!: '0' | '1';
  created!: Date;
  updated!: Date;

  // user_follow_txn belongsTo users via follower_id
  follower!: users;
  getFollower!: Sequelize.BelongsToGetAssociationMixin<users>;
  setFollower!: Sequelize.BelongsToSetAssociationMixin<users, usersId>;
  createFollower!: Sequelize.BelongsToCreateAssociationMixin<users>;
  // user_follow_txn belongsTo users via user_id
  user!: users;
  getUser!: Sequelize.BelongsToGetAssociationMixin<users>;
  setUser!: Sequelize.BelongsToSetAssociationMixin<users, usersId>;
  createUser!: Sequelize.BelongsToCreateAssociationMixin<users>;

  static initModel(sequelize: Sequelize.Sequelize): typeof user_follow_txn {
    return sequelize.define('user_follow_txn', {
    id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'users',
        key: 'id'
      }
    },
    follower_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'users',
        key: 'id'
      }
    },
    status: {
      type: DataTypes.ENUM('0','1'),
      allowNull: false,
      defaultValue: "1"
    },
    created: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: Sequelize.Sequelize.literal('CURRENT_TIMESTAMP')
    },
    updated: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: Sequelize.Sequelize.literal('CURRENT_TIMESTAMP')
    }
  }, {
    tableName: 'user_follow_txn',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "id" },
        ]
      },
      {
        name: "user_id",
        using: "BTREE",
        fields: [
          { name: "user_id" },
        ]
      },
      {
        name: "fk_follower_id",
        using: "BTREE",
        fields: [
          { name: "follower_id" },
        ]
      },
    ]
  }) as typeof user_follow_txn;
  }
}
