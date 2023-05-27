import checkNumInputs from './checkNumInputs';

const forms = (state) => {
	const form = document.querySelectorAll('form'),
		inputs = document.querySelectorAll('input'),
		windows = document.querySelectorAll('[data-modal]');

	checkNumInputs('input[name="user_phone"]');
	
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

		// Очищення об'єкта state - при новому заповненні користувач формує новий об'єкт
		for (let key in state) {
			delete state[key];
		}

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

			//додаємо додаткову умову для форми-калькулятор, щоб зібрати дані
			if (item.getAttribute('data-calc') === 'end') {
				for (let key in state) {
					formData.append(key, state[key]);
				}
			}


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
						//форма закривається
						windows.forEach(item => {
							item.style.display = 'none';
						});				
					}, 5000);
				});
		});
	});
};

export default forms;