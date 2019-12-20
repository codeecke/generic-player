import {PlayerConstructorInterface} from "../sdk/interfaces/player/PlayerConstructorInterface";

export class PlayerRegistry {
    private players: PlayerConstructorInterface[] = [];

    public register(player: PlayerConstructorInterface) {
        this.players.push(player);
    }

    public fetchAll(): PlayerConstructorInterface[] {
        return this.players;
    }
}

export const playerRegistry = new PlayerRegistry();