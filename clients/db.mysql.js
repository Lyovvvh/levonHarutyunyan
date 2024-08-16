import mysql from 'mysql2'
import dotEnv from 'dotenv'
dotEnv.config()
const dbConfig = {
	host: process.env.DB_HOST,
	user: process.env.DB_USER,
	password: process.env.DB_PASSWORD,
	database: process.env.DB_DATABASE,
}

const connection = mysql.createConnection(dbConfig)

export default connection.promise()

async function setupDatabase() {
	try {
		let connection = await mysql.createConnection(dbConfig);

		connection = connection.promise();

		const createUsersTable = `
			CREATE TABLE IF NOT EXISTS users
			(
				id          BIGINT              NOT NULL AUTO_INCREMENT,
				f_Name      VARCHAR(255)        NOT NULL,
				l_Name      VARCHAR(255)        NOT NULL,
				md_password VARCHAR(255)        NOT NULL,
				email       VARCHAR(255) UNIQUE NOT NULL,
				db          DATE,
				PRIMARY KEY (id)
			)
		`
		await connection.query(createUsersTable)

		const createPostsTable = `
			CREATE TABLE IF NOT EXISTS tasks
			(
				id          BIGINT       NOT NULL AUTO_INCREMENT,
				user_id     BIGINT,
				title       VARCHAR(255) NOT NULL,
				description TEXT,
				task_date   DATE,
				PRIMARY KEY (id),
				FOREIGN KEY (user_id) REFERENCES users (id)
			)
		`
		await connection.query(createPostsTable)

		const createCommentsTable = `
			CREATE TABLE IF NOT EXISTS comments
			(
				id          BIGINT       NOT NULL AUTO_INCREMENT,
				user_id     BIGINT,
				posts_id     BIGINT NOT NULL,
				comment       VARCHAR(255) NOT NULL,
				PRIMARY KEY (id),
				FOREIGN KEY (user_id) REFERENCES users (id),
				FOREIGN KEY (posts_id) REFERENCES tasks (id)
			)
		`
		await connection.query(createCommentsTable)

		await connection.end()
		console.log('Database setup complete.')
	} catch (error) {
		console.error('Error setting up the database:', error)
	}
}

setupDatabase().catch(console.error)