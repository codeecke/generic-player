<p>
    <img src="https://cdn.openlib.io/generic-player-documentation-assets/logo.svg" alt="GenericPlayer" />
</p>

GenericPlayer is an intelligent javascript-library for easy management of videos from different sources.

It’s no longer important where your videos are hosted. With GenericPlayer you’ve got one **single api** to control videos from youtube, vimeo, dailymotion, jw-player **AND** selfhosted html5-videos.

GenericPlayer is <a href="https://github.com/openlib-sources/generic-player" target="_blank">open-source</a>, has a <a href="https://github.com/openlib-sources/generic-player-documentation" target="_blank">detailed documentation</a> and can easily customized by plugins and player-implementations.

See the <a href="https://codepen.io/collection/AZEVRL/?grid_type=list" target="_blank">demos</a>.


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
For more informations look into the <a href="https://github.com/openlib-sources/generic-player-documentation" target="_blank">documentation</a>

## recommended plugins

### VisibilityPlugin

This plugin observes the visibility of your player and adds  two new events: `visible`and `hidden`.

<a href="https://www.npmjs.com/package/@openlib/generic-player-visibility" target="_blank">visit npm-project</a>

### AutopausePlugin

This plugin uses the events from the VisibilityPlugin to pauses your video until the user can see it.

<a href="https://www.npmjs.com/package/@openlib/generic-player-autopause" target="_blank">visit npm-project</a>

### IsPlayingPlugin

This plugin uses the events of the player to add  the new property `isPlaying`.

<a href="https://www.npmjs.com/package/@openlib/generic-player-is-playing" target="_blank">visit npm-project</a>

### GDPRPlugin

This plugin replaces your video with a consent dialog and blocks the initialization until the user click on accept.

<a href="https://www.npmjs.com/package/@openlib/generic-player-gdpr" target="_blank">visit npm-project</a>

### FullscreenPlugin

This plugin allows you to show your video in fullscreen-mode.

<a href="https://www.npmjs.com/package/@openlib/generic-player-fullscreen" target="_blank">visit npm-project</a>

<hr/>

<a href="https://openlib.io/generic-player" target="_blank">website</a> / <a href="https://github.com/openlib-sources/generic-player-documentation" target="_blank">documentation</a> / plugins / <a href="https://codepen.io/collection/AZEVRL/?grid_type=list" target="_blank">demos</a> / <a href="https://openlib.io/generic-player/credits.html" target="_blank">credits</a>