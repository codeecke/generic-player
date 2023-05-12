import { IPlayer } from "../../interfaces/IPlayer";

export class Player implements IPlayer {
    readonly type: string = 'MockPlayer'
    public status: string = 'created'

    constructor(public url: string) {}

    play(): IPlayer {
        this.status = 'playing'
        return this;
    }
    pause(): IPlayer {
        this.status = 'paused'
        return this;
    }
    mute(): IPlayer {
        this.status = 'muted'
        return this;
    }
    unmute(): IPlayer {
        this.status = 'unmuted'
        return this;
    }

}