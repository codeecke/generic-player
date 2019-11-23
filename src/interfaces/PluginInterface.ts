import {GenericPlayer} from "../players/generic/GenericPlayer";

export interface PluginInterface {
    [x: string]: any;
    apply(player: GenericPlayer) : void;
}