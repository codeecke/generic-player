import {Player} from '../../decorators/player';
import {PlayerInstanceInterface} from '../../interfaces/player';
import {playerRegistry} from '../../registries/player-registry';

@Player({
  id: 'youtube',
  pattern: /^https?:\/\/(www\.)?youtube.com\/watch\?v\=[A-Za-z0-9\-_]+$/
})
export class Youtube implements PlayerInstanceInterface {
  constructor(videoElement: HTMLVideoElement) {
    console.log('YoutubeVideo::constructor');
  }
  
  play(): void {}
  pause(): void {}
  stop(): void {}
}