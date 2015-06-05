var sendLink=document.querySelector('.btn-send');
var popupSuccess=document.querySelector('.success-popup');
var close=popupSuccess.querySelector('.btn-close');

send_link.addEventListener('click',function(){

	event.preventDefault();
	popupSuccess.classList.add('success-popup__show');
	close.focus();

})