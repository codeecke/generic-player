import {playerRegistry} from '../registries/player-registry';

export function Player(options: {[key: string]: any}) {
  return (playerClass: any) => {
    playerClass.validate = (url: string) => options.pattern.test(url);
    
    playerRegistry.register(options.id, playerClass);
  };
}