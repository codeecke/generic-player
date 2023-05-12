import { IPlayer } from "../interfaces/IPlayer";
import { AbstractPlugin } from "./AbstractPlugin";

export class PluginHandler {
    private plugins = new Set<AbstractPlugin>()

    register(plugin: AbstractPlugin) {
        this.plugins.add(plugin)
    }

    async fire(eventName: string, player: IPlayer) {
        const pluginProcesses = [...this.plugins].map(async plugin => await plugin.fire(eventName, player))
        return Promise.all(pluginProcesses)
    }
}