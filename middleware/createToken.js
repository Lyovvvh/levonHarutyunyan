import CryptoJS from 'crypto-js'
function createToken(email, id) {
	const token = {
		email: email,
		id: id,
	}
	const secret = process.env.TOKEN_KEY
	const bytes = CryptoJS.AES.encrypt(JSON.stringify(token), secret).toString()
	return bytes
}

export default createToken
