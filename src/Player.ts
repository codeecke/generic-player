import { PlayerInitializationError } from "./errors/PlayerInitializationError"
import { IPlayer } from "./interfaces/IPlayer"
import { IPlayerFactory } from "./interfaces/PlayerFactory"
import { UnknownPlayer } from "./players/UnknownPlayer"
import { PlayerRegistry } from "./registries/PlayerRegistry"

export class Player implements IPlayer {

    public readonly type: string = 'ZuluPlayer'
    private static knownPlayers = new PlayerRegistry()
    private player: IPlayer

    constructor(url: string) {
        this.player = new UnknownPlayer(url)
        Player.knownPlayers.forEach(factory => {
            if(!factory.isValid(url)) return;
            this.player = factory.create(url);
        })
    }

    static registerPlayerFactory(factory: IPlayerFactory) {
        Player.knownPlayers.register(factory)
    }

    getPlayerInstance(): IPlayer | undefined {
        return this.player
    }

    play(): IPlayer {
        this.player.play()
        return this
    }
    pause(): IPlayer {
        this.player.pause()
        return this
    }
    mute(): IPlayer {
        this.player.mute()
        return this
    }
    unmute(): IPlayer {
        this.player.unmute()
        return this
    }

}