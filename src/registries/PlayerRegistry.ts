import { IPlayerFactory } from "../interfaces/PlayerFactory";
import { Registry } from "./Registry";

export class PlayerRegistry extends Registry<IPlayerFactory> {}