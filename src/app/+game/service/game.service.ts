/**
 * game.service
 */

import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { Tile, TileContent } from './tile';

const GameStatic: any = {
    columns: 20,
    rows: 15,
    tileWidth: 32,
    tileHeight: 32
};

@Injectable()
export class GameService {

    constructor( private store: Store<any> ) {
    }

    public buildGridWithWalls(): void {
        let tiles: Tile[] = [];
        for (let i = 0; i < GameStatic.columns; i++) {
            for (let j = 0; j < GameStatic.rows; j++) {
                if (i === 0 || i === GameStatic.columns - 1 || j === 0 || j === GameStatic.rows - 1) {
                    tiles[i][j] = new Tile(TileContent.Wall);
                } else {
                    tiles[i][j] = new Tile(TileContent.Empty);
                }
            }
        }
    }

}
