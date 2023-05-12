import { expect } from '@jest/globals';
import { PlayerInitializationError } from '../../errors/PlayerInitializationError';
import { Factory } from './Factory';
import { Player } from './Player';

describe('Youtube/Factory', () => {
    test('isValid - valid', () => {
        const factory = new Factory();
        expect(factory.isValid('mock')).toBeTruthy()
    })
    test('isValid - invalid', () => {
        const factory = new Factory();
        expect(factory.isValid('everything else')).toBeFalsy()
    })

    test('create() should successfully done', () => {
        const factory = new Factory();
        expect(factory.create('mock')).toBeInstanceOf(Player)
    })
    test('create() should throw an error', () => {
        const factory = new Factory();
        expect(() => factory.create('https://www.google.com/')).toThrow(PlayerInitializationError)
    })
})