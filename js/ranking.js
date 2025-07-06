const rankingList = document.getElementById("ranking-list");

// Recupera o ranking armazenado no localStorage
const rankings = JSON.parse(localStorage.getItem("rankings")) || [];

// Limitar a 10 rankings
const topRankings = rankings.slice(0, 5);

// Cria os elementos de ranking
topRankings.forEach((entry, index) => {
    const rankingItem = document.createElement("div");
    rankingItem.classList.add("ranking-item");

    const playerName = document.createElement("span");
    playerName.textContent = `${index + 1}. ${entry.player}`;

    const score = document.createElement("span");
    score.classList.add("score");
    score.textContent = `${entry.score} pontos`;

    rankingItem.appendChild(playerName);
    rankingItem.appendChild(score);

    rankingList.appendChild(rankingItem);
});

document.querySelector('.restart-btn').addEventListener('click', () => {
    window.location.href = 'game.html'; // Substitua pelo nome correto da sua página de jogo
});

document.querySelector('.exit-btn').addEventListener('click', () => {
    window.close(); // Fecha a aba ou a janela do navegador
});
