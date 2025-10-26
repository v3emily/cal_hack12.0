const boxes = [...document.querySelectorAll('.box')];

boxes.forEach(box => {
    box.addEventListener('click', () => {
        box.classList.add('active');
        setTimeout(() => box.classList.remove('active'), 200);
    });
});

// game logic

let sequence = [];
let playerStep = 0;
let gameActive = false;

const startBtn = document.createElement('button');
startBtn.textContent = 'Start';
startBtn.id = 'startBtn';
document.body.appendChild(startBtn);

function pingTile(id, duration = 600) {
    const box = boxes[id];
    box.classList.add('active');
    setTimeout(() => box.classList.remove('active'), duration);
}

async function playbackSequence() {
    for (let id of sequence) {
        await new Promise(resolve => {
            pingTile(id);
            setTimeout(resolve, 700);
        });
    }
}

function addNextTile() {
    const randomId = Math.floor(Math.random() * 4);
    sequence.push(randomId);
}

function switchProject() {
    window.location.href="./../gameover.html";
}

function handlePlayerClick(clickedId) {
    if (!gameActive) {
        switchProject();
        return;

    } if (clickedId === sequence[playerStep]) {
        playerStep++;
        
        if (playerStep === sequence.length) {
            if (sequence.length >= 3) {
                gameActive = false;
                // switch projects yo 
                switchProject();
                return;
            }
            
            playerStep = 0;
            setTimeout(async () => {
                await playbackSequence();
                addNextTile();
                await new Promise(r => setTimeout(r, 500));
                await playbackSequence();
                playerStep = 0;
            }, 300);
        }
    }
}

boxes.forEach((box, index) => {
    box.addEventListener('click', () => {
        if (gameActive) {
            handlePlayerClick(index);
        }
    });
});

startBtn.addEventListener('click', async () => {
    sequence = [];
    playerStep = 0;
    gameActive = true;
    
    addNextTile();
    await new Promise(r => setTimeout(r, 500));
    await playbackSequence();
    playerStep = 0;
});