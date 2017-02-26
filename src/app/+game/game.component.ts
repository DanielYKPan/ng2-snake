/**
 * game.component
 */

import { Component, OnInit, AfterContentInit, ViewChild, ElementRef } from '@angular/core';
import { GameService } from './service';

@Component({
    selector: 'app-game',
    templateUrl: 'game.component.html',
    styleUrls: ['./game.component.scss'],
})
export class GameComponent implements OnInit, AfterContentInit {

    @ViewChild('board') private board: ElementRef;

    constructor( private gameService: GameService ) {
    }

    public ngOnInit() {
        this.gameService.buildGridWithWalls();
    }

    public ngAfterContentInit(): void {
        let board = this.board.nativeElement;
        this.gameService.drawGrid(board);
    }
}
