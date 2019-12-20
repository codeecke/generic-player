import {playerRegistry} from "../registries/PlayerRegistry";
import {PlayerConstructorInterface} from "../sdk/interfaces/player/PlayerConstructorInterface";

export function Player() {
    return (playerClass: PlayerConstructorInterface) => {
        playerRegistry.register(playerClass);
    }
}