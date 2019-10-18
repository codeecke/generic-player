import {Player} from '../../decorators/Player';
import {AbstractPlayer} from '../../abstracts/AbstractPlayer';
import {APILoader} from './APILoader';
import {YoutubeAPIInterface, YoutubePlayerInstanceInterface} from './APIInterfaces';

@Player('youtube')
export class Youtube extends AbstractPlayer {
  static counter: number = 1;
  queue: Promise<YoutubePlayerInstanceInterface>
  
  constructor(videoElement: HTMLElement) {
    super(videoElement);
    this.queue = this.initializePlayer();
  }
  
  private initializePlayer(): Promise<YoutubePlayerInstanceInterface> {
    return APILoader.load().then(YT => {
      return new Promise(resolve => {
        const player = new YT.Player(this.getId(), {
          ...this.getOptions(),
          events: {'onReady': () => resolve(player)}
        });
      });
    });
  }
    
  private getOptions(): object {
    return {};
  }
  
  public static validate(element: HTMLElement) {
    if(element.tagName.toLowerCase() === 'video') {
      const url: string | null = element.getAttribute('src');
      if(url) {
        const validationPattern : RegExp = /^https?:\/\/(www\.)?youtube.com\/watch\?v\=[A-Za-z0-9\-_]+$/;
        return validationPattern.test(url);
      }
    }
    return false;
  }
  
  getElement(): Promise<HTMLElement> {
    return this.queue.then(player => player.getIframe());
  }
  
  play(): void {
    this.queue = this.queue.then(player => {
      player.playVideo();
      return player;
    });
  }
  
  pause(): void {
    this.queue = this.queue.then(player => {
      player.pauseVideo();
      return player;
    });

  }
  
  stop(): void {
    this.queue = this.queue.then(player => {
      player.stopVideo();
      return player;
    });

  }
}