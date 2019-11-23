import {PluginConstructorInterface} from "../abstracts/plugin/PluginConstructorInterface";

export class PluginRegistry {
    private plugins: { [key: string]: PluginConstructorInterface } = {};

    public register(pluginName: string, plugin: PluginConstructorInterface) {
        this.plugins[pluginName] = plugin;
    }

    public fetchAll(): { [key: string]: PluginConstructorInterface } {
        return this.plugins;
    }
}

export const pluginRegistry = new PluginRegistry();