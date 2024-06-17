const canvas = document.getElementById("canvas");
const ctx = canvas.getContext('2d');

// array
let game_array = new Array(10000).fill(0);


game_array[103] = 1;
game_array[204] = 1;
game_array[304] = 1;
game_array[302] = 1;
game_array[303] = 1;

// functions


function index_ij(index){
    let i = Math.floor(index / 100);
    let j = index % 100;
    return [i, j];
}
function ij_index(i, j) {
    return i * 100 + j;
}
function nearest_neighbour(index) {
    const coord = index_ij(index);
    let i = coord[0];
    let j = coord[1];
    let count = 0;

    // inner grid

    if ((i > 0 && i < 99) && (j > 0 && j < 99)) {
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

    if (i == 0 && (j > 0 && j < 99)) {
        if (game_array[ij_index(i - 1, j)] == 1) count++;
        if (game_array[ij_index(i - 1, j + 1)] == 1) count++;
        if (game_array[ij_index(i - 1, j - 1)] == 1) count++;
        if (game_array[ij_index(i, j + 1)] == 1) count++;
        if (game_array[ij_index(i, j - 1)] == 1) count++;
    }
    if (i == 99 && (j > 0 && j < 99)) {
        if (game_array[ij_index(i + 1, j)] == 1) count++;
        if (game_array[ij_index(i + 1, j + 1)] == 1) count++;
        if (game_array[ij_index(i + 1, j - 1)] == 1) count++;
        if (game_array[ij_index(i, j + 1)] == 1) count++;
        if (game_array[ij_index(i, j - 1)] == 1) count++;
    }
    if (j == 0 && (i > 0 && i < 99)) {
        if (game_array[ij_index(i, j + 1)] == 1) count++;
        if (game_array[ij_index(i + 1, j + 1)] == 1) count++;
        if (game_array[ij_index(j + 1, i - 1)] == 1) count++;
        if (game_array[ij_index(i + 1 , j)] == 1) count++;
        if (game_array[ij_index(i - 1 , j)] == 1) count++;
    }
    if (j == 99 && (i > 0 && i < 99)) {
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
    if (i == 0 && j == 99) {
        if (game_array[ij_index(i + 1, j - 1)] == 1) count++;
        if (game_array[ij_index(i + 1, j)] == 1) count++;
        if (game_array[ij_index(i, j - 1)] == 1) count++;
    }
    if (j == 0 && i == 99) {
        if (game_array[ij_index(i  - 1, j + 1)] == 1) count++;
        if (game_array[ij_index(i  - 1, j)] == 1) count++;
        if (game_array[ij_index(i, j + 1)] == 1) count++;
    }
    if (j == 0 && i == 99) {
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
    const temp_array = new Array(10000).fill(0);
    for (let index = 0; index < 10000; index++){
        if (game_array[index] == 1 && nearest_neighbour(index) < 2) temp_array[index] = 0;
        if (game_array[index] == 1 && (nearest_neighbour(index) <= 3 && nearest_neighbour(index) > 1)) temp_array[index] = 1;
        if (game_array[index] == 1 && nearest_neighbour(index) > 3) temp_array[index] = 0;
        if (game_array[index] == 0 && nearest_neighbour(index) == 3) temp_array[index] = 1;
        
    }
    game_array = temp_array;
};


function render() {
    for (let j = 0; j < 10000 ; j++) {
        if (game_array[j] == 1) {
            const position = index_ij(j);
            ctx.fillstyle = "rgb(0, 0, 0)";
            ctx.fillRect(position[1] * 5, position[0] * 5, 5, 5);
        }
        else {
            const position = index_ij(j);
            ctx.clearRect(position[1] * 5, position[0] * 5, 5, 5);
        }
    };
}

function draw() {
    render();
    nextgeneration();
    setTimeout(draw, 100);
};

window.addEventListener("load", draw(game_array));
