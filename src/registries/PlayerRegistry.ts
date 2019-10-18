import {PlayerConstructorInterface} from '../abstracts/AbstractPlayer';

class PlayerRegistry {
    private players: { [key: string]: PlayerConstructorInterface } = {};

    public register(id: string, player: PlayerConstructorInterface) {
        if (this.players[id]) {
            throw new Error(`A player with identifier "${id}" is already registered`);
        }
        this.players[id] = player;
    }

    public fetchAll(): PlayerConstructorInterface[] {
        return Object.values(this.players);
    }

    public fetchById(id: string) {
        return this.players[id];
    }
}

export const playerRegistry = new PlayerRegistry();