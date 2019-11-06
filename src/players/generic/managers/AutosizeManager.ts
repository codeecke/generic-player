export class AutosizeManager {
    private enabledValue: boolean = false;
    private ratioValue: number = 16 / 9;

    constructor(private player: {getElement: () => Promise<HTMLElement>}) {
        this.handle = this.handle.bind(this);
    }

    private handle() {
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
            window.addEventListener('resize', this.handle);
        } else if (!value) {
            window.removeEventListener('resize', this.handle);
        }
        this.enabledValue = value;
        this.handle();
    }

    get ratio(): number {
        return this.ratioValue;
    }

    set ratio(value: number) {
        this.ratioValue = value;
        this.handle();
    }
}