import {InternalEvent} from '../../../abstracts/InternalEvent';

class YouTubeIframeAPIReadyEvent extends InternalEvent {
}

try {
        (window as any).onYouTubeIframeAPIReady = function () {
            const eventHandlerList : YouTubeIframeAPIReadyEvent[] = (window as any).ZPYTEH;
            eventHandlerList.forEach(eventHandler => eventHandler.dispatch());
        };

} catch (e) {
}

if(!(window as any).ZPYTEH) {
    (window as any).ZPYTEH = [];
}

const event = new YouTubeIframeAPIReadyEvent();
(window as any).ZPYTEH.push(event);
export const onAPIReady = event;
