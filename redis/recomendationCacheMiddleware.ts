import { Response, Request, NextFunction } from "express";
import { getDataFromRedis } from "./redisService";

export async function recommendationsMiddleware(req: Request, res: Response, next: NextFunction){
    const url = req.originalUrl;
    const cacheData = await getDataFromRedis(url)
    if(!cacheData){
        return next()
    }
    return res.status(200).json(cacheData)
}