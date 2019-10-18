import {onYouTubeIframeAPIReady} from './onYouTubeIframeAPIReady';
import {YoutubeAPIInterface} from '../interfaces/APIInterfaces';

declare var YT:YoutubeAPIInterface;

export class APILoader {
  static load(): Promise<YoutubeAPIInterface> {
        return new Promise(resolve => {
            const script: HTMLScriptElement = document.createElement('script');
            script.src = '//www.youtube.com/iframe_api';
            script.async = true;
            onYouTubeIframeAPIReady.addListener(() => {
                resolve(YT);
            });
            document.body.appendChild(script);
        });
  }
}