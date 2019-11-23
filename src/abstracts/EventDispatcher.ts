export abstract class EventDispatcher {
    listeners: { [key: string]: Function[] } = {};

    addEventListener(eventName: string, listener: Function) {
        if (!this.listeners[eventName]) {
            this.listeners[eventName] = [];
        }
        this.listeners[eventName].push(listener);
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