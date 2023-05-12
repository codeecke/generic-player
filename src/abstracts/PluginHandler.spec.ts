import { IPlayer } from "../interfaces/IPlayer";
import { Player } from "../Player";
import { Factory } from "../players/mockPlayer/Factory";
import { AbstractPlugin } from "./AbstractPlugin";

class MockPlugin extends AbstractPlugin {
    constructor(private callback: (eventName: string, player: Player) => void){
        super()
    }

    async fire(eventName: string, player: Player): Promise<void> {
        this.callback(eventName, player)
    }
}

Player.registerPlayerFactory(new Factory)

describe('PluginHandler', () => {
    let player: Player;
    beforeEach(() => player = new Player('mock'))

    it('should fire the callback for play', async () => {
        const testFunction = jest.fn()
        const mockPlugin = new MockPlugin((eventName: string, firedPlayer: Player) => {
            expect(eventName).toEqual('play')
            expect(firedPlayer).toEqual(player)
            testFunction();
        })
        player.registerPlugin(mockPlugin)
        await player.play()
        expect(testFunction).toBeCalled();
    })
    it('should fire the callback for pause', async () => {
        const testFunction = jest.fn()
        const mockPlugin = new MockPlugin((eventName: string, firedPlayer: Player) => {
            expect(eventName).toEqual('pause')
            expect(firedPlayer).toEqual(player)
            testFunction()
        })
        player.registerPlugin(mockPlugin)
        await player.pause()
        expect(testFunction).toBeCalled();
    })
})