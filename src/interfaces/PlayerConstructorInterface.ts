import {AbstractPlayer} from "../abstracts/AbstractPlayer";

export interface PlayerConstructorInterface {
    new(videoElement: HTMLElement): AbstractPlayer;

    validate(element: HTMLElement): boolean;
}