

![GenericPlayer](https://cdn.openlib.io/generic-player-documentation-assets/logo.svg)

GenericPlayer is an intelligent javascript-library for easy management of videos from different sources.

It’s no longer important where your videos are hosted. With GenericPlayer you’ve got one **single api** to control videos from youtube, vimeo, dailymotion, jw-player **AND** selfhosted html5-videos.

GenericPlayer is [open-source](https://github.com/openlib-sources/generic-player), has a [detailed documentation](https://github.com/openlib-sources/generic-player-documentation) and can easily expanded by plugins and custom player-implementations.

See the [demos](https://codepen.io/collection/AZEVRL/?grid_type=list).


## How to install

```bash
npm install --save @openlib/generic-player
```

or

```bash
yarn add @openlib/generic-player
```



## How to use

### automatic mode

I have implement an autoloader. If you want to use it, you do it like this:

```javascript
import {GenericPlayer} from '@openlib/generic-player';
GenericPlayer.autoload();
```

Now you you can use videos from different sources in your html-code like this:

````html
<video src="https://youtu.be/aqz-KE-bpKQ" autoplay></video>
````

The GenericPlayer will automatically replace this video-tag with the correct platform-player (youtube in this case)



### script-mode

Of course you can use this GenericPlayer in your script.

````javascript
import {GenericPlayer} from '@openlib/generic-player';

const videoTag = document.getElementById('player'),
      player = new GenericPlayer(videoTag);

player.mute();
player.play();
````
For more informations look into the [documentation](https://github.com/openlib-sources/generic-player-documentation)

[Credits](https://openlib.io/generic-player/credits.html)