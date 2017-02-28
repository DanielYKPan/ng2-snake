/**
 * game-state.reducer
 */

import { ActionReducer } from '@ngrx/store';
import { SET_GAME_STATE, INCREASE_SCORES } from './actions';

export interface IGameState {
    gameOver: boolean;
    scores: number;
    highScores: number;
}

const defaultGameState = {
    gameOver: false,
    scores: 0,
    highScores: +localStorage.getItem('snake-best') || 0,
};

export const gameStateReducer: ActionReducer<any> =
    ( state: IGameState = defaultGameState, action: any ) => {
        switch (action.type) {
            case SET_GAME_STATE:
                return Object.assign({}, state, action.payload);

            case INCREASE_SCORES:
                return Object.assign({}, state, {
                    scores: state.scores + action.payload.scores
                });

            default:
                return state;
        }
    };
