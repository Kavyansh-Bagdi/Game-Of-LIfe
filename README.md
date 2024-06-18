# Conway's Game of Life

Welcome to the README file for Conway's Game of Life! This is a classic simulation of cellular automaton devised by mathematician John Conway in 1970. The game consists of a grid of cells that can be in one of two states: alive or dead. The state of each cell evolves based on simple rules, creating fascinating patterns and behaviors.

[Click Here To Play](https://kavyansh-bagdi.github.io/Game-Of-LIfe/)

## Rules
The game follows these rules:
1. **Underpopulation:** Any live cell with fewer than two live neighbors dies, as if by loneliness.
2. **Survival:** Any live cell with two or three live neighbors survives to the next generation.
3. **Overcrowding:** Any live cell with more than three live neighbors dies, as if by overcrowding.
4. **Reproduction:** Any dead cell with exactly three live neighbors becomes a live cell, as if by reproduction.

These rules are applied simultaneously to all cells in the grid for each generation.

## Implementation
The simulation typically unfolds on a two-dimensional grid of cells. Each cell can be represented as a square or a pixel, and its state (alive or dead) is updated according to the rules mentioned above. The grid evolves over discrete time steps or generations.

## Usage
To run Conway's Game of Life:
- Choose an initial configuration of cells (alive or dead).
- Apply the rules to evolve the grid to the next generation.
- Repeat the process to observe different patterns and behaviors that emerge.

## Additional Resources
For more information on Conway's Game of Life, you can refer to the following resources:
- [Wikipedia Article](https://en.wikipedia.org/wiki/Conway%27s_Game_of_Life)
- [Interactive Simulation](https://kavyansh-bagdi.github.io/Game-Of-LIfe/)
- [Gosper's Glider Gun](https://www.conwaylife.com/wiki/Gosper%27s_glider_gun)

Feel free to explore and experiment with different initial configurations to see the variety of patterns that can emerge in Conway's Game of Life!
