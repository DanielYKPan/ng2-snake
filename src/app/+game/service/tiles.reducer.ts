/**
 * tiles.reducer
 */

import { ActionReducer } from '@ngrx/store';
import { Tile } from './tile';
import { BUILD_GRID } from './actions';

export const tilesReducer: ActionReducer<Tile[]> = ( state: Tile[] = [], action: any ) => {
    switch (action.type) {

        case BUILD_GRID:
            return Object.assign([], action.payload.tiles);

        default:
            return state;
    }
};
