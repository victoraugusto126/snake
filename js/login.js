const input = document.querySelector('.login__input');
const button = document.querySelector('.login__button');
const form = document.querySelector('.login-form');

// Função para tocar o som de início
const playStartSound = () => {
  const audio = new Audio('../sounds/8bit.mp3');  
  audio.play();
};

window.addEventListener('click', () => {
  playStartSound();
  window.removeEventListener('click', playStartSound);
});

const validateInput = ({ target }) => {
  if (target.value.length > 3) {
    button.removeAttribute('disabled');
    return;
  }

  button.setAttribute('disabled', '');
};

const handleSubmit = (event) => {
  event.preventDefault();
  localStorage.setItem('player', input.value);

  playStartSound();

  window.location = 'game.html';
};

input.addEventListener('input', validateInput);
form.addEventListener('submit', handleSubmit);
