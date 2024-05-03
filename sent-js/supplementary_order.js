// //Константи для бота телеграм
const TOKEN = '6876888038:AAEOSaVQM4wUjmoySghtx_E9aYgmj-yjx1k';
const CHAT_ID = '518855311';
const URI_API = `https://api.telegram.org/bot${TOKEN}/sendMessage`;

document.querySelectorAll(".tov-button").forEach(e =>{
	e.addEventListener("change", ()=>{
		if(e.firstElementChild.checked){
			e.style.background = " transparent linear-gradient(to bottom, rgb(46, 216, 3) 0%, rgb(61, 180, 31) 100%) repeat scroll 0% 0%";
			e.lastElementChild.innerHTML = "Добавлено!"
			console.log(e.firstElementChild.value);
		} 
		if (!e.firstElementChild.checked) {
			e.style.background = "transparent linear-gradient(to bottom, rgb(246, 173, 0) 0%, rgb(255, 129, 26) 100%) repeat scroll 0% 0%";
			e.lastElementChild.innerHTML = "Добавить к заказу"
		}
	})
})

// On the second page
const urlParams = new URLSearchParams(window.location.search);
const productName = urlParams.get('product_name');
const userName = urlParams.get('user_name');
const userPhone = urlParams.get('user_phone');

console.log(userName, userPhone, productName);

let checkboxSupplementary = document.querySelectorAll(".tov-item-checkbox");
checkboxSupplementary.forEach(e =>{
	e.addEventListener("click",()=>{
		if(e.checked){
			e.parentElement.classList.add("added-upsell");
			e.nextElementSibling.innerHTML = ("УБРАТЬ ТОВАР");
		}
		if (!e.checked) {
			e.parentElement.classList.remove("added-upsell");
			e.nextElementSibling.innerHTML = ("Добавить товар");
		}
	})
})

let selectedSupplimentWrapper = document.querySelector(".notification-top-wrapper");
let selectedSupplimentCounter = document.querySelector(".notification-top-quantity");
let countSuppElements = 0;
console.log(countSuppElements);
checkboxSupplementary.forEach(e => {

	e.addEventListener("change", ()=>{
		if (e.checked) {
			countSuppElements +=1;
			console.log(countSuppElements);
		}
		if (!e.checked) {
			countSuppElements -=1;
			console.log(countSuppElements);
		}
		if (countSuppElements > 0) {
			selectedSupplimentCounter.innerHTML = `${countSuppElements}`;
			selectedSupplimentWrapper.style.display = "block";
			} else {
				selectedSupplimentWrapper.style.display = "none";
			}
	})

})
const sendOrderButton = document.getElementById("sendOrderButton");
const sendOrderForm = document.getElementById("sendOrderForm");

// відправка повідомлення
sendOrderButton.addEventListener( 'click', ( e ) => {
	e.preventDefault();
	let isAtLeastOneChecked = Array.from(checkboxSupplementary).some(checkbox => checkbox.checked);
	if (isAtLeastOneChecked) {
		if (userName.length > 3 && userPhone != null) {
			let massage = `Доп. Товары для: ${userName} \n`;
			massage += `Номер: ${userPhone} \n`;
			massage += `Заказал: ${productName} \n`;
			checkboxSupplementary.forEach(e=>{
				if (e.checked) {
					massage += `Дополнительно: ${e.value} \n`;
				}
			})
			console.log(massage);
	// 		console.log(isAtLeastOneChecked);
	
	// 		console.log(massage);
			axios.post(URI_API, {
				chat_id: CHAT_ID,
				parse_mode: 'html',
				text: massage
			})
			.then( ( res ) => {
				setTimeout( () => {
					sendOrderForm.submit();
					location.href = "thank-you.html";
				}, 0 );
			} )
			.catch( ( err ) => {
				console.log(err);
				alert("Ошибка!")

				location.href = "sent.html";
			} )
			.finally( ( err ) => {} );
			sendOrderForm.reset();
		}
	} else {
		alert("Вы не выбрали дополнительный товар!")
		// location.href = "sent.html";
	}

} );