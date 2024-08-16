const form = document.querySelector('#comment-form')
const successMessage = document.querySelector('#success-message')

const exit = document.createElement('a')
exit.classList.add('exit')

exit.innerText = 'Exit'


exit.onclick = () => {
	exit.href = "http://localhost:3000/users/profile"
}

form.appendChild(exit)

form.addEventListener('submit', async event => {
	event.preventDefault()

	try {

		const data = {
			comment: await document.querySelector('#comment').value,
		}


	} catch (error) {
		const fields = error.response.data.fields
		if (fields) {
			Object.keys(fields).forEach(key => {
				const messages = fields[key]
				const errorSpan = document.querySelector(`#${key}-error`)
				if (errorSpan) {
					errorSpan.textContent = messages
				}
			})
		} else {
			console.error('Error without response:', error.message)
		}
	}
})
