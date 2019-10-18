export interface PlayerConstructorInterface {
  new(videoElement: HTMLElement): AbstractPlayer;
  validate(element: HTMLElement): boolean;
}

export abstract class AbstractPlayer {
  
  static counter: number = 0;
  public readonly whenReady: Promise<void>;
  protected loadingFailed: () => void = function(){};
  protected loadingComplete: () => void = function(){};
  
  constructor(protected element: HTMLElement) {
    this.whenReady = new Promise((resolve, reject) => {
      this.loadingComplete = resolve;
      this.loadingFailed = reject;
    })
    // here you can register an instance of AbstractPlayer in a InstanceRegistry
  }
  
  public static validate(element: HTMLElement): boolean {
    return false;
  }
  
  protected getId() : string {
    if(!this.element.id) {
      AbstractPlayer.counter++;
      this.element.setAttribute('id', `generic-player-${AbstractPlayer.counter}`);
    }
    return this.element.id;
  }
  
  abstract play(): void;
  abstract pause(): void;
  abstract stop(): void;
  abstract getElement() : Promise<HTMLElement>|null;


}