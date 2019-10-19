export declare type jwplayerType = (id: string) => JWPlayerPlayer;
export declare function jwplayer(id: string): JWPlayerPlayer;
export declare interface JWPlayerPlayer {
    setup (config: {[key: string]: any}): JWPlayerPlayer,
    play(): void,
    pause(): void;
    stop(): void;
    setMute(state: boolean): void;
    getContainer(): HTMLDivElement;
}