import {GenericPlayer} from "../../GenericPlayer";
import {PlayerManager} from "../PlayerManager";
import {EventDispatcher} from "../../../../abstracts/EventDispatcher";

export class AutopauseManager extends EventDispatcher {
    private enabledValue: boolean = false;
    private thresholdValue: number = 0;
    private visibilityObserver: IntersectionObserver | undefined;
    private element: HTMLElement | undefined;
    private _isPlaying: boolean = false;
    private _isPausedAutomatically: boolean = false;
    private lastEntities: any[] = [];
    private knownVisibility : boolean = false;

    constructor(private player: GenericPlayer, private playerManager: Promise<PlayerManager>) {
        super();

        this.threshold = GenericPlayer.config.autopause.threshold;
        this.enabled = GenericPlayer.config.autopause.enabled;
        player.addEventListener('play', () => {
            this._isPlaying = true;
            this.replyLastEvent();
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
        this.addEventListener('visible', () => {
            this.knownVisibility = true;
        });
        this.addEventListener('hidden', () => {
            this.knownVisibility = false;
        });
    }

    private replyLastEvent() {
        this.updateVisibilityState(
            this.lastEntities
        );
    }

    private updateVisibilityState(entries: any) {
        this.lastEntities = entries;

        const
            isVisible = this.isVisible,
            isPlaying = this.isPlaying,
            wasAutomaticallyPaused = this.wasAutomaticallyPaused;

        if(isVisible !== this.knownVisibility) {
            if (isVisible) {
                this.dispatchEvent('visible');
            } else {
                this.dispatchEvent('hidden');
            }
        }


        if (isVisible && !isPlaying && wasAutomaticallyPaused && this.enabled) {
            this.player.play();
            this._isPausedAutomatically = false;

        } else if (!isVisible && isPlaying && this.enabled) {
            this.player.pause();
            this._isPausedAutomatically = true;
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
            rootMargin: "0px 0px 0px 0px",
            threshold: this.threshold
        });
        this.playerManager.then(async playerManager => {
            this.element = await playerManager.getElement();
            if (this.visibilityObserver) {
                this.visibilityObserver.observe(this.element);
            }
        });
    }

    private restartVisibilityObserver() {
        this.stopVisibilityObserver();
        if (this.enabled) {
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

    get isVisible(): boolean {
        if (this.lastEntities.length) {
            return this.lastEntities[0].intersectionRatio > this.threshold
        }
        return false;
    }

    get wasAutomaticallyPaused() {
        return this._isPausedAutomatically;
    }
}