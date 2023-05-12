import { AbstractPlugin } from "./abstracts/AbstractPlugin"
import { PluginHandler } from "./abstracts/PluginHandler"
import { PlayerInitializationError } from "./errors/PlayerInitializationError"
import { IPlayer } from "./interfaces/IPlayer"
import { IPlayerFactory } from "./interfaces/PlayerFactory"
import { UnknownPlayer } from "./players/UnknownPlayer"
import { PlayerRegistry } from "./registries/PlayerRegistry"

export class Player implements IPlayer {

    public readonly type: string = 'ZuluPlayer'
    private static readonly pluginHandler = new PluginHandler()
    private readonly pluginHandler = new PluginHandler()
    private static knownPlayers = new PlayerRegistry()
    private player: IPlayer

    constructor(url: string) {
        this.player = new UnknownPlayer(url)
        Player.knownPlayers.forEach(async factory => {
            if(!factory.isValid(url)) return;
            await this.firePlugin('initialize')
            this.player = factory.create(url);
        })
    }

    static registerGlobalPlugin(plugin: AbstractPlugin) {
        Player.pluginHandler.register(plugin)
    }

    registerPlugin(plugin: AbstractPlugin) {
        this.pluginHandler.register(plugin)
    }

    private async firePlugin(eventName: string) {
        await Player.pluginHandler.fire(eventName, this)
        await this.pluginHandler.fire(eventName, this)
    }

    static registerPlayerFactory(factory: IPlayerFactory) {
        Player.knownPlayers.register(factory)
    }

    getPlayerInstance(): IPlayer | undefined {
        return this.player
    }

    async play(): Promise<Player> {
        await this.firePlugin('play')
        await this.player.play()
        return this
    }
    async pause(): Promise<Player> {
        await this.firePlugin('pause')
        await this.player.pause()
        return this
    }
    async mute(): Promise<Player> {
        await this.firePlugin('mute')
        await this.player.mute()
        return this
    }
    async unmute(): Promise<Player> {
        await this.firePlugin('unmute')
        await this.player.unmute()
        return this
    }

}