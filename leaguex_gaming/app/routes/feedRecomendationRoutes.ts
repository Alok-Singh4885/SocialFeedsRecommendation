import express from "express";
import * as feedRecomendationController from "../controller/feedRecomendationController"
import { recommendationsMiddleware } from "../../../redis/recomendationCacheMiddleware";


import {joiHandler} from "../../../joiValidators";
import * as feedRecomendationValidators from "../validators/feedRecomendationValidators"

const router = express.Router();

router.get('/api/recommendations/posts/:user_id', recommendationsMiddleware, joiHandler(feedRecomendationValidators.validateFeedRecommendation), feedRecomendationController.getfeedRecomendation);

export default router