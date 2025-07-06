const spanPlayer = document.querySelector('.player');
const canvas = document.querySelector("canvas");
const ctx = canvas.getContext("2d");
const timer = document.querySelector(".timer");

const size = 30;

let fruit = new Image();
fruit.src = "../imgs/fruit.png";

let headS = new Image();
headS.src ="../imgs/head.png";

let headUp = new Image();
headUp.src ="../imgs/cima.png";

let headL = new Image();
headL.src ="../imgs/esquerda.png";

let headR = new Image();
headR.src ="../imgs/direita.png";

let bodySnake = new Image();
bodySnake.src ="../imgs/bodySnake.png";

let bodyHor = new Image();
bodyHor.src ="../imgs/bodyDeitado.png";

let tailUp = new Image();
tailUp.src ="../imgs/tailUp.png";

let tailDown = new Image();
tailDown.src ="../imgs/tailDown.png";

let tailLeft = new Image();
tailLeft.src ="../imgs/tailLeft.png";

let tailRight = new Image();
tailRight.src ="../imgs/tailRight.png";

let supDir = new Image();
supDir.src ="../imgs/supDir.png";

let supDir1 = new Image();
supDir1.src ="../imgs/supDir1.png";

let supL = new Image();
supL.src ="../imgs/supL.png";

let supCima = new Image();
supCima.src ="../imgs/baixoEsquerda.png";


let bodyVerti= new Image();
bodyVerti.src ="../imgs/bodyVerti.png";

let baixoEsquerda= new Image();
baixoEsquerda.src ="../imgs/baixoEsquerda.png";

let baixoDireita= new Image();
baixoDireita.src ="../imgs/baixoDireita.png";

const snake = [{ x: 270, y: 240 },
       

];

const muteButton = document.getElementById('mute-button');
let isMuted = false; // Estado inicial (som ligado)

const playStartSound = () => {
    if (!isMuted) {
        gameAudio.play().catch(error => console.error("Erro ao tocar som:", error));
    }
};

const toggleMute = () => {
    isMuted = !isMuted; // Inverte o estado

    if (isMuted) {
        gameAudio.pause(); // Pausa o som
        muteButton.innerText = "🔇 Som Mutado"; // Atualiza o botão
    } else {
        gameAudio.play(); // Retoma o som
        muteButton.innerText = "🔊 Som Ligado";
    }
};

// Evento de clique no botão de mute
muteButton.addEventListener("click", toggleMute);

// Iniciar o som quando o jogador pressionar uma tecla
document.addEventListener("keydown", () => {
    if (gameAudio.paused && !isMuted) {
        playStartSound();
    }
});


const food ={
      
}
let direction, loopID;


const incrementTime =() => {
        timer.innerText = +timer.innerText +1;
}

const randomNumber = (min, max) => {
        return Math.round(Math.random() * (max - min) + min)
    }

    const randomPosition = () => {
        const number = randomNumber(0, canvas.width - size);
        return Math.round(number/30)*30;
    }

    let coordenadaX = randomPosition();
    let coordenadaY = randomPosition();
        ctx.drawImage(fruit,coordenadaX,coordenadaY,size,size);

        const drawSnake = () => {
                ctx.fillStyle = "#ddd";
                const tail = snake[0];
            
                snake.forEach((position, index, array) => {
                    const blockAnterior = index > 0 ? array[index - 1] : null;
                    const blockAtual = position;
                    const blockNext = index < array.length - 1 ? array[index + 1] : null;
            
                    if (index === array.length - 1) {
                        if (direction === "up") {
                            ctx.drawImage(headUp, position.x, position.y, size, size);
                        } else if (direction === "down") {
                            ctx.drawImage(headS, position.x, position.y, size, size);
                        } else if (direction === "left") {
                            ctx.drawImage(headL, position.x, position.y, size, size);
                        } else if (direction === "right") {
                            ctx.drawImage(headR, position.x, position.y, size, size);
                        }
                    }
            
                    if (blockAtual && blockNext && blockAtual.x === blockNext.x) {
                        ctx.drawImage(bodyVerti, position.x, position.y-1, size, size);
                    }
                    if (blockAtual && blockNext && blockAtual.y === blockNext.y) {
                        ctx.drawImage(bodyHor, position.x-1, position.y, size, size);
                    }

                    if (blockNext && blockAtual && blockAnterior && blockAtual.x < blockAnterior.x && blockNext.y < blockAtual.y) {
                        ctx.clearRect(position.x,position.y, size,size);
                        ctx.drawImage(supL, position.x, position.y, size, size);
                    }

                    if (blockNext && blockAtual && blockAnterior && blockAtual.x > blockNext.x && blockNext.y === blockAtual.y && blockAnterior.y<blockAtual.y) {
                        ctx.clearRect(position.x,position.y, size,size);
                        ctx.drawImage(baixoEsquerda, position.x, position.y, size, size);
                    }

                    if (blockNext && blockAtual && blockAnterior && blockAtual.x > blockNext.x && blockAtual.y < blockAnterior.y) {
                        ctx.clearRect(position.x,position.y, size,size);
                        ctx.drawImage(supDir, position.x, position.y, size, size);
                    }

                    if (blockNext && blockAtual && blockAnterior && blockAtual.x < blockNext.x && blockAtual.y < blockAnterior.y) {
                        ctx.clearRect(position.x,position.y, size,size);
                        ctx.drawImage(supDir1, position.x, position.y, size, size);
                    }

                    if (blockNext && blockAtual && blockAnterior && blockAtual.x > blockAnterior.x && blockAtual.y < blockNext.y) {
                        ctx.clearRect(position.x,position.y, size,size);
                        ctx.drawImage(supDir, position.x, position.y, size, size);
                    }

                    if (blockNext && blockAtual && blockAnterior && blockAtual.x < blockAnterior.x && blockAtual.y < blockNext.y) {
                        ctx.clearRect(position.x,position.y, size,size);
                        ctx.drawImage(supDir1, position.x, position.y, size, size);
                    }

                    if (blockNext && blockAtual && blockAnterior && blockAtual.x > blockAnterior.x && blockAtual.y > blockNext.y ) {
                        ctx.clearRect(position.x,position.y, size,size);
                        ctx.drawImage(supCima, position.x, position.y, size, size);
                    }

                    if (blockNext && blockAtual && blockAnterior && blockAtual.y > blockAnterior.y && blockAtual.x < blockNext.x ) {
                        ctx.clearRect(position.x,position.y, size,size);
                        ctx.drawImage(supL, position.x, position.y-1, size, size);
                    }



                });
            };
            
            

                


const drawFood = () =>{
        ctx.drawImage(fruit,coordenadaX,coordenadaY,size,size);
        ctx.fillStyle=food.color;
        ctx.fillRect(food.x, food.y, size, size);
}

const drawGrid = () => {

        ctx.lineWidth = 1;
        ctx.strokeStyle = "#191919";


        for (let i = 30; i < canvas.width; i += 30) {
                ctx.beginPath()
                ctx.lineTo(i, 0)
                ctx.lineTo(i, 600)
                ctx.stroke()

                ctx.beginPath()
                ctx.lineTo(0, i)
                ctx.lineTo(600, i)
                ctx.stroke()

        }

       
}

const moveSnake = () => {
        
        if(!direction) return;
        const head = snake[snake.length-1];

          if (direction == "right") {
                snake.push({ x: head.x + size, y: head.y })
           
        }

        if (direction == "left") {
                snake.push({ x: head.x - size, y: head.y })
           
        }

        if (direction == "down") {
                snake.push({ x: head.x , y: head.y + size })

        }

        if (direction == "up") {
                snake.push({ x: head.x , y: head.y - size })
           
        }

    snake.shift();

}

const gameAudio = new Audio('../sounds/snake3.mp3');  // Som do jogo
gameAudio.loop = true; 





window.onload = () => {
        spanPlayer.innerHTML = localStorage.getItem('player');
        
     
}

const checkEat = () => {
    const head = snake[snake.length - 1];

    if (head.x === coordenadaX && head.y === coordenadaY) {
        snake.push(head);

        // Criar um novo objeto de áudio para garantir que sempre toque
        const soundEat = new Audio('../sounds/eat.mp3');
        
        soundEat.play().catch(error => console.error("Erro ao tocar som:", error));

        // Gerar nova posição da fruta
        coordenadaX = randomPosition();
        coordenadaY = randomPosition();

        while (snake.find((position) => position.x === coordenadaX && position.y === coordenadaY)) {
            coordenadaX = randomPosition();
            coordenadaY = randomPosition();
        }
    }
};


function checkcolision(){
        const head = snake[snake.length-1];
        const neckIndex = snake.length - 2
        const wallColision = head.x < 0 || head.x > 570 || head.y < 0 || head.y > 570
      

       const selfColision = snake.find((position, index) => {
        return index < neckIndex && position.x == head.x && position.y == head.y

})
        if( wallColision || selfColision ){
        alert("perdeu");
        gameOver();
       }

}



const gameLoop = () => {
        
        incrementTime();

        clearInterval(loopID)
    
        ctx.clearRect(0, 0, 600, 600)
        drawFood();
        moveSnake();
        drawSnake();
        checkcolision()
        checkEat();
        drawGrid();
        loopID = setTimeout(() => {
            
            gameLoop()
        }, 130)
    }
    
    gameLoop()

const gameOver = () => {

    direction = undefined;
        gameAudio.pause();   // Pausa o áudio
        gameAudio.currentTime = 0;  // Reinicia o som para o começo
    // Adiciona a pontuação ao localStorage
    const score = timer.innerText;  // Aqui você pega o tempo, que é a pontuação
    const player = localStorage.getItem('player');

    
    
    // Recupera o ranking atual (se existir) ou cria um array vazio
    const rankings = JSON.parse(localStorage.getItem('rankings')) || [];

    // Adiciona a pontuação do jogador ao ranking
    rankings.push({ player, score });

    // Ordena os rankings (do maior para o menor)
    rankings.sort((a, b) => b.score - a.score);

    // Salva o ranking atualizado no localStorage
    localStorage.setItem('rankings', JSON.stringify(rankings));

    // Redireciona para a página de ranking
    window.location = 'ranking.html';
};
document.addEventListener("keydown", ({key}) =>{

        if(key == "ArrowRight" && direction != "left") {
                direction = "right";
        }

        if(key == "ArrowLeft" && direction != "right") {
                direction = "left";
        }

        if(key == "ArrowDown" && direction != "up") {
                direction = "down";
        }

        if(key == "ArrowUp" && direction != "down") {
                direction = "up";
        }


})

document.addEventListener("keydown", () => {
    if (gameAudio.paused) {
        playStartSound();
    }
});