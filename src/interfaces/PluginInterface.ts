import {ZuluPlayer} from "../players/zuluplayer/ZuluPlayer";

export interface PluginInterface {
    [x: string]: any;
    apply(player: ZuluPlayer) : void;
}