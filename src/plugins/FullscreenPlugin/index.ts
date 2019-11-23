import {Plugin} from "../../decorators/Plugin";
import {PluginInterface} from "../../interfaces/PluginInterface";
import {GenericPlayer} from "../../players/generic/GenericPlayer";

@Plugin('fullscreen')
class FullscreenPlugin implements PluginInterface {

    private player: GenericPlayer | undefined;

    apply(player: GenericPlayer): void {
        this.player = player;
        this.player.enterFullscreen = this.enterFullscreen.bind(this);
        this.player.exitFullscreen = this.exitFullscreen.bind(this);
    }

    async enterFullscreen(): Promise<void> {
        return new Promise(async (resolve, reject) => {
            if (this.player) {
                const el = await this.player.getElement();
                try {
                    if (el.requestFullscreen) {
                        el.requestFullscreen();
                        // @ts-ignore
                    } else if (el.mozRequestFullScreen) { /* Firefox */
                        // @ts-ignore
                        el.mozRequestFullScreen();
                        // @ts-ignore
                    } else if (el.webkitRequestFullscreen) { /* Chrome, Safari and Opera */
                        // @ts-ignore
                        el.webkitRequestFullscreen();
                        // @ts-ignore
                    } else if (el.msRequestFullscreen) { /* IE/Edge */
                        // @ts-ignore
                        el.msRequestFullscreen();
                    }
                    resolve();
                } catch (e) {
                    reject();
                }
                resolve();
            }
        })
    }

    async exitFullscreen(): Promise<void> {
        if (this.player) {
            if (document.exitFullscreen) {
                document.exitFullscreen();
                // @ts-ignore
            } else if (document.mozCancelFullScreen) { /* Firefox */
                // @ts-ignore
                document.mozCancelFullScreen();
                // @ts-ignore
            } else if (document.webkitExitFullscreen) { /* Chrome, Safari and Opera */
                // @ts-ignore
                document.webkitExitFullscreen();
                // @ts-ignore
            } else if (document.msExitFullscreen) { /* IE/Edge */
                // @ts-ignore
                document.msExitFullscreen();
            }
        }
    }
}