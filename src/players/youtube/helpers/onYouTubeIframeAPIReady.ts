import {Event} from '../../../abstracts/Event';

class YouTubeIframeAPIReadyEvent extends Event {
}

try {
    (window as any).onYouTubeIframeAPIReady = function (event: Event) {
        onYouTubeIframeAPIReady.dispatch();
    };
} catch (e) {
}

export const onYouTubeIframeAPIReady = new YouTubeIframeAPIReadyEvent();