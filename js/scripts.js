$(document).ready((function(){function t(t){return"<span>"+(t=("00"+t).substr(-2))[0]+"</span><span>"+t[1]+"</span>"}$("a[href^='#']").click((function(){var t=$(this).attr("href");return $("html, body").animate({scrollTop:$(t).offset().top+"px"}),!1})),function e(){var n=new Date,a=new Date;a.setHours(23),a.setMinutes(59),a.setSeconds(59),23===n.getHours()&&59===n.getMinutes()&&59===n.getSeconds&&a.setDate(a.getDate()+1);var o=Math.floor((a.getTime()-n.getTime())/1e3),i=Math.floor(o/3600);o-=3600*i;var s=Math.floor(o/60);o-=60*s,$(".timer .hours").html(t(i)),$(".timer .minutes").html(t(s)),$(".timer .seconds").html(t(o)),setTimeout(e,200)}(),$(".order_form").submit((function(){return""==$(this).find("input[name='name']").val()&&""==$(this).find("input[name='phone']").val()?(alert("Введите Ваши имя и телефон"),$(this).find("input[name='name']").focus(),!1):""==$(this).find("input[name='name']").val()?(alert("Введите Ваше имя"),$(this).find("input[name='name']").focus(),!1):""!=$(this).find("input[name='phone']").val()||(alert("Введите Ваш телефон"),$(this).find("input[name='phone']").focus(),!1)}))})),$(window).on("load",(function(){$(".slider").owlCarousel({items:1,loop:!0,autoHeight:!0,smartSpeed:300,mouseDrag:!1,pullDrag:!1,nav:!0,navText:"",autoplay:!0,autoplayTimeout:2500,autoplayHoverPause:!0}),$(".reviews_list4").owlCarousel({items:1,loop:!0,autoHeight:!0,smartSpeed:300,mouseDrag:!1,pullDrag:!1,nav:!0,navText:""})}));

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