export class PlayerInitializationError extends Error {
    constructor(playerType: string, url: string) {
        super(`cannot initilize player-type "${playerType}" by url: "${url}"`)
    }
}