'use strict';

import { Request, Response } from 'express'
import  asyncHandler  from '../../../asyncHandler';
import * as feedRecomendationService from "../services/feedRecomendationService"

const getfeedRecomendation = async (req:Request, res: Response) => {
    console.log(`testt111`)
    const  userId  = Number(req?.query?.user_id);
    console.log(`testt222`)

    const data = await feedRecomendationService.getfeedRecomendationService(userId)

    res.json({
        success: true,
        message: "Successfully fetch recommended posts for a user based on their interactions, interests, and posts from followed users.",
        data: data
    })
}

export  { getfeedRecomendation }