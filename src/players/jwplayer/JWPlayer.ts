import {AbstractPlayer} from "../../sdk/classes/AbstractPlayer";
import {Player} from "../../decorators/Player";
import {JWPlayerConfiguration} from "./JWPlayerConfiguration";
import {ZuluPlayer} from "../zuluplayer/ZuluPlayer";
import {jwplayer, JWPlayerPlayer, jwplayerType} from "./JWPlayerTypes";
import {SpecialValidators} from "./SpecialValidators";

@Player()
class JWPlayer extends AbstractPlayer {

    private config: JWPlayerConfiguration = ZuluPlayer.preset.jwPlayer;
    private player: Promise<JWPlayerPlayer> | null = null;

    constructor(element: HTMLElement) {
        super(element);
        if (this.config.player === '') {
            console.warn('JWPlayer needs to configure the player-api. Please set `ZuluPlayer.config.jwPlayer.player`');
            return;
        }
        this.player = this.loadPlayerAPI()
            .then(jwplayer => {
                return new Promise<JWPlayerPlayer>(resolve => {
                    const player = jwplayer(this.getId());
                    this.resolveSpecialLinks();
                    player.setup({
                        playlist: this.element.getAttribute('src')
                    });
                    player.on('ready', () => resolve(player));
                });
            })
            .then(player => {
                this.registerEvents(player);
                return player;
            })
            .then(player => {
                this.dispatchEvent('ready');
                return player;
            })
            .then(player => this.initializeFullscreenButton(player))
            .then(player => this.initializeControls(player));
    }

    private resolveSpecialLinks() {
        const src: string = this.element.getAttribute('src') as string;
        if (SpecialValidators.media.test(src)) {
            const
                result = SpecialValidators.media.exec(src),
                mediaId = result ? result[1] : '';
            this.element.setAttribute('src', 'https://cdn.jwplayer.com/v2/media/' + mediaId);
        } else if (SpecialValidators.playlist.test(src)) {
            const
                result = SpecialValidators.playlist.exec(src),
                playlistId = result ? result[1] : '';
            this.element.setAttribute('src', 'https://cdn.jwplayer.com/v2/playlists/' + playlistId);
        }
    }

    private loadPlayerAPI(): Promise<jwplayerType> {
        return new Promise((resolve, reject) => {
            const script = document.createElement('script');
            script.src = this.config.player;
            script.addEventListener('load', () => {
                setTimeout(() => resolve((window as any).jwplayer), 100);
            });
            script.addEventListener('error', () => reject(jwplayer));
            document.body.appendChild(script);
        });
    }

    private registerEvents(player: JWPlayerPlayer): JWPlayerPlayer {
        player.on('play', () => this.dispatchEvent('play'));
        player.on('pause', () => this.dispatchEvent('pause'));
        player.on('complete', () => this.dispatchEvent('ended'));
        player.on('complete', () => this.dispatchEvent('stop'));
        const originalStop = player.stop.bind(player);
        player.stop = () => {
            originalStop();
            this.dispatchEvent('stop');
        };
        return player;
    }

    private initializeFullscreenButton(player : JWPlayerPlayer) : JWPlayerPlayer {
        player.setControls(this.areControlsAllowed());
        return player;
    }

    private initializeControls(player : JWPlayerPlayer) : JWPlayerPlayer {
        const fullscreenButton: HTMLElement | null = player.getContainer().querySelector('.jw-icon-fullscreen');
        if (!this.isFullscreenAllowed() && fullscreenButton && fullscreenButton.parentElement) {
            fullscreenButton.parentElement.removeChild(fullscreenButton);
        }
        return player;
    }

    static validate(element: HTMLElement): boolean {
        if (element instanceof HTMLVideoElement) {
            const
                url: string = element.src,
                validator = /https\:\/\/cdn\.jwplayer\.com\/v2\/(playlists|media)\/([0-9a-zA-Z]+)(\?format=[0-9a-zA-Z]+)?$/;
            return validator.test(url) || SpecialValidators.media.test(url) || SpecialValidators.playlist.test(url);
        }
        return false;
    }

    async getElement(): Promise<HTMLElement> {
        if (this.player) {
            return this.player.then(jwplayer => jwplayer.getContainer());
        }
        return this.element;
    }

    mute(): void {
        if (this.player) {
            this.player = this.player.then(jwplayer => {
                jwplayer.setMute(true);
                return jwplayer;
            });
        }
    }

    pause(): void {
        if (this.player) {
            this.player = this.player.then(jwplayer => {
                jwplayer.pause();
                return jwplayer;
            });
        }
    }

    play(): void {
        if (this.player) {
            this.player = this.player.then(jwplayer => {
                jwplayer.play();
                return jwplayer;
            });
        }
    }

    stop(): void {
        if (this.player) {
            this.player = this.player.then(jwplayer => {
                jwplayer.stop();
                this.dispatchEvent('stop');
                return jwplayer;
            });
        }
    }

    unmute(): void {
        if (this.player) {
            this.player = this.player.then(jwplayer => {
                jwplayer.setMute(false);
                return jwplayer;
            });
        }
    }

    getCurrentTime(): Promise<number> {
        if (this.player) {
            return this.player.then(jwplayer => jwplayer.getPosition());
        }
        return Promise.resolve(0);
    }

    setCurrentTime(seconds: number): void {
        if (this.player) {
            this.player = this.player.then(jwplayer => {
                jwplayer.seek(seconds);
                return jwplayer;
            });
        }
    }
}