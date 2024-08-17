const gameCells = document.querySelectorAll(".box")
const restartBtn = document.querySelector('.restart')
const winner = document.querySelector(".winner")
const body = document.querySelector('body')
const cursor = document.querySelector('.cursor')
const container = document.querySelector('.container')
// Variables name

let firstPlayer = "X"
let secondPlayer = "O"
let playerTurn = firstPlayer

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
          disableCells()
        }else if(checkTie()){
            winner.innerHTML = `Game is Tie`
            disableCells()
        }else{
            changePlayerTurn()
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
   playerTurn = playerTurn === firstPlayer ? secondPlayer : firstPlayer
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

restartBtn.addEventListener("click", () => {
    location.reload()
})

gameStart()


body.addEventListener('mousemove', (e) => {
   gsap.to(cursor, {
     x: e.x,
     y: e.y,
     duration: 0.1,

   })
})

container.addEventListener('mouseenter', (e) => {
    gsap.to(cursor, {
        opacity:0
   
      })
})
container.addEventListener('mouseleave', (e) => {
    gsap.to(cursor, {
        opacity:1,
   
      })
})