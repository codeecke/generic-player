import {playerRegistry} from '../registries/PlayerRegistry';
import {PlayerConstructorInterface} from '../abstracts/AbstractPlayer';

export function Player(id: string) {
    return (playerClass: PlayerConstructorInterface) => {
        playerRegistry.register(id, playerClass);
    }
}