// @flow

import { expect } from 'chai';
import GameStore from './store';

describe('Game Store', () => {
    const store = new GameStore();
    const width = 5;
    const height = 5;
    const bombsCount = 10;
    const setSize = () => {
        store.width = width;
        store.height = height;
    };
    describe('size', () => {
        beforeEach(setSize);
        it('Should react properly to size change', () => {
            expect(store.width).to.equal(width);
            expect(store.height).to.equal(height);
        });
        it('should generate the proper maxSize', () => {
            expect(store.maxSize).to.equal(width * height);
        });
    });
    describe('bombs', () => {
        beforeEach(() => {
            setSize();
            store.clearBombs();
        });
        it('should correctly add a few bombs', () => {
            const first = 5;
            const second = 10;

            expect(store.bombs.length).to.equal(0);
            store.addBomb(first);
            expect(store.bombs.length).to.equal(1);
            expect(store.bombs[0]).to.equal(first);
            store.addBomb(second);
            expect(store.bombs.length).to.equal(2);
            expect(store.bombs[1]).to.equal(second);
        });

        it('should correctly add all bombs', () => {
            store.addRandomBombs(bombsCount);
            expect(store.bombs.length).to.equal(bombsCount);
        });
    });

    describe('hits', () => {
        beforeEach(() => {
            setSize();
            store.clearHits();
        });
        it('should correctly add a few hits', () => {
            const first = 3;
            const second = 8;

            expect(store.hits.length).to.equal(0);
            store.addHit(first);
            expect(store.hits.length).to.equal(1);
            expect(store.hits[0]).to.equal(first);
            store.addHit(second);
            expect(store.hits.length).to.equal(2);
            expect(store.hits[1]).to.equal(second);
        });
    });

    describe('game', () => {
        beforeEach(() => {
            store.newGame(width, height, bombsCount);
        });

        describe('with blank state', () => {
            it('should have the proper game state', () => {
                expect(store.gameState).to.equal(0);
            });
        });

        describe('state with loosing condition', () => {
            beforeEach(() => {
                store.addHit(store.bombs[0]);
            });
            it('should have the proper game state', () => {
                expect(store.bombs.length).to.equal(bombsCount);
                expect(store.hits.length).to.equal(1);
                expect(store.gameState).to.equal(-1);
            });
        });

        describe('state with winning condition', () => {
            beforeEach(() => {
                (new Array(width * height))
                    .fill(0)
                    .map((_: any, index: number): number => index)
                    .filter((num: number): boolean => !store.bombs.includes(num))
                    .forEach((hit: number): void => store.addHit(hit));
            });
            it('should have the proper game state', () => {
                expect(store.bombs.length).to.equal(bombsCount);
                expect(store.hits.length).to.equal((width * height) - bombsCount);
                expect(store.gameState).to.equal(1);
            });
        });
    });
});
