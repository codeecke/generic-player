export class DOMContentLoadingState {
    static isLoaded : boolean = false;
    static listeners : (() => void)[] = [];
    static register() {
        document.addEventListener('DOMContentLoaded', () => {
            DOMContentLoadingState.isLoaded = true;
            this.listeners.forEach(callback => callback());
        })
    }
    static watch(callback: () => void) {
        this.listeners.push(callback);
    }
}