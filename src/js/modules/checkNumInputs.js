const checkNumInputs = (selector) => {
    const numInputs = document.querySelectorAll(selector);

    numInputs.forEach(item => {
		item.addEventListener('input', () => {
			//видаляє все, що не є числом
			/* item.value = item.value.replace(/\D/, ''); */
			//видаляється все, що не є числом, - та +
			item.value = item.value.replace(/[^\d+/-]/g, '');
		});
	});



}

export default checkNumInputs;