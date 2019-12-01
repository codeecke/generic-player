export abstract class EventDispatcher {
    listeners: { [key: string]: Function[] } = {};

    addEventListener(eventName: string | string[], listener: Function) {
        if(Array.isArray(eventName)) {
            eventName.forEach(event => this.addEventListener(event, listener));
            return;
        }
        if (!this.listeners[eventName]) {
            this.listeners[eventName] = [];
        }
        this.listeners[eventName].push(listener);
    }

    removeEventListener(eventName: string | string[], listener: Function) {
        if(Array.isArray(eventName)) {
            eventName.forEach(event => this.removeEventListener(event, listener));
            return;
        }
        if (this.listeners[eventName]) {
            this.listeners[eventName] = this.listeners[eventName].filter(savedListener => listener !== savedListener);
        }
    }

    protected dispatchEvent(eventName: string, data: any = undefined) {
        if (this.listeners[eventName]) {
            this.listeners[eventName].forEach(listener => listener(data));
        }
        if(this.listeners['all']) {
            this.listeners['all'].forEach(listener => listener(data, eventName));
        }
    }
}