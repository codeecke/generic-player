import './players';
import {playerRegistry} from '../registries/player-registry';
import {PlayerConstructorInterface, PlayerInstanceInterface} from '../interfaces/player';


export class GenericPlayer implements PlayerInstanceInterface {
  
  player: PlayerInstanceInterface;
  
  constructor(private element: HTMLVideoElement, showWarning: boolean = true) {
    const id : string = element.dataset['type'] || null,
          url : string = element.getAttribute('src');
    
    let Player: PlayerConstructorInterface;
    
    if(id) {
      Player = playerRegistry.fetchById(id);
    } else {
      Player = playerRegistry.fetchByUrl(url);
    }
    
    if(Player) {
      this.player = new Player(element);
    } else if(showWarning) {
      console.warn('unknown player',element);
    }
  }
  
  play() {
    return this.player.play();
  }
  pause() {
    return this.player.pause();
  }
  stop() {
    return this.player.stop();
  }
  
}