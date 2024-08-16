import db from '../models/dbComments.js'
import dbUsers from '../models/dbUsers.js'
import dbPosts from '../models/dbPosts.js'

export default {
	async create(req, res, next) {
		try {
			const { userId, postId, comment } = req.body

			if (await dbUsers.findUserId(userId)  && await dbPosts.findPostsId(postId)) {
				const newData = {
					userId,
					postId,
					comment,
				}

				await db.createCommentTable(newData)
				return res.status(201).json({ message: 'comment is created' })
			}else{
				res.status(422).json({message: 'invalid params'})
			}


		} catch (e) {
			return res.status(500).json({ message: e.message })
		}
	}

}
