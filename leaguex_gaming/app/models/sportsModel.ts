import * as Sequelize from 'sequelize';
import { DataTypes, Model, Optional } from 'sequelize';

export interface sportsAttributes {
  id: number;
  name: string;
  status: '0' | '1';
  created?: Date;
  updated?: Date;
}

export type sportsPk = "id";
export type sportsId = sports[sportsPk];
export type sportsOptionalAttributes = "id" | "status" | "created" | "updated";
export type sportsCreationAttributes = Optional<sportsAttributes, sportsOptionalAttributes>;

export class sports extends Model<sportsAttributes, sportsCreationAttributes> implements sportsAttributes {
  id!: number;
  name!: string;
  status!: '0' | '1';
  created?: Date;
  updated?: Date;


  static initModel(sequelize: Sequelize.Sequelize): typeof sports {
    return sequelize.define('sports', {
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
    tableName: 'sports',
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
    ]
  }) as typeof sports;
  }
}
