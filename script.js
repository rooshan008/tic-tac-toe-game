const gameCells = document.querySelectorAll(".box")
const restartBtn = document.querySelector('.restart')
const winner = document.querySelector(".winner")
const body = document.querySelector('body')
const cursor = document.querySelector('.cursor')
const container = document.querySelector('.container')
const title = document.querySelector('.title')
let player1 = document.querySelector('.player1')
let player2 = document.querySelector('.player2')
const win = new Audio('./music/y2mate-mp3cut_sRzY6rh.mp3')
const click = new Audio('./music/punch-gaming-sound-effect-hd_RzlG1GE.mp3')
const click1 = new Audio('./music/quack_5.mp3')
const khatam = new Audio('./music/tmp8ljn9e7h.mp3')
const wakeup = new Audio('./music/wake-up-to-reality.mp3')
// Variables name

let firstPlayer = "X"
let secondPlayer = "O"
let playerTurn = firstPlayer

player1.textContent = `Player 1: ${firstPlayer}`
player2.textContent = `Player 1: ${secondPlayer}`

const gameStart = () => {
    gameCells.forEach((cell) => {
        
        cell.addEventListener("click" , handleClick)
        
    })
}

const handleClick = (e) => {

    if(e.target.textContent === ''){
        e.target.textContent = playerTurn
       
        if(checkWinner()){
          winner.innerHTML = `${playerTurn} is winner🏆`
          click1.pause()
          win.play()

          disableCells()
        }else if(checkTie()){
            winner.innerHTML = `Game is Tie`
            wakeup.pause()
            khatam.play()
            disableCells()
        }else{
            changePlayerTurn()
            winner.innerHTML = `Turn for player: ${playerTurn}`
            wakeup.pause()
            click1.play()
        }
    }
}
// function for disable the cell after win or tie the game
const disableCells = () => {
    gameCells.forEach((cell) => {
        cell.removeEventListener('click',handleClick)
        cell.classList.add("disabled")
    })
}

// Funciton to change player turn 

const changePlayerTurn = () => {

    if(playerTurn === firstPlayer){
        playerTurn = secondPlayer
        click.play()
    }else{
        playerTurn = firstPlayer
        click.pause()
        click1.play()
    }
//    playerTurn = playerTurn === firstPlayer ? secondPlayer : firstPlayer
}

// Function to check winner
const checkWinner = () => {
    const winningCondition = [
        [0,1,2],
        [3,4,5],
        [6,7,8],
        [0,3,6],
        [1,4,7],
        [2,5,8],
        [0,4,8],
        [2,4,6]
    ]

    for(let i=0; i<winningCondition.length; i++){
        const [pos1,pos2,pos3] = winningCondition[i]

        if(gameCells[pos1].textContent !== "" && 
            gameCells[pos1].textContent === gameCells[pos2].textContent && 
            gameCells[pos2].textContent === gameCells[pos3].textContent  ){
            return true
        }
    }

    return false
}

// function for check tie 
const checkTie = () => {
    let emptyCellsCount = 0
    gameCells.forEach((cell) => {
        if(cell.textContent === ""){
            emptyCellsCount++
        }
    })

    return emptyCellsCount === 0 && !checkWinner()
}


// function to restart game
const restartGame = () => {
    win.pause()
    wakeup.play()
    gameCells.forEach((cell) => {
        cell.textContent = "";
        cell.classList.remove('disabled');
    })
   gameStart()
}

restartBtn.addEventListener("click", restartGame)

gameStart()


body.addEventListener('mousemove', (e) => {
   gsap.to(cursor, {
     x: e.x,
     y: e.y,
     duration: .3,
     ease: "elastic.out(1,0.3)",

   })
})

container.addEventListener('mouseenter', (e) => {
    cursor.innerHTML = "HI"
    gsap.to(cursor, {
        scale:1.1,
        color:"white",
        fontSize: 14,
        fontWeight:800,

      })
})
container.addEventListener('mouseleave', (e) => {
    cursor.innerHTML = ""
    gsap.to(cursor, {
        scale:1
      })
})


let text = title.innerHTML

let arrayText = text.slice(' ')

