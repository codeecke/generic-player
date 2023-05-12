import { expect } from '@jest/globals';
import { PlayerInitializationError } from '../../errors/PlayerInitializationError';
import { Factory } from './Factory';
import { Player } from './Player';

describe('Youtube/Factory', () => {
    test('isValid - long url', () => {
        const factory = new Factory();
        expect(factory.isValid('https://www.youtube.com/watch?v=JieWYvU9JxM')).toBeTruthy()
    })
    test('isValid - short url', () => {
        const factory = new Factory();
        expect(factory.isValid('https://youtu.be/JieWYvU9JxM')).toBeTruthy()
    })
    test('isValid - embed url', () => {
        const factory = new Factory();
        expect(factory.isValid('https://www.youtube.com/embed/7cjVj1ZyzyE')).toBeTruthy()
    })
    test('isValid - nocookie-url', () => {
        const factory = new Factory();
        expect(factory.isValid('https://www.youtube-nocookie.com/embed/7cjVj1ZyzyE')).toBeTruthy()
    })
    test('isValid - invalid-url', () => {
        const factory = new Factory();
        expect(factory.isValid('https://www.google.com/')).toBeFalsy()
    })

    test('create() should successfully done', () => {
        const factory = new Factory();
        expect(factory.create('https://youtu.be/JieWYvU9JxM')).toBeInstanceOf(Player)
    })
    test('create() should throw an error', () => {
        const factory = new Factory();
        expect(() => factory.create('https://www.google.com/')).toThrow(PlayerInitializationError)
    })
})