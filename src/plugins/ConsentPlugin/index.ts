import {PluginInterface} from "../../interfaces/PluginInterface";
import {GenericPlayer} from "../../players/generic/GenericPlayer";
import {Plugin} from "../../decorators/Plugin";
import {PluginConfigurationType} from "../../abstracts/plugin/PluginConfigurationType";
import {ConsentContentConfiguration} from "./ConsentContentConfiguration";
import {consentAcceptState} from "./ConsentAcceptState";

@Plugin('consent')
export class Index implements PluginInterface {

    private resolve: (() => void) | undefined;
    private originalElement: HTMLElement | undefined;
    private consentElement: HTMLElement | undefined;
    private content: ConsentContentConfiguration;
    private accepted: boolean = false;
    private readonly localStorageKey: string = 'GenericPlayer::consent_accepted';

    private readonly ttl: number;

    constructor(config: PluginConfigurationType) {
        this.ttl = config.ttl | 365 * 86400;
        this.content = new ConsentContentConfiguration(config.content || {});
    }

    apply(player: GenericPlayer): void {
        player.hook.createPlayer.before('consent', ({resolve, data}) => {
            this.resolve = resolve;
            this.originalElement = data.element;

            if(this.isAlreadyAccepted()) {
                resolve();
            } else {
                this.createConsent();
            }
        });

        player.hook.createPlayer.after('consent', ({resolve}) => {
            resolve();
        });
    }

    private isAlreadyAccepted(): boolean {
        if (consentAcceptState.accepted) {
            return true
        }
        const localStorageValue : string | null = localStorage.getItem(this.localStorageKey);
        if(localStorageValue) {
            const savedTimestamp = parseInt(localStorageValue);
            return this.getCurrentTimestamp() - savedTimestamp <= this.ttl;
        }
        return false;
    }

    private createConsent() {
        const
            info = document.createElement('div'),
            accept = document.createElement('button');

        this.consentElement = document.createElement('div'),
            this.consentElement.classList.add('generic-player-consent-manager__wrapper');

        info.classList.add('generic-player-consent-manager__info');
        info.dataset.genericPlayerConsentInfo = '';
        info.innerHTML = this.content.info;

        accept.classList.add('generic-player-consent-manager__accept');
        accept.dataset.genericPlayerConsentAccept = '';
        accept.innerHTML = this.content.accept;
        accept.addEventListener('click', () => this.activeAccept());
        consentAcceptState.addEventListener('accepted', () => {
            if (!this.accepted) {
                this.onAccept();
            }
        });

        this.consentElement.appendChild(info);
        this.consentElement.appendChild(accept);

        if (this.originalElement && this.originalElement.parentElement) {
            this.originalElement.parentElement.replaceChild(this.consentElement, this.originalElement);
        }
    }

    private getCurrentTimestamp() : number {
        return Math.round((new Date).getTime() / 1000);
    }

    private activeAccept() {
        localStorage.setItem(
            this.localStorageKey,
            this.getCurrentTimestamp().toString()
        );
        this.onAccept();
    }

    private onAccept() {
        this.accepted = true;
        consentAcceptState.accept();
        if (this.resolve && this.originalElement && this.consentElement && this.consentElement.parentElement) {
            this.consentElement.parentElement.replaceChild(this.originalElement, this.consentElement);
            this.resolve();
        }
    }
}