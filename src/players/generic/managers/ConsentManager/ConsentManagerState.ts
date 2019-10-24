export type ConsentManagerStateWatcher = (state: boolean) => void;

export class ConsentManagerState {
    static watchers: ConsentManagerStateWatcher[] = []

    static get isAccepted() : boolean {
        return !!localStorage.getItem("generic-player-accepted");
    }

    static set isAccepted(value: boolean) {
        if(value) {
            localStorage.setItem("generic-player-accepted", Date.now().toString());
        } else {
            localStorage.removeItem("generic-player-accepted");
        }
        ConsentManagerState.watchers.forEach(callback => callback(value));
    }

    static watch(watcher: ConsentManagerStateWatcher) {
        ConsentManagerState.watchers.push(watcher);
    }
}