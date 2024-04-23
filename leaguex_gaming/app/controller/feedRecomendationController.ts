'use strict';

import { Request, Response } from 'express'
import  asyncHandler  from '../../../asyncHandler';
import * as feedRecomendationService from "../services/feedRecomendationService"

const getfeedRecomendation = async (req:Request, res: Response) => {
    
    const  userId  = Number(req?.query?.user_id);

    const data = await feedRecomendationService.getfeedRecomendationService(userId)

    res.json({
        success: true,
        message: "Successfully fetch recommended posts for a user based on their interactions, interests, and posts from followed users.",
        data: data
    })
}

export  { getfeedRecomendation }