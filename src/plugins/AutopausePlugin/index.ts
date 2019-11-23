import {GenericPlayer} from "../../players/generic/GenericPlayer";
import {EventDispatcher} from "../../abstracts/EventDispatcher";
import {PluginInterface} from "../../interfaces/PluginInterface";
import {PluginConfigurationType} from "../../abstracts/plugin/PluginConfigurationType";
import {Plugin} from '../../decorators/Plugin';

@Plugin('autopause', {
    enabled: true
})
export class Index extends EventDispatcher implements PluginInterface {
    private enabledValue: boolean = false;
    private wasAutomaticallyPaused: boolean = false;
    private player: GenericPlayer | undefined;
    private isPlaying: boolean = false;

    constructor(config: PluginConfigurationType) {
        super();
        this.enabled = config.hasOwnProperty('enabled') ? config.enabled : true;
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
            this.player.hook.pause.after('autopause', ({resolve}) => {
                if(!this.isPlaying) {
                    this.wasAutomaticallyPaused = false;
                }
                resolve();
            })
        }
    }

    initializeAntiAutoplay() {
        if (this.player) {
            this.player.hook.play.before('autopause:play', ({resolve, reject}) => {
                const oldPlayingValue = this.isPlaying;
                this.isPlaying = true;
                this.update({
                    play: () => {
                        this.isPlaying = oldPlayingValue;
                        resolve();
                    },
                    pause: () => {
                        this.isPlaying = false;
                        reject('autopause');
                    }
                });
                this.isPlaying = oldPlayingValue;
                resolve();
            });
        }
    }

    initializeNormalBehavior() {
        if(this.player){
            this.player.addEventListener(
                ['play', 'visible', 'hidden'],
                () => this.defaultUpdate()
            );
        }
    }

    private defaultUpdate() {
        this.update({
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
        });
    }

    private update({play, pause}: { play: (() => void), pause: (() => void) }) {
        if (!this.player) {
            return;
        }
        const
            isVisible = this.player.isVisible || false,
            isPlaying = this.isPlaying,
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
        this.defaultUpdate();
    }

}