import {PlayerInterface} from '../interfaces/player';

class PlayerRegistry {
  private players: {[key: string]: PlayerInterface} = {};

  public register(id: string, player: any) {
    this.players[id] = player;
  }

  public fetchAll() {
    return Object.values(this.players);
  }
  
  public fetchByUrl(url: string): PlayerInterface {
    for(let player of this.fetchAll()) {
      if(player.validate(url)) {
        return player;
      }
    }
    return null;
  }
  
  public fetchById(id: string) {
    return this.players[id];
  }
}

export const playerRegistry = new PlayerRegistry();