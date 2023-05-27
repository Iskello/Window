import checkNumInputs from './checkNumInputs';

const changeModalState = (state) => {
	const windowForm = document.querySelectorAll('.balcon_icons_img'),
		windowWidth = document.querySelectorAll('#width'),
		windowHeight = document.querySelectorAll('#height'),
		windowType = document.querySelectorAll('#view_type'),
		windowProfile = document.querySelectorAll('.checkbox');

	checkNumInputs('#width');
	checkNumInputs('#height');

	function bindActionToElems (event, elem, prop) {
		elem.forEach((item, i) => {
			item.addEventListener(event, () => {
				switch(item.nodeName) {
				case 'SPAN' :
					//код для форми балкону
					state[prop] = i;                       
					break;
				case 'INPUT' :
					if (item.getAttribute('type') === 'checkbox') {                            
						//код для профілю - холодний/теплий
						//так як два вибори, то перший - холодне, 2-й - тепле
						i === 0 ? state[prop] = 'Холодне' : state[prop] = 'Тепле';
						//щоб можно було вибрати лише 1 чекбокс
						elem.forEach((box, j) => {
							box.checked = false;
							if (i == j) {
								box.checked = true;
							}
						});
					} else {                            
						//код для висоти/ширини
						state[prop] = item.value;
					}
					break;
				case 'SELECT' :
					state[prop] = item.value;
                        //код для типу балкону
				}                
				console.log(state);
			});
		});
	}

	bindActionToElems('click', windowForm, 'form'); 
	bindActionToElems('input', windowWidth, 'width');
	bindActionToElems('input', windowHeight, 'height');
	bindActionToElems('change', windowType, 'type');
	bindActionToElems('change', windowProfile, 'profile');

	// Додаткова перевірка для додавання значень за замовчуванням
	function addDefaultValues() {
		if (!state.form) {
			// Значення за замовчуванням для форми балкона, якщо не вибрано жодної іконки
			state.form = 0;
		}

		if (!state.type) {
			// Значення за замовчуванням для типу
			state.type = 'tree'; 
		}

		if (!state.profile) {
			// Значення за замовчуванням для профілю, якщо не вибрано жодного чекбокса
			state.profile = 'Холодне'; 
		}
	}

	addDefaultValues();

};

export default changeModalState;