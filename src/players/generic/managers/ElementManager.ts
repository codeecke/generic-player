import {PlayerManager} from "./PlayerManager";

export class ElementManager {
    private readonly element: Promise<HTMLElement>;
    constructor(private playerManager: PlayerManager, private originalElement: HTMLElement) {
        this.element = playerManager.getElement();
    }

    private copyClassList() {
        this.element.then(element => {
            this.originalElement.classList.forEach(className => {
                element.classList.add(className);
            });
        });
    }

    private copyId() {
        this.element.then(element => {
            element.id = this.originalElement.id;
        });
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
}