//Константи для бота телеграм
// const TOKEN = '6876888038:AAEOSaVQM4wUjmoySghtx_E9aYgmj-yjx1k';
// const CHAT_ID = '518855311';
// const URI_API = `https://api.telegram.org/bot${TOKEN}/sendMessage`;

let productName = document.querySelector("title");
const placeOrderForm = document.getElementById("placeOrderForm");
let buttonOrderSend = document.getElementById("buttonPlaceOrder");
let nameInput = document.querySelector( '#userName' );
//перевірка номеру

let inputPhone = document.querySelector('#phone');
// Маска для телефона
const mask = new IMask(inputPhone, {
    mask: '+373(00)00-00-00',
    lazy: false
});


function checkInput() {
    if (inputPhone.value.length > 0 && inputPhone.value[5] == '0' || inputPhone.value[0] == 0) {
        inputPhone.value = '';
    }
}

function checkInput() {
    if (inputPhone.value.length > 0 && inputPhone.value[5] == '0' || inputPhone.value[0] == 0) {
        inputPhone.value = '';
    }
}

buttonOrderSend.addEventListener("click", ( e ) =>{
	// e.preventDefault();
	let massage = `<b>Заявка c сайта: ${productName.innerText}</b> \n`;
		massage += `<b>Имя: ${nameInput.value} </b>\n`;
		massage += `<b>Номер: ${inputPhone.value}</b>\n`;
	console.log(massage);
    // location.href = "sent.html";

	axios.post(URI_API, {
        chat_id: CHAT_ID,
        parse_mode: 'html',
        text: massage
    })
    .then( ( res ) => {
        placeOrderForm.submit();
        location.href = "sent.html";

        // 	location.href = "supplementary_products.html";
    } )
    .catch( ( err ) => {
        console.log(err);
        alert("Ошибка!")
        sendOrderForm.reset();
    } )
    .finally( ( err ) => {
        sendOrderForm.reset();
    } );
	
});