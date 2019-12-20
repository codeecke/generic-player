import {Player} from '../../decorators/Player';
import {AbstractPlayer} from '../../sdk/classes/AbstractPlayer';
import {ElementValidator, validationPattern} from "./ElementValidator";
// @ts-ignore
import VimeoPlayer from '@vimeo/player';

@Player()
export class Vimeo extends AbstractPlayer {

    private readonly player: VimeoPlayer;
    private readonly iframe: HTMLIFrameElement;

    constructor(element: HTMLElement) {
        super(element);

        this.iframe = this.createIFrame(
            `https://player.vimeo.com/video/${this.getVideoId()}?controls=${this.areControlsAllowed() ? '1' : '0'}`
        );

        if (element.parentElement) {
            element.parentElement.replaceChild(this.iframe, element);
        }

        this.player = new VimeoPlayer(this.iframe);
        this.player.on('loaded', () => this.dispatchEvent('ready'));
        this.player.on('play', () => this.dispatchEvent('play'));
        this.player.on('pause', () => this.dispatchEvent('pause'));
        this.player.on('ended', () => this.dispatchEvent('ended'));
        this.player.on('ended', () => this.dispatchEvent('stop'));

    }

    private createIFrame(url: string): HTMLIFrameElement {
        const iframe: HTMLIFrameElement = document.createElement('iframe');
        iframe.setAttribute('src', url);
        iframe.setAttribute('frameBorder', '0');
        iframe.setAttribute('transparent', '1');
        if (this.isFullscreenAllowed()) {
            iframe.setAttribute('allow', 'autoplay; fullscreen');
            iframe.setAttribute('allowfullscreen', '1');
        } else {
            iframe.setAttribute('allow', 'autoplay');
        }
        return iframe;
    }

    private getVideoId(): string {
        const result = validationPattern.exec(this.element.getAttribute('src') as string);
        if (result) {
            return result[2];
        }
        return '';
    }

    public static validate(element: HTMLElement): boolean {
        return ElementValidator.validate(element);
    }

    public async getElement(): Promise<HTMLElement> {
        return this.iframe;
    }

    public play(): void {
        this.player.play();
    }

    public pause(): void {
        this.player.pause();
    }

    public stop(): void {
        this.player.pause();
        this.player.setCurrentTime(0);
        this.dispatchEvent('stop');
    }

    public mute(): void {
        this.player.setMuted(true);
    }

    public unmute(): void {
        this.player.setMuted(false);
    }

    public async getCurrentTime(): Promise<number> {
        return await this.player.getCurrentTime()
    }

    public setCurrentTime(seconds: number): void {
        this.player.setCurrentTime(seconds);
    }
}