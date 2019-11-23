import {PluginInterface} from "../../interfaces/PluginInterface";
import {Plugin} from "../../decorators/Plugin";
import {GenericPlayer} from "../../players/generic/GenericPlayer";
import {PluginConfigurationType} from "../../abstracts/plugin/PluginConfigurationType";

@Plugin('autosize', {
    enabled: true,
    ratio: 16/9
})
class AutoSizePlugin implements PluginInterface {

    private _enabled: boolean = false;
    private _ratio: number = 16 / 9;
    private player: GenericPlayer | undefined;

    constructor(private config: PluginConfigurationType) {}

    apply(player: GenericPlayer): void {
        console.log('autosize.enabled', this.config.enabled);
        this.player = player;
        this.update = this.update.bind(this);
        if(this.config.hasOwnProperty('enabled')) {
            this.enabled = this.config.enabled;
        } else {
            this.enabled = true;
        }
        this.ratio = this.config.ratio || 16 / 9;
    }

    public async update() {
        if (this.player) {
            const element = await this.player.getElement();

            console.trace(this.enabled);

            if (element.style && this.enabled) {
                element.style.width = '100%';
                Promise.resolve().then(() => {
                    element.style.height = `${element.offsetWidth / this.ratio}px`;
                });
            } else if (element.style) {
                delete element.style.width;
                delete element.style.height;
            }
        }
    }

    get enabled(): boolean {
        return this._enabled;
    }

    set enabled(value: boolean) {
        if (value && !this.enabled) {
            window.addEventListener('resize', this.update);
        } else if (!value) {
            window.removeEventListener('resize', this.update);
        }
        this._enabled = value;
        this.update();
    }

    get ratio(): number {
        return this._ratio;
    }

    set ratio(value: number) {
        this._ratio = value;
        this.update();
    }

}