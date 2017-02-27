/**
 * tile
 */

import { uuid } from './uuid';

export enum TileContent {
    Empty,
    Wall,
    Apple
}

export class Tile {
    /* Property id */
    private id: string;

    get Id(): string {
        return this.id;
    }

    /* Property content */
    private content: TileContent;

    get Content(): TileContent {
        return this.content;
    }

    set Content( content: TileContent ) {
        this.content = content;
    }

    constructor( content: TileContent ) {
        this.id = uuid();
        this.content = content;
    }
}
