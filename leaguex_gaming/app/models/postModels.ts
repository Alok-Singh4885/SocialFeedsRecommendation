import * as Sequelize from 'sequelize';
import { DataTypes, Model, Optional } from 'sequelize';
import type { events, eventsId } from './eventModels';
import type { sports, sportsId } from './sportsModel';
import type { users, usersId } from './userModel';

export interface postsAttributes {
  id: number;
  user_id: number;
  text: string;
  sport_id: number;
  event_id: number;
  likes: number;
  comments: number;
  status: '0' | '1';
  created?: Date;
  updated?: Date;
}

export const PostsColumns = {
    ID: 'id',
    USER_ID: 'user_id',
    SPORT_ID: 'sport_id',
    EVENT_ID: 'event_id'
}
  

export type postsPk = "id";
export type postsId = posts[postsPk];
export type postsOptionalAttributes = "id" | "likes" | "comments" | "status" | "created" | "updated";
export type postsCreationAttributes = Optional<postsAttributes, postsOptionalAttributes>;

export class posts extends Model<postsAttributes, postsCreationAttributes> implements postsAttributes {
  id!: number;
  user_id!: number;
  text!: string;
  sport_id!: number;
  event_id!: number;
  likes!: number;
  comments!: number;
  status!: '0' | '1';
  created?: Date;
  updated?: Date;

  // posts belongsTo events via event_id
  event!: events;
  getEvent!: Sequelize.BelongsToGetAssociationMixin<events>;
  setEvent!: Sequelize.BelongsToSetAssociationMixin<events, eventsId>;
  createEvent!: Sequelize.BelongsToCreateAssociationMixin<events>;
  // posts belongsTo sports via sport_id
  sport!: sports;
  getSport!: Sequelize.BelongsToGetAssociationMixin<sports>;
  setSport!: Sequelize.BelongsToSetAssociationMixin<sports, sportsId>;
  createSport!: Sequelize.BelongsToCreateAssociationMixin<sports>;
  // posts belongsTo users via user_id
  user!: users;
  getUser!: Sequelize.BelongsToGetAssociationMixin<users>;
  setUser!: Sequelize.BelongsToSetAssociationMixin<users, usersId>;
  createUser!: Sequelize.BelongsToCreateAssociationMixin<users>;

  static initModel(sequelize: Sequelize.Sequelize): typeof posts {
    return sequelize.define('posts', {
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
    text: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    sport_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'sports',
        key: 'id'
      }
    },
    event_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'events',
        key: 'id'
      }
    },
    likes: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0
    },
    comments: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0
    },
    status: {
      type: DataTypes.ENUM('0','1'),
      allowNull: false,
      defaultValue: "1"
    },
    created: {
      type: DataTypes.DATE,
      allowNull: true,
      defaultValue: Sequelize.Sequelize.literal('CURRENT_TIMESTAMP')
    },
    updated: {
      type: DataTypes.DATE,
      allowNull: true,
      defaultValue: Sequelize.Sequelize.literal('CURRENT_TIMESTAMP')
    }
  }, {
    tableName: 'posts',
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
        name: "posts_user_id_fk",
        using: "BTREE",
        fields: [
          { name: "user_id" },
        ]
      },
      {
        name: "posts_sport_id_fk",
        using: "BTREE",
        fields: [
          { name: "sport_id" },
        ]
      },
      {
        name: "posts_event_id_fk",
        using: "BTREE",
        fields: [
          { name: "event_id" },
        ]
      },
    ]
  }) as typeof posts;
  }
}
