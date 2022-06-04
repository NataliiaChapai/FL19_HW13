const two = 2;
const three = 3;
const four = 4;
const five = 5;
const six = 6;
const seven = 7;
const eight = 8;
const nine = 9;
const ten = 10;
const boxCount = 9;
let cross = true;
let position = 4;
let keyboadStatus = true;

document.addEventListener('DOMContentLoaded', onLoad);
function onLoad() { 
    const container = document.querySelector('.container');  
    const result = document.querySelector('.announcer');
    const resetBtn = document.querySelector('#reset');
    const players = document.querySelectorAll('.avatar-container');
    const users = document.querySelectorAll('[data-item]');
    const currentPlayer = document.querySelector('.display-player');
    
    container.addEventListener('click', onBoxClick);
    resetBtn.addEventListener('click', onResetBtnClick);
    document.addEventListener('keydown', onKeydown);
        
    for (let player of players) {
        player.ondragover = onDragOver;
        player.ondrop = onDrop;
    }
    
    for (let user of users) {
        user.draggable = 'true';
        user.ondragstart = onDragStart;
        }
    
    for (let i = 0; i < boxCount; i++) {
        const box = '<div class="tile"></div>';
        container.insertAdjacentHTML('beforeend', box);
    }
    const tiles = document.querySelectorAll('.tile');
        
    function onBoxClick(event) {
        if (event.target.textContent !== '') {
            return;
        }
        if (cross) {
            event.target.textContent = 'X';
            event.target.classList.add('playerX');
            cross = !cross;
            currentPlayer.textContent = 'O';
            currentPlayer.classList.add('playerO');
        } else {
            event.target.textContent = 'O';
            event.target.classList.add('playerO');
            cross = !cross;
            currentPlayer.textContent = 'X';
            currentPlayer.classList.remove('playerO');
        }
        winner();
    }
    
    function onResetBtnClick(event) {
        for (let i = 0; i < boxCount; i++) {
            container.children[i].textContent = '';
            container.children[i].classList.remove('playerO');
            container.children[i].classList.remove('playerX');
        }
        event.target.blur();
        container.addEventListener('click', onBoxClick);
        cross = true;
        result.classList.add('hide');
        position = four;
        keyboadStatus === true;
        currentPlayer.textContent = 'X';
        currentPlayer.classList.remove('playerO');
        currentPlayer.classList.add('playerX');
        for (let tile of tiles) {
            tile.style.backgroundColor = 'transparent';
        }
        for (let user of users) {
            user.draggable = 'false';
        }
    }

    function onDragOver(event) {
        event.preventDefault();
    }

    function onDragStart(event) {
        event.dataTransfer.setData('data-item', event.target.getAttribute('data-item'))
    }

    function onDrop(event) {
        let dataItem = event.dataTransfer.getData('data-item');
        event.target.append(users[dataItem - 1]);
        event.currentTarget.ondrop = () => false;
    }

    function onKeydown(event) {
        if (event.key === 'ArrowLeft' && keyboadStatus || event.key === 'ArrowRight' && keyboadStatus) {
            tiles[four].style.backgroundColor = 'grey';
            keyboadStatus = false;    
        }

        if (event.key === 'ArrowRight' && position < nine) {
            tiles[position].style.backgroundColor = 'grey';
            if (position > 0) {
                tiles[position - 1].style.backgroundColor = 'transparent';
            }
            if (position < nine) {
                position += 1;
            }    
        }

        if (event.key === 'ArrowLeft' && position > 0 && position < ten) {
            
            if (position > 1) {
               tiles[position - two].style.backgroundColor = 'grey'; 
            }
            if (position > 1) {
                tiles[position - 1].style.backgroundColor = 'transparent';
                position -= 1;
            }            
        }

        if (event.key === 'Enter') {
            if (tiles[position - 1].textContent !== '') {
                return;
            }
            if (cross) {
            tiles[position - 1].textContent = 'X';
            tiles[position - 1].classList.add('playerX');
            cross = !cross;
            } else {
            tiles[position - 1].textContent = 'O';
            tiles[position - 1].classList.add('playerO');
            cross = !cross;
            }
        }
        winner()
    }
    
    function winner() {
        if (tiles[0].textContent === 'X' && tiles[1].textContent === 'X' && tiles[two].textContent === 'X'
            || tiles[0].textContent === 'O' && tiles[1].textContent === 'O' && tiles[two].textContent === 'O'
            || tiles[three].textContent === 'X' && tiles[four].textContent === 'X' && tiles[five].textContent === 'X'
            || tiles[three].textContent === 'O' && tiles[four].textContent === 'O' && tiles[five].textContent === 'O'
            || tiles[six].textContent === 'X' && tiles[seven].textContent === 'X' && tiles[eight].textContent === 'X'
            || tiles[six].textContent === 'O' && tiles[seven].textContent === 'O' && tiles[eight].textContent === 'O'
            || tiles[0].textContent === 'X' && tiles[four].textContent === 'X' && tiles[eight].textContent === 'X'
            || tiles[0].textContent === 'O' && tiles[four].textContent === 'O' && tiles[eight].textContent === 'O'
            || tiles[two].textContent === 'X' && tiles[four].textContent === 'X' && tiles[six].textContent === 'X'
            || tiles[two].textContent === 'O' && tiles[four].textContent === 'O' && tiles[six].textContent === 'O'
            || tiles[0].textContent === 'X' && tiles[three].textContent === 'X' && tiles[six].textContent === 'X'
            || tiles[0].textContent === 'O' && tiles[three].textContent === 'O' && tiles[six].textContent === 'O'
            || tiles[1].textContent === 'X' && tiles[four].textContent === 'X' && tiles[seven].textContent === 'X'
            || tiles[1].textContent === 'O' && tiles[four].textContent === 'O' && tiles[seven].textContent === 'O'
            || tiles[two].textContent === 'X' && tiles[five].textContent === 'X' && tiles[eight].textContent === 'X'
            || tiles[two].textContent === 'O' && tiles[five].textContent === 'O' && tiles[eight].textContent === 'O') {
            container.removeEventListener('click', onBoxClick);
            result.classList.remove('hide');
            if (cross === false) {
                const winnerX = '<p>Player <span class="playerX">X Won</span></p>';
                result.innerHTML = winnerX;
            }
            if (cross === true) {
                const winnerO = '<p>Player <span class="playerO">O Won</span></p>';
                result.innerHTML = winnerO;
            }
        } else {
            
        let draw = Array.from(tiles).find(tile => tile.textContent === '');
        if (!draw) {
            const message = '<p>Draw!</p>'
            result.classList.remove('hide');
            result.innerHTML = message;
            }
        }
    }
}
     
  