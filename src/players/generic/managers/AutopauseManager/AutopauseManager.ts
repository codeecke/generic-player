import {GenericPlayer} from "../../GenericPlayer";
import {EventDispatcher} from "../../../../abstracts/EventDispatcher";

export class AutopauseManager extends EventDispatcher {
    private enabledValue: boolean = false;

    public wasAutomaticallyPaused: boolean = false;

    constructor(private player: GenericPlayer) {
        super();

        this.threshold = GenericPlayer.config.autopause.threshold;
        this.enabled = GenericPlayer.config.autopause.enabled;

        player.addEventListener(
            [
                'play',
                'visible',
                'hidden'
            ],
            () => this.update()
        );
    }

    public update() {
        const
            isVisible = this.player.isVisible,
            isPlaying = this.player.isPlaying,
            wasAutomaticallyPaused = this.wasAutomaticallyPaused;

        if (isVisible && !isPlaying && wasAutomaticallyPaused && this.enabled) {
            this.player.play();
            this.wasAutomaticallyPaused = false;

        } else if (!isVisible && isPlaying && this.enabled) {
            this.player.pause();
            this.wasAutomaticallyPaused = true;
        }

    }

    get enabled(): boolean {
        return this.enabledValue;
    }

    set enabled(val: boolean) {
        this.enabledValue = val;
    }

    get threshold(): number {
        return this.player.visibilityObserver.threshold
    }

    set threshold(val: number) {
        this.player.visibilityObserver.threshold = val;
    }
}