export abstract class Event {
    listeners: Function[] = [];

    addListener(listener: Function) {
        this.listeners.push(listener);
    }

    dispatch(data: any = undefined) {
        this.listeners.forEach(listener => listener(data));
    }
}