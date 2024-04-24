import Joi from 'joi'

export const validateFeedRecommendation = Joi.object({
  user_id: Joi.string().required(),
});