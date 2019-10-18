import {Event} from '../../abstracts/Event';

class YouTubeIframeAPIReadyEvent extends Event {}

// @ts-ignore
window.onYouTubeIframeAPIReady = function (event: Event) {
    onYouTubeIframeAPIReady.dispatch();
};

export const onYouTubeIframeAPIReady = new YouTubeIframeAPIReadyEvent();