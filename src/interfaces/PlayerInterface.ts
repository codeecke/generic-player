export interface PlayerInterface extends PlayerClassInterface {
    play(): void
    pause(): void
    stop(): void
    mute(): void
    unmute(): void
    getElement(): Promise<HTMLElement> | null
    getCurrentTime(): Promise<number>
    setCurrentTime(seconds: number): void
    getId(): string
    isFullscreenAllowed(): boolean
    isFullscreenAllowmentDefined(): boolean
    areControlsAllowed(): boolean
}

export interface PlayerClassInterface {
    new(element: HTMLElement): PlayerInterface;
}
