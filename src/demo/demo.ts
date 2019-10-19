import './demo.scss';
import {GenericPlayer} from '../players/generic/GenericPlayer';
import {PlayButton} from "./PlayButton";

GenericPlayer.config.jwPlayer.player = 'https://cdn.jwplayer.com/libraries/rs1pWqGT.js';

const playButton = new PlayButton();
window.addEventListener('DOMContentLoaded', () => {
    document.body.querySelectorAll('video').forEach(element => {
        const player = new GenericPlayer(element);
        player.mute();
        playButton.addPlayer(player);
    });
});
