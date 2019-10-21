# GenericPlayer

The GenericPlayer is an interface to manage easily videos from different sources.


__Currently supported platforms:__

* YouTube
* Vimeo
* JWPlayer
* standard html-videos

## How to install

```bash
npm install --save @codeecke/generic-player
```

or

```bash
yarn add @codeecke/generic-player
```

## How to use

### automatic mode

I had implemented an autoloader. If you want to use it, you just have to import like this:

```javascript
import '@codeecke/generic-player/dist/autoload';
```

Now you you can use videos from different sources in your html-code like this:

````html
<video src="https://youtu.be/aqz-KE-bpKQ" autoplay></video>
````

The GenericPlayer will automatically replace this video-tag with the correct platform-player (youtube in this case)

### script-mode

Of course you can use this GenericPlayer in your script.

````javascript
import {GenericPlayer} from '@codeecke/generic-player';

const videoTag = document.getElementById('player'),
      player = new GenericPlayer(videoTag);

player.mute();
player.play();
````

For more informations look into the [documentation](https://github.com/codeecke/generic-player/blob/master/docs/index.md)