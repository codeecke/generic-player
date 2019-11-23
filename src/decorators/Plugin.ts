import {PluginConstructorInterface} from "../abstracts/plugin/PluginConstructorInterface";
import {pluginRegistry} from "../registries/PluginRegistry";

export function Plugin(name: string) {
    return (pluginClass: PluginConstructorInterface) => {
        pluginRegistry.register(name, pluginClass)
    }
}