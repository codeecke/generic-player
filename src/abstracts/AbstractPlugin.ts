import { IPlayer } from "../interfaces/IPlayer";

export abstract class AbstractPlugin {
    abstract fire(eventName: string, player: IPlayer): Promise<void>;
}