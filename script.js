"use strict";
window.onload = function () {

	//maska for phone
	const form = document.querySelector('.form');
	const telSelector = form.querySelector('input[type="tel"]');

	const inputMask = new Inputmask('+(9) (999) 999 99 99');
	inputMask.mask(telSelector);

	//justValidate JS


	const validation = new JustValidate('.form', {
		errorLabelStyle: {
			color: '#fa0a16',
		},

	});

	validation.addField('#formName', [
		{
			rule: 'minLength',
			value: 3,
			errorMessage: "Имя должно соержать не менее 3 символов",
		},
		{
			rule: 'maxLength',
			value: 30,
			errorMessage: "Имя должно соержать не более 30 символов"
		},
		{
			rule: 'required',
			value: true,
			errorMessage: "Имя обязательно"
		}
	])
		.addField('#formEmail', [
			{
				rule: 'required',
				value: true,
				errorMessage: "Email обязателен"
			},
			{
				rule: 'customRegexp',
				value: /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
				errorMessage: "Введите корректный email"
			},
		])

		.addField('#formAgreement', [
			{
				rule: 'required',
				value: true,
				errorMessage: "Согласитесь с обработкой персональных данных"
			}
		])

		.addField('#formPhone', [
			{
				rule: 'required',
				value: true,
				errorMessage: "Телефон обязателен"
			},
			{
				rule: 'function',
				validator: function () {
					const phone = telSelector.inputmask.unmaskedvalue();
					return phone.length === 11;
				},
				errorMessage: "Введите корректный телефон"
			}
		]).onSuccess((e) => {
			e.preventDefault();

			if (document.getElementById('er')) {
				document.getElementById('er').remove();
			}

			let formData = new FormData(e.target);

			formData.append('image', formImage.files[0]);

			let xhr = new XMLHttpRequest();

			xhr.onreadystatechange = function () {
				if (xhr.readyState === 4) {
					if (xhr.status === 200) {
						console.log('Sucsess');
						console.log(formData);
					}
				}
			}
			xhr.open('POST', 'mail.php', true);
			xhr.send(formData);

			formPreview.innerHTML = '';
			e.target.reset();

			document.querySelector('.form-button').insertAdjacentHTML('beforebegin', '<div>Форма отправлена</div>');
		});

	//IMAGE 
	const formImage = document.getElementById('formImage');
	const formPreview = document.getElementById('formPreview');

	formImage.addEventListener('change', () => {
		uploadFile(formImage.files[0]);

	});

	function uploadFile(file) {

		if (!['image/jpeg', 'image/png', 'image/gif'].includes(file.type)) {
			formPreview.insertAdjacentHTML('afterend', '<div id="er">Выберите картинку с расширением jpeg, png или gif</div>');
			formPreview.innerHTML = '';
			formImage.value = '';
			return false;
		}
		if (file.size > 2 * 1024 * 1024) {
			formPreview.insertAdjacentHTML('afterend', '<div id="er">Выберите картинку с меньшим размером</div>');
			formPreview.innerHTML = '';
			formImage.value = '';
			return false;
		} else {
			if (document.getElementById('er')) {
				document.getElementById('er').remove();
			}
			var reader = new FileReader();
			reader.onload = function (e) {
				formPreview.innerHTML = `<img id="#files" src="${e.target.result}" alt="Фото">`;
			};
			reader.onerror = function (e) {
				alert('Error');
			};
			reader.readAsDataURL(file);
		}
	}
}