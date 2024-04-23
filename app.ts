import {db} from "./db/sequelize"
import { envResolver } from "./envResolver"
import express from "express";

const app = express();
import feedRecomendationRoutes from "./leaguex_gaming/app/routes/feedRecomendationRoutes"

// const serverName = generateRandomName()

app.use(feedRecomendationRoutes);

app.listen(process.env.PORT, ()=>{
    process.send && process.send("ready")
    // console.log("Server Started On http://localhost:"+process.env.PORT)
    console.log( `Express app named started on port ${process.env.PORT} with env ${process.env.NODE_ENV}`)
})

export default app
