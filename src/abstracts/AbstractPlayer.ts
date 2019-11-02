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

    abstract mute(): void;

    abstract unmute(): void;

    abstract getElement(): Promise<HTMLElement> | null;

    abstract getCurrentTime(): Promise<number>;

    abstract setCurrentTime(seconds: number): void;

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

    private isOptionActivated(optionName: string, defaultResult: boolean = false) : boolean {
        if (this.element.hasAttribute(optionName)) {
            const value: string | null = this.element.getAttribute(optionName);
            return value === '' || value === '1';
        }
        if (optionName in this.element.dataset) {
            const value: string | undefined = this.element.dataset[optionName];
            return value === '' || value === '1';
        }
        return defaultResult;
    }

    private isOptionDefined(optionName: string) : boolean {
        return optionName in this.element.dataset || this.element.hasAttribute(optionName);
    }

    protected isFullscreenAllowed(): boolean {
        return this.isOptionActivated('fullscreen', true);
    }

    protected isFullscreenAllowmentDefined(): boolean {
        return this.isOptionDefined('fullscreen');
    }

    protected areControlsAllowed(): boolean {
        return this.isOptionActivated('controls');
    }


}