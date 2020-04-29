let canvas;
let ctx;
let character_x = 0;
let character_y = 250;
let isMovingRight = false;
let isMovingLeft = false;
let bg_elements = 0;
let lastJumpStarted = 0;


// -------------- Game config --------------
let JUMP_TIME = 300; // in ms




function init() {
    canvas = document.getElementById('canvas');
    ctx = canvas.getContext("2d");

    draw();

    listenForKeys();
}

function draw() {
    drawBackground();
    updateCharacter();
    requestAnimationFrame(draw);
}

function updateCharacter() {
    let base_image = new Image();
    base_image.src = 'img/charakter_1.png';

    let timePassedSinceJump = new Date().getTime() - lastJumpStarted;
    if (timePassedSinceJump < JUMP_TIME) {
        character_y = character_y - 10;
    } else {
        // Check falling

        if (character_y < 250) {
            character_y = character_y + 10;
        }
    }

    if (base_image.complete) {
        ctx.drawImage(base_image, character_x, character_y, base_image.width * 0.35, base_image.height * 0.35);
    }
}



function drawBackground() {
    ctx.fillStyle = "white";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    drawGround();

}

function drawGround() {
    ctx.fillStyle = "#FFE699";
    ctx.fillRect(0, 375, canvas.width, canvas.height - 375);


    if (isMovingRight) {
        bg_elements = bg_elements - 2;
    }

    if (isMovingLeft) {
        bg_elements = bg_elements + 2;
    }


    let base_image = new Image();
    base_image.src = 'img/bg_elem_1.png';
    if (base_image.complete) {
        ctx.drawImage(base_image, bg_elements, 195, base_image.width * 0.6, base_image.height * 0.6);
    }


    let base_image2 = new Image();
    base_image2.src = 'img/bg_elem_2.png';
    if (base_image2.complete) {
        ctx.drawImage(base_image2, 450 + bg_elements, 120, base_image2.width * 0.6, base_image2.height * 0.6);
    }
}

function listenForKeys() {
    document.addEventListener("keydown", e => {
        const k = e.key;

        if (k == 'ArrowRight') {
            isMovingRight = true;
            character_x = character_x + 5;
        }

        if (k == 'ArrowLeft') {
            isMovingLeft = true;
            character_x = character_x - 5;
        }

        let timePassedSinceJump = new Date().getTime() - lastJumpStarted;

        if (e.code == 'Space' && timePassedSinceJump > JUMP_TIME * 2) {
            lastJumpStarted = new Date().getTime();
        }


    });


    document.addEventListener("keyup", e => {
        const k = e.key;
        if (k == 'ArrowRight') {
            isMovingRight = false;
            character_x = character_x + 5;
        }

        if (k == 'ArrowLeft') {
            isMovingLeft = false;
            character_x = character_x - 5;
        }

        // if (e.code == 'Space') {
        //     isJumping = false;
        // }


    });




}