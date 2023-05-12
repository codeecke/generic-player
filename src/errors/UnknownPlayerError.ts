export class UnknownPlayerError extends Error {
    constructor(url: string) {
        super(`unknown player for url "${url}"`)
    }
}