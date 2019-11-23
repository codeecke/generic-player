import {GenericPlayer} from "../../players/generic/GenericPlayer";
import {EventDispatcher} from "../../abstracts/EventDispatcher";
import {PluginInterface} from "../../interfaces/PluginInterface";
import {PluginConfigurationType} from "../../abstracts/plugin/PluginConfigurationType";
import {Plugin} from '../../decorators/Plugin';

@Plugin('autopause')
export class Index extends EventDispatcher implements PluginInterface {
    private enabledValue: boolean = false;
    public wasAutomaticallyPaused: boolean = false;
    private player: GenericPlayer | undefined;
    private isPlaying: boolean = false;

    constructor(config: PluginConfigurationType) {
        super();

        this.enabled = config.enabled || true;
    }

    apply(player: GenericPlayer): void {
        this.player = player;
        this.initializeIsPlayingFallback();
        this.initializeAntiAutoplay();
        this.initializeNormalBehavior();
    }

    initializeIsPlayingFallback() {
        if (this.player) {
            this.player.addEventListener('play', () => {
                this.isPlaying = true;
            });
            this.player.addEventListener(['pause', 'stop', 'ended'], () => {
                this.isPlaying = false;
            });
        }
    }

    initializeAntiAutoplay() {
        if (this.player) {
            this.player.hook.play.before('autopause:play', ({resolve, reject}) => {
                this.isPlaying = true;
                this.update({
                    play: resolve,
                    pause: () => {
                        this.isPlaying = false;
                        reject('autopause');
                    }
                });
                resolve();
            });
        }
    }

    initializeNormalBehavior() {
        if(this.player){
            this.player.addEventListener(
                ['play', 'visible', 'hidden'],
                () => this.update({
                    play: () => {
                        if(this.player) {
                            this.player.play();
                        }
                    },
                    pause: () => {
                        if(this.player) {
                            this.player.pause();
                        }
                    }
                })
            );
        }
    }

    private update({play, pause}: { play: (() => void), pause: (() => void) }) {
        if (!this.player) {
            return;
        }
        const
            isVisible = this.player.isVisible || false,
            isPlaying = this.player.isPlaying || this.isPlaying,
            wasAutomaticallyPaused = this.wasAutomaticallyPaused;

        if (this.enabled && isVisible && !isPlaying && wasAutomaticallyPaused) {
            play();
            this.wasAutomaticallyPaused = false;

        } else if (this.enabled && !isVisible && isPlaying) {
            pause();
            this.wasAutomaticallyPaused = true;
        }

    }

    get enabled(): boolean {
        return this.enabledValue;
    }

    set enabled(val: boolean) {
        this.enabledValue = val;
    }

}