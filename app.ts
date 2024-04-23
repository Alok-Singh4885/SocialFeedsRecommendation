import {db} from "./db/sequelize"
import { envResolver } from "./envResolver"
import express from "express";

const app = express();
import feedRecomendationRoutes from "./leaguex_gaming/app/routes/feedRecomendationRoutes"
import { connectToRedisClient } from "./redis/redisService";


app.use(feedRecomendationRoutes);

async function initImportantServices(){
    await connectToRedisClient();
}

app.listen(process.env.PORT, async ()=>{
    await initImportantServices()
    process.send && process.send("ready")
    console.log( `Express app named started on port ${process.env.PORT} with env ${process.env.NODE_ENV}`)
})

export default app
