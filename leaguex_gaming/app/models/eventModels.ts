import * as Sequelize from 'sequelize';
import { DataTypes, Model, Optional } from 'sequelize';
import type { sports, sportsId } from './sportsModel';

export interface eventsAttributes {
  id: number;
  name: string;
  sport_id: number;
  status: '0' | '1';
  created?: Date;
  updated?: Date;
}

export type eventsPk = "id";
export type eventsId = events[eventsPk];
export type eventsOptionalAttributes = "id" | "status" | "created" | "updated";
export type eventsCreationAttributes = Optional<eventsAttributes, eventsOptionalAttributes>;

export class events extends Model<eventsAttributes, eventsCreationAttributes> implements eventsAttributes {
  id!: number;
  name!: string;
  sport_id!: number;
  status!: '0' | '1';
  created?: Date;
  updated?: Date;

  // events belongsTo sports via sport_id
  sport!: sports;
  getSport!: Sequelize.BelongsToGetAssociationMixin<sports>;
  setSport!: Sequelize.BelongsToSetAssociationMixin<sports, sportsId>;
  createSport!: Sequelize.BelongsToCreateAssociationMixin<sports>;

  static initModel(sequelize: Sequelize.Sequelize): typeof events {
    return sequelize.define('events', {
    id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    name: {
      type: DataTypes.STRING(255),
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
    tableName: 'events',
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
        name: "events_sport_id_fk",
        using: "BTREE",
        fields: [
          { name: "sport_id" },
        ]
      },
    ]
  }) as typeof events;
  }
}
