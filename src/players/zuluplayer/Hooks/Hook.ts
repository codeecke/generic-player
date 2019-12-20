import {CallStack} from "../../../sdk/classes/CallStack";
import {HookInterface} from "../../../sdk/interfaces/hooks/HookInterface";

type ListenerParameter = {
    resolve: () => void,
    reject: (reason: any) => void,
    data: any
};
type Listener = (data: ListenerParameter) => void;

export class Hook implements HookInterface {
    private beforeListeners: CallStack = new CallStack();
    private afteristeners: CallStack = new CallStack();

    before(callback: Listener) {
        this.beforeListeners.add(callback);
    }

    after(callback: Listener) {
        this.afteristeners.add(callback);
    }

    private executeListenerAsPromise(callback: Function, data: any) {
        return new Promise<any>((resolve, reject) => {
            callback({
                resolve: () => resolve(data),
                reject,
                data
            });
        })
    }

    async execute(callback: () => any, data: { [key: string]: any } = {}): Promise<any> {
        let promise = Promise.resolve(data);
        this.beforeListeners.execute(data, (_cb) => {
            promise = promise.then((data: any) => this.executeListenerAsPromise(_cb, data))
        });
        promise = promise.then(callback);
        this.afteristeners.execute(data, (_cb) => {
            promise = promise.then((data: any) => this.executeListenerAsPromise(_cb, data))
        });
        return promise.catch(reason => console.warn('Rejected by hook. Reason:', reason));
    }
}