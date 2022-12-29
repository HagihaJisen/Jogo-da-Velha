const cellElements = document.querySelectorAll("[data-cell]");
const board = document.querySelector("[data-board]");
const winningrMessageTextElement = document.querySelector("[data-winning-message-text]");
const winningMessage = document.querySelector("[data-winning-message]");
const restartButton = document.querySelector("[data-restart-button]"); 

let isCircleTurn;

const winningCombinations = [
    [0,1,2],[0,3,6],[2,5,8],[6,7,8],[2,4,6],[0,4,8],[3,4,5],[1,4,7]
];

const StartGame = () =>{
    for (const cell of cellElements){
        let isCircleTurn = false;
        cell.classList.remove("x");
        cell.classList.remove("circle");
        cell.removeEventListener("click", handleClick);
        cell.addEventListener("click", handleClick, {onde: true});
    
    };
    setBoardHoverClass();
    board.classList.add("x");
    winningMessage.classList.remove("show-winning-message");
};

const endGame = (isdraw)=>{
if(isdraw){
    winningrMessageTextElement.innerText = "Empate!"
} else{
    winningrMessageTextElement.innerText = isCircleTurn ? "Círculo Venceu!" : "X Venceu!"
}  
winningMessage.classList.add("show-winning-message");
};



const checkForWin=(currentPlayer)=>{

return winningCombinations.some(Combination=>{
    return Combination.every(index => {
        return cellElements[index].classList.contains(currentPlayer);
    })
})

}

const checkForDraw = ()=>{
    return[...cellElements].every(cell=>{
    return cell.classList.contains("x") || cell.classList.contains("circle");
    })
}

const placemark = (cell, classToAdd) =>{
cell.classList.add(classToAdd);
}

const setBoardHoverClass = ()=>{
board.classList.remove("circle");
board.classList.remove("x");

if (isCircleTurn) {
board.classList.add("circle");
} else{
board.classList.add("x");
}

};
const swapTurns = () => {
isCircleTurn = !isCircleTurn;
setBoardHoverClass();

};
// Colocando marca (x ou circle)
const handleClick = (e) => {
    const cell = e.target;
    const classToAdd = isCircleTurn ? "circle" : "x";

    placemark (cell, classToAdd);

// Verificar por Vitória

const isWin = checkForWin(classToAdd);
 // verificar po empate 
const isdraw = checkForDraw();
    if (isWin){

        endGame(false)}
      
        else if(isdraw){endGame(true)}
        else{
            // Mudar Símbolo
            swapTurns();
        };


}
for (const cell of cellElements){
    cell.addEventListener("click", handleClick, {onde: true});
}
StartGame();
restartButton.addEventListener("click", StartGame);