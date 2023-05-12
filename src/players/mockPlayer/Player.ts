import { IPlayer } from "../../interfaces/IPlayer";

export class Player implements IPlayer {
    readonly type: string = 'MockPlayer'
    public status: string = 'created'

    constructor(public url: string) {}

    async play(): Promise<IPlayer> {
        this.status = 'playing'
        return this;
    }
    async pause(): Promise<IPlayer> {
        this.status = 'paused'
        return this;
    }
    async mute(): Promise<IPlayer> {
        this.status = 'muted'
        return this;
    }
    async unmute(): Promise<IPlayer> {
        this.status = 'unmuted'
        return this;
    }

}