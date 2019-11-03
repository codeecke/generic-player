import {InternalEvent} from '../../../abstracts/InternalEvent';

class YouTubeIframeAPIReadyEvent extends InternalEvent {
}

try {
    (window as any).onYouTubeIframeAPIReady = function (event: InternalEvent) {
        onYouTubeIframeAPIReady.dispatch();
    };
} catch (e) {
}

export const onYouTubeIframeAPIReady = new YouTubeIframeAPIReadyEvent();