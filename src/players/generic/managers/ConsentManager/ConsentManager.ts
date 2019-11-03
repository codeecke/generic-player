import {ConsentManagerState, ConsentManagerStateWatcher} from "./ConsentManagerState";
import {GenericPlayer} from "../../GenericPlayer";
import 'scss/ConsentManager.scss'
import {AutosizeManager} from "../AutosizeManager";

export class ConsentManager {

    public templateId: string = '';
    private readonly dialog: Promise<HTMLElement>;
    private readonly parent: Node | null;
    private autosize: AutosizeManager | null = null;

    constructor(private element: HTMLElement, player: GenericPlayer) {
        this.parent = this.element.parentElement;
        this.dialog = this.getElement();
        if (!ConsentManagerState.isAccepted && GenericPlayer.config.consent.enabled) {
            this.showConsentDialog();
            this.autosize = new AutosizeManager(this);
            this.autosize.enabled = true;
            this.autosize.ratio = player.autosize.ratio;

            ConsentManagerState.watch((state: boolean) => {
                if (state) {
                    this.removeConsentDialog();
                }
            })
        }
    }

    private getTemplate(): HTMLElement {
        const
            wrapper = document.createElement('div'),
            info = document.createElement('div'),
            accept = document.createElement('button');

        wrapper.classList.add('generic-player-consent-manager__wrapper');
        info.classList.add('generic-player-consent-manager__info');
        info.dataset.genericPlayerConsentInfo = '';
        accept.classList.add('generic-player-consent-manager__accept');
        accept.dataset.genericPlayerConsentAccept = '';

        wrapper.appendChild(info);
        wrapper.appendChild(accept);
        return wrapper;
    }

    getElement(): Promise<HTMLElement> {
        const
            result: HTMLElement = this.getTemplate(),
            infoContainer: HTMLElement | null = result.querySelector('[data-generic-player-consent-info]'),
            acceptButton: HTMLElement | null = result.querySelector('[data-generic-player-consent-accept]');

        if (infoContainer) {
            infoContainer.innerHTML = GenericPlayer.config.consent.content.info;
        }
        if (acceptButton) {
            acceptButton.innerHTML = GenericPlayer.config.consent.content.accept;
            acceptButton.addEventListener('click', this.accept.bind(this));
        }

        const wrapper = document.createElement('div');
        wrapper.appendChild(result);

        return Promise.resolve(wrapper);
    }

    private showConsentDialog() {
        this.dialog.then(dialog => {
            if (this.parent) {
                this.parent.replaceChild(dialog, this.element);
            }
        });
    }


    private removeConsentDialog() {
        this.dialog.then(dialog => {
            if (this.parent) {
                this.parent.replaceChild(this.element, dialog);
            }
        });
    }

    public accept() {
        ConsentManagerState.isAccepted = true;
    }

    onAccept(callback: ConsentManagerStateWatcher) {
        if (ConsentManagerState.isAccepted || !GenericPlayer.config.consent.enabled) {
            callback(true);
        }
        ConsentManagerState.watch(callback);
    }
}