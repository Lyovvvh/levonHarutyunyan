import connection from '../clients/db.mysql.js'

export default {
	findPostsId: async id => {
		const [rows] = await connection.query(
			`SELECT * FROM tasks WHERE id = ?`,
			[id]
		)
		return rows.length > 0 ? true : false
	},

	createTasks: async data => {
		try {
			const createPostQuery = `
            INSERT INTO tasks (user_id, title, task_date, description) 
            VALUES (?, ?, ?, ?)
        `
			const [result] = await connection.query(createPostQuery, [
				data.userId,
				data.title,
				data.taskDate,
				data.description,
			])

			const postId = result.insertId

			const [newPost] = await connection.query(
				'SELECT * FROM tasks WHERE id = ?',
				[postId]
			)

			return newPost
		} catch (error) {
			console.error('Database error:', error)
			throw new Error('Could not create post')
		}
	},

	getTasks: async () => {
		const [rows] = await connection.query(`SELECT * FROM tasks`)
		return rows
	},
	getSingleTask: async id => {
		const [rows] = await connection.query(
			`SELECT * FROM tasks WHERE user_id = '${id}'`
		)
		return rows
	},

	updatePost: async data => {
		try {
			const updatePostQuery = `
            UPDATE tasks SET 
                user_id = ?, 
                title = ?, 
                task_date = ?, 
                description = ? 
            WHERE id = ?
        `
			const [result] = await connection.query(updatePostQuery, [
				data.userId,
				data.title,
				data.taskDate,
				data.description,
				data.id,
			])
			return result
		} catch (error) {
			console.error('Database error:', error)
			throw new Error('Could not update post')
		}
	},
	deletePost: async id => {
		const [result] = await connection.query(`DELETE FROM tasks WHERE id = ?`, [
			id,
		])
		return result
	},
}
