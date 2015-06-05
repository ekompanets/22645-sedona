(function(){
  var sendLink=document.querySelector('.btn-send');
  var popupSuccess=document.querySelector('.success-popup');
  var popupFailure=document.querySelector('.failure-popup');
  var closeSuccess=popupSuccess.querySelector('.btn-close');
  var closeFailure=popupFailure.querySelector('.btn-close');

  sendLink.addEventListener('click',function(){

    event.preventDefault();
    popupSuccess.classList.add('popup-show');
    closeSuccess.focus();
  })

  closeSuccess.addEventListener('click', function() {

    event.preventDefault();
    if (popupSuccess.classList.contains('popup-show')) {
      popupSuccess.classList.remove('popup-show');
    }

  })


  // sendLink.addEventListener('click',function(){

  //  event.preventDefault();
  //  popupFailure.classList.add('popup-show');
  //  closeFailure.focus();
  // })

  // closeFailure.addEventListener('click', function() {

  //  event.preventDefault();
  //  if (popupFailure.classList.contains('popup-show')) {
  //    popupFailure.classList.remove('popup-show');
  //  }

  // })
})();

(function(){
  
  
})();

