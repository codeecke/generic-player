import {playerRegistry} from '../registries/PlayerRegistry';
import {PlayerConstructorInterface} from '../abstracts/AbstractPlayer';

export function Player() {
    return (playerClass: PlayerConstructorInterface) => {
        playerRegistry.register(playerClass);
    }
}