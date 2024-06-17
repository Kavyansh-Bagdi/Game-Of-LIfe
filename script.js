// canvas

const canvas = document.getElementById("canvas");
const ctx = canvas.getContext('2d');

// buttons

const play_pause = document.getElementById("play_pause");
const clear = document.getElementById("clear");
const next = document.getElementById("next");
const generation = document.getElementById("generation");
const population = document.getElementById("population");

// array

let game_array = new Array(2500).fill(0);


// variables

let flag = 0;
let generation_value = 1;
let population_value = sum();

// functions

function sum() {
    return game_array.reduce((sum, value) => sum += value);
}

function index_ij(index){
    let i = Math.floor(index / 50);
    let j = index % 50;
    return [i, j];
}
function ij_index(i, j) {
    return i * 50 + j;
}
function nearest_neighbour(index) {
    const coord = index_ij(index);
    let i = coord[0];
    let j = coord[1];
    let count = 0;

    // inner grid

    if ((i > 0 && i < 49) && (j > 0 && j < 49)) {
        if (game_array[ij_index(i - 1, j)] == 1) count++;
        if (game_array[ij_index(i - 1, j + 1)] == 1) count++;
        if (game_array[ij_index(i - 1, j - 1)] == 1) count++;
        if (game_array[ij_index(i + 1, j)] == 1) count++;
        if (game_array[ij_index(i + 1, j + 1)] == 1) count++;
        if (game_array[ij_index(i + 1, j - 1)] == 1) count++;
        if (game_array[ij_index(i, j + 1)] == 1) count++;
        if (game_array[ij_index(i, j - 1)] == 1) count++;
    }

    // end rows and columns 

    if (i == 0 && (j > 0 && j < 49)) {
        if (game_array[ij_index(i - 1, j)] == 1) count++;
        if (game_array[ij_index(i - 1, j + 1)] == 1) count++;
        if (game_array[ij_index(i - 1, j - 1)] == 1) count++;
        if (game_array[ij_index(i, j + 1)] == 1) count++;
        if (game_array[ij_index(i, j - 1)] == 1) count++;
    }
    if (i == 49 && (j > 0 && j < 49)) {
        if (game_array[ij_index(i + 1, j)] == 1) count++;
        if (game_array[ij_index(i + 1, j + 1)] == 1) count++;
        if (game_array[ij_index(i + 1, j - 1)] == 1) count++;
        if (game_array[ij_index(i, j + 1)] == 1) count++;
        if (game_array[ij_index(i, j - 1)] == 1) count++;
    }
    if (j == 0 && (i > 0 && i < 49)) {
        if (game_array[ij_index(i, j + 1)] == 1) count++;
        if (game_array[ij_index(i + 1, j + 1)] == 1) count++;
        if (game_array[ij_index(j + 1, i - 1)] == 1) count++;
        if (game_array[ij_index(i + 1 , j)] == 1) count++;
        if (game_array[ij_index(i - 1 , j)] == 1) count++;
    }
    if (j == 49 && (i > 0 && i < 49)) {
        if (game_array[ij_index(i, j-1)] == 1) count++;
        if (game_array[ij_index(i + 1 ,j-1)] == 1) count++;
        if (game_array[ij_index(i - 1 ,j-1)] == 1) count++;
        if (game_array[ij_index(i + 1,j)] == 1) count++;
        if (game_array[ij_index(i - 1,j)] == 1) count++;
    }

    // four corners

    if (i == 0 && j == 0) {
        if (game_array[ij_index(i + 1, j + 1)] == 1) count++;
        if (game_array[ij_index(i + 1,j)] == 1) count++;
        if (game_array[ij_index(i, j + 1)] == 1) count++;
    }
    if (i == 0 && j == 49) {
        if (game_array[ij_index(i + 1, j - 1)] == 1) count++;
        if (game_array[ij_index(i + 1, j)] == 1) count++;
        if (game_array[ij_index(i, j - 1)] == 1) count++;
    }
    if (j == 0 && i == 49) {
        if (game_array[ij_index(i  - 1, j + 1)] == 1) count++;
        if (game_array[ij_index(i  - 1, j)] == 1) count++;
        if (game_array[ij_index(i, j + 1)] == 1) count++;
    }
    if (j == 0 && i == 49) {
        if (game_array[ij_index(i  - 1, j - 1)] == 1) count++;
        if (game_array[ij_index(i  - 1, j)] == 1) count++;
        if (game_array[ij_index(i, j - 1)] == 1) count++;
    }
    return count;
};

// game rules
// Any live cell with fewer than two live neighbours dies, as if by underpopulation.
// Any live cell with two or three live neighbours lives on to the next generation.
// Any live cell with more than three live neighbours dies, as if by overpopulation.
// Any dead cell with exactly three live neighbours becomes a live cell, as if by reproduction.

function nextgeneration() {
    const temp_array = new Array(2500).fill(0);
    for (let index = 0; index < 2500; index++){
        if (game_array[index] == 1 && nearest_neighbour(index) < 2) temp_array[index] = 0;
        if (game_array[index] == 1 && (nearest_neighbour(index) <= 3 && nearest_neighbour(index) > 1)) temp_array[index] = 1;
        if (game_array[index] == 1 && nearest_neighbour(index) > 3) temp_array[index] = 0;
        if (game_array[index] == 0 && nearest_neighbour(index) == 3) temp_array[index] = 1;
        
    }
    game_array = temp_array;
};


function render() {
    population.innerHTML = `Population : ${sum()}`;
    generation.innerHTML = `Generation : ${++generation_value}`;
    for (let j = 0; j < 2500; j++) {
        if (game_array[j] == 1) {
            const position = index_ij(j);
            ctx.fillstyle = "rgb(0, 0, 0)";
            ctx.fillRect(position[1] * 10, position[0] * 10, 10, 10);
        }
        else {
            const position = index_ij(j);
            ctx.clearRect(position[1] * 10, position[0] * 10, 10, 10);
        }
    };
}

function draw() {
    render();
    nextgeneration();
    if( flag == 1)
    time = setTimeout(draw, 100);
};

canvas.addEventListener('click', (event) => {
    if (flag == 0) {
        const rect = canvas.getBoundingClientRect();
        let x = event.x - rect.x;
        let y = event.y - rect.y;
        let index = ij_index(Math.floor(y / 10), Math.floor(x / 10));
        if (game_array[index] == 0) {
            const position = index_ij(index);
            ctx.fillstyle = "rgb(0, 0, 0)";
            ctx.fillRect(position[1] * 10, position[0] * 10, 10, 10);
            game_array[index] = 1;
        }
        else {
            const position = index_ij(index);
            ctx.clearRect(position[1] * 10, position[0] * 10, 10, 10);
            game_array[index] = 0;
        }
    }
    population.innerHTML = `Population : ${sum()}`;
});

play_pause.addEventListener("click", () => {
    if (flag == 0) {
        flag = 1;
        play_pause.innerHTML = "Pause";
        draw();
    }
    else {
        play_pause.innerHTML = "Play";
        flag = 0;
    }
});

clear.addEventListener("click", () => {
    game_array.fill(0);
    generation_value = 0;
    render();
    if (flag == 1) {
        play_pause.innerHTML = "Play";
        flag = 0;
    };
});

next.addEventListener("click", () => {
    nextgeneration();
    render();
});