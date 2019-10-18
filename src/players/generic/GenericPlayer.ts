import '../players';
import {playerRegistry} from '../../registries/PlayerRegistry';
import {AbstractPlayer, PlayerConstructorInterface} from '../../abstracts/AbstractPlayer';

export class GenericPlayer {
  
  private readonly player: AbstractPlayer|null;
  private readonly originalElement: HTMLElement;

  constructor(element: HTMLElement, showWarning: boolean = true) {
    this.originalElement = element;
    this.player = this.initializePlayer();
    if(showWarning && !this.player) {
      console.warn('No player for element found', element);
    }
  }

  private initializePlayer() : AbstractPlayer|null {
    for(const Player of playerRegistry.fetchAll()) {
      if(Player.validate(this.originalElement)) {
        return new Player(this.originalElement);
      }
    }
    return null;
  }
  
  static find(search: HTMLElement | HTMLElement[] | string) : GenericPlayer[] {
    console.warn('GenericPlayer.find() is not implemented yet. This functionality is coming soon.', search);
    return [];
  }

  get initialized(): boolean {
    return !!this.player;
  }

  get element() : Promise<HTMLElement> {
    const fallback:  Promise<HTMLElement> = Promise.resolve(this.originalElement)
    if(this.player) {
      return this.player.getElement() || fallback;
    }
    return fallback;
  }
  
  whenReady() : Promise<GenericPlayer> {
    if(!this.player) {
      return Promise.resolve(this);
    }
    return this.player.whenReady.then(() => {return this});
  }

  play() {
    if(this.player) {
      this.player.play();
    }
  }

  pause() {
    if(this.player) {
      this.player.pause();
    }
  }

  stop() {
    if(this.player) {
      this.player.stop();
    }
  }
  
}