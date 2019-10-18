import {GenericPlayer} from './players/generic/GenericPlayer';

const videoElement = document.createElement('video');
videoElement.classList.add('testclass');
videoElement.id='testid';
videoElement.setAttribute('data-test', '');
videoElement.setAttribute('data-test2', 'Hello World!!!');
// YouTube
// videoElement.src = 'https://www.youtube.com/watch?v=aqz-KE-bpKQ&list=PLx0sYbCqOb8TBPRdmBHs5Iftvv9TPboYG';
// videoElement.src = 'https://www.youtube.com/watch?v=aqz-KE-bpKQ';
videoElement.src = 'https://youtu.be/aqz-KE-bpKQ';

// Vimeo
videoElement.src = 'https://vimeo.com/1084537';

// HTML-VideoTag
videoElement.src = 'http://distribution.bbb3d.renderfarming.net/video/mp4/bbb_sunflower_1080p_60fps_normal.mp4';

// Sollte später auch noch ausgewertet werden:
// videoElement.muted = true;
// videoElement.autoplay = true;

document.body.appendChild(videoElement);

const player = new GenericPlayer(videoElement);
player.autosize.enabled = true;
player.whenReady().then(() => {
    player.mute();
    player.play();
});


// Idee für die Zukunft
// ---------------------------
// Mit GenericPlayer.find kann man nach GenericPlayer-Referenzen suchen 
// indem man den originalTag, den neuen Tag oder einen selector-string (für den neuen Tag) übergibt

/*
player.whenReady().then(() => {
  const
    iframe = document.querySelector('iframe'),
    secondReferemceOfPlayerInstance = GenericPlayer.find(iframe),
    thirdReferemceOfPlayerInstance = GenericPlayer.find(videoElement),
    fourthReferenceOfPlayerInstance = GenericPlayer.find('iframe');
});
/**/