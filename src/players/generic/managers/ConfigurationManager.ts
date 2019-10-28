import {JWPlayerConfiguration} from "../../jwplayer/JWPlayerConfiguration";
import {ConsentManagerConfig} from "./ConsentManager/ConsentManagerConfig";

export class ConfigurationManager {
    public readonly jwPlayer = new JWPlayerConfiguration();
    public readonly consent = new ConsentManagerConfig();
}