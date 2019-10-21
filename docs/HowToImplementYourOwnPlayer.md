# How to implement your own player

## The structure of a player-class

```javascript
import {playerRegistry} from '@codeecke/generic-player';

class YourPlayer {
  
  constructor(element) {
    // here you can initialize your player
  }
  
  static validate(element) {
    // Here you can validate the given html-element
    // and return your validation-result as boolean
    // true - when the element is a valid for your player-class
    // false - when the element is not able to work with your class
  }
  
  getElement() {
    // returns a Promise that gives the element which is 
    // currently present in dom
  }
  
  play() {
    // plays the video
  }
  
  pause() {
    // pause the video
  }
  
  stop() {
    // stops the video
  }
  
  mute() {
    // mutes the video
  }
  
  unmute() {
    // unmutes the video
  }
}

// register your player-class for using in GenericPlayer
playerRegistry.register(YourPlayer);
```