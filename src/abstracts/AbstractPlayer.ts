import {EventDispatcher} from "./EventDispatcher";

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

    private isOptionActivated(optionName: string, defaultResult: boolean = false): boolean {
        const isValueActive = (value: string | undefined | null) => value === '' || value === '1';

        if (this.element.hasAttribute(optionName)) {
            return isValueActive(
                this.element.getAttribute(optionName)
            );
        }

        if (optionName in this.element.dataset) {
            return isValueActive(
                this.element.dataset[optionName]
            );
        }

        return defaultResult;
    }

    private isOptionDefined(optionName: string): boolean {
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