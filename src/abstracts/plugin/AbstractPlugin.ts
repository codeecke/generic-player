import {GenericPlayer} from "../../players/generic/GenericPlayer";

export abstract class AbstractPlugin {
    [x: string]: any;
    abstract async apply(player: GenericPlayer): Promise<void>;
}