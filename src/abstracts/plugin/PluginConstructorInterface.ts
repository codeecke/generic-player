import {PluginConfigurationType} from "./PluginConfigurationType";
import {PluginInterface} from "../../interfaces/PluginInterface";

export interface PluginConstructorInterface {
    new(config: PluginConfigurationType): PluginInterface;
}