import { PlayerInitializationError } from "../../errors/PlayerInitializationError";
import { IPlayerFactory } from "../../interfaces/PlayerFactory";
import { Helper } from "./Helper";
import { Player } from "./Player";

export class Factory implements IPlayerFactory {

    isValid(url: string): boolean {
        return Helper.isValidUrl(url)
    }

    create(url: string): Player {
        if(!this.isValid(url)) throw new PlayerInitializationError('youtube', url)
        return new Player(url)
    }

}