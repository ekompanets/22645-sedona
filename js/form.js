// Отправка формы
(function(){


//  мобильное меню

  var toggle=document.querySelector(".toggle");
  var navClose=document.querySelector(".main-nav__close");
  var mainNav=document.querySelector(".main-nav");

  toggle.addEventListener("click", function(event) {
      console.log('click'+toggle);
      event.preventDefault();
      mainNav.classList.add("main-nav__show");
  })

  navClose.addEventListener("click", function(event) {
    event.preventDefault();
     if (mainNav.classList.contains("main-nav__show")) {
      mainNav.classList.remove("main-nav__show");
     }
  })

  //  -- мобильное меню

  
  if (!('FormData' in window)) {
    return;
  }
  var queue=[];
  
  var form=document.querySelector('.comment__form');

  form.addEventListener('submit', function(event) {
    event.preventDefault();

    var data = new FormData(form);

    queue.forEach(function(element){
      data.append("images",element.file);
    });

    request(data, function(response) {

      console.log(response);

    })

    
      successPopup();
  })

  function request(data, fn) {
    var xhr=new XMLHttpRequest();
    var time=(new Date()).getTime();
     
    xhr.open('post', 'http://simonenko.su/academy/echo?'+time);

    xhr.addEventListener('readystatechange', function() {
      if (xhr.readyState==4) {
        fn(xhr.responseText);
      }
    });

    xhr.send(data);
  }

  //вывод окна об успешной отправке

  function successPopup(){
    var sendLink=document.querySelector('.btn-send');
    var popupSuccess=document.querySelector('.success-popup');
    var popupFailure=document.querySelector('.failure-popup');
    var closeSuccess=popupSuccess.querySelector('.btn-close');
    var closeFailure=popupFailure.querySelector('.btn-close');

    // sendLink.addEventListener('click',function(){

    //   event.preventDefault();
    //   popupSuccess.classList.add('popup-show');
    //   closeSuccess.focus();
    // })
    popupSuccess.classList.add('popup-show');
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
  }

  
  
  //Загрузка фотографий

  if ('FileReader' in window) {
    var area=document.querySelector('.upload-images');
    var template = document.querySelector("#image-template").innerHTML;
    var queue=[];

    form.querySelector('#upload-photo').addEventListener('change', function() {
      var files=this.files;

      for (var i=0; i<files.length; i++) {
        preview(files[i]);
      }
      this.value='';
    })

    function preview(file) {

      if (file.type.match(/image.*/)) {
        var reader= new FileReader();

        reader.addEventListener('load', function(event) {

          var html=template.replace ("{{image}}",event.target.result);
          html=html.replace("{{name}}", file.name);

          var li=document.createElement("li");
          li.classList.add("upload-images__item");
          li.innerHTML=html;

          area.appendChild(li);

          li.querySelector(".upload-images__del-link").addEventListener("click", function(event) {
            event.preventDefault();
            removePreview(li);
          } )

          // var img=document.createElement('img');
          // img.src=event.target.result;
          // img.alt=file.name;

          //area.innerHTML=area.innerHTML+html;

          // area.appendChild(img);

           queue.push({"file": file, "li": li});
        })


        reader.readAsDataURL(file);
      }
    }


    function removePreview(li) {
      queue=queue.filter(function(element) {
        return element.li!=li;
      })

      li.parentElement.removeChild(li);
    }
  }

//блок инкремент-декремент
// Добавление путешественника -----------
  var areaTravel=document.querySelector('.comment__traveler-list');
  var templateTravel = document.querySelector("#traveler-template").innerHTML;

// ------ Добавление путешественника

  var elements=document.querySelectorAll(".input-numeric");
  for (var i=0; i<elements.length; i++) {
    initNumberField(elements[i]);
    
  }

  function initNumberField(parent) {

    var input=parent.querySelector("input");
    var minus=parent.querySelector(".input-numeric__icon-minus");
    var plus=parent.querySelector(".input-numeric__icon-plus");

    minus.addEventListener("click", function() {      
     changeNumber(false,
                  parent.classList.contains("input-numeric--traveler"),
                  parent.classList.contains("input-numeric--date"));
    });

    plus.addEventListener("click", function() {
      changeNumber(true,
                  parent.classList.contains("input-numeric--traveler"),
                  parent.classList.contains("input-numeric--date"));
    });

    function changeNumber(operation, operTraveler,operDate) {
      var value=Number(input.value);
      if (isNaN(value)) {
        value=0;
      }

      if (operation) {
        if (value<999) {
          input.value=value+1;
          if (operTraveler) {
            var li=document.createElement("li");
            li.classList.add("traveler");
            li.innerHTML=templateTravel.replace("{{num}}", input.value);
            areaTravel.appendChild(li);
          }

          if (operDate) {
          }
        }
      } else {
        if (value>0) {
          input.value=value-1;
          if (operTraveler) {
            var li=document.querySelector(".traveler:last-child");
            li.parentElement.removeChild(li);
          }

          if (operDate) {
          }
        }
      }
    }
  }

})();