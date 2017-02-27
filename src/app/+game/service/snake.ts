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
    private segments: {x: number, y: number}[];

    get Segments(): {x: number, y: number}[] {
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
}
