import {Player} from '../../decorators/Player';
import {AbstractPlayer} from '../../abstracts/AbstractPlayer';
import {APILoader} from './helpers/APILoader';
import {YoutubeAPIInterface, YoutubePlayerInstanceInterface} from './interfaces/APIInterfaces';
import {YTUrlHelper} from './helpers/YTUrlHelper';

@Player('youtube')
export class Youtube extends AbstractPlayer {
  static counter: number = 1;
  queue: Promise<YoutubePlayerInstanceInterface>
  
  constructor(videoElement: HTMLElement) {
    super(videoElement);
    this.queue = this.initializePlayer().then((player) => {
      this.loadingComplete();
      return player;
    });
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
    const 
      url : string = (this.element.getAttribute('src') as string),
      urlHelper = new YTUrlHelper(url);

    return {
      videoId: urlHelper.videoId
    };
  }
  
  public static validate(element: HTMLElement) {
    const url: string | null = element.getAttribute('src');
    if(url && element.tagName.toLowerCase() === 'video') {
      const urlHelper = new YTUrlHelper(url);
      return urlHelper.isValid;
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