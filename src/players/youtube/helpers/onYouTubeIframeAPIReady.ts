import {InternalEvent} from '../../../abstracts/InternalEvent';

class YouTubeIframeAPIReadyEvent extends InternalEvent {
}

try {
    (window as any).onYouTubeIframeAPIReady = function () {
        onYouTubeIframeAPIReady.dispatch();
    };
} catch (e) {
}

export const onYouTubeIframeAPIReady = new YouTubeIframeAPIReadyEvent();