import {GenericPlayer} from "../../GenericPlayer";

export type ConsentManagerStateWatcher = (state: boolean) => void;

function getCurrentTimestamp(): number {
    return Math.round((new Date).getTime() / 1000);
}


export class ConsentManagerState {
    static watchers: ConsentManagerStateWatcher[] = [];

    static get isAccepted(): boolean {
        const savedTimestamp: string | null = localStorage.getItem("generic-player-accepted");

        if (savedTimestamp) {
            const savedTimestampAsNumber: number = parseInt(savedTimestamp);
            return getCurrentTimestamp() - savedTimestampAsNumber < GenericPlayer.config.consent.ttl;
        }
        return false;
    }

    static set isAccepted(value: boolean) {
        if (value) {
            localStorage.setItem("generic-player-accepted", getCurrentTimestamp().toString());
        } else {
            localStorage.removeItem("generic-player-accepted");
        }
        ConsentManagerState.watchers.forEach(callback => callback(value));
    }

    static watch(watcher: ConsentManagerStateWatcher) {
        ConsentManagerState.watchers.push(watcher);
    }
}