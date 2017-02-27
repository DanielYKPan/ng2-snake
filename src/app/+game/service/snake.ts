/**
 * snake
 */

export enum Direction {
    Up,
    Right,
    Down,
    Left
}

export class Snake {

    private directions = [[0, -1], [1, 0], [0, 1], [-1, 0]];

    /* Property x */
    private x: number;

    get X(): number {
        return this.x;
    }

    /* Property y */
    private y: number;

    get Y(): number {
        return this.y;
    }

    /* Property direction */
    private direction: Direction;

    get Direction(): Direction {
        return this.direction;
    }

    /* Property speed */
    private speed: number;

    get Speed(): number {
        return this.speed;
    }

    /* Property segments */
    private segments: Array<{x: number, y: number}>;

    get Segments(): Array<{x: number, y: number}> {
        return this.segments;
    }

    private growSegments: number;

    private moveDelay: number;

    constructor() {
        this.moveDelay = 0;
        this.growSegments = 0;
        this.segments = [];
    }

    public init( x: number, y: number,
                 direction: Direction, speed: number,
                 numSegments: number ): void {
        this.x = x;
        this.y = y;
        this.direction = direction;
        this.speed = speed;

        for (let i = 0; i < numSegments; i++) {
            this.segments.push({
                x: this.x - i * this.directions[direction][0],
                y: this.y - i * this.directions[direction][1]
            });
        }
    }

    public tryMove( dt: number ): boolean {
        this.moveDelay += dt;
        let maxMoveDelay = 1 / this.speed;
        return this.moveDelay > maxMoveDelay;
    }

    public nextMove(): {x: number, y: number} {
        let nextX = this.x + this.directions[this.direction][0];
        let nextY = this.y + this.directions[this.direction][1];
        return {x: nextX, y: nextY};
    }

    public move(): void {
        let nextPosition = this.nextMove();
        this.x = nextPosition.x;
        this.y = nextPosition.y;

        // get the last segment of the snake
        let lastSegment = this.segments[this.segments.length - 1];

        // move every segment to the position of its previous position
        for (let i = this.segments.length - 1; i >= 1; i--) {
            this.segments[i].x = this.segments[i - 1].x;
            this.segments[i].y = this.segments[i - 1].y;
        }

        // set the first segment
        this.segments[0].x = this.x;
        this.segments[0].y = this.y;

        // reset moveDelay
        this.moveDelay = 0;
    }
}
