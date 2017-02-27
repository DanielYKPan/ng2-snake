/**
 * game.service
 */

import { Injectable } from '@angular/core';
import { Tile, TileContent } from './tile';

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
                } else if (tile.Content === TileContent.Apple) {
                    // Draw apple background
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
            }
        }
    }

    public addApple(): void {
        let valid = false;
        while (!valid) {
            // Get a random position
            let aX = randRange(0, GameStatic.columns - 1);
            let aY = randRange(0, GameStatic.rows - 1);

            let overlap = false;

            // Tile must be empty
            if (!overlap && this.tiles[aX][aY].Content === TileContent.Empty) {
                // Add an apple at the tile position
                this.tiles[aX][aY].Content = TileContent.Apple;
                valid = true;
            }
        }
    }

    public init( board: HTMLElement ): void {
        this.images = this.loadImages(['snake-graphics.png']);
        this.tileImage = this.images[0];
        this.board = board;

        this.main(0);
    }

    public newGame(): void {
        this.buildGridWithWalls();
        this.addApple();
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
            this.drawGrid();
        }
    }
}
