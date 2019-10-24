import {Player} from "../../decorators/Player";
import {AbstractPlayer} from "../../abstracts/AbstractPlayer";

declare var DM: { player: any, addEventListener: any};

@Player()
class DailyMotion extends AbstractPlayer {

    private player: Promise<any>;
    static readonly validator: RegExp = /^https?\:\/\/(www\.)?dailymotion\.com\/video\/([a-zA-Z0-9\-]+)(\?playlist=[a-zA-Z0-9\-]+)?$/;

    constructor(element: HTMLElement) {
        super(element);
        this.player = this.loadAPI()
            .then(() => this.initializePlayer())
            .catch(() => console.error('Error by loading dailymotion-api'));
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

    private initializePlayer() {
        return new Promise((resolve, reject) => {
            const parts = DailyMotion.validator.exec((this.element as HTMLVideoElement).src);
            if (parts) {
                const player = DM.player(this.element, {video: parts[2]});
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
            return player;
        });
    }

    unmute(): void {
        this.player = this.player.then(player => {
            player.setMuted(false);
            return player;
        });
    }

}