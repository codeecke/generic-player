import {AbstractPlayer} from "../../abstracts/AbstractPlayer";
import {Player} from "../../decorators/Player";

@Player()
class Html5Player extends AbstractPlayer {

    constructor(element: HTMLElement) {
        super(element);
        console.log('player implemented');
        this.loadingComplete();
        this.element.addEventListener('canplay', () => this.dispatchEvent('ready'));
        this.element.addEventListener('play', () => this.dispatchEvent('playing'));
        this.element.addEventListener('pause', () => this.dispatchEvent('pause'));
        this.element.addEventListener('ended', () => this.dispatchEvent('ended'));
        this.element.addEventListener('ended', () => this.dispatchEvent('stop'));
    }

    static validate(element: HTMLElement) : boolean {
        return (element instanceof HTMLVideoElement);
    }

    getCurrentTime(): Promise<number> {
        return Promise.resolve((this.element as HTMLVideoElement).currentTime);
    }

    getElement(): Promise<HTMLElement> | null {
        return Promise.resolve(this.element);
    }

    mute(): void {
        (this.element as HTMLVideoElement).muted = true;
    }

    pause(): void {
        (this.element as HTMLVideoElement).pause();
    }

    play(): void {
        (this.element as HTMLVideoElement).play();
    }

    setCurrentTime(seconds: number): void {
        (this.element as HTMLVideoElement).currentTime = seconds;
    }

    stop(): void {
        this.pause();
        this.setCurrentTime(0);
        this.dispatchEvent('stop');
    }

    unmute(): void {
        (this.element as HTMLVideoElement).muted = false;
    }

}