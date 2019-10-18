import '../players';
import {AutosizeManager} from "./managers/AutosizeManager";
import {PlayerManager} from "./managers/PlayerManager";
import {ElementManager} from "./managers/ElementManager";

export class GenericPlayer extends PlayerManager {
    public readonly autosize: AutosizeManager = new AutosizeManager(this);
    private readonly elementManager: ElementManager = new ElementManager(this, this.originalElement);

    constructor(element: HTMLElement, showWarning: boolean = true) {
        super(element);
        if (this.player) {
            this.initialize();
        } else if (showWarning) {
            console.warn('No player for element found', element);
        }
    }

    private initialize() {
        if (this.originalElement instanceof HTMLVideoElement) {
            this.autosize.enabled = true;
            this.autosize.ratio = 16 / 9;
        }
        this.elementManager.copyStylingRelevantAttributes();
    }
}