monkey = document.getElementById('monkey')
banana = document.getElementById('banana')
score = document.querySelector('#score span')
counter = 0

function moveLeft(){
     monkeyleft = parseInt(window.getComputedStyle(monkey).getPropertyValue('left'))
     monkeyleft -= 100
     if(monkeyleft >= 0){
     monkey.style.left = monkeyleft + 'px'; 
    }
    }

    function moveRight(){
        monkeyleft = parseInt(window.getComputedStyle(monkey).getPropertyValue('left'))
        monkeyleft += 100
        if(monkeyleft < 300){
        monkey.style.left = monkeyleft + 'px'; 
    }
       }

       document.addEventListener('keydown',function(e){
        if(e.key === 'ArrowLeft'){
            moveLeft()
        }
        if(e.key === 'ArrowRight'){
            moveRight()
        }
       })

       setInterval(function(){
           randumNumber = Math.floor(Math.random() * 3) * 100
          banana.style.left = randumNumber + "px" 
          console.log(randumNumber)
       },2000)


        x = setInterval(function(){
            counter++;
            score.innerHTML = counter;
            bananaTop = parseInt(window.getComputedStyle(banana).getPropertyValue('top'))
            monkeyTop = parseInt(window.getComputedStyle(monkey).getPropertyValue('top'))
            bananaleft = parseInt(window.getComputedStyle(banana).getPropertyValue('left'))
            monkeyleft = parseInt(window.getComputedStyle(monkey).getPropertyValue('left'))

            if((bananaTop > 450) && (bananaTop < 500)){
                if(monkeyleft == bananaleft){

                }else{
                    alert('Game Over');
                    clearInterval(x)
                    counter = 0;
                    banana.style.animation = 'none'
                }
            }
       },10)