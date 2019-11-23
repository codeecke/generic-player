import {GenericPlayer} from "../players/generic/GenericPlayer";
import {EventDispatcher} from "../abstracts/EventDispatcher";
import {PluginInterface} from "../interfaces/PluginInterface";
import {PluginConfigurationType} from "../abstracts/plugin/PluginConfigurationType";
import {Plugin} from "../decorators/Plugin";

@Plugin('visibility')
export class VisibilityPlugin extends EventDispatcher implements PluginInterface {
    private element: HTMLElement | undefined;
    private thresholdValue: number = 0;
    private visibilityObserver: IntersectionObserver | undefined;
    private lastEntities: any[] = [];
    private player: GenericPlayer | undefined;

    private readonly setGlobal: boolean;
    public readonly visibleEventName: string;
    public readonly hiddenEventName: string;

    constructor(private config: PluginConfigurationType = {}) {
        super();
        this.setGlobal = config.setGlobal || true;
        this.visibleEventName = config.visibleEvent || 'visible';
        this.hiddenEventName = config.hiddenEvent || 'hidden';
        this.threshold = config.threshold || 0.001;
    }

    apply(player: GenericPlayer) {
        player.addEventListener('ready', async () => {
            this.player = player;
            this.player.isVisible = false;
            this.element = await player.getElement();

            this.restart();
        });
    }

    private stop() {
        if (this.visibilityObserver) {
            this.visibilityObserver.disconnect();
        }
    }

    private start() {
        if (this.element) {
            this.visibilityObserver = new IntersectionObserver((entries) => this.update(entries), {
                root: null,
                rootMargin: "0px 0px 0px 0px",
                threshold: this.threshold
            });
            this.visibilityObserver.observe(this.element);
        }
    }

    private restart() {
        this.stop();
        this.start();
    }

    private update(entries: any) {
        const visibleBeforeUpdate = this.isVisible();
        this.lastEntities = entries;

        if (!this.player || this.isVisible() === visibleBeforeUpdate) {
            return;
        }
        if (this.isVisible()) {
            if (this.setGlobal) {
                this.player.isVisible = true;
            }
            this.dispatchEvent(this.visibleEventName);
        } else {
            if (this.setGlobal) {
                this.player.isVisible = false;
            }
            this.dispatchEvent(this.hiddenEventName);
        }
    }

    get threshold(): number {
        return this.thresholdValue;
    }

    set threshold(val: number) {
        this.thresholdValue = val;
        this.restart();
    }

    isVisible(): boolean {
        if (this.lastEntities.length) {
            return this.lastEntities[0].intersectionRatio > this.threshold
        }
        return false;
    }
}