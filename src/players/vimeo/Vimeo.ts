import {Player} from '../../decorators/Player';
import {AbstractPlayer} from '../../abstracts/AbstractPlayer';
import {ElementValidator, validationPattern} from "./ElementValidator";
// @ts-ignore
import VimeoPlayer from '@vimeo/player';

@Player()
export class Vimeo extends AbstractPlayer {

    private readonly player: VimeoPlayer;
    private readonly iframe: HTMLIFrameElement;

    constructor(element: HTMLElement) {
        super(element);

        this.iframe = document.createElement('iframe');
        this.iframe.setAttribute('src', `https://player.vimeo.com/video/${this.getVideoId()}`);
        this.iframe.setAttribute('frameBorder', '0');
        this.iframe.setAttribute('transparent', '1');

        if (element.parentElement) {
            element.parentElement.replaceChild(this.iframe, element);
        }

        this.player = new VimeoPlayer(this.iframe);
        this.player.on('loaded', this.loadingComplete);
        this.player.on('error', this.loadingFailed);

    }

    private getVideoId(): string {
        const result = validationPattern.exec(this.element.getAttribute('src') as string);
        if(result) {
            return result[2];
        }
        return '';
    }

    public static validate(element: HTMLElement): boolean {
        return ElementValidator.validate(element);
    }

    getElement(): Promise<HTMLElement> {
        return Promise.resolve(this.iframe);
    }

    play(): void {
        this.player.play();
    }

    pause(): void {
        this.player.pause();
    }

    stop(): void {
        this.player.pause();
        this.player.setCurrentTime(0);
    }

    mute(): void {
        this.player.setMuted(true);
    }

    unmute(): void {
        this.player.setMuted(false);
    }
}