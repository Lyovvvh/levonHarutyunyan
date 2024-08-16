import controller from '../controllers/controllersComments.js'
import checkToken from '../middleware/checkToken.js'
import validate from '../middleware/validate.js'
import commentsSchema from '../schemas/comments.js'
import express from 'express'
const router = express.Router()


router.get('/create', (req, res) => {
    res.render('createComment')
})



router.post('/create', checkToken, validate(commentsSchema.create, 'body'), controller.create)


export default router
