import {expect} from '@jest/globals'
import { InvalidUrlError } from './InvalidUrlError'

describe('InvalidUrlError', () => {
    test('message is correct', () => {
        const error = new InvalidUrlError('http://www.google.com/');
        expect(error.message).toEqual('invalid url "http://www.google.com/"') 
    })
})