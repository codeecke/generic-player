export interface IPlayer {
    readonly type: string
    play(): Promise<IPlayer>
    pause(): Promise<IPlayer>
    mute(): Promise<IPlayer>
    unmute(): Promise<IPlayer>
}