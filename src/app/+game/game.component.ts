/**
 * game.component
 */

import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { IGameState } from './service/game-state.reducer';

@Component({
    selector: 'app-game',
    templateUrl: 'game.component.html',
    styleUrls: ['./game.component.scss'],
})
export class GameComponent implements OnInit {

    public gameState: Observable<IGameState>;

    constructor(private store: Store<any>) {
    }

    public ngOnInit() {
        this.gameState = this.store.select('gameState');
    }
}
