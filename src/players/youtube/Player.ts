import { IPlayer } from "../../interfaces/IPlayer";

export class Player implements IPlayer {
    public readonly type = 'youtube'

    constructor(private url: string) {
        
    }
    
    play(): IPlayer {
        throw new Error("Method not implemented.");
    }
    pause(): IPlayer {
        throw new Error("Method not implemented.");
    }
    mute(): IPlayer {
        throw new Error("Method not implemented.");
    }
    unmute(): IPlayer {
        throw new Error("Method not implemented.");
    }

}