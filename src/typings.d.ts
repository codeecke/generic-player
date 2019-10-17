declare module "VideoPlayer" {
  interface PlayerConstructorInterface {
    new (videoElement: HTMLVideoElement): PlayerInstanceInterface;
  }
  
  interface PlayerInstanceInterface {
    play(): void;
    pause(): void;
    stop(): void;
  }
  
  interface PlayerInterface extends PlayerConstructorInterface{
    id: string;
    validate(url: string): boolean;
  }
  
  interface playerRegistry {
    register(id: string, player: any);
    fetchAll(): PlayerInterface[];
    fetchByUrl(url: string): PlayerInterface;
    fetchById(id: string): PlayerInterface;
  }
  
  interface Player  extends PlayerInstanceInterface {}
}