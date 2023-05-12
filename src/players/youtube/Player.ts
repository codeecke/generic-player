import { IPlayer } from "../../interfaces/IPlayer";

export class Player implements IPlayer {
    public readonly type = 'youtube'

    constructor(private url: string) {
        
    }
    
    async play(): Promise<IPlayer> {
        throw new Error("Method not implemented.");
    }
    async pause(): Promise<IPlayer> {
        throw new Error("Method not implemented.");
    }
    async mute(): Promise<IPlayer> {
        throw new Error("Method not implemented.");
    }
    async unmute(): Promise<IPlayer> {
        throw new Error("Method not implemented.");
    }

}