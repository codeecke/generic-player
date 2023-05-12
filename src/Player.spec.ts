import { expect } from "@jest/globals";
import { PlayerInitializationError } from "./errors/PlayerInitializationError";
import { UnknownPlayerError } from "./errors/UnknownPlayerError";
import { Player } from './Player'

import { 
    Factory as MockPlayerFactory,
    Player as MockPlayer
} from './players/mockPlayer'
import { UnknownPlayer } from "./players/UnknownPlayer";

describe('valid ZuluPlayer', () => {
    let player: Player;

    beforeAll(() => {
        Player.registerPlayerFactory(new MockPlayerFactory())
        player = new Player('mock');
    })

    test('initialization', () => {
        expect(player.getPlayerInstance()).toBeInstanceOf(MockPlayer)
        expect((player.getPlayerInstance() as MockPlayer).status).toEqual('created')
    })

    test('play', async () => {
        await player.play()
        expect((player.getPlayerInstance() as MockPlayer).status).toEqual('playing')
    })

    test('pause', async () => {
        await player.pause()
        expect((player.getPlayerInstance() as MockPlayer).status).toEqual('paused')
    })

    test('mute', async () => {
        await player.mute()
        expect((player.getPlayerInstance() as MockPlayer).status).toEqual('muted')
    })

    test('unmute', async () => {
        await player.unmute()
        expect((player.getPlayerInstance() as MockPlayer).status).toEqual('unmuted')
    })
})

describe('invalid ZuluPlayer', () => {
    let player: Player;

    beforeAll(() => player = new Player('mock123'))
    test('initialization', () => {
        expect(player.getPlayerInstance()).toBeInstanceOf(UnknownPlayer)
    })
    
    test('play', async () => {
        expect.assertions(1)
        expect(async () => await player.play()).rejects.toThrow(UnknownPlayerError)
    })
    test('pause', async () => {
        expect.assertions(1)
        expect(async () => await player.pause()).rejects.toThrow(UnknownPlayerError)
    })

    test('mute', async () => {
        expect.assertions(1)
        expect(async () => await player.mute()).rejects.toThrow(UnknownPlayerError)
    })

    test('unmute', async () => {
        expect.assertions(1)
        expect(async () => await player.unmute()).rejects.toThrow(UnknownPlayerError)
    })

})