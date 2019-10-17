import {Player} from '../../decorators/player';
import {PlayerInstanceInterface} from '../../interfaces/player';
import {playerRegistry} from '../../registries/player-registry';

@Player({
  id: 'vimeo',
  pattern: /^https?:\/\/(www.)?vimeo.com\/[0-9]+$/
})
export class Vimeo implements PlayerInstanceInterface {
  constructor(videoElement: HTMLVideoElement) {
    console.log('Vimeo::constructor');
  }
  
  play(): void {}
  pause(): void {}
  stop(): void {}
}