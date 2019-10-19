import {GenericPlayer} from "../players/generic/GenericPlayer";

export class PlayButton {

    private readonly link: HTMLAnchorElement;
    private isPlaying: boolean = false;
    private players: GenericPlayer[] = [];

    constructor() {
        this.link = document.createElement('a');
        this.link.href = '#';
        this.link.classList.add('play-button');
        this.link.addEventListener('click', this.onClick.bind(this));
        this.setText();
        document.body.appendChild(this.link);
    }

    private setText() {
        this.link.innerHTML = this.isPlaying ? 'Pause' : 'Play';
    }

    private onClick(event: Event) {
        event.preventDefault();
        this.isPlaying = !this.isPlaying;
        if(this.isPlaying) {
            this.players.forEach(player => player.play());
        } else {
            this.players.forEach(player => player.pause());
        }
        this.setText();
    }

    addPlayer(player : GenericPlayer) {
        this.players.push(player);
    }
}