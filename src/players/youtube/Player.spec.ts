import { expect } from '@jest/globals';
import { Factory } from './Factory';
import { Player } from './Player';

describe('Youtube/Player', () => {
    
    let player: Player;
    beforeEach(() => {
        const factory = new Factory();
        player = factory.create('https://youtu.be/JieWYvU9JxM')
    })
    test('play', async () => {
        expect.assertions(1)
        expect(async () => await player.play()).rejects.toThrow()
    })
    test('pause', async () => {
        expect.assertions(1)
        expect(async () => await player.pause()).rejects.toThrow()
    })
    test('mute', async () => {
        expect.assertions(1)
        expect(async () => await player.mute()).rejects.toThrow()
    })
    test('unmute', async () => {
        expect.assertions(1)
        expect(async () => await player.unmute()).rejects.toThrow()
    })

})