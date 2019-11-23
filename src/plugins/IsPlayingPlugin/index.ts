import {PluginInterface} from "../../interfaces/PluginInterface";
import {GenericPlayer} from "../../players/generic/GenericPlayer";
import {Plugin} from "../../decorators/Plugin";
import {PluginConfigurationType} from "../../abstracts/plugin/PluginConfigurationType";

@Plugin('isPlaying', {
    setGlobal: true
})
export class Index implements PluginInterface{

    isPlaying: boolean = false;
    private readonly setGlobals: boolean;

    constructor(private readonly config: PluginConfigurationType) {
        this.setGlobals = config.hasOwnProperty('setGlobal') ? config.setGlobal : true;
    }

    apply(player: GenericPlayer): void {
        player.addEventListener('play', () => {
            player.isPlaying = true;
            this.isPlaying  = true;
        });
        player.addEventListener(['pause', 'stop', 'ended'], () => {
            player.isPlaying = false;
            this.isPlaying  = false;
        });
    }

}