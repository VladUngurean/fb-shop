// //Константи для бота телеграм
const TOKEN = '6876888038:AAEOSaVQM4wUjmoySghtx_E9aYgmj-yjx1k';
const CHAT_ID = '518855311';
const URI_API = `https://api.telegram.org/bot${TOKEN}/sendMessage`;

// On the second page
const urlParams = new URLSearchParams(window.location.search);
const productName = urlParams.get('product_name');
const userName = urlParams.get('user_name');
const userPhone = urlParams.get('user_phone');

console.log(userName, userPhone, productName);

let checkboxSupplementary = document.querySelectorAll(".tov-item-checkbox");
checkboxSupplementary.forEach(e =>{
	e.addEventListener("click",()=>{
			e.parentElement.classList.add("added-upsell");
			e.nextElementSibling.innerHTML = ("ТОВАР ДОБАВЛЕН");
	})
})

let selectedSupplimentWrapper = document.querySelector(".notification-top-wrapper");
let selectedSupplimentCounter = document.querySelector(".notification-top-quantity");
let countSuppElements = 0;
console.log(countSuppElements);
checkboxSupplementary.forEach(e => {
	e.addEventListener("click", ()=>{
			countSuppElements +=1;
			console.log(countSuppElements);
		if (countSuppElements > 0) {
			selectedSupplimentCounter.innerHTML = `${countSuppElements}`;
			selectedSupplimentWrapper.style.display = "block";
			} else {
				selectedSupplimentWrapper.style.display = "none";
			}
	})
})

const sendSuppProduct = document.querySelectorAll(".send-supp-product");

sendSuppProduct.forEach(e =>{
	e.addEventListener("submit", (event)=>{
		event.preventDefault();
		let inputValue = e.querySelector('input');

		let massage = `Доп. Товары для: ${userName} \n`;
		massage += `Номер: ${userPhone} \n`;
		massage += `Заказал: ${productName} \n`;
		massage += `Дополнительно: ${inputValue.value} \n`;

		console.log(massage);

			axios.post(URI_API, {
				chat_id: CHAT_ID,
				parse_mode: 'html',
				text: massage
			})
			.then( ( res ) => {
				setTimeout( () => {
					// sendOrderForm.submit();
					// location.href = "thank-you.html";
				}, 0 );
			} )
			.catch( ( err ) => {
				console.log(err);
				alert("Ошибка!")
				location.href = "sent.html";
			} )
			.finally( ( err ) => {} );

	})
})

const sendOrderButton = document.getElementById("sendOrderButton");

sendOrderButton.addEventListener( 'click', ( e ) => {
	e.preventDefault();
	location.href = "thank-you.html";
} );