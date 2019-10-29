export abstract class EventDispatcher {
    listeners: { [key: string]: Function[] } = {};

    addEventListener(eventName: string, listener: Function) {
        if (!this.listeners[eventName]) {
            this.listeners[eventName] = [];
        }
        this.listeners[eventName].push(listener);
    }

    dispatchEvent(eventName: string, data: any = undefined) {
        this.listeners[eventName].forEach(listener => listener(data));
    }
}