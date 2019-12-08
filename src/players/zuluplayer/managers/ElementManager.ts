import {ZuluPlayer} from "../ZuluPlayer";

export class ElementManager {
    constructor(private readonly element: Promise<HTMLElement>, private originalElement: HTMLElement) {
    }

    private async copyClassList() {
        try {
            const element = await this.element;
            this.originalElement.classList.forEach(className => {
                element.classList.add(className);
            });
        } catch (e) {
            console.error('ERROR007', e);
        }
    }

    private async copyId() {
        if (this.originalElement.id) {
            const element = await this.element;
            element.id = this.originalElement.id;
        }
    }

    private async copyDataAttributes() {
        const element = await this.element;
        const dataset = this.originalElement.dataset;
        Object.keys(dataset).forEach(key => {
            element.dataset[key] = dataset[key];
        });

    }

    public async copyStylingRelevantAttributes() {
        await this.copyId();
        await this.copyClassList();
        await this.copyDataAttributes();
    }

    public controlPlayerByAttributes(player: ZuluPlayer) {
        if ((this.originalElement as HTMLVideoElement).muted) {
            player.mute();
        }
        if ((this.originalElement as HTMLVideoElement).autoplay) {
            player.mute();
            player.play();
        }

    }
}