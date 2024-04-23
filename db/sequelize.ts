import { Sequelize, Dialect } from "sequelize";
import {initModels} from "../models-ts/init-models"
require('dotenv').config();
import path from 'path'
const envLoaded =process.env

const DB_HOST = envLoaded.DB_HOST
const DB_PORT = envLoaded.DB_PORT

const DB_DATABASE: any = envLoaded.DB_DATABASE?.toString()
const DB_USERNAME: any = envLoaded.DB_USERNAME
const DB_PASSWORD: any = envLoaded.DB_PASSWORD
const DB_DIALECT : any = envLoaded.DB_DIALECT as Dialect

const sequelize = new Sequelize(DB_DATABASE, DB_USERNAME, DB_PASSWORD, {
    database : DB_DATABASE,
    username : DB_USERNAME,
    password : '',
    dialect: 'mysql' 
});

const db = initModels(sequelize)

export { sequelize as sequelize, db as db }