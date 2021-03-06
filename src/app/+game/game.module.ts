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
import { gameStateReducer, GameService, KeyboardService } from './service';
import { GameBoardComponent } from './game-board';
import { GameInformComponent } from './game-inform';
import { GameAboutComponent, SocialBtnComponent } from './game-about';

@NgModule({
    declarations: [
        // Components / Directives/ Pipes
        GameComponent,
        GameHeaderComponent,
        GameBoardComponent,
        GameInformComponent,
        GameAboutComponent,
        SocialBtnComponent,
    ],
    imports: [
        CommonModule,
        FormsModule,
        RouterModule.forChild(routes),
        StoreModule.provideStore({
            gameState: gameStateReducer,
        }),
    ],
    providers: [
        GameService,
        KeyboardService,
    ]
})
export class GameModule {
    public static routes = routes;
}
