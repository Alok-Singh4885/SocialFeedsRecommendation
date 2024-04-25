'use strict';

import { Request, Response } from 'express'
import  asyncHandler  from '../../../asyncHandler';
import * as feedRecomendationService from "../services/feedRecomendationService"
import { setDataInReis } from '../../../redis/redisService';

const getfeedRecomendation = async (req:Request, res: Response) => {

    const  userId  = +req.params.user_id;

    const data = await feedRecomendationService.getfeedRecomendationService(userId)
    const responseBody = {
        success: true,
        message: "Successfully fetch recommended posts for a user based on their interactions, interests, and posts from followed users.",
        data: data
    }
    setDataInReis(req.originalUrl, responseBody) // Is an async process so that I/O is not blocked
    return res.json(responseBody)
}

export  { getfeedRecomendation }