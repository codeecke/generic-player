import {GenericPlayer} from "../../GenericPlayer";
import {AutosizeConfiguration} from "./AutosizeConfiguration";

export class AutosizeManager {
    private enabledValue: boolean = false;
    private ratioValue: number = 16 / 9;

    constructor(private player: {autosize: AutosizeConfiguration, getElement: () => Promise<HTMLElement>}) {
        this.update = this.update.bind(this);
        this.enabled = GenericPlayer.config.autosize.enabled;
        this.ratio = GenericPlayer.config.autosize.ratio;
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