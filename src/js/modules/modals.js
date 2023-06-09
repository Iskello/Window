const modals = () => {
	function bindModal(triggerSelector, modalSelector, closeSelector, closeClickOverlay = true) {
		const trigger = document.querySelectorAll(triggerSelector),
			modal = document.querySelector(modalSelector),
			close = document.querySelector(closeSelector),
			windows = document.querySelectorAll('[data-modal]'),
			scroll = calcScroll();

		trigger.forEach(item => {
			item.addEventListener('click', (e) => {
				if (e.target) {
					e.preventDefault();
				}

				windows.forEach(item => {
					item.style.display = 'none';
				});

				modal.style.display = 'block';
				/* document.body.style.overflow = 'hidden'; */
				document.body.classList.add('modal-open');
				document.body.style.marginRight = `${scroll}px`;
				clearTimeout(timerId);
			});
		});

		//закриття на хрестик
		close.addEventListener('click', () => {
			windows.forEach(item => {
				item.style.display = 'none';
			});

			modal.style.display = 'none';
			/* document.body.style.overflow = ''; */
			document.body.classList.remove('modal-open');
			document.body.style.marginRight = '0px';
		});

		//закриття по кліку на оверлей
		modal.addEventListener('click', (e) => {
			if (e.target && e.target === modal && closeClickOverlay) {
				windows.forEach(item => {
					item.style.display = 'none';
				});

				modal.style.display = 'none';
				/* document.body.style.overflow = ''; */
				document.body.classList.remove('modal-open');
				document.body.style.marginRight = '0px';
			}
		});

		//закриття на Esc
		document.addEventListener('keydown', (e) => {
			if (e.code === 'Escape' && modal.style.display === 'block') {
				windows.forEach(item => {
					item.style.display = 'none';
				});

				modal.style.display = 'none';
				/* document.body.style.overflow = ''; */
				document.body.classList.remove('modal-open');
				document.body.style.marginRight = '0px';
			}
		});


	}

	let timerId;
	function showModalByTime(selector, time) {
		timerId = setTimeout(function() {
			document.querySelector(selector).style.display = 'block';
			document.body.style.overflow = 'hidden';
		}, time);
	}


	//функція яка рахує ширину скролла
	function calcScroll() {
		let div = document.createElement('div');

		div.style.width = '50px';
		div.style.height = '50px';
		div.style.overflowY = 'scroll';
		div.style.visibility = 'hidden';

		document.body.appendChild(div);
		//отримуємо ширину прокрутки (віднімаємо від повної ширини ширину контенту)
		let scrollWidth = div.offsetWidth - div.clientWidth;
		div.remove();

		return scrollWidth;
	}


	

	bindModal('.popup_engineer_btn', '.popup_engineer', '.popup_engineer .popup_close');
	bindModal('.phone_link', '.popup', '.popup .popup_close');

	
	
	
	bindModal('.popup_calc_btn', '.popup_calc', '.popup_calc_close');	

	//код який перевіряє за заповненість полів ширини і висоти
	const widthInput = document.querySelector('#width');
	const heightInput = document.querySelector('#height');
	const calcButton = document.querySelector('.popup_calc_button');
	let isInputValid = false;

	calcButton.addEventListener('mousedown', (e) => {
		e.preventDefault();

		if (widthInput.value.trim() === '' || heightInput.value.trim() === '') {
			widthInput.focus();
			/* widthInput.classList.add('input-error');
			heightInput.classList.add('input-error'); */
			alert('Будь ласка, заповніть усі поля');
			isInputValid = false; // Значення поля недійсне
		} else {
			isInputValid = true; // Значення поля дійсне
		}
		
		if (isInputValid) {
			bindModal('.popup_calc_button', '.popup_calc_profile', '.popup_calc_profile_close', false);
		}
	});



	/* bindModal('.popup_calc_button', '.popup_calc_profile', '.popup_calc_profile_close', false); */
	bindModal('.popup_calc_profile_button', '.popup_calc_end', '.popup_calc_end_close', false);
	

	

	/* showModalByTime('.popup', 60000); */
};

export default modals;