import { UnknownPlayerError } from "../errors/UnknownPlayerError";
import { IPlayer } from "../interfaces/IPlayer";

export class UnknownPlayer implements IPlayer {
    readonly type: string = 'unknown';

    constructor(private url: string){}

    play(): IPlayer {
        throw new UnknownPlayerError(this.url)
    }
    pause(): IPlayer {
        throw new UnknownPlayerError(this.url)
    }
    mute(): IPlayer {
        throw new UnknownPlayerError(this.url)
    }
    unmute(): IPlayer {
        throw new UnknownPlayerError(this.url)
    }

}