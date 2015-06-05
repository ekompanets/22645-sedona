var sendLink=document.querySelector('.btn-send');
var popupSuccess=document.querySelector('.success-popup');
var close=popupSuccess.querySelector('.btn-close');

sendLink.addEventListener('click',function(){

	event.preventDefault();
	popupSuccess.classList.add('success-popup__show');
	close.focus();
})

close.addEventListener('click', function() {

	event.preventDefault();
	popupSuccess.classList.contains('success-popup__show') {
		popupSuccess.classList.remove('success-popup__show');
	}
	
})