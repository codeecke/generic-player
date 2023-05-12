import { IPlayer } from "./IPlayer";

export interface IPlayerFactory {
    create(url: string): IPlayer
    isValid(url: string): boolean
}