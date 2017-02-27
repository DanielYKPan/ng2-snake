/**
 * game-canvas.component
 */

import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { GameService } from '../service';

@Component({
    selector: 'app-game-canvas',
    template: `
<canvas #board class="game-wrapper" width="640" height="480">
</canvas>
`,
})
export class GameCanvasComponent implements OnInit {

    @ViewChild('board') private board: ElementRef;

    constructor( private gameService: GameService ) {
    }

    public ngOnInit() {
        this.gameService.newGame();
        let board = this.board.nativeElement;
        this.gameService.init(board);
    }

}
