import express from "express";
import * as feedRecomendationController from "../controller/feedRecomendationController"
import { recommendationsMiddleware } from "../../../redis/recomendationCacheMiddleware";

const router = express.Router();

router.get('/api/recommendations/posts/:user_id', recommendationsMiddleware, feedRecomendationController.getfeedRecomendation);

export default router