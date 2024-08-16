import connection from '../clients/db.mysql.js'

export default {

	createCommentTable: async data => {
		const [createComment] = await connection.query(
			`INSERT INTO comments (user_id, posts_id, comment) VALUES (?, ?, ?)`,
			[data.userId, data.postId, data.comment]
		)
		return createComment || null
	},
	findCommentForPost: async data => {
		const [rows] = await connection.query(`SELECT * FROM comments where post_id = ?`, [data.id])
		return rows || null

	}

}
