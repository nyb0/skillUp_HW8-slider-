document.addEventListener('DOMContentLoaded', function(){

    var carouselSlide = document.querySelector('.carousel-slide');
    var dotes = document.querySelectorAll('.fa-circle');

//--------------CREATE COPY OF FIRTS & LAST IMAGES IN SLIDER----------------------------------------
    var slides = document.querySelectorAll('.carousel-slide>img');
    var firstImgClone = slides[0].cloneNode(true);
    var lastImgClone = slides[slides.length-1].cloneNode(true);
    slides[0].parentElement.insertBefore(lastImgClone, slides[0]);
    slides[0].parentElement.appendChild(firstImgClone);
    
//--------------SELECT SLIDER WITH CLONES-----------------------------------------------------------
    slides = document.querySelectorAll('.carousel-slide>img');
    
//--------------SELECT BUTTONS----------------------------------------------------------------------
    var nextBtn = document.getElementById('next');
    var prevBtn = document.getElementById('prev');

//--------------IMG COUNTER-------------------------------------------------------------------------
    var imgCounter = 1;
    
//--------------DOTES COUNTER-----------------------------------------------------------------------
    var dotesCounter = 0;

//--------------GET SIZE OF SLIDES|SELECT SHOWED IMG------------------------------------------------
    var size = slides[0].clientWidth;
    carouselSlide.style.transform = 'translateX(' + (-size*imgCounter) + 'px)';

//--------------SLIDER'S ANIMATION FUNCTION---------------------------------------------------------    
    var timerId = setInterval(function () {
        moveImg('next');
    }, 5000);

//--------------ON-CLICK ANIMATION FUNCTION---------------------------------------------------------
    var clickButton = function (event){
        var btn = event.currentTarget.getAttribute('id');
        moveImg(btn);
        
        clearInterval(timerId);
        timerId = setInterval(function () {
            moveImg('next');
        }, 5000);
    }

//--------------ADD LISTENERS-----------------------------------------------------------------------
    nextBtn.addEventListener('click', clickButton);
    prevBtn.addEventListener('click', clickButton);

//--------------ADD LISTENERS ON DOTES (FUNCTION)---------------------------------------------------
    for (var i=0; i<dotes.length; i++){
        dotes[i].setAttribute('data-id', i);
        dotes[i].addEventListener('click', function(event){

            carouselSlide.style.transition = 'transform 0.5s ease-in-out';

            imgCounter = parseInt(event.currentTarget.getAttribute('data-id')) + 1;
            carouselSlide.style.transform = 'translateX(' + (-size*imgCounter) + 'px)';
            
            swapDotes();
            dotesCounter = event.currentTarget.getAttribute('data-id');
            swapDotes();
            
            clearInterval(timerId);
            timerId = setInterval(function () {
                moveImg('next');
            }, 5000);
        });
    }

    function swapDotes(){        
        dotes[dotesCounter].classList.toggle('fas');
        dotes[dotesCounter].classList.toggle('far');
    }

//--------------MOVE IMG FUNCTION-------------------------------------------------------------------
    function moveImg(btn){

        carouselSlide.style.transition = 'transform 0.5s ease-in-out';

        //--------------CLICKED BUTTON IS NEXT------------------------------------------------------
        if (btn === 'next'){
        //--------------MOVE DOTES------------------------------------------------------------------
            swapDotes();
            if(dotesCounter < dotes.length - 1){
                dotesCounter++;
                swapDotes();
            }
            else{
                dotesCounter = 0;
                swapDotes();
            }
        //--------------MOVE IMG--------------------------------------------------------------------
            imgCounter++;
            carouselSlide.style.transform = 'translateX(' + (-size*imgCounter) + 'px)';
        }
        //--------------CLICKED BUTTON IS PREVIOUS--------------------------------------------------
        else if (btn === 'prev'){
        //--------------MOVE DOTES------------------------------------------------------------------
                swapDotes();
            
            if(dotesCounter > 0){
                dotesCounter--;
                swapDotes();
            }
            else{
                dotesCounter = dotes.length - 1;
                swapDotes();
            }
        //--------------MOVE IMG--------------------------------------------------------------------
            imgCounter--;
            carouselSlide.style.transform = 'translateX(' + (-size*imgCounter) + 'px)';
        }

    }

//--------------ADD LISTENER ON SLIDER'S START|END--------------------------------------------------
    carouselSlide.addEventListener('transitionend', function(){

        if (imgCounter >= slides.length - 1){
            carouselSlide.style.transition = 'none';
            imgCounter = slides.length - imgCounter;            
        }
        if (imgCounter <= 0){
            carouselSlide.style.transition = 'none';
            imgCounter = slides.length - 2;
        }
        carouselSlide.style.transform = 'translateX(' + (-size*imgCounter) + 'px)';
        console.log('imgNumber = ' + imgCounter);
    });
    
});