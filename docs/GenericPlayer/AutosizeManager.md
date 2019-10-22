# AutosizeManager

When autosize is [enabled](#enable), the width is by 100% of the parent-container. The height will be calculated by width and the defined [aspactratio](#ratio) (default 16:9).



## properties

### enable

Allows you to enable (true) or disable (false) the autosize-feature of the GenericPlayer.

__default:__ true

#### example
``` javascript
const videoTag = document.getElementById('player'),
      player = new GenericPlayer(videoTag);

player.autosize.enable = false;
```



### ratio

Allows you to define the aspectratio of the videoplayer.

__default:__ 1.77777777778 (16:9)

The expected value is re result of a simple division: `ratio = width / height`

#### example
```javascript
const videoTag = document.getElementById('player'),
      player = new GenericPlayer(videoTag),
      width = 20,
      height = 9;

player.autosize.ratio = width / height;
```
