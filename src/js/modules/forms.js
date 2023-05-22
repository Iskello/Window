const forms = () => {
	const form = document.querySelectorAll('form'),
		inputs = document.querySelectorAll('input'),
		phoneInputs = document.querySelectorAll('input[name="user_phone"]');

	phoneInputs.forEach(item => {
		item.addEventListener('input', () => {
			//видаляє все, що не є числом
			/* item.value = item.value.replace(/\D/, ''); */
			//видаляється все, що не є числом, - та +
			item.value = item.value.replace(/[^\d+/-]/g, '');
		});
	});

	const message = {
		loading: 'Йде відправка',
		success: 'Дякуємо за заявку! Невдовзі ми з Вами зв\'яжемось!',
		failure: 'Упс! Щось пішло не так...'
	};

	//Функція відправки запиту на сервер
	const postData = async (url, data) => {
		document.querySelector('.status').textContent = message.loading;
		let res = await fetch(url, {
			method: 'POST',
			body: data
		});

		return await res.text();
	};

	//Очищення полів форми
	const clearInputs = () => {
		inputs.forEach(item => {
			item.value = '';
		});
	};

	//Перебір форм і назначення обробника подій
	form.forEach(item => {
		item.addEventListener('submit', (e) => {
			e.preventDefault();

			//створюємо версткою блок сповіщення
			let statusMessage = document.createElement('div');
			statusMessage.classList.add('status');
			item.appendChild(statusMessage);
			//збираємо дані з форми
			const formData = new FormData(item);
			// відправляємо запит на сервер
			postData('assets/server.php', formData)
				.then(res => {
					console.log(res);
					statusMessage.textContent = message.success;
				})
				.catch(() => statusMessage.textContent = message.failure)
				.finally(() => {
					clearInputs();
					setTimeout(() => {
						statusMessage.remove();
					}, 5000);
				});
		});
	});
};

export default forms;