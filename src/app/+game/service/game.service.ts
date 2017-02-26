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

@Injectable()
export class GameService {

    private tiles: Tile[][] = [];

    constructor() {
    }

    public buildGridWithWalls(): void {
        for (let i = 0; i < GameStatic.columns; i++) {
            this.tiles[i] = [];
            for (let j = 0; j < GameStatic.rows; j++) {
                if (i === 0 || i === GameStatic.columns - 1 || j === 0 || j === GameStatic.rows - 1) {
                    this.tiles[i][j] = new Tile(TileContent.Wall);
                } else {
                    this.tiles[i][j] = new Tile(TileContent.Empty);
                }
            }
        }
    }

    public drawGrid( board: any ): void {
        let context = board.getContext("2d");
        context.fillStyle = "#577ddb";
        context.fillRect(0, 0, board.width, board.height);
        for (let i = 0; i < GameStatic.columns; i++) {
            for (let j = 0; j < GameStatic.rows; j++) {
                // Get the current tile and location
                let tile = this.tiles[i][j];
                let tileX = i * GameStatic.tileWidth;
                let tileY = j * GameStatic.tileHeight;

                // Draw tiles based on their type
                if (tile.Content === TileContent.Empty) {
                    // Empty space
                    context.fillStyle = "#f7e697";
                    context.fillRect(tileX, tileY, GameStatic.tileWidth, GameStatic.tileHeight);
                } else if (tile.Content === TileContent.Wall) {
                    // Wall
                    context.fillStyle = "#bcae76";
                    context.fillRect(tileX, tileY, GameStatic.tileWidth, GameStatic.tileHeight);
                }
            }
        }
    }

}
