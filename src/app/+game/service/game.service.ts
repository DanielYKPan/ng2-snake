/**
 * game.service
 */

import { Injectable } from '@angular/core';
import { Tile, TileContent } from './tile';
import { Snake, Direction } from './snake';
import { Fruit, FruitType } from './fruit';

const GameStatic: any = {
    columns: 20,
    rows: 15,
    tileWidth: 32,
    tileHeight: 32
};

/* Get a random position */
const randRange = ( low: number, high: number ): number => {
    return Math.floor(low + Math.random() * (high - low + 1));
};

@Injectable()
export class GameService {

    private tiles: Tile[][] = [];
    private board: any;
    private images: any;
    private tileImage: any;
    private initialized: boolean = false;
    private preLoaded: boolean = false;
    private snake: Snake;
    private fruit: Fruit;

    constructor() {

    }

    public buildGridWithWalls(): void {
        for (let i = 0; i < GameStatic.columns; i++) {
            this.tiles[i] = [];
            for (let j = 0; j < GameStatic.rows; j++) {
                if (i === 0 || i === GameStatic.columns - 1 ||
                    j === 0 || j === GameStatic.rows - 1) {
                    this.tiles[i][j] = new Tile(TileContent.Wall);
                } else {
                    this.tiles[i][j] = new Tile(TileContent.Empty);
                }
            }
        }
    }

    public drawGrid(): void {
        let context = this.board.getContext('2d');
        context.fillStyle = '#577ddb';
        context.fillRect(0, 0, this.board.width, this.board.height);
        for (let i = 0; i < GameStatic.columns; i++) {
            for (let j = 0; j < GameStatic.rows; j++) {
                // Get the current tile and location
                let tile = this.tiles[i][j];
                let tileX = i * GameStatic.tileWidth;
                let tileY = j * GameStatic.tileHeight;

                // Draw tiles based on their type
                if (tile.Content === TileContent.Empty) {
                    // Empty space
                    context.fillStyle = '#f7e697';
                    context.fillRect(tileX, tileY, GameStatic.tileWidth, GameStatic.tileHeight);
                } else if (tile.Content === TileContent.Wall) {
                    // Wall
                    context.fillStyle = '#bcae76';
                    context.fillRect(tileX, tileY, GameStatic.tileWidth, GameStatic.tileHeight);
                }
            }
        }
    }

    public drawFruit(): void {
        let context = this.board.getContext('2d');
        let tileX = this.fruit.X * GameStatic.tileWidth;
        let tileY = this.fruit.Y * GameStatic.tileHeight;

        context.fillStyle = '#f7e697';
        context.fillRect(tileX, tileY, GameStatic.tileWidth, GameStatic.tileHeight);

        let tX = 0;
        let tY = 3;
        let tileW = 64;
        let tileH = 64;
        context.drawImage(
            this.tileImage,
            tX * tileW,
            tY * tileH, tileW, tileH, tileX, tileY,
            GameStatic.tileWidth, GameStatic.tileHeight);
    }

    public drawSnake(): void {
        let context = this.board.getContext('2d');
        for (let i = 0; i < this.snake.Segments.length; i++) {
            let segment = this.snake.Segments[i];
            let segX = segment.x;
            let segY = segment.y;
            let tileX = segX * GameStatic.tileWidth;
            let tileY = segY * GameStatic.tileHeight;

            // Sprite column and row that gets calculated
            let tX = 0;
            let tY = 0;

            if (i === 0) {
                //TODO: need to check if 'i+1' segment exists
                // Head; Determine the correct image
                let next = this.snake.Segments[i + 1]; // segment next to head
                if (segY < next.y) {
                    // Up
                    tX = 3;
                    tY = 0;
                } else if (segX > next.x) {
                    // right
                    tX = 4;
                    tY = 0;
                } else if (segY > next.y) {
                    // down
                    tX = 4;
                    tY = 1;
                } else if (segX < next.x) {
                    // left
                    tX = 3;
                    tY = 1;
                }
            } else if (i === this.snake.Segments.length - 1) {
                // tail
                let next = this.snake.Segments[i - 1]; // segment next to tail
                if (segY > next.y) {
                    // Up
                    tX = 3;
                    tY = 2;
                } else if (segX < next.x) {
                    // right
                    tX = 4;
                    tY = 2;
                } else if (segY < next.y) {
                    // down
                    tX = 4;
                    tY = 3;
                } else if (segX > next.x) {
                    // left
                    tX = 3;
                    tY = 3;
                }
            } else {
                // body
                let prev = this.snake.Segments[i - 1]; // previous segment
                let next = this.snake.Segments[i + 1]; // previous segment

                if (prev.x < segX && next.x > segX || prev.x > segX && next.x < segX) {
                    // horizontal in-line
                    tX = 1;
                    tY = 0;
                } else if (prev.y < segY && next.y > segY || prev.y > segY && next.y < segY) {
                    // vertical in-line
                    tX = 2;
                    tY = 1;
                } else if (prev.x < segX && next.y > segY || prev.y > segY && next.x < segX) {
                    // angle left-down
                    tX = 2;
                    tY = 0;
                } else if (prev.x > segX && next.y > segY || prev.y > segY && next.x > segX) {
                    // angle right-down
                    tX = 0;
                    tY = 0;
                } else if (prev.y < segY && next.x > segX || prev.x > segX && next.y < segY) {
                    // angle right-up
                    tX = 0;
                    tY = 1;
                } else if (prev.y < segY && next.x < segX || prev.x < segX && next.y < segY) {
                    // angle left-up
                    tX = 2;
                    tY = 2;
                }
            }

            let tileW = 64;
            let tileH = 64;

            context.drawImage(
                this.tileImage,
                tX * tileW,
                tY * tileH, tileW, tileH, tileX, tileY,
                GameStatic.tileWidth, GameStatic.tileHeight);
        }
    }

    public addFruit(): void {
        let valid = false;
        while (!valid) {
            // Get a random position
            let aX = randRange(0, GameStatic.columns - 1);
            let aY = randRange(0, GameStatic.rows - 1);

            let overlap = false;

            for (let i = 0; i < this.snake.Segments.length; i++) {
                // Get the position of the current snake segment
                let sx = this.snake.Segments[i].x;
                let sy = this.snake.Segments[i].y;

                // Check overlap
                if (aX == sx && aY == sy) {
                    overlap = true;
                    break;
                }
            }

            // Tile must be empty
            if (!overlap && this.tiles[aX][aY].Content === TileContent.Empty) {
                // Add an apple at the tile position
                //this.tiles[aX][aY].Content = TileContent.Apple;
                this.fruit.setPosition(aX, aY);
                valid = true;
            }
        }
    }

    public init( board: HTMLElement ): void {
        this.images = this.loadImages(['snake-graphics.png']);
        this.tileImage = this.images[0];
        this.board = board;
        this.snake = new Snake();
        this.fruit = new Fruit();

        this.main(0);
    }

    public newGame(): void {
        this.snake.init(10, 10, Direction.Right, 10, 4);
        this.buildGridWithWalls();
        this.drawGrid();
        this.fruit.Type = FruitType.Apple;
        this.addFruit();
    }

    private loadImages( imageFiles: string[] ) {
        let loadedImages = [];
        let loadCount = 0;
        let loadTotal = imageFiles.length;
        this.preLoaded = false;

        for (let i = 0; i < imageFiles.length; i++) {
            let image = new Image();

            // Add onload event handler
            image.onload = () => {
                loadCount++;
                if (loadCount === loadTotal) {
                    // Done loading
                    this.preLoaded = true;
                }
            };

            // Set the source url of the image
            image.src = '/assets/img/' + imageFiles[i];

            // Save to the image array
            loadedImages[i] = image;
        }

        return loadedImages;
    }

    private main( tframe: number ): void {
        // Request animation frames
        window.requestAnimationFrame(( timestamp ) => this.main(timestamp));

        if (!this.initialized) {
            if (this.preLoaded) {
                this.initialized = true;
            }
        } else {
            this.drawSnake();
            this.drawFruit();
        }
    }
}
