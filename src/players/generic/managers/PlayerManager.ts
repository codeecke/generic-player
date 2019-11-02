import {AbstractPlayer} from "../../../abstracts/AbstractPlayer";
import {playerRegistry} from "../../../registries/PlayerRegistry";

export class PlayerManager {

    protected player: AbstractPlayer | null = null;
    protected readonly originalElement: HTMLElement;

    constructor(element: HTMLElement) {
        this.originalElement = element;
        this.player = this.findValidPlayer();
        this.initializeLoop();
    }

    protected findValidPlayer(): AbstractPlayer | null {
        for (const Player of playerRegistry.fetchAll()) {
            if (Player.validate(this.originalElement)) {
                return new Player(this.originalElement);
            }
        }
        return null;
    }

    protected initializeLoop() {
        this.addEventListener('ended', () => {
            this.setCurrentTime(0);
            this.play();

        });
    }

    public whenReady(): Promise<PlayerManager> {
        return new Promise(resolve => {
            if (this.player) {
                this.player.addEventListener('ready', () => resolve(this));
            } else {
                resolve(this);
            }
        });
    }

    public play() {
        if (this.player) {
            this.player.play();
        }
    }

    public pause() {
        if (this.player) {
            this.player.pause();
        }
    }

    public stop() {
        if (this.player) {
            this.player.stop();
        }
    }


    public mute() {
        if (this.player) {
            this.player.mute();
        }
    }

    public unmute() {
        if (this.player) {
            this.player.unmute();
        }
    }

    public getElement(): Promise<HTMLElement> {
        return this.whenReady().then(() => {
            if (this.player) {
                return this.player.getElement() || this.originalElement;
            }
            return this.originalElement;
        });
    }

    public getCurrentTime(): Promise<number> {
        return this.whenReady().then(() => {
            if (this.player) {
                return this.player.getCurrentTime();
            }
            return 0;
        });
    }

    public setCurrentTime(seconds: number) {
        if (this.player) {
            this.player.setCurrentTime(seconds);
        }
    }

    public addEventListener(eventName: string, callback: Function) {
        if (this.player) {
            this.player.addEventListener(eventName, callback);
        }
    }
}