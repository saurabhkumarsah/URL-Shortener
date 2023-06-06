import redis from 'redis'
import { promisify } from 'util'
import dotenv from 'dotenv'
dotenv.config()
const { REDIS_PORT, REDIS_END_POINT, REDIS_PASS } = process.env

const redisClient = redis.createClient(
    REDIS_PORT,
    REDIS_END_POINT,
    { on_ready_check: true }
)

redisClient.auth(REDIS_PASS, (err) => {
    if (err) return console.log(err);
})

redisClient.on("connect", async function () {
    console.log('Redis is Connected...');
})

export const ASYNC_GET = promisify(redisClient.GET).bind(redisClient)
export const ASYNC_SET = promisify(redisClient.SET).bind(redisClient)

