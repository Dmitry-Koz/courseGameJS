let $start = document.querySelector('#start')
let $game = document.querySelector('#game')
let isGameStart = false
let $time = document.querySelector('#time')
let $result = document.querySelector('#result')
let score = 0
let $timeHeader = document.querySelector('#time-header')
let $resultHeader = document.querySelector('#result-header')
let $gameTime = document.querySelector('#game-time')

$start.addEventListener('click', startGame)
$game.addEventListener('click', hendleBoxClick)

$gameTime.addEventListener('input', setGameTime)

function startGame(){
    setGameTime()
    score = 0
    let gameTime = document.querySelector('#game-time').value
    isGameStart = true
    $game.style.backgroundColor = '#fff'
    $start.classList.add('hide')
    let interval = setInterval(function(){
    let time = parseFloat($time.textContent)
    $timeHeader.classList.remove('hide')
    $resultHeader.classList.add('hide')
    $gameTime.setAttribute('disabled', 'true')

        if (time <=0){
            isGameStart = false
            endGame()
            clearInterval(interval)
        }else{
            $time.textContent = (gameTime-=0.1).toFixed(1)
        }
    },100)
    renderBox()
}

function setGameTime() {
    var time = +$gameTime.value
    $time.textContent = time.toFixed(1)
}

function endGame() {
    $start.classList.remove('hide')
    $game.style.backgroundColor = '#ccc'
    $game.innerHTML = ''
    $timeHeader.classList.add('hide')
    $resultHeader.classList.remove('hide')
    $result.textContent = score.toString()
    $gameTime.removeAttribute('disabled')
}


function hendleBoxClick(e) {
    if(isGameStart && e.target.dataset.box){
        score++
        renderBox()
    }
}

function getRandom(min, max){
    return Math.floor(Math.random() * (max - min) + min)
}

function getRandomColor(){
    let letters = '0123456789ABCDF'
    let color = '#'
    for (let i = 0; i<3; i++){
        color += letters[Math.floor(Math.random() * 16)]
    }
    return color
}


function renderBox() {
    $game.innerHTML = ''
    let box = document.createElement('div')
    let boxSize = getRandom(30,100)
    let gameSize = $game.getBoundingClientRect()
    let maxTop = gameSize.height - boxSize
    let maxLeft = gameSize.width - boxSize
    box.style.height = box.style.width = boxSize + 'px'
    box.style.position = 'absolute'
    box.style.backgroundColor = getRandomColor()
    box.style.border = '1.5px black solid'
    box.style.top = getRandom(0, maxTop) + 'px'
    box.style.left = getRandom(0, maxLeft) + 'px'
    box.style.cursor = 'pointer'
    box.setAttribute('data-box', 'true')

    $game.insertAdjacentElement('afterbegin', box)
}