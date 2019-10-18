import {GenericPlayer} from './players/generic/GenericPlayer';

const urlList = [
    'https://youtu.be/aqz-KE-bpKQ',
    'https://vimeo.com/1084537',
    'http://distribution.bbb3d.renderfarming.net/video/mp4/bbb_sunflower_1080p_60fps_normal.mp4'
];

urlList.forEach(url => {
    const videoElement = document.createElement('video');
    videoElement.src = url;
    document.body.appendChild(videoElement);
    const player = new GenericPlayer(videoElement);
    player.mute();
    player.play();
});