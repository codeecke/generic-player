export interface PlayerConstructorInterface {
  new (videoElement: HTMLVideoElement): PlayerInstanceInterface;
}

export interface PlayerInstanceInterface {
  play(): void;
  pause(): void;
  stop(): void;
}

export interface PlayerInterface extends PlayerConstructorInterface{
  id: string;
  validate(url: string): boolean;
}