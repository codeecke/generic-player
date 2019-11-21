import '../players';
import {AutosizeManager} from "./managers/AutosizeManager/AutosizeManager";
import {PlayerManager} from "./managers/PlayerManager";
import {ElementManager} from "./managers/ElementManager";
import {ConfigurationManager} from "./managers/ConfigurationManager";
import {PlayerConstructorInterface} from "../../abstracts/AbstractPlayer";
import {playerRegistry} from "../../registries/PlayerRegistry";
import {ConsentManager} from "./managers/ConsentManager/ConsentManager";
import {DOMContentLoadingState} from "./managers/DOMContentLoadingState";
import {AutopauseManager} from "./managers/AutopauseManager/AutopauseManager";
import {VisibilityObserver} from "./managers/VisibilityObserver";

DOMContentLoadingState.register();

export class GenericPlayer {

    static readonly config = new ConfigurationManager();
    public readonly autosize: AutosizeManager;
    public readonly autopause: AutopauseManager;
    private playerManager: Promise<PlayerManager>;
    public readonly visibilityObserver: VisibilityObserver;
    private _isPlaying: boolean = false;

    static registerPlayer(player: PlayerConstructorInterface) {
        playerRegistry.register(player);
    }

    static autoload() {
        if (DOMContentLoadingState.isLoaded) {
            const videoTags = document.body.querySelectorAll('video');
            [].slice.call(videoTags).forEach(videoTag => {
                new GenericPlayer(videoTag);
            });
        } else {
            DOMContentLoadingState.watch(this.autoload.bind(this));
        }
    }

    constructor(private element: HTMLElement) {
        this.playerManager = this.createPlayerManager();
        this.visibilityObserver = new VisibilityObserver(element, 0);
        this.addEventListener('play', () => this._isPlaying = true);
        this.addEventListener(['pause', 'stop', 'ended'], () => this._isPlaying = false);
        this.addEventListener('visible', () => console.log('visible'));
        this.addEventListener('hidden', () => console.log('hidden'));
        this.addEventListener('play', () => console.log('play'));
        this.autosize = new AutosizeManager(this);
        this.autopause = new AutopauseManager(this);
        this.getElement().then(element => this.visibilityObserver.element = element);
        this.copyProperties();
    }

    get isPlaying(): boolean {
        return this._isPlaying;
    }

    get isVisible(): boolean {
        return this.visibilityObserver.isVisible;
    }

    private createPlayerManager(): Promise<PlayerManager> {
        return new Promise<PlayerManager>(resolve => {
            const consentManager = new ConsentManager(this.element, this);
            consentManager.onAccept(() => {
                setTimeout(() => {
                    if (this.element instanceof HTMLVideoElement && this.element.dataset['src']) {
                        this.element.src = this.element.dataset['src'] as string;
                    }
                    if (this.element instanceof HTMLVideoElement && this.element.dataset['poster']) {
                        this.element.poster = this.element.dataset['poster'] as string;
                    }
                    resolve(new PlayerManager(this.element));
                }, 100)
            });
        });
    }

    private copyProperties() {
        this.playerManager.then(playerManager => {
            const elementManager = new ElementManager(playerManager.getElement(), this.element);
            elementManager.copyStylingRelevantAttributes();
            if (this.element instanceof HTMLVideoElement) {
                this.autosize.enabled = true;
                this.autosize.ratio = 16 / 9;
                elementManager.controlPlayerByAttributes(this);
            }
        });
    }

    public getElement(): Promise<HTMLElement> {
        return this.playerManager.then(playerManager => {
            return playerManager.getElement();
        });
    }

    play() {
        this.playerManager = this.playerManager.then(playerManager => {
            playerManager.play();
            return playerManager;
        });
    }

    pause() {
        this.playerManager = this.playerManager.then(playerManager => {
            playerManager.pause();
            return playerManager;
        });
    }

    stop() {
        this.playerManager = this.playerManager.then(playerManager => {
            playerManager.stop();
            return playerManager;
        });
    }

    mute() {
        this.playerManager = this.playerManager.then(playerManager => {
            playerManager.mute();
            return playerManager;
        });
    }

    unmute() {
        this.playerManager = this.playerManager.then(playerManager => {
            playerManager.unmute();
            return playerManager;
        });
    }

    getCurrentTime(): Promise<number> {
        return this.playerManager.then(playerManager => {
            return playerManager.getCurrentTime();
        });
    }

    setCurrentTime(seconds: number): void {
        this.playerManager = this.playerManager.then(playerManager => {
            playerManager.setCurrentTime(seconds);
            return playerManager;
        });
    }

    addEventListener(eventName: string | string[], callback: Function) {
        if(Array.isArray(eventName)) {
            eventName.forEach(event => this.addEventListener(event, callback));
            return;
        }
        const
            playerManagerEvents: string[] = [
                'ready',
                'play',
                'pause',
                'stop',
                'ended'
            ],
            isibilityEvents: string[] = [
                'visible',
                'hidden'
            ];
        if(playerManagerEvents.indexOf(eventName) !== -1) {
            this.playerManager = this.playerManager.then(playerManager => {
                playerManager.addEventListener(eventName, callback);
                return playerManager;
            })
        }

        if(isibilityEvents.indexOf(eventName) !== -1) {
            this.visibilityObserver.addEventListener(eventName, callback);
        }
    }

    enterFullscreen() {
        this.playerManager.then(playerManager => {
            playerManager.getElement().then(el => {

                try {
                    if (el.requestFullscreen) {
                        el.requestFullscreen();
                        // @ts-ignore
                    } else if (el.mozRequestFullScreen) { /* Firefox */
                        // @ts-ignore
                        el.mozRequestFullScreen();
                        // @ts-ignore
                    } else if (el.webkitRequestFullscreen) { /* Chrome, Safari and Opera */
                        // @ts-ignore
                        el.webkitRequestFullscreen();
                        // @ts-ignore
                    } else if (el.msRequestFullscreen) { /* IE/Edge */
                        // @ts-ignore
                        el.msRequestFullscreen();
                    }
                } catch (e) {
                }
            })
        });
    }

    exitFullscreen() {
        this.playerManager.then(playerManager => {
            playerManager.getElement().then(el => {

                if (document.exitFullscreen) {
                    document.exitFullscreen();
                    // @ts-ignore
                } else if (document.mozCancelFullScreen) { /* Firefox */
                    // @ts-ignore
                    document.mozCancelFullScreen();
                    // @ts-ignore
                } else if (document.webkitExitFullscreen) { /* Chrome, Safari and Opera */
                    // @ts-ignore
                    document.webkitExitFullscreen();
                    // @ts-ignore
                } else if (document.msExitFullscreen) { /* IE/Edge */
                    // @ts-ignore
                    document.msExitFullscreen();
                }
            })
        });
    }
}