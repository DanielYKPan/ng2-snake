/**
 * game-canvas.component
 */

import { Component, OnInit, ViewChild, ElementRef, OnDestroy } from '@angular/core';
import { GameService, KeyboardService, KeyCode } from '../service';
import { Subscription } from 'rxjs';

@Component({
    selector: 'app-game-canvas',
    template: `
<canvas #board class="game-wrapper" width="640" height="480" 
(window:keydown)="clickKeyBoard($event.keyCode)">
</canvas>
`,
})
export class GameCanvasComponent implements OnInit, OnDestroy {

    @ViewChild('board') private board: ElementRef;

    private arrowsSub: Subscription;

    constructor( private gameService: GameService,
                 private keyboardService: KeyboardService ) {
    }

    public ngOnInit() {
        let board = this.board.nativeElement;
        this.gameService.init(board);
        this.gameService.newGame();

        this.arrowsSub = this.keyboardService.arrows.subscribe(
            ( data: KeyCode ) => this.gameService.arrowDown(data)
        );
    }

    public ngOnDestroy(): void {
        this.arrowsSub.unsubscribe();
    }

    public clickKeyBoard( keyCode: number ): void {
        this.keyboardService.enter(keyCode);
    }
}
