export class InvalidUrlError extends Error {
    constructor(url: string) {
        super(`invalid url "${url}"`)
    }
}