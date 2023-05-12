import { InvalidUrlError } from "../../errors/InvalidUrlError"

export class Helper {

    static isValidUrl(url: string): boolean {
        const testLongUrl = /https?:\/\/(www\.)?youtube\.com\/watch\?v\=[a-zA-Z0-9\-]+/
        const testShortUrl = /https?:\/\/(www\.)?youtu.be\/[a-zA-Z0-9\-]+/
        const testEmbedUrl = /https?:\/\/(www\.)?youtube\.com\/embed\/[a-zA-Z0-9\-]+/
        const testNoCookieUrl = /https?:\/\/(www\.)?youtube-nocookie\.com\/embed\/[a-zA-Z0-9\-]+/
        return testLongUrl.test(url) || testShortUrl.test(url) || testEmbedUrl.test(url) || testNoCookieUrl.test(url)
    }

    static extractVideoId(url: string): string {
        const idMatcher = /[\/\=]([^/?]+)$/
        const match = url.match(idMatcher)
        if(Helper.isValidUrl(url) && match) return match[1]
        throw new InvalidUrlError(url)        
    }
}