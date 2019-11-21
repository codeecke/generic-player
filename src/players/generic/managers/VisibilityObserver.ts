import {EventDispatcher} from "../../../abstracts/EventDispatcher";

export class VisibilityObserver extends EventDispatcher {
    private thresholdValue: number = 0;
    private visibilityObserver: IntersectionObserver | undefined;
    private lastEntities: any[] = [];

    constructor(private _element: HTMLElement, threshold: number) {
        super();
        this.threshold = threshold;
    }

    private stop() {
        if (this.visibilityObserver) {
            this.visibilityObserver.disconnect();
        }
    }

    private start() {
        this.visibilityObserver = new IntersectionObserver((entries) => this.update(entries), {
            root: null,
            rootMargin: "0px 0px 0px 0px",
            threshold: this.threshold
        });
        this.visibilityObserver.observe(this.element);
    }

    private restart() {
        this.stop();
        this.start();
    }

    private update(entries: any) {

        const visibleBeforeUpdate = this.isVisible;
        this.lastEntities = entries;

        if(this.isVisible === visibleBeforeUpdate) {
            return;
        }
        if (this.isVisible) {
            this.dispatchEvent('visible');
        } else{
            this.dispatchEvent('hidden');
        }
    }
    get element() : HTMLElement {
        return this._element;
    }

    set element(val: HTMLElement) {
        this._element = val;
        this.restart();
    }

    get threshold(): number {
        return this.thresholdValue;
    }

    set threshold(val: number) {
        this.thresholdValue = val;
        this.restart();
    }

    get isVisible(): boolean {
        if (this.lastEntities.length) {
            return this.lastEntities[0].intersectionRatio > this.threshold
        }
        return false;
    }
}