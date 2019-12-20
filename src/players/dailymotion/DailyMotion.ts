import {Player} from "../../decorators/Player";
import {AbstractPlayer} from "../../sdk/classes/AbstractPlayer";
import {PlayerInterface} from "../../sdk/interfaces/player/PlayerInterface";

declare var DM: { player: any, addEventListener: any };

// @ts-ignore
@Player()
class DailyMotion extends AbstractPlayer implements PlayerInterface{

    private player: Promise<any>;
    private isPaused: boolean = false;
    static readonly validator: RegExp = /^https?\:\/\/(www\.)?dailymotion\.com\/video\/([a-zA-Z0-9\-]+)(\?playlist=[a-zA-Z0-9\-]+)?$/;

    constructor(element: HTMLElement) {
        super(element);
        this.player = this.loadAPI()
            .then(() => this.initializePlayer())
            .catch(() => console.error('Error by loading dailymotion-api'))
            .then(player => this.initializeEvents(player))
            .then(player => this.initializeControls(player))
            .then(player => {
                this.dispatchEvent('ready');
                return player
            });
    }

    private loadAPI(): Promise<void> {
        return new Promise((resolve, reject) => {
            const script = document.createElement('script');
            script.src = 'https://api.dmcdn.net/all.js';
            script.addEventListener('load', () => resolve());
            script.addEventListener('error', () => reject());
            document.body.appendChild(script);
        });
    }

    private initializeEvents(player: any) {

        player.addEventListener('play', () => {
            this.dispatchEvent('play');
            this.isPaused = false;
        });
        player.addEventListener('pause', () => {
            if (!this.isPaused) {
                this.dispatchEvent('pause');
                this.isPaused = true;
            }
        });
        player.addEventListener('video_end', () => this.dispatchEvent('ended'));
        player.addEventListener('video_end', () => this.dispatchEvent('stop'));
        return player
    }

    private initializeControls(player: any) {
        player.setControls(this.areControlsAllowed());
        return player;
    }

    private initializePlayer() {
        return new Promise((resolve, reject) => {
            const parts = DailyMotion.validator.exec((this.element as HTMLVideoElement).src);
            if (parts) {
                const player = DM.player(
                    this.element,
                    {
                        video: parts[2],
                        params: {
                            'queue-enable': false,
                            'queue-autoplay-next': false
                        }
                    }
                );
                if (!this.isFullscreenAllowed()) {
                    player.removeAttribute('allowfullscreen');
                }
                player.addEventListener('apiready', () => resolve(player));
            } else {
                reject();
            }
        })

    }

    static validate(element: HTMLElement) {
        if (element instanceof HTMLVideoElement) {
            return DailyMotion.validator.test(element.src);
        }
        return false;
    }

    getElement(): Promise<HTMLElement> | null {
        return this.player;
    }

    mute(): void {
        this.player = this.player.then(player => {
            player.setMuted(true);
            return player;
        });
    }

    pause(): void {
        this.player = this.player.then(player => {
            player.pause();
            return player;
        });
    }

    play(): void {
        this.player = this.player.then(player => {
            player.play();
            return player;
        });
    }

    stop(): void {
        this.player = this.player.then(player => {
            player.pause();
            this.dispatchEvent('stop');
            return player;
        });
    }

    unmute(): void {
        this.player = this.player.then(player => {
            player.setMuted(false);
            return player;
        });
    }

    getCurrentTime(): Promise<number> {
        return this.player.then(player => player.currentTime);
    }

    setCurrentTime(time: number): void {
        this.player = this.player.then(player => {
            player.seek(time);
            return player;
        });
    }

}