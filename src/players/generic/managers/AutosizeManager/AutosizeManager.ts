import {GenericPlayer} from "../../GenericPlayer";
import {PluginConfigurationType} from "../../../../abstracts/plugin/PluginConfigurationType";

export class AutosizeManager {
    private enabledValue: boolean = false;
    private ratioValue: number = 16 / 9;

    constructor(private player: GenericPlayer, config: PluginConfigurationType) {
        this.update = this.update.bind(this);
        this.enabled = config.enabled || true;
        this.ratio = config.ratio || 16 / 9;
    }

    public update() {
        this.player.getElement().then(element => {
            if (element.style && this.enabled) {
                element.style.width = '100%';
                Promise.resolve().then(() => {
                    element.style.height = `${element.offsetWidth / this.ratio}px`;
                });
            } else if (element.style) {
                delete element.style.width;
                delete element.style.height;
            }
        });
    }

    get enabled(): boolean {
        return this.enabledValue;
    }

    set enabled(value: boolean) {
        if (value && !this.enabledValue) {
            window.addEventListener('resize', this.update);
        } else if (!value) {
            window.removeEventListener('resize', this.update);
        }
        this.enabledValue = value;
        this.update();
    }

    get ratio(): number {
        return this.ratioValue;
    }

    set ratio(value: number) {
        this.ratioValue = value;
        this.update();
    }
}