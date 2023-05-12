import { UnknownPlayerError } from "../errors/UnknownPlayerError";
import { IPlayer } from "../interfaces/IPlayer";

export class UnknownPlayer implements IPlayer {
    readonly type: string = 'unknown';

    constructor(private url: string){}

    async play(): Promise<IPlayer> {
        throw new UnknownPlayerError(this.url)
    }
    async pause(): Promise<IPlayer> {
        throw new UnknownPlayerError(this.url)
    }
    async mute(): Promise<IPlayer> {
        throw new UnknownPlayerError(this.url)
    }
    async unmute(): Promise<IPlayer> {
        throw new UnknownPlayerError(this.url)
    }

}