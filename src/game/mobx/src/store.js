// @flow

import { observable, computed } from 'mobx';

export default class GameState {
    @observable bombs = []
    @observable hits = []

    @observable width = 0
    @observable height = 0

    @computed get maxSize(): number {
        return this.width * this.height;
    }

    addBomb(bomb: number) {
        if (bomb < this.maxSize) {
            this.bombs.push(bomb);
        }
    }

    clearBombs() {
        this.bombs.splice(0, this.bombs.length);
    }

    addRandomBombs(size: number) {
        this.clearBombs();
        (new Array(size))
            .fill(0)
            .forEach(() => {
                let newItem;
                do {
                    newItem = parseInt((Math.random()) * this.maxSize, 10);
                } while (this.bombs.includes(newItem));
                this.addBomb(newItem);
            });
    }

    clearHits() {
        this.hits.splice(0, this.hits.length);
    }

    addHit(square: number) {
        if (square < this.maxSize && !this.hits.includes(square)) {
            this.hits.push(square);
        }
    }

    @computed get gameState(): -1|0|1 {
        if (this.bombs.filter((bomb: number) => this.hits.includes(bomb)).length > 0) {
            return -1;
        }
        if (this.bombs.length + this.hits.length === this.maxSize) {
            return 1;
        }
        return 0;
    }

    clearGameState(width: number = 0, height: number = 0) {
        this.clearBombs();
        this.clearHits();
        this.width = width;
        this.height = height;
    }

    newGame(
        width: number,
        height: number,
        bombs: number = (width * height) * (35 / 100),
    ) {
        this.clearGameState(width, height);
        this.addRandomBombs(bombs);
    }
}
