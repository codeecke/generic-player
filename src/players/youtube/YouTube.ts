import {Player} from '../../decorators/Player';
import {AbstractPlayer} from '../../abstracts/AbstractPlayer';
import {APILoader} from './helpers/APILoader';
import {YoutubePlayerInstanceInterface} from './interfaces/APIInterfaces';
import {YTUrlHelper} from './helpers/YTUrlHelper';

@Player()
export class Youtube extends AbstractPlayer {
    static counter: number = 1;
    public queue: Promise<YoutubePlayerInstanceInterface>;

    constructor(videoElement: HTMLElement) {
        super(videoElement);
        this.queue = this.initializePlayer().then((player) => {
            this.registerEvents(player);
            this.loadingComplete();
            this.dispatchEvent('ready');
            return player;
        });
    }

    private initializePlayer(): Promise<YoutubePlayerInstanceInterface> {
        return APILoader.load().then(YT => {
            return new Promise(resolve => {
                const player = new YT.Player(this.getId(), {
                    ...this.getOptions(),
                    events: {'onReady': () => resolve(player)}
                });
            });
        });
    }

    private registerEvents(player: YoutubePlayerInstanceInterface) {
        player.addEventListener('onStateChange', (event:{data: number}) => {
            switch (event.data) {
                case 0:
                    this.dispatchEvent('ended');
                    this.dispatchEvent('stop');
                    break;
                case 1:
                    this.dispatchEvent('playing');
                    break;
                case 2:
                    this.dispatchEvent('pause');
                    break;
            }
        });
    }

    private getOptions(): object {
        const
            url: string = (this.element.getAttribute('src') as string),
            urlHelper = new YTUrlHelper(url);

        return {
            videoId: urlHelper.videoId
        };
    }

    public static validate(element: HTMLElement): boolean {
        const url: string | null = element.getAttribute('src');
        if (url && element.tagName.toLowerCase() === 'video') {
            const urlHelper = new YTUrlHelper(url);
            return urlHelper.isValid;
        }
        return false;
    }

    public getElement(): Promise<HTMLElement> {
        return this.queue.then(player => player.getIframe());
    }

    public play(): void {
        this.queue = this.queue.then(player => {
            player.playVideo();
            return player;
        });
    }

    public pause(): void {
        this.queue = this.queue.then(player => {
            player.pauseVideo();
            return player;
        });

    }

    public stop(): void {
        this.queue = this.queue.then(player => {
            player.stopVideo();
            this.dispatchEvent('stop');
            return player;
        });

    }

    public mute(): void {
        this.queue = this.queue.then(player => {
            player.mute();
            return player;
        });
    }

    public unmute(): void {
        this.queue = this.queue.then(player => {
            player.unMute();
            return player;
        });
    }

    getCurrentTime(): Promise<number> {
        return this.queue.then(player => {
            return player.getCurrentTime();
        });
    }

    setCurrentTime(seconds: number): void {
        this.queue = this.queue.then(player => {
            player.seekTo(seconds, true);
            return player;
        });
    }


}