export interface IPlayer {
    readonly type: string
    play(): IPlayer
    pause(): IPlayer
    mute(): IPlayer
    unmute(): IPlayer
}