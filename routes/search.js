import controller from '../controllers/controllersSearch.js'
import checkToken from '../middleware/checkToken.js'
import validate from '../middleware/validate.js'
import schema from '../schemas/search.js'
import express from 'express'
const router = express.Router()



router.post('/search', checkToken, validate(schema.search, 'body'), controller.search)


export default router
