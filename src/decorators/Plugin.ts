import {PluginConstructorInterface} from "../abstracts/plugin/PluginConstructorInterface";
import {pluginRegistry} from "../registries/PluginRegistry";
import {PluginConfigurationType} from "../abstracts/plugin/PluginConfigurationType";

export function Plugin(name: string, defaultConfiguration: PluginConfigurationType = {}) {
    return (pluginClass: PluginConstructorInterface) => {
        pluginRegistry.register(name, pluginClass, defaultConfiguration)
    }
}