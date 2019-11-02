export declare type jwplayerType = (id: string) => JWPlayerPlayer;
export declare function jwplayer(id: string): JWPlayerPlayer;
export declare interface JWPlayerPlayer {
    setup (config: {[key: string]: any}): JWPlayerPlayer,
    play(): void,
    pause(): void;
    stop(): void;
    setMute(state: boolean): void;
    getContainer(): HTMLDivElement;
    getPosition(): number;
    seek(seconds: number): void;
    on(eventName: string, listener: Function): void;
    removeButton(id:string): void;
    addButton(img:string, tooltip:string, callback:Function, id:string, btnClass:string):void;
}