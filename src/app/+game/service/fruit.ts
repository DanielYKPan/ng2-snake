/**
 * fruit
 */

export enum FruitType {
    Apple = 10
}

export class Fruit {

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

    /* Property type */
    private type: FruitType;

    get Type(): FruitType {
        return this.type;
    }

    set Type( type: FruitType ) {
        this.type = type;
    }

    constructor() {
        this.x = null;
        this.y = null;
        this.type = null;
    }

    public setPosition( x: number, y: number ) {
        this.x = x;
        this.y = y;
    }
}
