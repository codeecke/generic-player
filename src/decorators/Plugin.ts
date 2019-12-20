import {PluginConfigurationType} from "../sdk/types/PluginConfigurationType";
import {PluginConstructorInterface} from "../sdk/interfaces/plugin/PluginConstructorInterface";
import {pluginRegistry} from "../registries/PluginRegistry";


export function Plugin(name: string, defaultConfiguration: PluginConfigurationType = {}) {
    return (pluginClass: PluginConstructorInterface) => {
        pluginRegistry.register(name, pluginClass, defaultConfiguration)
    }
}