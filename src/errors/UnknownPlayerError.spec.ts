import {expect} from '@jest/globals'
import { UnknownPlayerError } from './UnknownPlayerError';

describe('UnknownPlayerError', () => {
    test('message is correct', () => {
        const error = new UnknownPlayerError('http://www.google.com/');
        expect(error.message).toEqual('unknown player for url "http://www.google.com/"') 
    })
})