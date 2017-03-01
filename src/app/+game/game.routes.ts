/**
 * game.routes
 */

import { GameComponent } from './game.component';
import { GameBoardComponent } from './game-board';
import { GameAboutComponent } from './game-about';

export const routes = [
    {
        path: '',
        component: GameComponent,
        children: [
            {path: '', component: GameBoardComponent},
            {path: 'about', component: GameAboutComponent},
        ]
    },
];
