import { Request, Response, NextFunction } from 'express';
import Joi from 'joi'

interface FeedRecommendationParams {
  user_id: string;
}

const feedRecommendationSchema = Joi.object({
  user_id: Joi.string().required()
});

const validateFeedRecommendation = (req: Request<FeedRecommendationParams>, res: Response, next: NextFunction) => {
  const { error } = feedRecommendationSchema.validate(req.params);
  if (error) {
    return res.status(400).json({ error: error.details[0].message });
  }
  next();
};

export { validateFeedRecommendation };