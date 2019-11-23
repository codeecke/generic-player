import {GenericPlayer} from "../players/generic/GenericPlayer";
import {EventDispatcher} from "../abstracts/EventDispatcher";
import {PluginInterface} from "../interfaces/PluginInterface";
import {PluginConfigurationType} from "../abstracts/plugin/PluginConfigurationType";
import {Plugin} from '../decorators/Plugin';

@Plugin('autopause')
export class AutopausePlugin extends EventDispatcher implements PluginInterface{
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
        player.addEventListener('play', () => {
            this.isPlaying = true;
        });
        player.addEventListener(['pause', 'stop', 'ended'], () => {
            this.isPlaying = false;
        });
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
        this.player.hook.pause.after('autopause:pause', ({resolve}) => {
            this.isPlaying = false;
            resolve();
        });
        this.player.addEventListener(
            ['play', 'visible', 'hidden'],
            () => this.update({
                play: () => player.play(),
                pause: () => player.pause()
            })
        );

    }

    private update({play = null, pause = null}: {play: (() => void) | null , pause: (() => void) | null }) {
        if(!this.player) {
            return;
        }
        const
            isVisible = this.player.isVisible || false,
            isPlaying = this.player.isPlaying || this.isPlaying,
            wasAutomaticallyPaused = this.wasAutomaticallyPaused;

        if (isVisible && !isPlaying && wasAutomaticallyPaused && this.enabled) {
            // @ts-ignore
            play ? play(): this.player.play();
            this.wasAutomaticallyPaused = false;

        } else if (!isVisible && isPlaying && this.enabled) {
            // @ts-ignore
            pause ? pause(): this.player.pause();
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