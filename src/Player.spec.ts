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

    test('play', () => {
        player.play()
        expect((player.getPlayerInstance() as MockPlayer).status).toEqual('playing')
    })

    test('pause', () => {
        player.pause()
        expect((player.getPlayerInstance() as MockPlayer).status).toEqual('paused')
    })

    test('mute', () => {
        player.mute()
        expect((player.getPlayerInstance() as MockPlayer).status).toEqual('muted')
    })

    test('unmute', () => {
        player.unmute()
        expect((player.getPlayerInstance() as MockPlayer).status).toEqual('unmuted')
    })
})

describe('invalid ZuluPlayer', () => {
    let player: Player;

    beforeAll(() => player = new Player('mock123'))
    test('initialization', () => {
        expect(player.getPlayerInstance()).toBeInstanceOf(UnknownPlayer)
    })

    test('play', () => {
        expect(() => player.play()).toThrow(UnknownPlayerError)
    })

    test('pause', () => {
        expect(() => player.pause()).toThrow(UnknownPlayerError)
    })

    test('mute', () => {
        expect(() => player.mute()).toThrow(UnknownPlayerError)
    })

    test('unmute', () => {
        expect(() => player.unmute()).toThrow(UnknownPlayerError)
    })

})