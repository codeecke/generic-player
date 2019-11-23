import {PluginConstructorInterface} from "../abstracts/plugin/PluginConstructorInterface";
import {GenericPlayer} from "../players/generic/GenericPlayer";
import {PluginConfigurationType} from "../abstracts/plugin/PluginConfigurationType";

export const pluginConfiguration: {[key: string]: any} = {};

export class PluginRegistry {
    private plugins: { [key: string]: PluginConstructorInterface } = {};

    public register(pluginName: string, plugin: PluginConstructorInterface, defaultConfiguration: PluginConfigurationType = {}) {
        pluginConfiguration[pluginName] = defaultConfiguration;
        this.plugins[pluginName] = plugin;
    }

    public fetchAll(): { [key: string]: PluginConstructorInterface } {
        return this.plugins;
    }
}
export const pluginRegistry = new PluginRegistry();