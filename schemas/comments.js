import Joi from 'joi'

export default {

    create: Joi.object({
        userId: Joi.string().required(),
        postId: Joi.string().required(),
        comment: Joi.string().min(1).required(),
    }),

}
