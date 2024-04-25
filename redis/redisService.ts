import * as redis from "redis"
const redisHostUrl = `redis://redis:6379`
const redisClient = redis.createClient({
    url: redisHostUrl
})

const CACHE_EXPIRY_TIME = 60 * 1

export async function setDataInReis(key: string, data: any){
    try{
        const isDone = await redisClient.set(key, JSON.stringify(data), {
            EX: CACHE_EXPIRY_TIME
        })
        return true
    }catch(e){
        console.log(e)
        return false
    }
}

export async function getDataFromRedis(key: string){
    const data = await redisClient.get(key)
    if(data){
        return JSON.parse(data)
    }
    return null
}

export async function connectToRedisClient(){
    await redisClient.connect()
}