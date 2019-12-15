import {InternalEvent} from '../../../abstracts/InternalEvent';

class YouTubeIframeAPIReadyEvent extends InternalEvent {
}

try {
        (window as any).onYouTubeIframeAPIReady = function () {
            const eventHandlerList : YouTubeIframeAPIReadyEvent[] = (window as any).YoutubeEventHandler;
            eventHandlerList.forEach(eventHandler => eventHandler.dispatch());
        };

} catch (e) {
}

if(!(window as any).YoutubeEventHandler) {
    (window as any).YoutubeEventHandler = [];
}

const event = new YouTubeIframeAPIReadyEvent();
(window as any).YoutubeEventHandler.push(event);
export const onAPIReady = event;
