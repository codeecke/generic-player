import {onAPIReady} from './onYouTubeIframeAPIReady';
import {YoutubeAPIInterface} from '../interfaces/APIInterfaces';

declare var YT: YoutubeAPIInterface;
let isAlreadyLoading: boolean = false;

export class APILoader {
    static load(): Promise<YoutubeAPIInterface> {
        return new Promise(resolve => {
            if (typeof (YT) !== 'undefined') {
                return resolve(YT);
            }
            onAPIReady.addListener(() => {
                resolve(YT);
            });
            if (!isAlreadyLoading) {
                const script: HTMLScriptElement = document.createElement('script');
                script.src = '//www.youtube.com/iframe_api';
                script.async = true;
                isAlreadyLoading = true;
                document.body.appendChild(script);
            }
        });
    }
}