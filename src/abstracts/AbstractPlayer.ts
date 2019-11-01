import {EventDispatcher} from "./EventDispatcher";

export interface PlayerConstructorInterface {
    new(videoElement: HTMLElement): AbstractPlayer;

    validate(element: HTMLElement): boolean;
}

export abstract class AbstractPlayer extends EventDispatcher {

    static counter: number = 0;

    abstract play(): void;
    abstract pause(): void;
    abstract stop(): void;
    abstract mute() : void;
    abstract unmute() : void;
    abstract getElement(): Promise<HTMLElement> | null;
    abstract getCurrentTime() : Promise<number>;
    abstract setCurrentTime(seconds: number) : void;

    protected constructor(protected element: HTMLElement) {
        super();
    }

    public static validate(element: HTMLElement): boolean {
        return false;
    }


    protected getId(): string {
        if (!this.element.id) {
            AbstractPlayer.counter++;
            this.element.setAttribute('id', `generic-player-${AbstractPlayer.counter}`);
        }
        return this.element.id;
    }


}