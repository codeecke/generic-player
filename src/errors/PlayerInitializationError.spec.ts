import {expect} from '@jest/globals'
import { PlayerInitializationError } from './PlayerInitializationError';

describe('PlayerInitializationError', () => {
    test('message is correct', () => {
        const error = new PlayerInitializationError('TestPlayer', 'http://www.google.com/');
        expect(error.message).toEqual('cannot initilize player-type "TestPlayer" by url: "http://www.google.com/"') 
    })
})