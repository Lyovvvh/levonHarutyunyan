import Joi from 'joi'

export default {

    search: Joi.object({
        value: Joi.string().min(1).required()
    })

}
