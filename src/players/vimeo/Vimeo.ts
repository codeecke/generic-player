import {Player} from '../../decorators/Player';
import {AbstractPlayer} from '../../abstracts/AbstractPlayer';

@Player('vimeo')
export class Vimeo extends AbstractPlayer {
  constructor(videoElement: HTMLElement) {
    super(videoElement);
    console.log('Vimeo::constructor');
  }
  
  public static validate(element: HTMLElement) {
    if(element.tagName.toLowerCase() === 'video') {
      const url: string|null = element.getAttribute('src');

      if(url) {
        const validationPattern : RegExp = /^https?:\/\/(www.)?vimeo.com\/[0-9]+$/;
        return validationPattern.test(url);
      }
    }
    return false;  
  }
  
  getElement() : Promise<HTMLElement> {
    return Promise.resolve(document.body);
  }
  play(): void {}
  pause(): void {}
  stop(): void {}
}