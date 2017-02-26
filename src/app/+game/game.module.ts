/**
 * movie.module
 */

import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { StoreModule } from '@ngrx/store';
import { routes } from './game.routes';
import { GameComponent } from './game.component';
import { GameHeaderComponent } from './game-header';
import { tilesReducer, GameService } from './service';

@NgModule({
    declarations: [
        // Components / Directives/ Pipes
        GameComponent,
        GameHeaderComponent,
    ],
    imports: [
        CommonModule,
        FormsModule,
        RouterModule.forChild(routes),
        StoreModule.provideStore({
            tiles: tilesReducer,
        }),
    ],
    providers: [
        GameService
    ]
})
export class GameModule {
    public static routes = routes;
}
