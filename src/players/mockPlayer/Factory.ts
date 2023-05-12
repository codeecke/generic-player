import { PlayerInitializationError } from "../../errors/PlayerInitializationError";
import { IPlayerFactory } from "../../interfaces/PlayerFactory";
import { Player } from "./Player";

export class Factory implements IPlayerFactory {
    create(url: string): Player {
        if(!this.isValid(url)) throw new PlayerInitializationError('MockPlayer', url)
        return new Player(url)
    }
    isValid(url: string): boolean {
        return url === 'mock'
    }
}