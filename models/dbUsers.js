import connection from '../clients/db.mysql.js'

export default {
	findUserEmail: async email => {
		const [rows] = await connection.query(
			`SELECT * FROM users WHERE email = ?`,
			[email]
		)
		return rows.length > 0 ? rows[0] : null
	},
	findUserId: async id => {
		const [rows] = await connection.query(
			`SELECT * FROM users WHERE id = ?`,
			[id]
		)
		return rows.length > 0 ? true : false
	},

	createUsersTable: async data => {
		const [createUsers] = await connection.query(
			`INSERT INTO users (f_Name, l_Name, email, md_password, db) VALUES (?, ?, ?, ?, ?)`,
			[data.firstName, data.lastName, data.email, data.password, new Date()]
		)
		return createUsers || null
	},

	getUsersList: async () => {
		const [rows] = await connection.query(`SELECT * FROM users`)
		return rows
	},

	deleteUser: async id => {
		const [result] = await connection.query(`DELETE FROM users WHERE id = ?`, [
			id,
		])
		return result
	},
}
