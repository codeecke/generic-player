import { expect } from '@jest/globals'
import { Helper } from './Helper';

describe('Youtube/Helper', () => {
    test('YoutubeID can extracted from regular url', () => expect(Helper.extractVideoId('https://www.youtube.com/watch?v=JieWYvU9JxM')).toEqual('JieWYvU9JxM'))
    test('YoutubeID can extracted from short url', () => expect(Helper.extractVideoId('https://youtu.be/JieWYvU9JxM')).toEqual('JieWYvU9JxM'))
    test('YoutubeID can extracted from embed url', () => expect(Helper.extractVideoId('https://www.youtube.com/embed/7cjVj1ZyzyE')).toEqual('7cjVj1ZyzyE'))
    test('YoutubeID can extracted from nocookie url', () => expect(Helper.extractVideoId('https://www.youtube-nocookie.com/embed/7cjVj1ZyzyE')).toEqual('7cjVj1ZyzyE'))
    test('YoutubeID cannot extracted from invalid url', () => expect(() => Helper.extractVideoId('https://www.youtube-nocookie.com/embed')).toThrow())
})