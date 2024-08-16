import { Router } from 'express'
import users from './users.js'
import posts from './post.js'
import comments from "./comments.js";

const router = Router()
router.use('/users', users)
router.use('/post', posts)
router.use('/comments', comments)
export default router
