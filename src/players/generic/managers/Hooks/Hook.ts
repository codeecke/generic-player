type ListenerParameter = {
    resolve: () => void,
    reject: (reason: any) => void,
    data: any
};
type Listener = (data: ListenerParameter) => void;

export class Hook {
    private beforeListeners: {name: string, callback: Listener}[] = [];
    private afteristeners: {name: string, callback: Listener}[] = [];

    before(name: string, callback: Listener) {
        this.beforeListeners.push({name, callback});
    }

    after(name: string, callback: Listener) {
        this.afteristeners.push({name, callback});
    }

    private executeListenerAsPromise(listener: {name: string, callback: Listener}, data: any) {
        return new Promise<any>((resolve, reject) => {
            listener.callback({
                resolve: () => resolve(data),
                reject,
                data
            });
        })
    }

    async execute(callback: () => any | Promise<any>, data: { [key: string]: any } = {}, name: string = '<UNKOWN>'): Promise<any> {
        let promise = Promise.resolve(data);
        this.beforeListeners.forEach(listener => {
            promise = promise.then((data: any) => this.executeListenerAsPromise(listener, data))
        });
        promise = promise.then(callback);
        this.afteristeners.forEach(listener => {
            promise = promise.then((data: any) => this.executeListenerAsPromise(listener, data))
        });
        return promise.catch(reason => console.error('Rejected by hook. Reason:', reason));
    }
}