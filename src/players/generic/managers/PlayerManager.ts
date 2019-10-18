import {AbstractPlayer} from "../../../abstracts/AbstractPlayer";
import {playerRegistry} from "../../../registries/PlayerRegistry";

export class PlayerManager {
    protected readonly player: AbstractPlayer | null;
    protected readonly originalElement: HTMLElement;

    constructor(element: HTMLElement) {
        this.originalElement = element;
        this.player = this.findValidPlayer();
    }

    private findValidPlayer(): AbstractPlayer | null {
        for (const Player of playerRegistry.fetchAll()) {
            if (Player.validate(this.originalElement)) {
                return new Player(this.originalElement);
            }
        }
        return null;
    }

    private isHtmlVideoTag() {
        return this.originalElement instanceof HTMLVideoElement;
    }

    private getHtmlVideoTag(): HTMLVideoElement {
        return (this.originalElement as HTMLVideoElement);
    }

    public whenReady(): Promise<PlayerManager> {
        if (!this.player) {
            return Promise.resolve(this);
        }
        return this.player.whenReady.then(() => {
            return this
        });
    }

    public play() {
        if(this.player) {
            this.player.play();
        } else if(this.isHtmlVideoTag()) {
            this.getHtmlVideoTag().play();
        }
    }

    public pause() {
        if(this.player) {
            this.player.pause();
        } else if(this.isHtmlVideoTag()) {
            this.getHtmlVideoTag().play();
        }
    }

    public stop() {
        if(this.player) {
            this.player.stop();
        } else if(this.isHtmlVideoTag()) {
            this.getHtmlVideoTag().pause();
        }
    }


    public mute() {
        console.log('mute');
        if(this.player) {
            this.player.mute();
        } else if(this.isHtmlVideoTag()) {
            this.getHtmlVideoTag().muted = true;
        }
    }

    public unmute() {
        if(this.player) {
            this.player.unmute();
        } else if(this.isHtmlVideoTag()) {
            this.getHtmlVideoTag().muted = false;
        }
    }

    public getElement(): Promise<HTMLElement> {
        const fallback: Promise<HTMLElement> = Promise.resolve(this.originalElement);
        if (this.player) {
            return this.player.getElement() || fallback;
        }
        return fallback;
    }
}