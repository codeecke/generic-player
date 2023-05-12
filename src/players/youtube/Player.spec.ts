import { expect } from '@jest/globals';
import { Factory } from './Factory';
import { Player } from './Player';

describe('Youtube/Player', () => {
    let player: Player;
    beforeEach(() => {
        const factory = new Factory();
        player = factory.create('https://youtu.be/JieWYvU9JxM')
    })
    test('play', () => expect(() => player.play()).toThrow())
    test('pause', () => expect(() => player.pause()).toThrow())
    test('mute', () => expect(() => player.mute()).toThrow())
    test('unmute', () => expect(() => player.unmute()).toThrow())
})