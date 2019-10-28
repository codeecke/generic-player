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

    private getTemplate(): HTMLTemplateElement {
        if (this.templateId) {
            const template = document.getElementById(this.templateId);
            if (template instanceof HTMLTemplateElement) {
                return template;
            }
            console.warn(`No template-tag with id "${this.templateId}" found`);
        }
        const template: HTMLTemplateElement = document.createElement('template');
        template.innerHTML = `
            <div class="generic-player-consent-manager__wrapper">
                <div class="generic-player-consent-manager__info" data-generic-player-consent-info></div>
                <button class="generic-player-consent-manager__accept" data-generic-player-consent-accept></button>
            </div>
        `;
        return template;
    }

    getElement(): Promise<HTMLElement> {
        const
            template = this.getTemplate(),
            result: HTMLElement = (template.content.cloneNode(true) as HTMLElement),
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