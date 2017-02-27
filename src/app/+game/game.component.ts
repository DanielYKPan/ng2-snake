/**
 * game.component
 */

import {
    Component, OnInit, ViewChild, ElementRef
} from '@angular/core';
import { GameService } from './service';

@Component({
    selector: 'app-game',
    templateUrl: 'game.component.html',
    styleUrls: ['./game.component.scss'],
})
export class GameComponent implements OnInit {

    @ViewChild('board') private board: ElementRef;

    constructor( private gameService: GameService ) {
    }

    public ngOnInit() {
        this.gameService.newGame();
        let board = this.board.nativeElement;
        this.gameService.init(board);
    }
}
