hero = document.getElementById('hero')
villian = document.getElementById('villian')
score = document.querySelector('#score span')


counter = 0

function moveLeft(){
    heroLeft = parseInt(window.getComputedStyle(hero).getPropertyValue('left'));
    heroLeft -= 100
    if(heroLeft >= 0){
    hero.style.left = heroLeft + "px" 
}
}

function moveRight(){
    heroLeft = parseInt(window.getComputedStyle(hero).getPropertyValue('left'));
    heroLeft += 100
    if(heroLeft < 300){
    hero.style.left = heroLeft + "px" 
    }
}

document.addEventListener('keydown',function(e){ 
    if(e.key === "ArrowLeft"){
        moveLeft()
    }
    if(e.key === "ArrowRight"){
        moveRight()
    }
})

setInterval(function(){
     randomNum = Math.floor((Math.random() * 3)) * 100;
    villian.style.left = randomNum + 'px' 
    },2000)


x = setInterval(function(){
    counter++
    score.innerHTML =counter;    
        heroTop = parseInt(window.getComputedStyle(hero).getPropertyValue('top'))
        villianTop = parseInt(window.getComputedStyle(villian).getPropertyValue('top'))
        heroleft = parseInt(window.getComputedStyle(hero).getPropertyValue('left'))
        villianleft = parseInt(window.getComputedStyle(villian).getPropertyValue('left'))
           
        if((villianTop > 450) && (villianTop < 500) ){
               
            if( (heroleft == villianleft)){
            
            } else{
                alert('Game Over')
                counter = 0;
                clearInterval(x)
                villian.style.animation = 'none'
            }
          
        }

    },10)
