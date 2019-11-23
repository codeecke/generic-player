import {Hook} from "./Hook";

export class HookList {
    public readonly applyRegisteredPlugins = new Hook();
    public readonly addPlugin = new Hook();
    public readonly createPlayer = new Hook();
    public readonly play = new Hook();
    public readonly pause = new Hook();
    public readonly stop = new Hook();
    public readonly mute = new Hook();
    public readonly unmute = new Hook();
    public readonly getCurrentTime = new Hook();
    public readonly setCurrentTime = new Hook();
    public readonly addEventListener = new Hook();
}