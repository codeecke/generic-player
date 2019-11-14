import {JWPlayerConfiguration} from "../../jwplayer/JWPlayerConfiguration";
import {ConsentManagerConfig} from "./ConsentManager/ConsentManagerConfig";
import {AutosizeConfiguration} from "./AutosizeManager/AutosizeConfiguration";
import {AutopauseConfiguration} from "./AutopauseManager/AutpauseConfiguration";

export class ConfigurationManager {
    public readonly jwPlayer = new JWPlayerConfiguration();
    public readonly consent = new ConsentManagerConfig();
    public readonly autosize = new AutosizeConfiguration();
    public readonly autopause = new AutopauseConfiguration();
}