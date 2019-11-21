import {PlayerManager} from "./PlayerManager";
import {GenericPlayer} from "../GenericPlayer";

export class ElementManager {
    constructor(private readonly element: Promise<HTMLElement>, private originalElement: HTMLElement) {
    }

    private copyClassList() {
        this.element.then(element => {
            this.originalElement.classList.forEach(className => {
                element.classList.add(className);
            });
        });
    }

    private copyId() {
        if (this.originalElement.id) {
            this.element.then(element => {
                element.id = this.originalElement.id;
            });
        }
    }

    private copyDataAttributes() {
        this.element.then(element => {
            const dataset = this.originalElement.dataset;
            Object.keys(dataset).forEach(key => {
                element.dataset[key] = dataset[key];
            });
        });
    }

    public copyStylingRelevantAttributes() {
        this.copyId();
        this.copyClassList();
        this.copyDataAttributes();
    }

    public controlPlayerByAttributes(player: GenericPlayer) {
        const autopause = player.autopause.enabled && !player.isVisible;

        if ((this.originalElement as HTMLVideoElement).muted) {
            player.mute();
        }
        if ((this.originalElement as HTMLVideoElement).autoplay) {
            player.mute();
            player.play();
            if(autopause) {
                player.autopause.wasAutomaticallyPaused = true;
                player.pause();
            }
        }

    }
}