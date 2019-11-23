import {PlayerConstructorInterface} from "../interfaces/PlayerConstructorInterface";
import {playerRegistry} from "../registries/PlayerRegistry";

export function Player() {
    return (playerClass: PlayerConstructorInterface) => {
        playerRegistry.register(playerClass);
    }
}