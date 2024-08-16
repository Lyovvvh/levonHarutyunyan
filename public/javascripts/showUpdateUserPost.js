const form = document.getElementById('update-post-form')
const exit = document.createElement('a')
exit.classList.add('exit')

exit.innerText = 'Exit'

exit.onclick = () => {
	exit.href = "http://localhost:3000/users/profile"
}
form.appendChild(exit)
form.addEventListener('submit', async e => {
	e.preventDefault()


	const data = {
		postId: document.getElementById('postId').value,
		title: document.getElementById('title').value,
		description: document.getElementById('description').value,
		taskDate: document.getElementById('taskDate').value,
	}

	const messageElement = document.getElementById('message')

	try {
		const response = await axios.put('/post/updatePost', data, {
			headers: {
				'x-token': localStorage.getItem('token'),
			},
		})

		console.log(response.data)

		if (response.data.status === 'success') {
			messageElement.textContent = 'Post updated successfully!'
			messageElement.className = 'success'
		} else {
			messageElement.textContent =
				response.data.message || 'Failed to update post.'
			messageElement.className = 'error'
		}
	} catch (error) {
		const fields = error.response.data.fields
		Object.keys(fields).forEach(key => {
			const messages = fields[key]
			const errorSpan = document.getElementById(`${key}-error`)
			if (errorSpan) {
				errorSpan.textContent = messages
			}
		})
	}
})
