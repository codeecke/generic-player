export interface YoutubeAPIInterface {
    Player: YoutubePlayerConstructorInterface
}

export interface YoutubePlayerConstructorInterface {
    new(id: string, options: any): YoutubePlayerInstanceInterface;
}

export interface YoutubePlayerInstanceInterface {
    playVideo(): void;
    pauseVideo(): void;
    stopVideo(): void;
    mute(): void;
    unMute(): void;
    setSize(width: number, height: number): object;
    getIframe(): HTMLIFrameElement;
}