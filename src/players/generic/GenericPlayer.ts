import '../players';
import {AutosizeManager} from "./managers/AutosizeManager";
import {PlayerManager} from "./managers/PlayerManager";
import {ElementManager} from "./managers/ElementManager";
import {ConfigurationManager} from "./managers/ConfigurationManager";
import {PlayerConstructorInterface} from "../../abstracts/AbstractPlayer";
import {playerRegistry} from "../../registries/PlayerRegistry";

export class GenericPlayer extends PlayerManager {
    public readonly autosize: AutosizeManager = new AutosizeManager(this);
    private readonly elementManager: ElementManager = new ElementManager(this.getElement(), this.originalElement);
    static readonly config = new ConfigurationManager();

    constructor(element: HTMLElement) {
        super(element);
        if (this.player) {
            this.elementManager.copyStylingRelevantAttributes();
        }
        if (this.originalElement instanceof HTMLVideoElement) {
            this.autosize.enabled = true;
            this.autosize.ratio = 16 / 9;
            this.elementManager.controlPlayerByAttributes(this);
        }
    }

    static registerPlayer(player: PlayerConstructorInterface) {
        playerRegistry.register(player);
    }
}