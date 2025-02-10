import rateLimit from "express-rate-limit";

export const limiter = rateLimit(
    {
        windowMx:15*60*1000,
        max:200,
        message:{
            message:'You are blocked, wait 15 minutes'
        }
    }
)