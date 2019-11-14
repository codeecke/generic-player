import {GenericPlayer} from "../../GenericPlayer";
import {PlayerManager} from "../PlayerManager";

export class AutopauseManager {
    private enabledValue: boolean = false;
    private thresholdValue: number = 0;
    private visibilityObserver: IntersectionObserver | undefined;
    private _isPlaying: boolean = false;
    private _isPausedAutomatically: boolean = false;

    constructor(private player: GenericPlayer, private playerManager: Promise<PlayerManager>) {
        this.threshold = GenericPlayer.config.autopause.threshold;
        this.enabled = GenericPlayer.config.autopause.enabled;
        player.addEventListener('play', () => {
            this._isPlaying = true;
        });
        player.addEventListener('pause', () => {
            this._isPlaying = false;
        });
        player.addEventListener('stop', () => {
            this._isPlaying = false;
        });
        player.addEventListener('ended', () => {
            this._isPlaying = false;
        });
    }

    private updateVisibilityState(entries: any) {
        console.log(entries);
        if (this.enabled) {
            const
                isVisible = entries[0].intersectionRatio >= this.threshold,
                isPlaying = this.isPlaying,
                isPausedAutomatically = this._isPausedAutomatically;

            if (isVisible && !isPlaying && isPausedAutomatically) {
                this.player.play();
                this._isPausedAutomatically = false;
            } else if (!isVisible && isPlaying) {
                this.player.pause();
                this._isPausedAutomatically = true;
            }
        }
    }

    private stopVisibilityObserver() {
        if (this.visibilityObserver) {
            this.visibilityObserver.disconnect();
        }
    }

    private startVisibilityObserver() {
        this.visibilityObserver = new IntersectionObserver((entries) => this.updateVisibilityState(entries), {
            root: null,
            threshold: this.threshold
        });
        this.playerManager.then(async playerManager => {
            const element = await playerManager.getElement();
            if(this.visibilityObserver) {
                this.visibilityObserver.observe(element);
            }
        });
    }

    private restartVisibilityObserver() {
        this.stopVisibilityObserver();
        if(this.enabled) {
            this.startVisibilityObserver();
        }
    }

    get enabled(): boolean {
        return this.enabledValue;
    }

    set enabled(val: boolean) {
        this.enabledValue = val;
        this.restartVisibilityObserver();
    }

    get threshold(): number {
        return this.thresholdValue;
    }

    set threshold(val: number) {
        this.thresholdValue = val;
    }

    get isPlaying(): boolean {
        return this._isPlaying;
    }
}